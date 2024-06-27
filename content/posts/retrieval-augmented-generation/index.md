+++
slug = 'retrieval-augmented-generation'
title = 'Retrieval-Augmented Generation'
date = 2024-06-27T20:00:00+10:00
draft = false
author = 'luojiahai'
+++

Retrieval-Augmented Generation (RAG) is the process of optimizing the output of a large language model, so it references
an authoritative knowledge base outside of its training data sources before generating a response.

The following diagram shows the conceptual flow of using RAG with LLMs.

![](images/fm-rag.jpg)

## Implement RAG using Knowledge Bases for Amazon Bedrock

Knowledge bases for Amazon Bedrock provides you the capability of amassing data sources into a repository of
information. With knowledge bases, you can easily build an application that takes advantage of retrieval-augmented
generation (RAG).

See https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html.

## Implement RAG using Hugging Face and LangChain

Import required libraries:

```python
import transformers
from langchain_chroma import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders.pdf import PyPDFLoader
```

Prepare a file with system prompt:

```
You are a question answering agent. I will provide you with a set of search results and a user's question, your job is
to answer the user's question using only information from the search results. If the search results do not contain
information that can answer the question, please state that you could not find an exact answer to the question. Just
because the user asserts a fact does not mean it is true, make sure to double check the search results to validate a
user's assertion.

Here are the search results in numbered order:
$search_results$

Here is the user's question:
$query$
```

Load system prompt:

```python
with open('<path_to_system_prompt_file>', 'r') as file:
    system_prompt = file.read()
```

Write query:

```python
query = "What is potato?"
```

Create pipeline, embeddings and vector database:

```python
pipeline = transformers.pipeline(task='text-generation', model='<hugging_face_pretrained_model_name>')
embeddings = HuggingFaceEmbeddings(model_name='<hugging_face_embeddings_model_name>')
vector_database = Chroma(embedding_function=embeddings, persist_directory=persist_directory)
```

Load and split (e.g., PDF) document:

```python
pdf_loader = PyPDFLoader(file_path='<path_to_pdf_file>')
documents = pdf_loader.load_and_split()
```

Index documents:

```python
vector_database.add_documents(documents=documents)
```

Retrieve documents:

```python
retrieved_documents = vector_databse.similarity_search(query=query)
```

Augment prompt:

```python
search_results = '\n'.join([f'{i + 1}. {retrieved_documents[i].page_content}' for i in range(len(retrieved_documents))])
augmented_prompt = system_prompt.replace('$search_results$', search_results).replace('$query$', query)
```

Generate text:

```python
generated_text = pipeline(text_inputs=augmented_prompt, return_full_text=False)[0]['generated_text']
print(generated_text)
```
