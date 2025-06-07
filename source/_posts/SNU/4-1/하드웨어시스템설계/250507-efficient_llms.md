---
title: Efficient LLMs
categories:
  - SNU
  - 4-1
  - 하드웨어시스템설계
abbrlink: 88
date: 2025-05-07 14:12:30
tags:
---

# Reducing model size

## Pruning

In fact, pruning also comes from the biological system!  
Number of synapses increases before 2 years old, but decreases after 2 years old.  
Probably to reduce resource (a.k.a. energy) usage?

In NN, we prune small output neurons and small weight connections.  
Then we train the remaining weights, and we repeat this process.

- Model size is reduced
- Faster download
- Less multiplication, a.k.a. less energy consumption!
- Weights tend to diverge

c.f. Reading from main memory consumes 6400 times more energy than adding an integer. Float multiplication consumes 37 times more energy than adding an integer.

## Quantization

### Compressed Sparse Row (CSR)

- Row pointer stores how many nonzero elements exists before that row.
- Column Indices stores column indices of each values.
- Values stores values.

Similarly, Compressed Sparse Column (CSC) can be defined.

### Weight clustering

We limit the number of effective weights by clustering weights.  
For each weight, we only store index of the cluster (only 2 bit if there are 4 clusters!) and centroids, so we don't have to waste 32 bit for each weight.

Unfortunately, we lost information about individual weight.  
During training, all the gradients are grouped by cluster and summed together, then only centroids are updated.

## Compression

Instead of using whole index range, using difference between indices can reduce range of integer, thus reducing number of bits to be used.

Huffman Encoding is used to further reduce integer values.

Using Pruning + Quantization + Compression can compress about 40 times smaller, but has the same error rate as before!

## Per-Layer Sensitivity

Layers near the input is the most sensitive layer. (i.e. accuracy loss after pruning is higher.)  
Layers near the outpt is the least sensitive layer.

That is why we optimize/compress aggressively only to the layers near the output!

# More pruning

## Structured pruning

Simple pruning hardly reduces the runtime of GPU.

Sparse matrix multiplication library is only effective when more than 90% of values are pruned.  
Most neural networks prune about 50~70% of weights.

How can we obtain performance gain from pruning?  
We should use structured pruning - pruning considering structure!

c.f. Actually this is zero-skipping problem!

### Outer product multiplier

Recall) Outer product multiplier reads each row/column from matrices, then it accumulates outer products.

To skip reading from matrix, we need zero column and a way to represent zero columns.

How do we make a zero column? Simple: Just prune with columns!  
Instead of individual weights, we prune columns whose sum of absolute weights is small.

Also, we can just reduce size of input matrix instead of using zero columns and additional metadata to represent zero columns.  
We can use the same hardware as if we didn't use pruning!

We can speed up to 8 times faster, but we have a higher accuracy drop (~1%).  
Also, in CNN, only the center of the filters remains after pruning.

### 2:4 pruning

Nvidia prunes 2 weights for every 4 weights.  
Then we use non-zero indices to select only the values corresponding to the non-zero weights.  
This can be done in hardware using mux.

![Permutation before 2:4 pruning](permutation_before_pruning.png)

Permutation can be applied before pruning to avoid excessive pruning.  
Good permutation increases total magnitude. i.e. more information is keeped after pruning.

2:4 pruning with permutation hardly loses accuracy!

## Lottery ticket pruning

Pruning shows that NNs can be reduced in size.  
Instead of reducing trained NN, can we train a sparse NN from scratch?

The Lottery Ticket Hypothesis: A randomly-initialized, dense neural network contains a subnetwork that is initialized such that, when trained in isolation, it can match the test accuracy of the original network after training for at most the same number of iterations.

i.e. There may exist a pruned model (subnetwork) that can match the test accuracy of the original network.

### Iterative Magnitude Pruning

To demonstrate this hypothesis, they trained a dense NN, pruned it, initialized it again, and repeated this process.

At first, researchers reset the weights to the same initial value every time.  
However, this only worked for small-scale tasks and failed for deep networks. (Scaling limitation)  
Instead, researchers reset the weights to the values after a small number of k training iterations. (k = 6)

# More quantization

## Low precision data type

Low precision data type can reduce memory cost (less memory access, smaller matrix size) and computation cost (less energy consumption, less gate count).

