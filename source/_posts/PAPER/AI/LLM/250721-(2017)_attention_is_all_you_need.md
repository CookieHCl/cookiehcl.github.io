---
title: (2017) Attention Is All You Need
categories:
  - PAPER
  - AI
  - LLM
abbrlink: 98
date: 2025-07-21 23:01:56
tags:
---

# Introduction

<https://arxiv.org/abs/1706.03762>

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention is all you need. *Advances in neural information processing systems*, 30.

일명 Transformer 논문. LLM 시대를 열 수 있게 만들어준 기념비적인 논문이다.

# Background

Transformer 이전에는 RNN + Attention 또는 CNN + Attention으로 텍스트를 처리했다.  
하지만 RNN, CNN은 구조적인 문제가 있었고, Transformer는 최초로 Attention만 사용한 모델을 만들기로 한다.

- RNN: 선형 구조라 병렬화가 불가능하다.
- CNN: 먼 거리의 토큰 연관성을 계산하려면 레이어 $O(d)$개가 (구현에 따라서는 $O(\log d)$개가) 필요하다. (effective receptive field 문제)

# Architecture

![Transformer model architecture](architecture.png)

사실 Transformer는 기존 방식을(RNN or CNN) 많이 참조하였다.

- Encoder는 input sequence $(x_1, \ldots, x_n)$을 representations $(z_1, \ldots, z_n)$으로 바꾼다.
- Decoder는 representations $(z_1, \ldots, z_n)$을 output sequence $(y_1, \ldots, y_m)$으로 바꾼다.
- Output token $y_k$가 나올 때마다 이전 토큰들 $(y_1, \ldots, y_{k-1})$을 input으로 사용한다. (Auto-regressive)
- Encoder, Decoder 모두 residual connection을 사용한다. (이 때문에 모든 layer의 dimension은 똑같다.)

# Attention

## Scaled Dot-Product attention

Transformer에서는 scaled dot-product attention을 사용한다.  
Transformer가 정립시키고 난 이후부턴 이 attention만 사용되는 것 같다.

$$\operatorname{Attention}(Q,K,V) = \operatorname{softmax}\left( \frac{QK^T}{\sqrt{d_k}} \right)V$$

먼저 당시 사용되던 attention에는 additive attention과 dot-product(multiplicative) attention이 있었는데, 시간복잡도는 동일하지만 dot-product attention은 행렬 곱으로 구현할 수 있기 때문에 실제 연산 속도는 훨씬 빠르다.

여기에 추가로 Transformer는 $\frac{1}{\sqrt{d_k}}$로 scaling을 한다.  
당시 차원이 클 경우 additive attention이 dot-product attention보다 성능이 좋다는 결과가 있었는데, 이 논문에선 곱셈으로 인한 magnitude 문제라고 판단하고 scaling으로 보정해준다.

## Multi-Head Attention

![Multi-Head Attention](multi_head_attetnion.png)

Transformer는 1개의 Attention을 사용하는 대신 각 Q, K, V를 h개로 쪼개 h개의 Attention을 구한 뒤, h개의 Attenntion의 linear transformation을 attention 값으로 사용한다.

여러 개의 head를 사용하면 각 head가 문장의 서로 다른 구조를 학습할 것으로 기대했다고 한다.

## Applications

Transformer는 (각 layer마다) 총 3종류의 attention이 사용된다.

- Encoder self-attention: QKV가 전부 Encoder에서 오므로, 각 position이 이전 layer의 모든 position을 볼 수 있다.
- Decoder self-attention: QKV가 전부 Decoder에서 온다. 하지만 자기 이후에 나오는 토큰들을 보면 안 되므로 softmax 이전에 masking을 하여 보면 안 되는 토큰들의 attention을 $-\infty$로 만든다. (softmax 이후에는 0이 된다.)
- Encoder-decoder attention: Q는 Decoder, KV는 Encoder에서 온다. Decoder의 각 position이 encoder의 모든 position을 (즉, 모든 input sequence를) 볼 수 있다.

의외로 encoder-decoder attention은 Transformer에서 처음 고안한게 아니라 seq2seq 모델에서 사용되던 기법이라고 한다.

## Why Attention?

Transformer를 만들 때 computational complexity, parallelizability, maximum path length를 고려해서 self-attention을 사용했다고 한다.

먼저 RNN의 computational complexity는 $O(nd^2)$으로, Attention의 computational complexity $O(n^2d)$보다 빠르지만, (논문을 쓸 당시에는 $n < d$라서 Attention이 더 빠르다고 하긴 했다) parallelize가 안 되고, maximum path length가 $O(n)$이다. 반면에 Attention의 maximum path length는 $O(1)$이다. (즉, 연산 1번으로 long-range dependency를 학습할 수 있음)

또한 CNN의 computational complexity는 $O(knd^2)$고, maximum path length는 $O(\frac{n}{k})$라 Attention의 하위호환이다. Separable convolution의 computational complexity는 $O(knd + nd^2)$이고, dilated convolution의 maximum path legnth는 $O(\log_k(n))$이지만 그래도 Attention이 더 좋거나 똑같다.

