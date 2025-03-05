---
title: Combinational logic
categories:
  - SNU
  - 2-1
  - 논리설계
date: 2025-03-02 19:59:48
tags:
---

# Boolean algebra

Boolean algebra is an algebraic structure consisting of

- a set of elements $B = {0, 1}$
- binary operations ${+, \cdot}$
- unary operation $'$

## Axioms and theorems

- Identity: $X + 0 = X$, $X \cdot 1 = X$
- Null: $X + 1 = 1$, $X \cdot 0 = 0$
- Idempotency: $X + X = X$, $X \cdot X = X$
- Involution: $(X')' = X$
- Complementarity: $X + X' = 1$, $X \cdot X' = 0$
- Commutativity: $X + Y = Y + X$, $X \cdot Y = Y \cdot X$
- Associativity: $(X + Y) + Z = X + (Y + Z)$, $(X \cdot Y) \cdot Z = X \cdot (Y \cdot Z)$
- Distributivity: $X \cdot (Y + Z) = (X \cdot Y) + (X \cdot Z)$, $X + (Y \cdot Z) = (X + Y) \cdot (X + Z)$
- Uniting: $X \cdot Y + X \cdot Y' = X$, $(X + Y) \cdot (X + Y') = X$
- Absorption: $X + X \cdot Y = X$, $X \cdot (X + Y) = X$, $(X + Y') \cdot Y = X \cdot Y$, $(X \cdot Y') + Y = X + Y$
- Factoring: $(X + Y) \cdot (X' + Z) = X \cdot Z + X' \cdot Y$, $X \cdot Y + X' \cdot Z = (X + Z) \cdot (X' + Y)$
- Concensus: $(X \cdot Y) + (Y \cdot Z) + (X' \cdot Z) = X \cdot Y + X' \cdot Z$, $(X + Y) \cdot (Y + Z) \cdot (X' + Z) = (X + Y) \cdot (X' + Z)$
- De Morgan's law: $(X + Y)' = X' \cdot Y'$, $(X \cdot Y)' = X' + Y'$
- Generalized de Morgan's law: $f'(X_1, \ldots, X_n, 0, 1, +, \cdot) = f(X_1', \ldots, X_n', 1, 0, \cdot, +)$

### Duality

$$f(X_1, \ldots, X_n, 0, 1, +, \cdot) \Leftrightarrow f(X_1, \ldots, X_n, 1, 0, \cdot, +)$$

Any theorem that can be proven is thus also proven for its dual!

# Canonical forms

## Sum-of-products (S-o-P) canonical forms

$$F(A,B,C) = \sum m(1,3,5,6,7) = A'B'C + A'BC + AB'C + ABC' + ABC$$

Each term ($m1, m3, m6$) is called minterm!

## Product-of-sums (P-o-S) canonical form

$$F(A,B,C) = \prod M(0,2,4) = (A+B+C)(A+B'+C)(A'+B+C)$$

Each term ($M0, M2, M4$) is called maxterm!

## Mapping between canonical forms

F to F: use different terms whose indices do not appeared!

$$F(A,B,C) = \sum m(1,3,5,6,7) = \prod M(0,2,4)$$

F to F': use same terms whose indicies do not appeared!

$$F(A,B,C) = \sum m(1,3,5,6,7), F'(A,B,C) = \sum m(0,2,4)$$

$$F(A,B,C) = \prod M(0,2,4), F'(A,B,C) = \prod M(1,3,5,6,7)$$

## Don't cares

Some input patterns should never be encountered in practice!  
These don't cares can be used as 0 or 1!

$$F(A,B,C) = \sum \left[ m(1,3,5) + d(6,7) \right]$$

$$F(A,B,C) = \prod \left[ M(0,2,4) \cdot D(6,7) \right]$$