GPUs already supports int4 and float8!  
float8 is especially used in mobile devices and servers. (e.g. ChatGPT!)

### 32 bit floating point

Floating point is represented as sign, exponent, and mantissa (or significand).  
32 bit floating point uses 1 sign bit, 8 exponent bits, and 23 mantissa bits.

S, E, M represent $(-1)^S \cdot (1.M) \cdot 2^{E-bias}$, where bias is 127 in 32 bit floating point.  
If E is 0, we use $(-1)^S \cdot (0.M) \cdot 2^{1+E-bias}$, which is called subnormal.  
If E is 255 (all 1), we represent infinities or NaNs.

Actually bias is the center point of the unsigned value of exponent bits! We chose this way to represent both the smallest and largest values.

### 16 bit floating point

float16 uses 1 sign bit, 5 exponent bits, and 10 mantissa bits.  
bfloat16 uses 1 sign bit, 8 exponent bits, and 7 mantissa bits.

Since bfloat16 has the same number of exponent bits as 32 bit floating point, it can represent the same range as 32 bit floating point.  
Also, converting to bfloat16 is really easy! We can just truncate mantissa bits.

### 8 bit floating point

There are multiple representation for 8 bit floating point.

E4M3 uses 1 sign bit, 4 exponent bits, and 3 mantissa bits.  
E5M2 uses 1 sign bit, 5 exponent bits, and 2 mantissa bits.

#### E4M3

- bias of exponent is 7.
- Max normal is $S.1111.110_{(2)} = 448$.
- Min normal is $S.0001.000_{(2)} = 2^{-6}$.
- Max subnormal is $S.0000.111_{(2)} = 0.875 \cdot 2^{-6}$.
- Min subnormal is $S.0000.001_{(2)} = 2^{-9}$.
- $S.1111.111_{(2)}$ represents NaN.
- We can't represent infinities.

Because of the nature of floating point representation, larger value have larger rounding error, and the bin size (difference between representable values) is halved if we lower the exponent.

#### E5M2

- bias of exponent is 15.
- Max normal is $S.11110.11_{(2)} = 57344$.
- Min normal is $S.00001.00_{(2)} = 2^{-14}$.
- Max subnormal is $S.00000.11_{(2)} = 0.75 \cdot 2^{-15}$.
- Min subnormal is $S.00000.01_{(2)} = 2^{-16}$.
- $S.11111.01_{(2)}, S.11111.10_{(2)}, S.11111.11_{(2)}$ represents NaN.
- $S.11111.00_{(2)}$ represents infinities.

### Training FP8 models

We just train FP8 (E5M2) model with the same hyperparameters of FP16 training.

FP8 is widely used due to easy training and no quality loss.  
However, FP16 is still used for some tasks that require higher precision such as semantic segmentation.

## Quantization-Aware Training (QAT)

1. Train a network in full precision. (FP) Note that full precision typically means bfloat16!
1. Quantize FP weights/activations and execute the model.
1. Back-propagate the error (using **quantized** weights/activations and FP gradient) and update the FP weights.

We can train with quantized input/weight/model!!!!  
We use FP weights for back-propagate to not ignore the small weight changes.

Why QAT is important? Quantization is necessary in LLMs.  
But simple quantization can't adjust weights to quantized model.  
QAT can train quantized model, so it can have a better result.

### Fake Quantization

Quantization operation is simulated in PyTorch; quantized model still maintains the data types of weights and activations as full precision.  
Real quantization will be done when deployed on devices.

Let's say S is scale (real range/int range) and Z is int value for real value 0. (usually middle of the int range)  
Then original real value r is quantized to an integer $q = \operatorname{round}(\frac{r}{S}) + Z$.  
But in training, a faked quantized real value $r' = S(q-Z)$ is used instead of the original real value.

Quantized error makes $r$ and $r'$ have a rounding error.

### Straight-Through Estimator (STE)

!(straight_through_estimator.png)

Problem: Derivative of round is either 0 or infinity.  
Solution: When back-propagating, STE approximate round function to identity function. i.e. STE uses 1 as the gradient.

# Advanced quantization

## Mixed Precision Network based on Precision Highway

![Mixed Precision Network](mixed_precision_network.png)

