+++
slug = 'hugging-face-diffusers-basics'
title = '🤗 Hugging Face 🧨 Diffusers: Basics'
date = 2024-07-18T20:00:00+10:00
draft = false
author = 'luojiahai'
+++

🧨 Diffusers is the go-to library for state-of-the-art pretrained diffusion models for generating images, audio, and
even 3D structures of molecules.

## DiffusionPipeline

```python
from diffusers import DiffusionPipeline

pipeline = DiffusionPipeline.from_pretrained('runwayml/stable-diffusion-v1-5', use_safetensors=True)
prompt = 'An image of a squirrel in Picasso style'
image = pipeline(prompt).images[0]
image.save('image_of_squirrel_painting.png')
```

### Swapping schedulers

```python
from diffusers import EulerDiscreteScheduler

pipeline = DiffusionPipeline.from_pretrained('runwayml/stable-diffusion-v1-5', use_safetensors=True)
pipeline.scheduler = EulerDiscreteScheduler.from_config(pipeline.scheduler.config)
```

## Models

Load the `UNet2DModel`, a basic unconditional image generation model with a checkpoint trained on cat images:

```python
from diffusers import UNet2DModel

repo_id = 'google/ddpm-cat-256'
model = UNet2DModel.from_pretrained(repo_id, use_safetensors=True)
```

To use the model for inference, create the image shape with random Gaussian noise:

```python
import torch

torch.manual_seed(0)

noisy_sample = torch.randn(1, model.config.in_channels, model.config.sample_size, model.config.sample_size)
```

For inference, pass the noisy image and a timestep to the model：

```python
with torch.no_grad():
    noisy_residual = model(sample=noisy_sample, timestep=2).sample
```

## Schedulers

Instantiate the `DDPMScheduler` with its `from_config()` method:

```python
from diffusers import DDPMScheduler

scheduler = DDPMScheduler.from_pretrained(repo_id)
```

Predict a slightly less noisy image:

```python
less_noisy_sample = scheduler.step(model_output=noisy_residual, timestep=2, sample=noisy_sample).prev_sample
```

Create a function that postprocesses and displays the denoised image as a `PIL.Image`:

```python
import PIL.Image
import numpy as np


def display_sample(sample, i):
    image_processed = sample.cpu().permute(0, 2, 3, 1)
    image_processed = (image_processed + 1.0) * 127.5
    image_processed = image_processed.numpy().astype(np.uint8)

    image_pil = PIL.Image.fromarray(image_processed[0])
    display(f"Image at step {i}")
    display(image_pil)
```

Create a denoising loop that predicts the residual of the less noisy sample, and computes the less noisy sample with the
scheduler:

```python
import tqdm

sample = noisy_sample

for i, t in enumerate(tqdm.tqdm(scheduler.timesteps)):
    # 1. predict noise residual
    with torch.no_grad():
        residual = model(sample, t).sample

    # 2. compute less noisy image and set x_t -> x_t-1
    sample = scheduler.step(residual, t, sample).prev_sample

    # 3. optionally look at image
    if (i + 1) % 50 == 0:
        display_sample(sample, i + 1)
```

---
