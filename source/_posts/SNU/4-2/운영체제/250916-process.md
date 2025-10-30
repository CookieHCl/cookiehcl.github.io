---
title: Process
categories:
  - SNU
  - 4-2
  - 운영체제
date: 2025-09-16 12:45:49
tags:
---

- Processor (core, CPU, hart (used in RISC-V))
 A file of a program in execution

OS가 하는 일: PC설정 및 entry point 초기화 (main은 entry가 아님 start라는게 있음)

초창기 웹서버 -> 유저 올때마다 웹서버 fork, (파일 디스크립터도 같이 사용
요즘 웹서버 -> 한 작업을 여러 process가 나눠서 실행 (1 프로세스 1 유저가 아님)
그래서 fork와 exec 나뉘어져있음
유닉스 -> 60년대
윈도우 -> 80년대
THread는 이 사이에 만들어져서 유닉스에는 Thread 개념이 없었음  
그래서 이런건 사실 process가 아니라 thread가 어울림 -> 윈도우는 fork exec 안 나눔

zombie process -> process terminated but not removed (parent가 자식 process 왜 죽었는지 알려고 놔둠) 부모가 먼저 죽으면 (orphan process) -> 고아원 원장님 (init process)이 부모해줌