Modern NN has skip connection.  
Skip connection use high precision activation, while original flow use low precision matrix computation.

Why? Quantization operation generates quantization error.  
The error is propagated and accumulated across layers, so DNNs had significant quantization error.  
Skip connection makes a route that doesn't have quantization error, so DNNs can be trained with quantization.

## Clipping (truncating)

Instead of using full range of floating point number, we clip values into certain range.

Truncating large magnitude values (with low frequency) enables us to reduce quantization error.

### PACT (Parameterized Clipping Activation Function)

Train clipping threshold with parameter $\alpha$.  
Why? Each layer have differnet activation range.

Activation function (bounded RELU) $y$ is given as

$$y = 0.5 (|x| - |x-\alpha| + \alpha) = \begin{cases}
0, & x \in (-\infty, 0) \\
x, & x \in [0, \alpha) \\
\alpha, & x \in [\alpha, +\infty)
\end{cases}$$

Assuming we're using $k$ bit integer, quantized activation $y_q$ is given as

$$y_q = \operatorname{round}\left(y \cdot \frac{2^k - 1}{\alpha} \right) \cdot \frac{\alpha}{2^k - 1}$$

Let $L = L_{CE} + \frac{\lambda}{2} \sum |\alpha|^2$, (cross entropy loss with L2 regularization) then we can learn $\alpha$ with back propagation!

$$\frac{\partial L}{\partial \alpha} = \frac{\partial L}{\partial y_q}\frac{\partial y_q}{\partial \alpha} + \lambda|\alpha|,
\frac{\partial y_q}{\partial \alpha} = \frac{\partial y_q}{\partial y}\frac{\partial y}{\partial \alpha} = \begin{cases}
0, & x \in (-\infty, \alpha) \\
1, & x \in [\alpha, +\infty)
\end{cases}$$

Recall) $\frac{\partial y_q}{\partial y} = 1$ because of STE

### LSQ (Learned Step size Quantization)

Why don't we use range as a parameter?  
We'll use step size $s$ as a parameter.

Let $v$ is a original value, $\bar{v}$ is a quantized integer value, $\hat{v}$ is a quantized real value, and $Q_N, Q_P$ is range of quantized integer.

$$\begin{align*}
\bar{v} &= \left\lfloor \operatorname{clip}\left( \frac{v}{s}, -Q_N, Q_P \right) \right\rceil =
\begin{cases}
\operatorname{round}\left(\frac{v}{s}\right) & \text{if } -Q_N < \frac{v}{s} < Q_P\\
-Q_N & \text{if } \frac{v}{s} \leq -Q_N\\
Q_P & \text{if } \frac{v}{s} \geq Q_P
\end{cases} \\
\hat{v} &= \bar{v} \cdot s
\end{align*}$$

$$\begin{align*}
\frac{\partial L}{\partial s} &= \frac{\partial L}{\partial \hat{v}}\frac{\partial \hat{v}}{\partial s} \\
\frac{\partial \hat{v}}{\partial s} &= \frac{\partial \operatorname{round}\left(\frac{v}{s}\right)}{\partial s} \cdot s + \operatorname{round}\left(\frac{v}{s}\right) \cdot \frac{\partial s}{\partial s} \\
&= \frac{\partial \operatorname{round}\left(\frac{v}{s}\right)}{\partial \frac{v}{s}}\frac{\partial \frac{v}{s}}{\partial s} \cdot s + \operatorname{round}\left(\frac{v}{s}\right) \\
&= 1 \cdot -\frac{v}{s^2} \cdot s + \operatorname{round}\left(\frac{v}{s}\right) \\
&= -\frac{v}{s} + \left\lfloor \frac{v}{s} \right\rceil \text{if } -Q_N < \frac{v}{s} < Q_P \\
\therefore \frac{\partial \hat{v}}{\partial s} &= \begin{cases}
-\frac{v}{s} + \left\lfloor \frac{v}{s} \right\rceil & \text{if } -Q_N < \frac{v}{s} < Q_P\\
-Q_N & \text{if } \frac{v}{s} \leq -Q_N\\
Q_P & \text{if } \frac{v}{s} \geq Q_P
\end{cases}
\end{align*}$$

