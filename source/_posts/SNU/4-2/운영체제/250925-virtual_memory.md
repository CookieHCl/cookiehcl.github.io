---
title: Virtual Memory
categories:
  - SNU
  - 4-2
  - 운영체제
date: 2025-09-25 12:31:01
tags:
---

internal fragmentation - 할당 최소 단위 때문에 생기는 fragmentation (1비트 할당하려고 해도 4KB 할당)
external fragmentation - 가변 크기 할당 해제 반복하면 할당한 메모리들 사이사이가 문제

Virtual memory

-> 한 process당 2^64 메모리 제공!!!!  
은 비현실적으고 현실적으로는 2^48  
요즘 좋은 컴퓨터는 2^57까지??

====

Variable Partitions: 각 프로세스가 다르게 메모리를 쓰면 메모리를 다르게 할당하자  
stack, heap 같은 영역을 따로 만들기 + 위로 자랄지 아래로 자랄지 정하기

주소는 이제 2개의 component로 결정됨: segment + offset
각 segment의 시작, 끝(limit), 방향, valid bit 저장하기

cf) 인텔 CPU는 틀이라 아직도 segment용 register 존재 (ex: CS는 code segment DS는 data segment)  
요즘은 필요없음

Q. segmentation하면 디스크를 메모리로 쓰는 swapping 가능함??
