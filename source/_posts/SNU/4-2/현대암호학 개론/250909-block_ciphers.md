---
title: Block Ciphers
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
abbrlink: 105
date: 2025-09-09 14:47:49
tags:
---

# Motivation

OTP, Stream Ciphers only assumes ciphertext-only attack.  
We want to securely send multiple ciphertexts using same key!

Block ciphers are used to build CPA-secure encryption schemes.  
Block ciphers are not encryption schemes!  
But it can used as encryptions, MACs(Message Authentication Code), hash functions, PRGs, ...

# PRFs and PRPs

A function $E: X \rightarrow X$ is a permutation if there exists and inverse function such that $\forall x, E^{-1}(E(x)) = x$.

A pseudorandom function (PRF) is a keyed function $F: K \times X \rightarrow Y$ that is efficiently computable by a deterministic algorithm.  
Usually $K = \{0,1\}^n, X = \{0,1\}^{l_{in}}, Y = \{0,1\}^{l_{out}}$, and we can get a function $F_k: X \rightarrow Y$ for each $k \in K$.

A pseudorandom permutation (PRP) is a keyed function $E: K \times X \rightarrow X$ such that for all $k \in K$, $E_k(x) = E(k, x)$ is a permutation, and $E_k, E_k^{-1}$ are efficiently computable by a deterministic algorithm.  
Usually $K = \{0,1\}^n, X = \{0,1\}^l$, and we can get a permutation $E_k: X \rightarrow X$ for each $k \in K$.

Basically PRF and PRP is a function/permutation version of PRG!  
Note that this is way harder than PRG; We can only have $|K|$ functions, but there are $|Y|^{|X|}$ distinct functions and $|X|!$ distinct permutations!

## Secure PRFs

Let $\mathcal{F}$ is the set of all functions from X to Y.  
$F_k$ (for uniform $k \in K$) should be indistinguishable from $f$ (for uniform $f \in \mathcal{F}$)!

![PRF experiment](prf.png)

Problem: We can't give local table of function $f$, it's too large!  
Instead, adversary can query up to $q$ times.

Let $F: K \times X \rightarrow Y$ be a PRF. For a distinguisher $\mathcal{A}$, its advantage is defined as

$$Adv_F(\mathcal{A}) \coloneqq \left| \Pr[EXP_{0,F}(\mathcal{A}) = 1] - \Pr[EXP_{1,F}(\mathcal{A}) = 1] \right|$$

We say that F is secure if $Adv_F(\mathcal{A})$ is negligible for any efficient $\mathcal{A}$.

We simply denote $EXP_{0,F}(\mathcal{A}) = \mathcal{A}^{F_k(\cdot)}, EXP_{1,F}(\mathcal{A}) = \mathcal{A}^{f(\cdot)}$.  
cf. $\mathcal{A}^{f(\cdot)}$ actually means that adversary has a oracle access to $f$, i.e. adversary can use $f$ freely (up to $q$ times).

## Secure PRPs

Let $\mathcal{P}$ is the set of all permutations of X.  
$E_k$ (for uniform $k \in K$) should be indistinguishable from $f$ (for uniform $f \in \mathcal{P}$)!

![PRP experiment](prp.png)

Let $E: K \times X \rightarrow X$ be a PRP. For a distinguisher $\mathcal{A}$, its advantage is defined as

$$Adv_E(\mathcal{A}) \coloneqq \left| \Pr[EXP_{0,E}(\mathcal{A}) = 1] - \Pr[EXP_{1,E}(\mathcal{A}) = 1] \right|$$

We say that E is secure if $Adv_E(\mathcal{A})$ is negligible for any efficient $\mathcal{A}$.

We simply denote $EXP_{0,E}(\mathcal{A}) = \mathcal{A}^{E_k(\cdot)}, EXP_{1,E}(\mathcal{A}) = \mathcal{A}^{f(\cdot)}$.

## PRG from PRF

We can make secure PRG from secure PRF!

Let $F: \{0, 1\}^n \times \{0, 1\}^n \rightarrow \{0, 1\}^n$ be a secure PRF. Then, the following $G: \{0, 1\}^n \rightarrow \{0, 1\}^{nm}$ is a secure PRG.

$$G(k) \coloneqq F_k(0) \Vert F_k(1) \Vert \cdots \Vert F_k(m-1)$$

{% note no-icon Proof %}
Let's assume that $G$ is not secure, i.e. there exists an adversary $\mathcal{A}$ and non-negligible $\epsilon > 0$ such that

$$\left| \Pr_k[ \mathcal{A}(G(k)) = 1 ] - \Pr_r[ \mathcal{A}(r) = 1 ] \right| > \epsilon.$$

We define an adversary $\mathcal{B}$ for PRF experiment.

