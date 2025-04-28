---
title: Large Language Model
categories:
  - SNU
  - 4-1
  - 하드웨어시스템설계
date: 2025-04-01 09:23:15
tags:
---

# Word Embedding

Embedding is a mapping between anything and a vector.

Each word is represented as a vector.  
Similarity between words can be measured in the vector space called embedding space.

## Word2Vec

Given a center word (with one-hot coding input), Word2Vec predicts context words (words before and after center word).  
Because we are using one-hot vector, a column of weight becomes the hidden layer - called word vector.

## Any2Vec?

Using same idea, anything can be represented as a vector.  
e.g. product vector, hotel vector, youtube vector (in recommender system)

# Recurrent Neural Networks (RNN)

- Each input word change hidden state.
- The input sequence and output sequence can be any length. (one to one, one to many, many to one, many to many)

## Neural Machine Translation (NMT)

Input sequence are fully feeded without any output. (Encoder RNN)  
START token indicates start of translation. Decoder RNN outputs each word and use it as the next input.

## Alignment problem

Input sequence and output sequence don't always match one-by-one.  
Alignment can be many-to-one.

## Bottleneck problem

RNN only has 1 encoding for the source sentence.  
Can it capture all the infromation from thousands of words before?

# Transformer

## Attention

Instead of single hidden state, every hidden states of encoder RNN are used!  
In decoder RNN, each hidden state determines attention scores.  
With attention scores and encoder RNN's hidden state, attention vector is obtained and concatenated with decoder hidden state.

## Terms of transformer

- Query: Decoder's intermediate output (hidden state)
- Key: Used to calculate attention scores
- Value: Encoder's hidden state

$$\text{Attention}(Q,K,V) = \text{softmax}\left( \frac{QK^T}{\sqrt{d_k}} \right) V$$

## BERT (Bi-directional Encoder Representation from Transformers)

Input can affect hidden state from the past!  
Use whole sentence to produce output.

If the BERT model is sufficiently pre-trained, the larger BERT models give better accuracy without overfitting.

Usually transformer's input is token embedding vector + position embedding vector.

Pre-trained BERT model can used in different tasks:

- Sentence pair classification (2 input sentences, 1 output class)
- Single sentence classification (1 input sentence, 1 output class)
- Question answering (2 input sentences (question, paragraph), 1 output sentence)
- Single sentence tagging (1 input sentence, 1 output sentence)

### Multi-Head Attention

For each head, we use different dimensions.  
It's similar to the ensemble model - use different attention patterns to learn multiple relationships.

### Masked language model (MLM)

BERT is pre-trained with BooksCorpus and Wikipedia.  
Random tokens were masked and BERT had to predict a masked word in a given sentence.

- This can make BERT learn context naturally!
- We don't have to label datas or create input-output pairs, dataset itself is a training data!

## ChatGPT (GPT-3)

0. Pre-train GPT.  
    Masked language model and 570GB of datasets were used.
1. Supervised learning with good examples.  
    Examples of input and output are prepared by human labelers or existing sets of text.
2. Reward model training  
    Human labeler gives a rating to the output of GPT-3.  
    OpenAI trained reward model which predicts the rating on the given input.
3. Reinforcement Learning
    - ChatGPT generates output.
    - Reward model evaluates the output.
    - Fine-tune the GPT-3 based on the reward.

ChatGPT is still RNN based - it only generate one word at a time!

# Training Transformer

![Multi-Head Attention Transformer](multi_head_attention_transformer.png)

## Model size of Multi-Head Attention Transformer

Input matrix: L x H (L words of vector embedding size H)  
Head size, dimension: h, d (i.e. H = h x d)

For each head, Q, K, V is calculated from weight matrix H x d.  
Each head (L x d) is concated to L x H matrix, then output is calculated from weight matrix H x H. (i.e. weight size is $H^2$)  
Therefore, total model size of MH attention is $h \cdot 3 \cdot Hd + H^2= 4H^2$.

Finally, feed-forward network (FFN) is used at output, from H to 4H and back to H.  
Each step's weight is $H \cdot 4H = 4H^2$, so total weight size is $8H^2$.

Therefore, model size per layer is $12H^2$, and parameter ratio for MH attention and FFN is 1:2.

## Computation cost of Multi-Head Attention Transformer

Assume matrix multiplication of N x K and K x M is NKM.

