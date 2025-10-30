---
title: Number Theory
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
date: 2025-09-30 14:32:52
tags:
---

Euclidean division -> gcd(a,b) = gcd(b,r)임을 보일 수 있음  
bit 수에 linear한 euclidean division으로 gcd를 구할 수 있다? << 이거 확인좀

Z_p*는 1~p-1까지의 모든 원소
group 배운 이유: $G = <Z_p^*, \cdot>$은 제자리로 돌아옴!!! (닫혀있음)  
1도 identity고 inverse도 존재하고 그냥 곱하기는 좋은 group임

Subgroup 예시: G = <Z, +>, H = <2Z, +>
cyclic subgroup: 정의된 연산이 x면 1, g, gxg, gxgxg, ... 의 집합으로 정의  
유한하니까 무조건 $g^m = g^n$인 $n < m$ 존재 -> $<g> = {1, g, \ldots, g^{m-1}}$인 m이 있음

Fermat's little theorem -> 사실 증명 빡셈  
근데 그냥 cor 쓰면 바로 증명됨

Discrete logarithm
ex) <Z_n, +>에서 $\log_1h = h$  
Generic algorithms (일반적인경우) >> 이걸 왜 배움? 하한선이라고 생각하셈

Pohlig-Hellman Algorithm 아이디어:
CRT: n = q_1q_2면 q_1의 나머지, q_2의 나머지 pair랑 n으로 나눈 나머지 하나랑 같은 정보임

Proof sketch?
Let |H| = q^e, H = <g>
CRT에서 x = x_0 + qx_1 + ... + q^{e-1}x_{e-1}

h = g^{x_0 + qx_1 + ... + q^{e-1}x_{e_1}}
그럼 h^{q^{e-1}} = g^{q^{e-1}x_0}  
DLP를 K = <g^{q^{e-1}}>에서 푸는거랑 동일  
여담 H >= K
이후 어쩌구 저쩌구

> 앞으로 group size는 무조건 소수

Baby-Step Giant-Step algorithm: root q로 나눈 몫/나머지를 만든 다음 리스트에서 확인 가능
g^x = h -> g^{it+j} = h -> g^{it} = g^{-j}h  
g^{it}의 리스트를 만든 다음 g^{-j}h 가 리스트 안에 있는지 확인만 하면 됨 (사실 O(root q log root q))인데 귀찮아서 무시한거)

general group에선 root q가 최선의 시간복잡도라고 함 -> 즉 BSGS랑 Pohlig-Hellman은 이론치 달성
But 특정 경우는 더 빠른 알고리즘이 존재 e.g. Z_p^*도 빠른 알고리즘이 존재하는데 complexity가 개판...? 정말 복잡한 알고리즘이라 실사용 빡셈  
대충 L_p[alpha] = exp((log p)^alpha (log log p)(1-alpha)  
근데 alpha=0이면 poly, alpha=1이면 exp, alpha=0~1이면 superpoly (poly보단 빠른데 exp보단 덜 빠르다), 약 1/3정도 exp???  
하지만 2^795 수준의 큰 소수도 이거 써서 뚤었다고 한다  
그래서 요즘 p를 2000비트 정도로 잡음... (2^2000임!)

Elliptic curve에서 P + Q를 직선 PQ와 만나는 점의 대칭으로 잡으면 결합법칙 같은게 성립함.....
물론 암호학에선 cont일수 없으니까 3차식 mod 89 같은 식으로 씀 -> 격자 안에 있는 점으로 표시됨 -> 이래도 P+Q 정의 가능, group도 가능!  
이걸 DLP에 쓸 수 있음......
