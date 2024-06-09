+++
title = 'Foundations of 🤗 Transformers: Inference'
date = 2024-06-09T14:29:21+10:00
draft = false
author = 'luojiahai'
+++

[🤗 Transformers](https://huggingface.co/docs/transformers/) provides APIs and tools to easily download and train
state-of-the-art pretrained models. These models support common tasks in different modalities, such as Natural Language
Processing, Computer Vision, Audio, and Multimodal.

Inference is the process of using a pretrained model to generate outputs on new data. There are several ways to run
inference with:

- [Inference API]({{% ref "#inference-api" %}}).
- [Inference Endpoints]({{% ref "#inference-endpoints" %}}).
- [Pipelines]({{% ref "#pipelines" %}}).
- [AutoClasses]({{% ref "#autoclasses" %}}).

## Inference API {#inference-api}

[Inference API](https://huggingface.co/docs/api-inference/) is free to use, and rate limited. You can test and evaluate
over 150,000 publicly accessible machine learning models, or your own private models, via simple HTTP requests, with
fast inference hosted on Hugging Face shared infrastructure.

### Running Inference with API Requests

Get a User Access or API token [in your Hugging Face profile settings](https://huggingface.co/settings/tokens).

Choose which model you are going to run. Go to the [Model Hub](https://huggingface.co/models) and select the model you
want to use.

```
ENDPOINT = https://api-inference.huggingface.co/models/<MODEL_ID>
```

Let’s use [gpt2](https://huggingface.co/gpt2) as an example. To run inference, simply use this code:

Python:
```python
import requests
API_URL = "https://api-inference.huggingface.co/models/gpt2"
headers = {"Authorization": f"Bearer {API_TOKEN}"}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()
data = query("Can you please let us know more details about your ")
```

JavaScript:
```javascript
import fetch from "node-fetch";
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/gpt2",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
query("Can you please let us know more details about your ").then((response) => {
    console.log(JSON.stringify(response));
});
```

cURL:
```bash
curl https://api-inference.huggingface.co/models/gpt2 \
        -X POST \
        -d '"Can you please let us know more details about your "' \
        -H "Authorization: Bearer ${API_TOKEN}"
```

## Inference Endpoints {#inference-endpoints}

[🤗 Inference Endpoints](https://huggingface.co/docs/inference-endpoints/) offers a secure production solution to easily
deploy any 🤗 Transformers, Sentence-Transformers and Diffusion models from the Hub on dedicated and autoscaling
infrastructure managed by Hugging Face.

With Inference Endpoints, you can easily deploy any machine learning model on dedicated and fully managed
infrastructure. Select the cloud, region, compute instance, autoscaling range and security level to match your model,
latency, throughput, and compliance needs.

![](https://raw.githubusercontent.com/huggingface/hf-endpoints-documentation/main/assets/creation_flow.png)

For usage, see this article:
[Getting Started with Hugging Face Inference Endpoints](https://huggingface.co/blog/inference-endpoints).

## Pipelines {#pipelines}

The pipelines are a great and easy way to use models for inference. These pipelines are objects that abstract most of
the complex code from the library, offering a simple API dedicated to several tasks.

### The pipeline abstraction

The pipeline abstraction is a wrapper around all the other available pipelines. It is instantiated as any other pipeline
but can provide additional quality of life. See the
[task summary](https://huggingface.co/docs/transformers/task_summary) for examples of use.

The `pipeline()` is a utility factory method to build a `Pipeline`. It internally builds a pretrained model inheriting
from `PreTrainedModel` (for PyTorch) or `TFPreTrainedModel` (for TensorFlow) to be used for inference.

There are multiple ways to fetch pretrained models to run inference:

#### Fetch online model given task identifier

The pipeline downloads and caches the default model to the task from the Hugging Face Hub.

```python
>>> pipeline = transformers.pipeline(task='text-classification')
>>> pipeline(inputs='This restaurant is awesome')
[{'label': 'POSITIVE', 'score': 0.9998743534088135}]
```

You can call a pipeline on many inputs with a list.

```python
>>> pipeline = transformers.pipeline(task='text-classification')
>>> pipeline(inputs=['This restaurant is awesome', 'This restaurant is awful'])
[{'label': 'POSITIVE', 'score': 0.9998743534088135},
 {'label': 'NEGATIVE', 'score': 0.9996669292449951}]
```

#### Fetch online model given model identifier

The pipeline downloads and caches the specified model from the Hugging Face Hub.

```python
>>> pipeline = transformers.pipeline(model='FacebookAI/roberta-large-mnli')
>>> pipeline(inputs='This restaurant is awesome')
[{'label': 'NEUTRAL', 'score': 0.7313136458396912}]
```

#### Fetch offline model (Internet not required)

The pipeline loads the model directly from your local storage. In this case of offline inference, parameters task, model
and tokenizer are required to build a pipeline.

```python
>>> model = transformers.AutoModelForSequenceClassification.from_pretrained(pretrained_model_name_or_path='path/to/model')
>>> tokenizer = transformers.AutoTokenizer.from_pretrained(pretrained_model_name_or_path='path/to/model')
>>> pipeline = transformers.pipeline(task='text-classification', model=model, tokenizer=tokenizer)
>>> pipeline(inputs='This restaurant is awesome')
[{'label': 'POSITIVE', 'score': 0.9998743534088135}]
```

## AutoClasses {#autoclasses}

In many cases, the architecture you want to use can be guessed from the name or the path of the pretrained model you are
supplying to the `from_pretrained()` method. AutoClasses are here to do this job for you so that you automatically
retrieve the relevant model given the name/path to the pretrained weights/config/vocabulary.

Under the hood, the `AutoClasses` work together to power the `pipeline()`. An `AutoClass` is a shortcut that
automatically retrieves the architecture of a pretrained model from its name or path. You only need to select the
appropriate `AutoClass` for your task and it’s associated preprocessing class.

Unlike the `pipeline()`, there is no one generic way to run inference with `AutoClasses`. It depends on the task and the
pretrained model you select. This is an example of using an `AutoClass` to run inference for text classification task.

```python
import transformers

model_name = 'distilbert/distilbert-base-uncased-finetuned-sst-2-english'

# preprocess
model = transformers.AutoModelForSequenceClassification.from_pretrained(pretrained_model_name_or_path=model_name)
tokenizer = transformers.AutoTokenizer.from_pretrained(pretrained_model_name_or_path=model_name)
inputs = tokenizer('This restaurant is awesome', return_tensors='pt')

# forward
outputs = model(**inputs)

# postprocess
scores = outputs['logits'][0]
dict_scores = [{'label': model.config.id2label[i], 'score': score.item()} for i, score in enumerate(scores)]
```