그리고 Attention 모델은 해석하기가 더 쉬운데, attention weight를 보고 각 head가 어떤 단어들이 연관 있다고 생각했는지 파악할 수 있기 때문이다.  
실제로 이를 통해 transformer의 각 head가 서로 다른 문법적/의미적 구조를 파악했다는 것을 알 수 있었다.

마지막으로, 논문에서 후속연구로 Attention의 computational complexity를 줄이기 위해 주변 r개의 토큰들만 참조해 시간복잡도를 $O(rnd)$로 줄이는 방법을 설명한다. 하지만 maximum path length가 $O(\frac{n}{r})$로 늘어나게 된다는 문제가 있고, 일단 Transformer 논문에서는 단순 아이디어 단계에서 그친 것 같다.

# Embeddings

## Word Embedding

Transformer는 learned embeddings을 사용했고, embedding layer와 pre-softmax linear transformation에서 같은 weight matrix를 사용하여 input, output의 embedding의 일관성을 챙겼다.

또한, embedding layer에서 weight에 $\sqrt{d_{model}}$을 곱해주는데, 아쉽게도 논문에 명확한 이유는 나오지 않는다.  
Embedding vector과 positional encoding를 더하는 과정이 있는데, 두 벡터의 scale을 맞추기 위해서 $\sqrt{d_{model}}$을 곱하는 것으로 추측된다.

## Positional Encoding

Attention은 position에 대한 정보가 없기 때문에, Transformer는 따로 positional encoding을 더하는 방식으로 position에 대한 정보를 추가했다.

$$\begin{align*}
PE_{(pos, 2i)} &= \sin\left( \frac{pos}{10000^{\frac{2i}{d_{model}}}} \right) \\
PE_{(pos, 2i+1)} &= \cos\left( \frac{pos}{10000^{\frac{2i}{d_{model}}}} \right)
\end{align*}$$

Transformer는 positional encoding으로 sinusoid를 사용했는데, $PE_{pos+k}$를 $PE_{pos}$의 linear function으로 나타낼 수 있기 때문에 relative position을 잘 학습할 것으로 생각했다고 한다.

이 당시에도 positional encoding을 학습시킬 수 있었지만, Transformer 모델은 sinusoid와 learned positional encoding의 결과가 큰 차이가 없었다고 한다.

# Training

영어와 프랑스어/독일어 데이터셋을 사용하였고, byte-pair encoding을 사용했다. (자주 등장하는 토큰 쌍을 묶어서 새로운 토큰으로 취급함)

훈련은 Adam optimizer를 사용하였고, learning rate는 warmup_steps 까지는 step 수에 선형으로 비례하고, 그 이후에는 $\frac{1}{\sqrt{steps}}$에 비례해 점점 감소하게 된다.  
또한, 모델 크기가 크면 learning rate를 줄여 더 오랫동안 학습한다.

$$lrate = d_{model}^{-0.5} \min(steps^{-0.5}, steps \cdot warmup\_steps^{-1.5})$$

Regularization을 위해 각 레이어마다 dropout을 넣고, label smoothing을 했다.  
Label smoothing을 하면 perplexity는 안 좋아지지만, (확률 분포가 얼마나 맞는지 나타내는 지표), accuracy는 좋아진다. (예측한 가장 확률이 높은 토큰이 정답인 비율)

# Results

결과는 다들 알다시피 Attention만으로 기존 RNN, CNN 모델들의 번역 성능을 뛰어넘었다.

논문에선 추가로 Transformer 파라미터를 조정했을 때 결과도 포함되어 있다.

- 그냥 attention보단 multi-head attention이 더 성능이 좋았지만, head 개수를 너무 늘리면 오히려 성능이 떨어졌다.
- layer 수, 각 벡터의 차원 등 모델 크기를 늘리면 성능이 더 좋아졌다.
- dropout은 있는게 더 성능이 좋다.
- label smoothing은 perplexity가 안 좋아지지만, accuracy가 좋아져 결과적으로 성능이 더 좋다. (유일하게 perplexity, accuracy가 모두 좋아지진 않는 변화다.)
- learned positional encoding으로 대체했을 때 성능 변화는 거의 없었다.

# Conclusion

Transformer는 RNN, CNN을 사용할 필요 없이 Attention만 사용하면 더 학습도 빠르고 결과도 좋다는 것을 증명해낸 논문이다.  
이 논문 이후로 LLM은 모두 Transformer를 기반으로 하게 되었다.

하지만 논문에서 잠깐 언급하고 지나갔던 Attention의 단점이 점점 부각되게 되었는데, Transformer 시절에는 짧았던 input sequence 길이가, LLM 시대부턴 너무 길어지면서 Attention의 computational complexity $O(n^2)$이 문제가 되기 시작했다.  
이 문제는 현재진행형으로, 하드웨어 최적화나 효율적인 Attention 구조 등 다양한 방법으로 해결하려고 노력 중이다.