1. Query $m$ times and get $y_i$ ($F_k(i)$ or $f(i)$) for $0 \leq i \leq m-1$.
1. Create string $\omega \coloneqq y_0 \Vert y_1 \Vert \cdots \Vert y_{m-1}$ by appending $y_i$.
1. Perform secure PRG experiment and get the output $b' \coloneqq \mathcal{A}(\omega)$.
1. Output $b'$ directly.

We'll prove that $\mathcal{B}$ can distinguish PRF with a non-negligible probability.

If $EXP_0$ (i.e. $y_i = F_k(i)$), $\omega$ has the same distribution as $G(k)$. $\therefore, \Pr[EXP_{0,F}(\mathcal{B}) = 1] = \Pr_k[\mathcal{A}(G(k)) = 1]$.  
If $EXP_1$ (i.e. $y_i = f(i)$), $\omega$ is uniformly random string. $\therefore, \Pr[EXP_{1,F}(\mathcal{B}) = 1] = \Pr_r[\mathcal{A}(r) = 1]$.

$$\begin{align*}
\therefore Adv_F(\mathcal{B}) &= |\Pr[EXP_{0,F}(\mathcal{B}) = 1] - \Pr[EXP_{1,F}(\mathcal{B}) = 1]| \\
&= \left| \Pr_k[ \mathcal{A}(G(k)) = 1 ] - \Pr_r[ \mathcal{A}(r) = 1 ] \right| \\
&> \epsilon > 0
\end{align*}$$

Since F is not secure when G is not secure, G is secure when F is secure!
{% endnote %}

Note that this PRG is also parallelizable.

## PRF switching lemma (PRF from PRP)

Any secure PRP is also a secure PRF, if |X| is sufficiently large.

Let $E: \{0, 1\}^n \times \{0, 1\}^n \rightarrow \{0, 1\}^n$ be a PRP. Then, for any $q$-query adversary $\mathcal{A}$:

$$\left| Adv_E^{PRF}(\mathcal{A}) - Adv_E^{PRP}(\mathcal{A}) \right| \leq \frac{q^2}{2|X|}$$

c.f. $\frac{q^2}{2|X|}$ comes from the birthday paradox.  
Let's choose $q$ values from $X$ uniformly at random thereby allowing repetitions.  
The probability of at least one value is chosen more than once is less than $\frac
{q^2}{2|X|}$ (also called the birthday bound).

{% note no-icon Proof of the birthday bound %}
Let's say the i-th value is $x_i$.

$$\begin{align*}
\Pr[\exists i < j : x_i = x_j] &\leq \sum_{1 \leq i < j \leq q} \Pr[x_i = x_j] \\
&= \binom{q}{2} \cdot \frac{1}{|X|} < \frac{q^2}{2|X|}
\end{align*}$$
{% endnote %}

{% note no-icon Proof of the switching lemma %}
Let $f$ is a random PRF and $g$ is a random PRP. From the definition,

$$\begin{align*}
Adv_E^{PRF}(\mathcal{A}) &= \left| \Pr[\mathcal{A}^{E_k(\cdot)} = 1] - \Pr[\mathcal{A}^{f(\cdot)} = 1] \right| \\
Adv_E^{PRP}(\mathcal{A}) &= \left| \Pr[\mathcal{A}^{E_k(\cdot)} = 1] - \Pr[\mathcal{A}^{g(\cdot)} = 1] \right|
\end{align*}$$

Therefore, from the reverse triangular inequality $||a|-|b|| \leq |a-b|$,

$$\begin{align*}
\left| Adv_E^{PRF}(\mathcal{A}) - Adv_E^{PRP}(\mathcal{A}) \right| \leq \left| \Pr[\mathcal{A}^{g(\cdot)} = 1] - \Pr[\mathcal{A}^{f(\cdot)} = 1] \right|
\end{align*}$$

Now we prove the **difference lemma**: Let $Z, W_0, W_1$ be the events defined over some probability space, and $W_0 \land \lnot Z$ occurs if and only if $W_1 \land \lnot Z$. (i.e. $\Pr[W_0 \land \lnot Z] = \Pr[W_1 \land \lnot Z]$) Then the following holds.

$$\begin{align*}
|\Pr[W_0] - \Pr[W_1] &= |(\Pr[W_0 \land Z] + \Pr[W_0 \land \lnot Z]) - (\Pr[W_1 \land Z] + \Pr[W_1 \land \lnot Z]) \\
&= |\Pr[W_0 \land Z] - \Pr[W_1 \land Z]| \\
&\leq \Pr[Z] \quad (\because 0 \leq \Pr[W_0 \land Z], \Pr[W_1 \land Z] \leq \Pr[Z])
\end{align*}$$

Let $x_1, \ldots x_q$ are the variables that $\mathcal{A}$ queried, and $Z$ is an event that at least two of $f(x_i)$ have the same value.  
If $\lnot Z$ occurs, because $f(x_i)$ and $g(x_i)$ are random values with no collisions, $f(x_i)$ and $g(x_i)$ have same distribution.  
$\therefore \Pr[\mathcal{A}^{g(\cdot)} = 1 \land \lnot Z] = \Pr[\mathcal{A}^{f(\cdot)} = 1 \land \lnot Z]$

