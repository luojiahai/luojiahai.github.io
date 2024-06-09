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
- [Models]({{% ref "#models" %}}).

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

The pipeline abstraction is a wrapper around all the other available pipelines. It is instantiated as any other pipeline
but can provide additional quality of life.

TODO

## Models {#models}

TODO