For each head, Q, K, V is caclculated for each word: multiplication of L x H and H x d ($LHd$)  
For each head, $QK^T$ is calculated: multiplication of L x d and d x L ($L^2d$)  
For each head, $QK^T \cdot V$ is calculated (assume softmax is calculated): multiplication of L x L and L x d ($L^2d$)

Each head is concated to L x H matrix, then output is calculated: multiplication of L x H and H x H ($LH^2$)  
Therefore, total multiplications of MH attention is $h(3LHd + L^2d + L^2d) + LH^2 = 4LH^2 + 2L^2H$.

Finally, feed-forward network (FFN) is used at output, from H to 4H and back to H.  
Multiplication of L x H and H x 4H ($4LH^2$), and L x 4H and 4H x H ($4LH^2$)  
Therefore, total multiplications of FFN is $8LH^2$.

Therefore, multiplications per layer is $2L^2H + 12LH^2$.  
If we assume $L = H$, total multiplications per layer is $14L^3$, and parameter ratio for MH attention and FFN is 6:8.

## Trillion Parameter Models

Transformers now have more than trillion parameters.

e.g. BERT has N=298 transformer layers, and H=17480 hidden dimension, resulting in total $N \cdot 12H^2 \approx 1.08 \times 10^{12}$ parameters.  
If we assume sequence length (number of tokens in a sentence) is L=2048, and batch size is B=2048, per-layer activation size in training is $H \cdot L \cdot B = 7.3 \times 10^{10}$.

Obviously, GPU memory is not enough to hold 1T parameters.  
Optimizer like adam requires two more parameter for each weight, so we need more than 10 times memory.  
We need to use thousands GPUs to train parameters!

## Parallelism

![Parallelism](parallelism.png)

- Data Parallelism (DP): Each GPU has a entire model, and data is distirbuted among GPUs. Weight should be synchronized!
- Model Parallelism (MP): Each layer is divided to multiple GPUs. Activation should be transfered among GPUs!
- Pipeline Parallelism (PP): Weight, activation is too big for GPU to handle. We divide each stage to multiple GPUs.

![3D Parallelism](3d_parallelism.png)

DP, MP, PP can be used together to train model across multiple GPUs.  
e.g. Model with 2TB parameters, 256 layers can be trained with 4096 GPUs using 8-way MP, 64-way PP, and 8-way DP.

### All Reduce vs. All Gather

- All Reduce (in DP): Accumulate weight updates across different mini-batches to obtain global weight updates. Computation is used.
- All gather (in MP): Copying a set of weights or activations to other nodes. Only collect without computation.

### ZeRO-DP (Zero Redundancy Optimizer)

Model size is too large, we divide parameters into N GPUs!

Instead of holding every parameter in each GPUs, each GPU hold portion of parameters.  
When we need to compute, use all gather to get all parameters, compute, then hold portion of parameters.

Unlike DP, we don't have to hold every parameters!  
Unlike MP, we use all gather on parameters instead of activation!

### ZeRO-Offload

We need large memory because optimizer like adam need states.

Solution: Store optimizer states in CPU memory for entire training!  
CPU runs Adam code to update weight.

With ZeRO-Offload, we can even train large model in single GPU, and model can be scaled very easily.  
However, we now have a bottleneck in CPU-GPU bandwidth (ultimately bottleneck in CPU memory).  
Big companies use DRAM per GPU, so we can achieve higher bandwidth and larger memory.

# Test-time Scaling

ChatGPT o1 use self refinement with chain of thought: every input, reasoning, output from previous turn is used as next turn's input.  
Log of compute cost is proportional to accuracy.

AlphaGo and Poker AI was able to achieve better performance with searching (i.e. thinking) for 30 seconds before answering.  
In natural language, chain-of-thought prompting is used. Instead of just giving input and output, giving input, output with reasoning can get better output.

Large models on difficult problems can benefit the most.  
The more time it takes to search, the better the answer will be.

## DeepSeek-R1 Training

- Phase 1: Cold Start (Same supervised learning)
- Phase 2: Reasoning (Learn how to search, by giving longer time to answer)
- Phase 3: Rejection Sampling SFT (Self training with good results)
- Phase 4: Diverse RL (Check helpfulness and harmfulness)

Even when DeepSeek-R1 was not instructed to use chain of thought, it was able to learn chain of thought on its own!  
More steps and longer output resulted in better answer.
