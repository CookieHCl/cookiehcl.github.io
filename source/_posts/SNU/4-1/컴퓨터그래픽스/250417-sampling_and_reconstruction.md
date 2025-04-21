---
title: Sampling and Reconstruction
date: 2025-04-17 11:06:47
tags:
---

# Sampling 1D Signal

How do we sample and reconstruct continuous 1D signal? (e.g. audio)

- Piecewise constant approximation: f(x) is value of sample closest to x.
- Piecewise linear approximation: f(x) is linear interpolation between values of two closest samples to x.

Denser sampling makes better reconstruction.

# Sampling 2D Signal

Same for image, use piecewise constant/bi-linear.

# Fourier Transform

Any signal can be expressed as a superposition of frequencies.

High frequency components in image have strongest edges.

## Aliasing

Aliasing: If sampling is not enough, high frequencies in the original signal masquerade as low frequencies after reconstruction.

### Spatial aliasing

![Spatial aliasing of sin(x^2 + y^2)](spatial_aliasing.png)

e.g. Image of $\sin(x^2 + y^2)$

In the middle, the ring appears at the limit of what we can represent with individual pixels.  
On the right, aliasing happens, and the ring appears as if it were low frequency.

### Temporal aliasing

e.g. Wagon Wheel Effect: If sampling rate is same as rotation speed, it appears to stand still.

# Nyquist-Shannon Theorem

If a signal is band-limited signal, i.e. it has no frequencies above some threshold $\omega$, the signal can be perfectly reconstructed if sample with frequency $2\omega$, and if interpolation is performed using $\text{sinc}(x) = \frac{1}{\pi x}\sin(\pi x) $

But why sinc?? Fourier transform of sinc is rectangular function.  
Convolution with sinc (i.e. multiplying rectangular function) limits frequency of sampled signal.

# Sampling in computer graphics

Sampling always happens in computer graphics!

- Signals are often not band-limited. e.g. Fourier transform of straight line need infinite frequency.
- Infinite extent of sinc filter is impractical for efficient implementations.
- Everything is discrete - graphics are visualized as pixels, numbers have limited precision, etc.

Aliasing makes jaggies, roping, shimmering, moire patterns, etc.

There are several techniques to reduce aliasing - e.g. pre-filtering.  
Fog effect remove high frequency components in advance.
