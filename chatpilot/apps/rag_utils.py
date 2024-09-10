# -*- coding: utf-8 -*-
"""
@author:XuMing(xuming624@qq.com)
@description: 
"""
import re
from typing import List, Optional, Any, Iterable

import chromadb
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from loguru import logger

from chatpilot.config import CHROMA_DATA_PATH

try:
    CHROMA_CLIENT = chromadb.PersistentClient(
        path=CHROMA_DATA_PATH,
        settings=chromadb.Settings(allow_reset=True, anonymized_telemetry=False),
    )
except Exception as e:
    CHROMA_CLIENT = None
    logger.error(f"ChromaDB client failed to initialize: {e}")


class ChineseRecursiveTextSplitter(RecursiveCharacterTextSplitter):
    """Recursive text splitter for Chinese text.
    copy from: https://github.com/chatchat-space/Langchain-Chatchat/tree/master
    """

    def __init__(
            self,
            separators: Optional[List[str]] = None,
            keep_separator: bool = True,
            is_separator_regex: bool = True,
            doc_text_length_limit: int = -1,
            **kwargs: Any,
    ) -> None:
        """Create a new TextSplitter."""
        super().__init__(keep_separator=keep_separator, **kwargs)
        self._separators = separators or [
            "\n\n",
            "\n",
            "。|！|？",
            "\.\s|\!\s|\?\s",
            "；|;\s",
            "，|,\s"
        ]
        self._is_separator_regex = is_separator_regex
        self.doc_text_length_limit = doc_text_length_limit

    @staticmethod
    def _split_text_with_regex_from_end(
            text: str, separator: str, keep_separator: bool
    ) -> List[str]:
        # Now that we have the separator, split the text
        if separator:
            if keep_separator:
                # The parentheses in the pattern keep the delimiters in the result.
                _splits = re.split(f"({separator})", text)
                splits = ["".join(i) for i in zip(_splits[0::2], _splits[1::2])]
                if len(_splits) % 2 == 1:
                    splits += _splits[-1:]
            else:
                splits = re.split(separator, text)
        else:
            splits = list(text)
        return [s for s in splits if s != ""]

    def _split_text(self, text: str, separators: List[str]) -> List[str]:
        """Split incoming text and return chunks."""
        final_chunks = []
        # Get appropriate separator to use
        separator = separators[-1]
        new_separators = []
        for i, _s in enumerate(separators):
            _separator = _s if self._is_separator_regex else re.escape(_s)
            if _s == "":
                separator = _s
                break
            if re.search(_separator, text):
                separator = _s
                new_separators = separators[i + 1:]
                break

        _separator = separator if self._is_separator_regex else re.escape(separator)
        splits = self._split_text_with_regex_from_end(text, _separator, self._keep_separator)

        # Now go merging things, recursively splitting longer texts.
        _good_splits = []
        _separator = "" if self._keep_separator else separator
        for s in splits:
            if self._length_function(s) < self._chunk_size:
                _good_splits.append(s)
            else:
                if _good_splits:
                    merged_text = self._merge_splits(_good_splits, _separator)
                    final_chunks.extend(merged_text)
                    _good_splits = []
                if not new_separators:
                    final_chunks.append(s)
                else:
                    other_info = self._split_text(s, new_separators)
                    final_chunks.extend(other_info)
        if _good_splits:
            merged_text = self._merge_splits(_good_splits, _separator)
            final_chunks.extend(merged_text)
        return [re.sub(r"\n{2,}", "\n", chunk.strip()) for chunk in final_chunks if chunk.strip() != ""]

    def split_documents(self, documents: Iterable[Document]) -> List[Document]:
        """Split documents."""
        texts, metadatas = [], []
        count = 0
        if self.doc_text_length_limit > 0:
            max_length = self.doc_text_length_limit
        else:
            max_length = None

        for doc in documents:
            content = doc.page_content
            if max_length and count >= max_length:
                logger.warning(f"Text length limit reached: {count}")
                break
            if max_length and len(content) > max_length:
                content = content[:max_length]
            texts.append(content)
            metadatas.append(doc.metadata)
            count += len(content)
        return self.create_documents(texts, metadatas=metadatas)


