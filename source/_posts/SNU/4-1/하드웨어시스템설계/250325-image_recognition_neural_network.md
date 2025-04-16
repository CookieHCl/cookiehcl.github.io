---
title: Image Recognition Neural Network
categories:
  - SNU
  - 4-1
  - 하드웨어시스템설계
date: 2025-03-25 09:28:01
tags:
---

# Multi-Layer Perceptron (MLP)

## Biological Analogy

This is actually similar to Retinal Ganglion Cell (RGC, 망막 신경절 세포)  
RGC is connected to a group of photoreceptors which detects the existence of light.  
The pattern and motion information is then transferred to Primary Visual Cortex (V1).  
V1 neuron receives information from multiple RGCs and output single response, just like weighted sum + activation function.

V1 is known to have 6 layers which is similar to filters in CNN.  
V1 neurons in the same column (ocular-dominance column) detects line segment.  
Adjacent columns detects slightly different line orientations.

A simple cells detects a line segment of a specific direction.  
A complex cell receives information from multiple simple cells, and detects a line segment.  
This is similar to layers - it can extract high level feature from low level feature!

Unfortunately, human brain is too slow(?)  

- A synaptic connection takes about 20ms.
- Full recognition takes about 120ms (5~7 synaptic connection).
- Recognising to acting takes about 100ms (4~5 synaptic connection).  
- The total time is 180~260ms.

For a specific task, neural networks can outperform humans!

## XOR Problem

XOR can't be seperated with hyperplane.  
However, we can seperate XOR if we introduce additional dimension!

Deeper network can have a higher order function, so it can give better representation.

## Training MLP

Forward pass computes MLP, back propagation trains MLP.  
Back propagation compute derivative of output and change weights according to learning rate.

If derivate of activation function is less than 1, deep network's weight won't change. (diminishing effect of backpropagation)  
ReLU is used because its derivate is 1, so diminishing effect doesn't happen.

# Convolution

- Input: $H \times H \times C$
- Filters: $M$ of $R \times R \times C$
- Output: $E \times E \times M$

Output channels are also called as feature maps.

- Number of parameters: $R \times R \times C$
- Number of multiplications: $R \times R \times C \times E \times E \times M = \text{(parameters)} \times \text{(output dimension)}$

Because of mathematical definition, we use different index order for input and kernel.

$$y[n] = \sum_{i=-k}^k x[n-k]w[k]$$
