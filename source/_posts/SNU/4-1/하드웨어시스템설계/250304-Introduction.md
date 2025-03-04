---
title: Introduction
categories:
  - SNU
  - 4-1
  - 하드웨어시스템설계
date: 2025-03-04 09:04:07
tags:
---

# 왜 왔냐요

과목명이 멋져요 ~~과목명을 바꿔야겠다~~

# Real introduction

How can we run AI (in GPU) efficiently?

- What is AI accelerator chip?
- How can we design AI accelerator chip?
- How can we run neural networks on the AI accelerator chip (or GPU)?
- How can we run CNN/LLM on the AI accelerator chip (or GPU)?
- (If possible) why HBM is more important?

# Lecture goal

Understanding hardware/software system design issues/methods with a real system design example

## Hardware design

Matrix-matrix (MM) multiplication accelerator

Previously we used Verilog, but these days we have python-based hardware description language, Amaranth!

## Software design

Neural network code running on CPU

It should communicate with hardware MM accelerator.

## Optimizing software/hardware design

- Tiling a.k.a. blocking
- Reduced precision (e.g. 8-bit computation)
- Zero skipping in matrix-matrix multiplication

Optimization includes runtime optimization and energy optimization.

Q. How do we optimize power with Amaranth(simulation)?  
A. Even Verilog uses power estimation. We estimate power usage for each step in design process.