LSQ has a wider window of error backpropagation than PACT. ($-\frac{v}{s} + \left\lfloor \frac{v}{s} \right\rceil$ vs. 0 or 1)  
Thus, LSQ may offer better accuracy than PACT.

## Gradient Instability

![Gradient Instability](gradient_instability.png)

Obviously, optimal weight may not be accurately represented with low precision.  
Quantization moves optimal weight to higher/lower quantized weight.  
This cause gradients flip in subsequent training iterations(oscillations), making training unstable.  
Moreover, weight will converge towards the rounding boundary (i.e. quantized weight) instead of optimal weight because learning rate decreases over time.

### DiffQ

Let $Q(w, B) = \frac{\operatorname{round}\left( w\left( 2^B-1 \right) \right)}{2^B - 1}$, $\Delta = \frac{\text{Max} - \text{Min}}{2^B - 1}$.  
Then quantization $Q$ incurs rounding error $\left[ -\frac{\Delta}{2}, \frac{\Delta}{2} \right]$.

Instead of actual rounding operation, we can mimic quantization by adding quantization error using uniform distribution!

$$\tilde{Q}(x, B) = x + \frac{\Delta}{2} \mathcal{U}[-1,1]$$

For training loss, we use cross entropy loss $L(\cdot)$ and model size $M(b)$ for regulation.  
Typically, each layer use its own number of bits assigned to all the weights of the layer.

$$\begin{align*}
M(b) &= \sum_{i=1}^{\text{\# of layers}} B_w(i) \cdot N_w(i) \\
L &= \min_{w, b} L\left( f_{\tilde{Q}(w, b))} \right) + \lambda M(b)
\end{align*}$$

Smaller $\lambda$ gives higher accuracy and larger model.  
Larger $\lambda$ gives smaller model and lower accuracy.

Training becomes stable, and accuracy gets better with reduced model size!

- Only floating point values are used, no oscillations due to quantization!
- Number of bits B is trainable, so we can learn number of bits for each weight or activation!
- No STE, use exact derivatives and back propagation!

### NIPQ (Noise Injection Pseudo Quantization)

DiffQ + PACT! Train number of bits and the clipping threshold.

We can use this to train 4-8 mixed precision.

1. Select layer-wise bit from {4, 5, 6, 7, 8}.
1. Push each bits to the possible candidates {4, 8} using pseudo-quantization noise.
1. Fix all bits to {4, 8} and train with real quantization.

## Quantization Layer

Goal: $Y=WX+b$ should be done with quantized integer.  
Recall) $r = S(q - Z)$

We use $Z_W=0, Z_b=0, S_b = S_WS_X, q_{bias} = q_b - Z_Xq_W$.

$$\begin{align*}
S_Y\left( q_Y - Z_Y \right) &= S_W\left( q_W - Z_W \right)S_X\left( q_X - Z_X \right) + S_b\left( q_b - Z_b \right) \\
S_Y\left( q_Y - Z_Y \right) &= S_WS_Xq_W\left( q_X - Z_X \right) + S_bq_b \\
q_Y - Z_Y &= \frac{S_WS_X}{S_Y} q_W\left( q_X - Z_X \right) + \frac{S_b}{S_Y} q_b \\
&= \frac{S_WS_X}{S_Y}\left( q_Wq_X - Z_Xq_W + q_b \right) \\
&= \frac{S_WS_X}{S_Y}\left( q_Wq_X + q_{bias} \right) \\
\therefore q_Y &= \frac{S_WS_X}{S_Y}\left( q_Wq_X + q_{bias} \right) + Z_Y
\end{align*}$$

Note that both $q_b$ and $q_{bias}$ are 32 bits.  
When performing $q_Wq_X + q_{bias}$, we scale to 32-bit int, then rescale to N-bit int when multiplying $\frac{S_WS_X}{S_Y}$.

Similiary, we can define quantized convolution layer, where $q_{bias} = q_b - \operatorname{Conv}(q_W, Z_X)$

$$\begin{align*}
Y &= \operatorname{Conv}(W, X) + b \\
q_Y &= \frac{S_WS_X}{S_Y}\left( \operatorname{Conv}(q_W, q_X) + q_{bias} \right) + Z_Y
\end{align*}$$

### VSQ(Vector-Scale Quantization)

