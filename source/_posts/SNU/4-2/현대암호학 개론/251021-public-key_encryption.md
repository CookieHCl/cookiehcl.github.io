---
title: Public-key Encryption
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
date: 2025-10-21 14:06:27
tags:
---

Asymmetric -> 암호화 복호화가 다름

PK를 준거 자체가 Enc 오라클을 준거 상위호환이라 실험에서 오라클이 빠짐

문제점(?) public key encryption에선 PK로 암호화하니까 unforgability가 불가능 -> 그냥 CCA를 씀

RSA -> 킹론상 좋은데 별로임
gcd를 사용해서 RSA 뚫은 경우도 존재...  
구현도 별로  

+ prime factorization은 별로인게  
Worst-case hardness보단 Average-case hardness가 중요한데  
아직 prime factorizatino은 worst/best case 연구가 안 되어있음 (e.g. N1 = p1q1이 오래 걸리냐 N2 = p2q2가 오래 걸리냐)  
e.g. discrete logarithm은 항상 같은 시간이 걸림 e.g. average case adv.가 존재하면 worst case adv.가 존재한다는 lemma 같은거 증명가능
