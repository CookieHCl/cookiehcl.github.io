---
title: Message Authentication Codes
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
date: 2025-09-18 14:06:16
tags:
---

# Message Integrity

- Privacy: Eve can't see the message
- Integrity: Eve can't modify the message

Even CPA secure schemes doesn't guarantee integrity.  
In many cases, message integrity is as important as privacy!  
e.g. Online purchase, online banking, e-mail, SMS, ...

- Is the request authentic? (Did the user in question really issue this request?)
- Is the request exactly the same as what was sent by that user? (Was it modified as it was sent across the internet?)

c.f. Error-correction (checking) code techniques do not suffice for the concern.  
They are designed to prevent random bit errors (in fact bit error happens very often), not to prevent a malicious adversaries.

# Message Authentication Code (MAC)

![Message Authentication Code](mac.png)

A MAC scheme $\Pi = (Gen, Sign, Vrfy)$ over $(K, M, T)$ consists of three algorithms such that:

- $Gen$: A key-generation algorithm that outputs a key $k \in K$.
- $Sign_k(m)$: Given a key $k \in K$ and a message $m \in M$, the signing algorithm returns a tag $t \in T$.
- $Vrfy_k(m, t)$: Given a key $k \in K$, a message $m \in M$, and a tag $t \in T$, the verifying algorithm returns 1 or 0 (Accept or Reject)
- $\forall k \leftarrow Gen(\cdot), \forall m \in M, Vrfy_k(m, Sign_k(m)) = 1$

## Canonical Verification

Signing algorithm can be either deterministic, or probablistic!  
Since deterministic signing algorithms are safe, real-world MACs use deterministic algorithms.

Also, if signing algorithm is deterministic, we can use this canonical verification:

$$Vrfy_k(m, t) \iff t = Sign_k(m)$$

Since we don't need another verify algorithm, real-world MACs use canonical verification.  
But we'll use $Vrfy$ notation for convenience.

## Security of MAC

t를 일종의 digital signing이라고 볼 수있다?
adv - m, t를 볼 수 있음
adv의 목표 - fogery: 내가 (m', t')를 보내서 receiver를 속이는게 목표 (+ m'은 한번도 sign된 적이 없어야 함)

CPA 비슷하게 UF-CMA는 (m,t)를 계속 볼 수 있어도 (m', t')를 보낼 수는 없는 scheme (심지어 m'이 주어진 것도 아니고 adv가 선택가능)  
굉장히 강력하다.. m이 "meaningful"할 필요도 없음 (물론 context에 따라 meaningful은 달라지긴 하지만) 암호학자들은 최대한 보수적인 정의를 잡아서 자유롭게 쓸 수 있게 만듦

Q) Verification oracle은 안 줌?
A) 맞을 수도 있는데 Signing oracle이 더 강력함 + canonical verification에선 주든 안 주든 동치

c.f. Replay attack -> 그냥 받은 (m,t)를 다시 보내는 attack  
이건 UF-CMA에서 인정 안하는 공격방식 (adv가 보낸건 새로운 메시지여야함)
하지만 replay attck도 유효한 공격이니 UF-CMA여도 replay attack은 다른 방법으로 막아야한다

## UF-CMA Security Experiment

![UF-CMA Security Experiment](uf_cma.png)

Also called the unforgeability experiment.

- A key $k \leftarrow Gen(1^\lambda)$ is generated.
- The adversary $\mathcal{A}$ is given oracle access to $Sign_k(\cdot)$. In other words, the adversary can obtain tags $t_i \leftarrow Sign_k(m_i)$ on messages $m_i$ of its choice.
- $\mathcal{A}$ outputs $(m,t).
- Let $Q = \{ m_1, \ldots m_q \}$ is the set of all queries that $\mathcal{A}$ submitted to the oracle. The output of the experiment $EXP_{\Pi}(\mathcal{A})$ is defined to be 1 if and only if $Vrfy_k(m, t) = 1$ and $m \notin Q$.

### Strong UF-CMA Security Experiment

반드시 새로운 메시지에 대한 tag를 써야 헀었음
But scheme이 이상해서 message가 같은데 valid한 tag가 여러 개일수도 있음

-> Strong은 m이 겹치지 않아야 한다는 조건을 (m, t)가 겹치지 않아야 한다는 조건으로 바꿈  
즉 adv가 기존 m에 대해서 새로운 t'를 만들어도 성공

근데 이게 쓸모가 있음?  
사실 MAC 입장에선 1도 의미없음 (m이 그대로면 t가 뭐든 뭔 상관..?) + canonical verification을 쓴다 -> t는 1개밖에 없음 -> 어차피 strong도 equivalent  
근데 특정 경우에 다른 primitive를 만들 때 Strong MAC이 필요할 때가 있다