For each 64-element input vector, we use additional quantization scale.  
Why? One scale per matrix yields higher quantization noise.  
By using two scale factors, (one per matrix, one per vector) we can reduce quantization noise.

### MX (Microscaling) Format

Instead of using different scale per data, MX share scale for a block of data.  
Each scale have only 8 bits of exponent, without mantissa bit.

# Binary Network

The lowest precision network!

- Binary-Weight network: Only weights are binary, activations are 32-bit floating point values. It does not hurt accuracy while reducing weight size significantly.
- XNOR-Net: Weights and activations are binary. Operation is easier, (XNOR instead of matrix multiplication) but accuracy is reduced.

We interpret binary weight {0, 1} as {-1, +1}.

## Binary Weights

Goal: If $B$ is a binary weight, use weight as a $W = \alpha B$.  
If $I$ is an input, actual computaation is done with $IW = (I \oplus B)\alpha$.  
$\oplus$ is convolution, but we can compute without multiplication because of binary weight.

We have to find $\alpha^*, B^*$ that minimizes $J(B, \alpha) = \lVert W - \alpha B \rVert^2$.  
Since W is fixed, $W^TW = c$ is constant.  
Also, since $B \in \{-1, +1\}$, $B^TB = n$ is constant.

$$\begin{align*}
\therefore J(B, \alpha) &= \alpha^2 B^TB - 2\alpha W^TB + W^TW \\
&= n\alpha^2 - 2W^TB \alpha + c \\
\therefore B^* &= \argmax_B{W^TB} = \operatorname{sign}(W) \\
\therefore \alpha^* &= \frac{W^TB^*}{n} = \frac{W^T\operatorname{sign}(W)}{n} = \frac{\sum \left| W _i \right|}{n} = \frac{1}{n} \lVert W \rVert_1
\end{align*}$$

# Tiling

## Matrix-Vector multiplication accelerator

Each PE can multiply + accumulate. (MAC)

With two PE, (this can be increased) We can multiply 2x2 matrix and 2x1 vector in two cycles.  
With 2n cycles, We can multiply 2x2n matrix and 2nx1 vector.

In actual hardware, We multiply 2nx2 matrix and 2x1 vector to make partial sum 2nx1. (Weight Stationary Mode)  
This is better because we can reuse vector elements, but we need to hold partial sums.

## Software/Hardware Partitioning

MV multiplication is done in NPU, but tiling (looping over matrix) is done in CPU.  
We also need IO between CPU and NPU.

## Memory Hierarchy

Mordern GPU have memory hierarchy: Register - L1 cache/Shared memory - L2 cache

Tensor Core can use two-level tiling to exploit the fastest memory.  
Each input tile pair is first fetched from main memory to shared memory.  
Each thread fetch vectors from shared memory to registers and calculates outer product.

Recall) Tensor core calculates 4x4 matrix in 1 cycle with adder tree.  
With two tensor cores, we can calculate AB + C in 1 cycle.

## Balancing compute capability and memory bandwidth

Recall) Compute time and memory reading time should be same to reduce idle time!

We can use hardware solution (higher DRAM bandwidth, better DRAM utilization with low precision, etc.), but we should use software solution first.

1. Multiply larger matrix
1. Process multiple user inputs (i.e. batch) to make larger input matrix, while using same weight matrix.

# LLM Serving

- Memory capacity: Determines model size in serving
- Memory bandwidth: Determines latency

e.g. Harry Potter series have about 1 million words.  
Llama3 8B model on an A100 GPU takes 1 hour to read Harry Potter series.  
Is this servable??

## Batching in LLM services

We can reuse model parameters with batches to increase throughput.  
Why? Memory is the bottleneck!

- Orca(Continuous batching): fill free slots in batch with new incoming sequences

## KV Cache

Batching can reuse parameters, but key & value are used only once.  
We need KV cache to store key and values, which becomes very large if batch size increases!

Multi-head attention need key and values for each head!  
Instead, we use grouped-query or multi-query attention to reuse key and values between heads, thus reducing KV cache size.

### vLLM (PagedAttention)

Store key and value vectors like pages in OS memory.  
Memory is allocated on demand instead of fixed size array.

This reduces the memory resource required for KV cache, which allow us to adopt larger batch!

## Flash attention

Before preparing output, we need to calculate every attention score of input. This need $O(N^2)$ memory!

