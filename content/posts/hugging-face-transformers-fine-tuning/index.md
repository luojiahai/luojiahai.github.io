+++
slug = 'hugging-face-transformers-fine-tuning'
title = '🤗 Hugging Face Transformers: Fine-Tuning'
date = 2024-06-28T10:00:00+10:00
draft = false
author = 'luojiahai'
+++

Fine-tuning lets you get more out of the models by providing:
- Higher quality results than prompting
- Ability to train on more examples than can fit in a prompt
- Token savings due to shorter prompts
- Lower latency requests

In this post, we will fine-tune a pretrained model `bert-base-uncased` for sentence classification as an example.

## Processing the data

We will use as an example the MRPC (Microsoft Research Paraphrase Corpus) dataset, introduced in a [paper](https://www.aclweb.org/anthology/I05-5002.pdf)
by William B. Dolan and Chris Brockett. The dataset consists of 5,801 pairs of sentences, with a label indicating if
they are paraphrases or not (i.e., if both sentences mean the same thing).

### Loading a dataset from the Hub

The 🤗 Datasets library provides an API to download and cache a dataset on the Hub. We can download the MRPC dataset
like this:

```python
from datasets import load_dataset

raw_datasets = load_dataset("glue", "mrpc")
```

This command downloads and caches the dataset, by default in `~/.cache/huggingface/datasets`.

### Preprocessing a dataset

To preprocess the dataset, we need to convert the text to numbers the model can make sense of.

```python
from transformers import AutoTokenizer

checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)

def tokenize_function(data):
    return tokenizer(data["sentence1"], data["sentence2"], truncation=True)

tokenized_datasets = raw_datasets.map(tokenize_function, batched=True)
```

We apply the tokenization function on all our datasets at once. We’re using `batched=True` in our call to map so the
function is applied to multiple elements of our dataset at once, and not on each element separately. This allows for
faster preprocessing.

### Dynamic padding

The 🤗 Transformers library provides us with such a function via `DataCollatorWithPadding`. It takes a tokenizer when
you instantiate it (to know which padding token to use, and whether the model expects padding to be on the left or on
the right of the inputs) and will do everything you need:

```python
from transformers import DataCollatorWithPadding

data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
```

## Fine-tuning a model

🤗 Transformers provides a `Trainer` class to help you fine-tune any of the pretrained models it provides on your
dataset.

### Training

Define a `TrainingArguments` class that will contain all the hyperparameters the `Trainer` will use for training and
evaluation:

```python
from transformers import TrainingArguments

training_args = TrainingArguments("test-trainer")
```

Define our model. We will use the `AutoModelForSequenceClassification` class, with two labels:

```python
from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)
```

Define a `Trainer`:

```python
from transformers import Trainer

trainer = Trainer(
    model,
    training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
    tokenizer=tokenizer,
)
```

Fine-tune the model on our dataset:

```python
trainer.train()
```

### Evaluation

Define our `compute_metric()` function with the metrics from the 🤗 [Evaluate](https://github.com/huggingface/evaluate/)
library:

```python
import evaluate
import numpy as np

def compute_metrics(eval_preds):
    metric = evaluate.load("glue", "mrpc")
    logits, labels = eval_preds
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)
```

Define a new `Trainer` with this `compute_metrics()` function:

```python
training_args = TrainingArguments("test-trainer", evaluation_strategy="epoch")
model = AutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)

trainer = Trainer(
    model,
    training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)
```

Launch a new training run:

```python
trainer.train()
```

This time, it will report the validation loss and metrics at the end of each epoch on top of the training loss.

---