# Constructing Secure MACs

## Fixed-length MACs from PRFs

증명 요약: 사실 이건 어떤 m에 대해 t를 떄려맞추는거랑 비슷함  
근데 PRF가 secure -> 그냥 랜덤 function이랑 동치 -> t = f(m)은 그냥 랜덤 string이랑 동치 -> adv는 랜덤 string을 떄려맞춰야함; -> 2^-l 확률

Recall) block ciphers are PRPs!  
AES-128을 그대로 쓰면 16-byte message의 MAC이 됨  
문제점 이걸 어떻게 늘림? ~~AES-1048576~~

## Domain Extension

첫번째꺼
m = (m_1, m_2)에 대해 t = (t_1, t_2)를 받았으면
m*= (m_2, m_1) t* = (t_2, t_1)으로 뚫림
Not secure!

두번째꺼
m = (m_1, m_2, m_3), m* = (m_1, m_2)으로 뚫림

세번째꺼
메시지 자르지 말라고
block 개수 d를 추가함

이번엔 query 한번으로는 안 되고 두번이나 해야함 ㅠㅠ

m = (m_1, m_2), m' = (m_1', m_2')라고 하면
m*= (m_1, m_2'), t* = (t_1, t_2')로 뚫림  
이런걸 mix and match attack 이라고 함 (M&M's)

여담) 성능상 문제도 있음
encryption은 ciphertext가 더 커야하지만  
integrity는 굳이 그럴 필요가 없음 (오히려 message보다 짧아도 됨)  
그래서 message 길이에 따라 애초에 t가 linear하게 늘어나는게 이상한거

요약) Mode of 머시기 했던것처럼 해야한다..

## CBC-MAC

고정된 d에 대해서 secure -> block 개수가 고정 -> message length가 고정

여담) 암호학적인 문제는 아니고 구조적인 문제인데 그냥 비슷하게 생겼다고 함수명을 CBC-MAC, CBC-mode encryption이 아니라 CBC-function이라고 해놓는 라이브러리들이 있는데 굉장히 헷갈리니 안 좋다  
심지어 비슷해보여도 정확하게 구현하지 않으면 insecure (e.g. CBC-MAC은 IV를 주면 insecure)

### Arbitrary-length messages

고정된 length에만 써야한다  
만약 무시하고 같은 알고리즘을 4n에도 쓰고 7n에도 쓰면 attack이 있음  
뭔 attack이라고 했냐 length extension attack??

arbitrary message 어떻게 지원함?

length-prepending: message length를 맨 앞에 붙이면 됨 (근데 뒤에 붙이면 insecure)

Encrypt-last-block key를 두개 뽑아서 마지막에 다른 키로 한 번 더 하면 secure  
이걸 기본 template으로 쓰는데 더 최적화시켜서 (key를 하나만 뽑아도 되는) CMAC을 대신 씀

사실 제일 많이 쓰이는건 Hash-MAC  
But secure hash function을 써야함

다른거로는 GMAC도 많이 씀  
mode of 머시기에서 Galois Counter Mode (GCM)을 씀
특히 authenticaty encryption?에서 AES-GCM을 쓰는데  
GMAC은 AES-GCM 쓰면 사실상 공짜로 사용가능  
TLS, IPsec 등에도 쓰임

Poly1305
One-time MAC (한 key로는 한 message만 MAC 생성 가능)  
정말 빠르기 때문에 one-time MAC이 필요할 때 사용 (e.g. key exchange할 때는 한번만 쓰고 이후에는 안 써도 됨)

Parallelizable MAC (PMAC)
사진에 있는게 PMAC임
key도 하나고 fully parallelizable인데?  
그냥 message를 따로 하고 xor하면 블럭 순서만 바꿔도 뚫리니까 상수를 추가하는 식의 변형을 가함
계산실수(?)를 하거나 message 일부만 바뀌었을 때는 일부만 계산해도 됨!! (incremental)  
정말정말정말 좋지만 이미 다른 MAC들이 standard를 먹어버려서 아무도 안 씀
~~그래서 개발자가 라이센스도 풀고 free로 돌렸는데도 아무도 안 쓴다고 징징거림~~
~~대신 매뉴얼이 굉장히 잘 되어있음~~

Counter mode (지난 강의 참고?) 같은 식으로 만들면 보통 insecure함  
Counter mode의 장점을 살리면서 secure한 MAC을 만들려면 어떻게 해야할까?? -> 그게 바로 PMAC임 피맥단에 합류해라
