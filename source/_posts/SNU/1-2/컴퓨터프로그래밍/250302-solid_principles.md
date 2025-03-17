---
title: SOLID principles
abbrlink: 30
categories:
  - SNU
  - 1-2
  - 컴퓨터프로그래밍
date: 2025-03-02 00:13:07
tags:
---

# SOLID principles

SOLID is a OOP design principles proposed by Robert C. Martin in his paper [Design Principles and Design Patterns. (2000)](https://labs.cs.upt.ro/labs/ip2/html/lectures/2/res/Martin-PrinciplesAndPatterns.PDF)

## Single responsibility principle (SRP)

A class should handle one and only one job.  
i.e. a class should have one and only one reason to change.

## Open-Closed principle (OCP)

Objects or entities should be open for extension, but closed for modification.

## Liskov substitution principle (LSP)

Every subclass should be substitutable for their superclass.  
Formally, if $q(x)$ is a property provable about objects of $x$ of type $T$, then $q(y)$ should be provable for objects $y$ of type $S$ where $S$ is a subtype of $T$.

## Interface segregation principle (ISP)

Clients shouldn't be forced to depend on methods they do not use.  
i.e. clients should never be forced to implement an interface that it doesn't use.

## Dependency inversion principle (DIP)

Entities must depend on abstractions (e.g. interface) not on concretions (e.g. class).

# How do I do this???

Solution: split your code! (into interfaces or classes)