Flash attention use tiling idea!  
We compute QK by traditional(?) tiling, then we compute softmax with online method, without storing every score in main memory!

This reduce read/write to memory.

## Speculative Decoding

Batch reuse parameters by generating multiple sequences at once.  
In single sequence generation, we didn't reuse parameters, therefore we used matrix multiplication.

Speculative Decoding reuse parameters in single sequence generation just like batch.

1. Small LLM generates multiple tokens. (Obviously running small LLM multiple times is faster than running large LLM once)
1. Large LLM process and checks generated multiple tokens.
1. This is done in parallel, so we can reuse parameters over each tokens.
1. We accept tokens from small LLM until it matches large LLM, then we discard leftover tokens.

Speculative decoding don't need training, and it is 3x faster.  
It is also proven that this yields same probability distribution with original LLM!

### Self Speculative Decoding

Sometimes, we don't want to use two models.  
Instead, we make large LLM that generates multiple next tokens. (e.g. next 4 tokens)

After the first run, we can use large LLM is batch mode just like speculative decoding.

## LayerSkip

LayerSkip use early exit self-speculative decoding!

Often, output tokens appears in earlier layers.  
We speculate each layer's output and early exit if output token is found.

# Efficient LLM models

## Microsoft Ph-3

Training small model with selected good data improves model quality.

- Filtered code-language dataset (which is a subset of stackoverflow) trained with labels from GPT-4
- Textbook dataset generated by GPT-3.5
- Exercises of textbook dataset generated by GPT-3.5

Microsoft only used these three training data!  

## LongLoRA

Reasoning needs longer input sequence and more token generations because of chain of thought.

LongLoRA consider local attention (only recent ones) and shift it to consider every input token.  
Local attention significantly reduces KV cache, therefore we can use longer sequence.

In practice, we use global attention (use every input sequence) in some heads, and local attention (only recent ones) in some heads.  
e.g. Gemma 3 repeats 1 global attention layer and 5 local attention layer.

## MInference

Microsoft categorized attention patterns into three categories. (A shape head, Vertical-slash head, Block-sparse head)

We train model and categorize attention patterns.  
Then, we use only part of attention considering category.

# LLM without transformers

## RNN vs. Transformer

RNN have statically fixed weights after training.  
However, RNN only use the final state of the network.

Transformer have dynamically determined weights by inputs, so it is good at input-dependent tasks. (e.g. scanning)  
However, transformer need to remember every previous states of the network.

## Retentive Network

RNN of local attention network?  
We don't need global states, only last state is needed!

## Mamba

RNN with input dependent weights.  
Next hidden state is calculated by input/output dependent parameters.

## Jamba

Mix of transformer and Mamba.  
Why? RNN still use only one hidden state.  
By mixing transformers, we can see multiple hidden states!

# PTQ (Post-training quantization)

QAT requires large computation cost and memory.

- Computation cost: forward/backward passes + weight updates
- Memory cost: Large amount of activation and large number of parameters

PTQ quantize weight parameters and activations after training.  
PTQ is a practical choice for LLM due to the compute and memory cost of QAT.  
However, in case of CNN, PTQ is adopted only when we cannot setup QAT. e.g. training datasets are unavailable.

## Motivation

What if we run large language models on iPhone?

All parameters should be read to the main memory before running LLM.
Therefore, parameter reading time (=size/bandwidth) determines the latency of the entire model.

Also, since other apps shares memory capacity and bandwidth, performance of the other apps will be hurt.

We need to reduce memory cost!  
QAT is not enough, PTQ is needed!

# Quantization on data with outliers

As the model size gets larger than 6 billion parameters, outlier features emerge.  
Few channels exhibit extremely large activation values while others have activation values with small magnitude.

Just applying quantization will quantize all small magnitude values to 0, leaving only the outliers.

## LLM.int8()

Seperate computation of normal and outlier data!  
Normal data is quantized. (int8)  
Outlier data is not quantized. (float16)

## SmoothQuant

![SmoothQuant](smooth_quant.png)

Activation has way higher magnitude than weights.  
Solution: Migrate magnitudes of activations into the weights!

First, we scale down the outlier channels, then we scale up the corresponding weights.  
We can have same output without having outliers!

## OPTQ(GPTQ)