def query_doc(collection_name: str, query: str, k: int, embedding_function):
    try:
        # if you use docker use the model from the environment variable
        collection = CHROMA_CLIENT.get_collection(
            name=collection_name,
            embedding_function=embedding_function,
        )
        result = collection.query(
            query_texts=[query],
            n_results=k,
        )
        return result
    except Exception as e:
        raise e


def merge_and_sort_query_results(query_results, k):
    # Initialize lists to store combined data
    combined_ids = []
    combined_distances = []
    combined_metadatas = []
    combined_documents = []

    # Combine data from each dictionary
    for data in query_results:
        combined_ids.extend(data["ids"][0])
        combined_distances.extend(data["distances"][0])
        combined_metadatas.extend(data["metadatas"][0])
        combined_documents.extend(data["documents"][0])

    # Create a list of tuples (distance, id, metadata, document)
    combined = list(
        zip(combined_distances, combined_ids, combined_metadatas, combined_documents)
    )

    # Sort the list based on distances
    combined.sort(key=lambda x: x[0])

    # Unzip the sorted list
    sorted_distances, sorted_ids, sorted_metadatas, sorted_documents = zip(*combined)

    # Slicing the lists to include only k elements
    sorted_distances = list(sorted_distances)[:k]
    sorted_ids = list(sorted_ids)[:k]
    sorted_metadatas = list(sorted_metadatas)[:k]
    sorted_documents = list(sorted_documents)[:k]

    # Create the output dictionary
    merged_query_results = {
        "ids": [sorted_ids],
        "distances": [sorted_distances],
        "metadatas": [sorted_metadatas],
        "documents": [sorted_documents],
        "embeddings": None,
        "uris": None,
        "data": None,
    }

    return merged_query_results


def query_collection(
        collection_names: List[str], query: str, k: int, embedding_function
):
    results = []

    for collection_name in collection_names:
        try:
            # if you use docker use the model from the environment variable
            collection = CHROMA_CLIENT.get_collection(
                name=collection_name,
                embedding_function=embedding_function,
            )

            result = collection.query(
                query_texts=[query],
                n_results=k,
            )
            results.append(result)
        except:
            pass

    return merge_and_sort_query_results(results, k)


def get_rag_prompt(template: str, context: str, query: str):
    # Replace placeholders in the template with the context and query
    template = template.replace("[context]", context, 1)
    template = template.replace("[query]", query, 1)

    return template


def rag_messages(docs, messages, template, k, embedding_function):
    logger.debug(f"docs: {docs}")

    last_user_message_idx = None
    for i in range(len(messages) - 1, -1, -1):
        if messages[i]["role"] == "user":
            last_user_message_idx = i
            break

    user_message = messages[last_user_message_idx]

    if isinstance(user_message["content"], list):
        # Handle list content input
        content_type = "list"
        query = ""
        for content_item in user_message["content"]:
            if content_item["type"] == "text":
                query = content_item["text"]
                break
    elif isinstance(user_message["content"], str):
        # Handle text content input
        content_type = "text"
        query = user_message["content"]
    else:
        # Fallback in case the input does not match expected types
        content_type = None
        query = ""

    relevant_contexts = []

    for doc in docs:
        context = None
        try:
            if doc["type"] == "collection":
                context = query_collection(
                    collection_names=doc["collection_names"],
                    query=query,
                    k=k,
                    embedding_function=embedding_function,
                )
            else:
                context = query_doc(
                    collection_name=doc["collection_name"],
                    query=query,
                    k=k,
                    embedding_function=embedding_function,
                )
        except Exception as e:
            logger.error(e)
        relevant_contexts.append(context)

    context_string = ""
    for context in relevant_contexts:
        if context:
            context_string += " ".join(context["documents"][0]) + "\n"

    ra_content = get_rag_prompt(
        template=template,
        context=context_string,
        query=query,
    )

    if content_type == "list":
        new_content = []
        for content_item in user_message["content"]:
            if content_item["type"] == "text":
                # Update the text item's content with ra_content
                new_content.append({"type": "text", "text": ra_content})
            else:
                # Keep other types of content as they are
                new_content.append(content_item)
        new_user_message = {**user_message, "content": new_content}
    else:
        new_user_message = {**user_message, "content": ra_content}

    messages[last_user_message_idx] = new_user_message

    return messages
