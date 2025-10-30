---
title: Hash Functions and Applications
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
date: 2025-09-25 14:15:40
tags:
---

해쉬는 정말 많이 씀

collision resistance

- classic use (자료구조 등에서 사용할 때) -> collision이 최대한 안 일어나야 함
- cryptographic use -> "adversary가 collision을 일으키려고 해도" collision이 최대한 안 일어나야 함

e.g. x mod p는 cryptography 관점에서 꽝

여담) primitive는 지향하는 바가 있다  
e.g. prg는 진짜 random number를 지향함  
hash function의 지향점은? random function을 지향함

cryptographic하게 hash function은 keyed function임  
왜? family of function을 지향함 (구조상 collision이 생길수밖에 없으니까)  
"이 시스템에서는 이 hash function을 사용하겠다" 약속하는 용도 -> 그냥 key를 공개해도 됨(random function과 똑같다고 보면 됨)  
하지만 그냥 key 없는 일반 해시를 쓰는 경우가 대다수임

application)

암호의 hash를 저장할 떄 해시 function은 salt를 쳐야함  
e.g. dictionary attack: 잘 알려진 password들을 hash function 돌린 뒤 찾아보기(?)  
물론 salt는 유저마다 다른게 좋음

Hash function이 collision resistent하다 -> 이거 사실 assumption임
왜? Block cipher가 어쩌구 -> Compression function이 어쩌구 -> Hash function이 어쩌구
암호학의 문제: 이건 안전함!!! 이라는게 나오질 않음......

오히려 gray area를 이요한다? 안전하다는 증명은 없지만 알려진 공격도 없는 cryptosystem을 사용  
Middle ground: 현실적인 모델을 가져와서 좀 더 그럴듯(?)한걸 가져옴

random oracle: 모든 사람이 같은 random function을 쿼리해서 값을 받을 수 있음

- random function이니까 H(h1)을 쿼리했으면 H(h1)은 아는 값이 됨
- 하지만 한번도 쿼리한 적 없는 H(h2)는 uniformly random값임 (쿼리하기 전까진 모름)

아니 근데 hash function은 random oracle이 아니잖아요  
사실 절대 같을수가 없음 hash function -> 유한함, random oracle -> 무한함  
???: 아 그럼 니가 구별해보던가 ㅋㅋ 현실적으로는 hash function고 random oracle은 구분 불가능할거다 (아마도...)

1. random oracle을 사용한 어떤 scheme $\Pi$가 안전하다는 것을 증명
1. random oracle을 hash function으로 대체한 $\Pi'$가 안전하다고 기도하기...

물론 random oracle 상에서 안전한데 임의의 hash function으로 대체하면 무조건 안전하지 않은 scheme도 존재함 (이게 완벽한 답이 아니라고 알려주기 위해 억지로 만든 scheme에 가까움)  
But 대부분은 안전할거 같은디.... -> 그냥 쓰는중

아니 hash function이랑 random oracle이랑 완전 다른건데 이게 맞냐  
그리고 사실 random oracle은 정말 강력한 oracle이기 때문에 random oracle 상에서 안전하다는 증명은 생각보다 쉽다?