After doing quantization we change the remaining weights to mitigate the negative effect of quantization error.  
$w_q$ is a weight parameter in the row, and $\delta_F$ is a weight update on the remaining weights due to the quantization of $w_q$.  
For each row, weight is quantized independently, then remaining weights and inverse hessian is updated.

$$\begin{align*}
w_q &= \argmin_{w_q} \frac{\left( \operatorname{quant}(w_q) - w_q \right)^2}{[H_F^{-1}]_{qq}} \\
\delta_F &= -\frac{w_q - \operatorname{quant}(w_q)}{[H_F^{-1}]_{qq}} \cdot (H_F^{-1})_{:,q} \\
H_{-q}^{-1} &= \left( H^{-1} - \frac{1}{[H^{-1}]_{qq}} H_{:,q}^{-1} H_{q,:}^{-1} \right)_{-q}
\end{align*}$$

## QuaRot

Ultimately, we want to quantize matrix multiplication, not just weights and activation.  
Assume that quantization is linear operation, we can introduce rotation matrix to reduce outliers.  
This paper was published in 2024, but this became the standard method to remove outliers!

$$Y = q(W)q(X) = q(W)R^TRq(X) = q(W)R^Tq(RX)$$

We can use hadamard matrix as a rotation matrix. Hadamard spreads outlier uniformly. e.g. $\left( 1, 0, \ldots, 0 \right) \rightarrow \left( \frac{1}{\sqrt{N}}, \frac{1}{\sqrt{N}}, \ldots, \frac{1}{\sqrt{N}} \right)$

Hadamard matrix can be obatined recursively!  
It is efficient in both software and hardware.

$$\begin{align*}
H_2 &= \begin{bmatrix}
1 & 1 \\
1 & -1
\end{bmatrix} \\
H_{2N} &= H_2 \otimes H_N = \begin{bmatrix}
H_N & H_N \\
H_N & -H_N
\end{bmatrix}
\end{align*}$$

## Pre-multiply rotation

![Pre-multiply rotation matrix in FFN](quarot_pre_multiply.png)

We can pre-multiply rotation matrix Q, H to weights!  
Instead of using input/output directly, we use rotated input and get rotated output.  
But we can quantize weight matrix without considering outliers!

![Pre-multiply rotation matrix in multi-head attention](quarot_pre_multiply_multi_head.png)

However, in multi-head attention, to store KV cache in quantized format, we have to rotate it during runtime. (hadamard before quantize, and after dequantize)  
Online rotation makes runtime overhead!

## QServe

W4A8KV4: Weight, KV cache is 4 bits, activation is 8 bits.

Goal: No online rotation!  
Apply rotation only to up layer in FFN, and QKV projection layer in attention.  
No rotation to out layer in FFN and KV cache!

However, we still have to handle outliers in KV cache.  
QServe use SmoothQuant to remove outliers.  
We scale up query vectors while scaling down KV vectors. (Especially, value vector tends to have more outliers.)

## SpinQuant

We want to train rotation matrix too!  
Rotation matrix should hold $R^TR = I$.  
However, this constraint is too strict due to the floating point error.

We use Cayley SGD to solve this problem!  
$\Delta R(Y)$ is Cayley transform, which transforms skew-symmetric Y into rotation matrix.

$$\begin{align*}
G &= \nabla_R \mathcal{L}_Q(R|W, X) \quad \text{(gradient of quantization error)} \\
\hat{G} &= GR^T - \frac{1}{2}RR^TGR^T \\
Y &= \hat{G} - \hat{G}^T \\
R' &= \Delta R(Y)R = \left( I - \frac{\alpha}{2}Y \right)^{-1} \left( I + \frac{\alpha}{2}Y \right)R
\end{align*}$$

SpinQuant also use four rotation matrix!

- $R_1$ = Global rotation (Applied to everywhere)
- $R_2$ = Value rotation
- $R_3$ = KV rotation
- $R_4$ = Down rotation in FFN

R1, R2, R3, and R4 are important in that order, so Cayley SGD is used for R1.

# Diffusion LLM

Traditional LLM produced only one word at a time.  
Diffusion LLM generates multiple tokens at a time, and it can correct previous output tokens.

Diffusion LLM need less iterations to generate output, so it can have a lower cost than traditional decoder LLM.