Also, from the birthday bound, $\Pr[Z] < \frac{q^2}{2|X|}$.  
Therefore, by using difference lemma,

$$\begin{align*}
\left| Adv_E^{PRF}(\mathcal{A}) - Adv_E^{PRP}(\mathcal{A}) \right| &\leq \left| \Pr[\mathcal{A}^{g(\cdot)} = 1] - \Pr[\mathcal{A}^{f(\cdot)} = 1] \right| \\
&\leq \Pr[Z] < \frac{q^2}{2|X|}
\end{align*}$$
{% endnote %}

Lemma: If $|X|$ is sufficiently large so that $\frac{q^2}{2|X|}$ is negligible, then $Adv_E^{PRP}(\mathcal{A})$ is negligible implies that $Adv_E^{PRF}(\mathcal{A})$ is negligible.  
i.e. Any secure PRP is also a secure PRF, if |X| is sufficiently large!

Recall) We can make secure stream cipher from secure PRG!  
Therefore secure PRP can make secure PRF, secure PRF can make secure PRG, and secure PRG can make secure stream cipher!  
Problem) How do we make secure PRP?

# Block Ciphers

![Block Ciphers](block_cipher.png)

Block ciphers are actually just PRPs with same plaintext/ciphertext size (key size can be different).

- $M = C = \{ 0, 1 \}^l$
- $K = \{  0, 1 \}^n$

Block cipher generates r keys ($k_1, \ldots, k_r$) from $k \in K$, then compute round function $m_i = Rnd(k_i, m_{i - 1})$ (where $m_0 = m$, $m_r = c$).

Round function can be anything: lookup table, xor, shift operation, ...

## Data Encryption Standard (DES)

In 1972, NIST calls for a block cipher standard.  
In 1974, IBM designs Lucifer.  
Lucifer was later renamed to DES.

$$n = 56, l = 64, r = 16$$

It was secure, but it was broken by exhaustive search in 1997.  
Later, DES was replaced by AES in 2001.

## Advanced Encryption Standard (AES)

AES used the similar method as DES, but with an increased key size.  
In fact, IBM proposed 128-bit key, but NSA reduced it to 56-bit key.  
There is a conspiracy theory that the key size was reduced to allow the NSA to break it.

$$n = 128/192/256, l = 128, r = 10/12/14$$

AES is designed with simple operations, with a mixture of linear and non-linear operation. (Looks like NN...?)  
Simple operations were used for faster running time and hardware efficiency. Modern CPU can compute one round of AES in one cycle!!!  
One can increase code size (pre-compute) for faster AES, or reduce code size for smaller AES (used in low memory systems).

## Attacks on Block Ciphers

DES have some advanced attacks: e.g. differential cryptanalysis, linear cryptanalysis.  
AES is designed to resist both attacks, and only brute force attack is known.

There is a best key recovery attack which can crack AES four times better than exhaustive search... But it is necessary? ($2^{128} \rightarrow 2^{126}$)  
Just run with four CPUs...

Grover's algorithm can recover the key using quantum computer in time $O \left( |K|^{\frac{1}{2}} \right)$!  
However, quantum computer's *one operation* is very different from standard computer's operation.  
Even when quantum computers are invented, it is expected that the running time will be similar.

## Strengthening Block Ciphers?

Let $E: K \times M \rightarrow M$ be a block cipher.  
Can we make better block cipher by using block cipher twice? $2E: K^2 \times M \rightarrow M$, $c = 2E_{k_1, k_2}(m) = E_{k_1}(E_{k_2}(m))$  
2E is two times slower than E, but key size is squared!

However, this leaks critical information: $D_{k_1}(c) = E_{k_2}(m)$  
We can use Meet-in-the-Middle (MitM) Attack!

1. Get a plaintext-ciphertext pair (m, c).
1. Build the table of $\left( k_2, E_{k_2}(m) \right)$ for all $k_2 \in K$, and sort on the second column ($E_{k_2}(m)$).
1. For all $k_1 \in K$, check if $D_{k_1}(c)$ is in the table.

- Space complexity: $|K| \cdot \log |M|$
- Time complexity: $|K| \cdot \log |K| + |K| \cdot \log |K|$ (building + lookup)

Then how about using block cipher thrice...???  
This is actually quite secure!!  
Because space constraint is more challenging, we build the table of $\left( k_3, E_{k_3}(m) \right)$ and check if $D_{k_2}(D_{k_1}(c))$ is in the table.  
Time complexity is larger than $|K|^2$!

Triple-DES was actually used (and it's standard!) when people were migrating to AES.  
You could use existing DES hardware to achieve AES-level security!
