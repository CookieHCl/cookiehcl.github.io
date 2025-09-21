---
title: Perfect Secrecy and Computational Security
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
date: 2025-09-04 14:25:10
tags:
---

# Secure Encryption

A security definition has two components:

- A security guarantee: A successful attack from the adversary's point of view
- A threat model: What actions the attacker is assumed able to carry out  
  We cannot prove scheme is secure if we just assume adversary is god (e.g. adversary can look at any information)

Most modern cryptographic constructions cannot be proven secure unconditionally. (Mostly because of efficiency)  
Why not simply assume that the scheme itself is secure?

1. We want to use existing assumptions because the reliability of the assumption that the scheme itself is secure is too low. (Why do we have to assume this? It is actually a realistic assumption?)
1. We want to make assumption as simple as possible; Most assumption are not even related to cryptography!

## Security guarantees

- It should be impossible for an attacker to recover the key.
- It should be impossible for an attacker to recover the plaintext from the ciphertext.
- It should be impossible for an attacker to recover any character of the plaintext from the ciphertext.
- Regardless of any information an attacker already has (i.e. more than just plain ciphertext), a ciphertext should leak no additional information about the underlying plaintext. (The **best** assumption!)

## Threat models

- Ciphertext-only attack: The adversary just observes ciphertext(s) and attempts to determine information about the underlying plaintext(s).
- Known-plaintext attack: The adversary is able to learn plaintext/ciphertext pair(s) generated using an unknown key. The adversary aims to deduce information about the underlying plaintext of some other ciphertext produced using the same key.
- Chosen-plaintext attack (CPA): The adversary can obtain plaintext/ciphertext pairs for plaintexts of its choice.  
  In fact, it was very common in WW2!  
  e.g. If you leak fake information about Korea, you are likely to get ciphertext about Korea.
- Chosen-ciphertext attack (CCA): The adversary is additionally able to obtain some information about the decryption of ciphertexts of its choice. The adversary's aim is to learn information about the underlying plaintext of some other ciphertext under the same key.  
  Actually this is quite realistic threat model! e.g. Some schemes return error when ciphertext is invalid. This method has successfully attacked some CPA-secure schemes!

# Perfect secrecy

Consider a ciphertext-only attack. (i.e. Attacker sees only a single ciphertext)

Shanon's definition (1949): An encryption scheme $\mathcal{E} = (Gen, Enc, Dec)$ with message space $M$ is **perfectly secret** if and only if the following holds for all message $m_0, m_1 \in M$ and ciphertext $c \in C$:

$$\Pr[Enc_k(m_0) = c] = \Pr[Enc_k(m_1) = c]$$

Idea: The ciphertext should reveal no information about the plaintext!

An equivalent definition: An encryption scheme is perfectly secret if and only if for every probabilistic distribution for $M$, every message $m$ and every ciphertext $c$ in which $\Pr[c] \neq 0$ should hold the following: $\Pr[m|c] = \Pr[m]$.

More intuitive?

## Perfect Indistinguishability

Another equivalent definition of perfect secrecy!  
Here we will introduce the concept of an "experiment" (or a security game).  
Generally, a **challenge ciphertext** will be given to adversary, and adversary need to guess information from it.

![Perfect Indistinguishability](perfect_indistinguishability.png)

1. The adversary $\mathcal{A}$ outputs a pair of messages $m_0, m_1 \in M$.
1. A key $k \leftarrow G$ is generated, and a uniform bit $b \in \{0, 1\}$ is chosen.
1. A challenge ciphertext $C \leftarrow E_k(m_b)$ is computed and given to $\mathcal{A}$.
1. $\mathcal{A}$ outputs a bit $b' \in \{0, 1\}$. The output of the experiment $EXP_{\mathcal{A,E}}$ is 1 if $b' = b$, and 0 otherwise.

The advantage of $\mathcal{A}$ is defined as $Adv_{\mathcal{E}}(\mathcal{A}) \coloneqq | 2 \cdot \Pr[EXP_{\mathcal{E}}(\mathcal{A}) = 1] - 1 |$.  
Idea: If probability is not 0.5, adversary got information from ciphertext! We want the range of advantage is between 0 and 1, so we multiply by two.

Def: An encryption scheme $\mathcal{E}$ is perfectly indistinguishable if $\forall \mathcal{A}, Adv_{\mathcal{E}}(\mathcal{A}) = 0$.

## OTP (One-Time Pad)

In fact, we are already using perfectly secret scheme!

- $M = K = C = \{ 0, 1 \}^l$ (set of all binary strings of length $l$)
- $Gen$: sample a key $k \in K$ uniformly at random.
- $Enc_k(m) = k \oplus m$
- $Dec_k(c) = k \oplus c$

OTP is perfectly secret against a single ciphertext attack!  
Obviously $\forall m \in M, \forall c \in C, \Pr[Enc_k(m) = c] = 2^{-l}$

Problem) Perfectly secret scheme is not usable...  
It has been proven that if a scheme is perfectly secret, $|K| \geq |M|$ should hold.  
Key management becomes very difficult... In fact sending key is harder than sending message! Why are we using it then..?

# Computational security

## Motivation

Perfect secrecy is an information-theoretic security notion that requires that absolutely no information about an encrypted message is leaked, even to an adversary with unlimited computational power.

However, real world doesn't require perfect secrecy.

- Real adversary doesn't have unlimited power.
- Real security should be fast enough.

We need a compromise solution! (The difference between math and engineering?)

## Concrete/Asymptotic Definition

Computational security relax two definitions:

- Security is only guaranteed against *efficient* adversaries that run for some feasible amount of time.
- Adversary can potentially succeed (i.e., security can fail) with some *negligible* probability.

For example, any adversary running for time at most $t$ succeeds in breaking the scheme with probability at most $\epsilon$ for some $(t, \epsilon)$.

- Concrete approach: Explicity bound the maximum success probability of an adversary running for some specified amount of time.  
  e.g. No adversary running for at most $t = 2^{80}$ cycles can succeed in breaking the scheme with probability better than $\epsilon = 2^{-60}$.  
  Usually we consider $\frac{t}{\epsilon}$, so this is very secure scheme! (140 bit)
- Asymptotic approach: Introduce a security parameter $n$ (or $\lambda$), and bound probability and running time using asymptotic notation.  
  *Efficient* adversaries are probabilistic algorithms running in polynomial time in $n$.  
  *Negligible probability* is smaller than any inverse polynomial in $n$. (e.g. inverse of super-poly, such as $\frac{1}{2^n}$)

In asymptotic approach, we also call efficient adversaries have probabilistic polynomial time algorithm (PPTA).

## Indistinguishability Experiment

Now we can define which scheme has indistinguishable encryptions (also called the scheme provides indistinguishability)!

![Indistinguishability Experiment 1](indistinguishability_1.png)

For a private-key encryption scheme $\mathcal{E}=(G,E,D)$ and an efficient (PPTA) adversary $\mathcal{A}$,

1. The adversary $\mathcal{A}$ outputs a pair of messages $m_0, m_1 \in M$.
1. A key $k \leftarrow Gen(1^{\lambda})$ is generated, and a uniform bit $b \in \{0, 1\}$ is chosen.
1. A ciphertext $C \leftarrow Enc_k(m_b)$ is computed and given to $\mathcal{A}$.
1. $\mathcal{A}$ outputs a bit $b' \in \{0, 1\}$. The output of the experiment $EXP_{\mathcal{A,E}}$ is 1 if $b' = b$, and 0 otherwise.

The advantage of $\mathcal{A}$ is defined as $Adv_{\mathcal{E}}(\mathcal{A}) \coloneqq | 2 \cdot \Pr[EXP_{\mathcal{E}}(\mathcal{A}) = 1] - 1 |$.

Def: An encryption scheme $\mathcal{E}$ has indistinguishable encryptions if for any *efficient* $\mathcal{A}$, $Adv_{\mathcal{E}}(\mathcal{A})$ is *negligible* in $\lambda$.

![Indistinguishability Experiment 2](indistinguishability_2.png)

But in fact, we normaly use this equivalent formulation.  
Idea: We want to fix adversary, and run different experiments.  
If adversary reacts differently, adversary got information!

These experiments are almost the same as previous one, except that now bit $b \in \{0, 1\}$ is fixed. (0 for $EXP_0$, 1 for $EXP_1$)  
Output of the each experiment is $b'$, and it is denoted as $EXP_{0,\mathcal{E}}(\mathcal{A})$ and $EXP_{1,\mathcal{E}}(\mathcal{A})$.

The advantage of $\mathcal{A}$ is defined as $Adv_{\mathcal{E}}(\mathcal{A}) \coloneqq | \Pr[EXP_{0,\mathcal{E}}(\mathcal{A}) = 1] - \Pr[EXP_{1,\mathcal{E}}(\mathcal{A}) = 1] |$.

Def: An encryption scheme $\mathcal{E}$ has indistinguishable encryptions if for any *efficient* $\mathcal{A}$, $Adv_{\mathcal{E}}(\mathcal{A})$ is *negligible* in $\lambda$.

{% note no-icon Proof %}
Let $\Pr[EXP_{0,\mathcal{E}}(\mathcal{A}) = 1] = p_0$, and $\Pr[EXP_{1,\mathcal{E}}(\mathcal{A}) = 1] = p_1$.

$$\begin{align*}
| 2 \cdot \Pr[EXP_{\mathcal{E}}(\mathcal{A}) = 1] - 1 | &= | 2 \cdot \left( \frac{1}{2}\Pr[EXP_{\mathcal{0, E}}(\mathcal{A}) = 0] + \frac{1}{2}\Pr[EXP_{\mathcal{1, E}}(\mathcal{A}) = 1] \right) - 1 | \\
&= | 2 \cdot \left( \frac{1 - p_0}{2} + \frac{p_1}{2} \right) - 1 | \\
&= | p_1 - p_0 | \\
&= | p_0 - p_1 | \\
&= | \Pr[EXP_{0,\mathcal{E}}(\mathcal{A}) = 1] - \Pr[EXP_{1,\mathcal{E}}(\mathcal{A}) = 1] |
\end{align*}$$
{% endnote %}

c.f.) Why do we want to prove indistinguishability? Actually we want to prove semantic security.  
A scheme is semantically secure if any efficient adversary that is given the ciphertext and the message's length cannot determine any partial information on the message with probability non-negligibly higher than all other efficient adversary that is only given the message's length.  
But directly proving sematic security is really hard... Instead, we prove that a scheme is semantically secure if and only if a scheme has indistinguishable encryption, then we prove that a scheme has indistinguishable encryption.

# Pseudorandom Generators (PRG)

PRG is an efficient and deterministic algorithm for transforming a short, uniform string (called a *seed*) into a longer, "uniform-looking" (a.k.a. *"pseudorandom"*) output string.  
If PRG exists, we can use a small amount of true randomness to generate a large amount of pseudorandomness.

Why do we use this? We want a long true random string. However, generating true random string is often difficult and slow.  
Obviously, information theoretically(?), it is impossible to get a true random string from shorter true random string.  
But we can get pseudorandom string computationally!

- Historical approach: Use statistical tests (e.g. each n-th bit should be equal to 1 with probability 0.5, numbers of 0's and 1's in the string are approximately the same)
- Cryptographic approach: Use computational security - A good PRG should pass all efficient statistical tests!

## Definition of secure PRG

PRG is a function $G: \{ 0, 1 \}^n \rightarrow \{ 0, 1 \}^l$ for some $n < l$ that is efficiently computable by a deterministic algorithm.

Idea) Pseudorandom should look like true random!  
Intuitively, $\{ G(s): s \leftarrow \{ 0, 1 \}^n \}$ should be indistinguishable from $\{ r: r \leftarrow \{ 0, 1 \}^l \}$.

1. $G(s)$ shouldn't give any information about $s$.
1. Adversary shouldn't distinguish whether a given l-bit string is $G(s)$ or $r$.

![PRG experiment](prg.png)

Def: Let $G: \{ 0, 1 \}^n \rightarrow \{ 0, 1 \}^l$ be a PRG. For any distinguisher (adversary) $\mathcal{A}$, its advantage is defined as $Adv_G(\mathcal{A}) \coloneqq \left| \Pr_s[ \mathcal{A}(G(s)) = 1 ] - \Pr_r[ \mathcal{A}(r) = 1 ] \right|$. We say that $G$ is secure (a.k.a. pseudorandom) if for any efficient $\mathcal{A}$, $Adv_G(\mathcal{A})$ is negligible.

## Predictable PRG

Def: Let $G: \{ 0, 1 \}^n \rightarrow \{ 0, 1 \}^l$ be a PRG. We say tha $G$ is predictable if there exists an efficient algorithm $\mathcal{A}$ and $i < l$ such that

$$\Pr_{s \leftarrow \{ 0, 1 \}^n}[ \mathcal{A}(G(s) [0, 1, \ldots, i-1]) = G(s) [i] ] > \frac{1}{2} + \epsilon$$

for some non-negligible $\epsilon > 0$.

i.e. $G$ is predictable if there exists an adversary that can predict the (i+1)th bit when given the first i bits of $G(s)$.

Since predictable PRG is not secure (adversary can be trivially made), secure PRGs are unpredictable.  
But are unpredictable PRGs secure?

It's true! (So unpredictable PRG and secure PRG are equivalent definition!) However proof is very complex...

{% note no-icon Proof %}
Let's assume that $G$ is not secure, i.e. there exists an adversary $\mathcal{A}$ and non-negligible $\epsilon > 0$ such that

$$\left| \Pr_s[ \mathcal{A}(G(s)) = 1 ] - \Pr_r[ \mathcal{A}(r) = 1 ] \right| > \epsilon.$$

We define the hybrid distribution $H_i$ for $0 \leq i \leq l$, where the first i bits of $H_i$ are generated from $G(s)$, and the remaining $l-i$ bits are generated uniformly random.

$$\begin{align*}
\Pr_s[ \mathcal{A}(G(s)) = 1 ] - \Pr_r[ \mathcal{A}(r) = 1 ] &= \Pr[ \mathcal{A}(H_l) = 1 ] - \Pr[ \mathcal{A}(H_0) = 1 ] \\
&= \sum_{i=1}^l \left( \Pr[ \mathcal{A}(H_i) = 1 ] - \Pr[ \mathcal{A}(H_{i-1}) = 1 ] \right) \\
\therefore \left| \Pr_s[ \mathcal{A}(G(s)) = 1 ] - \Pr_r[ \mathcal{A}(r) = 1 ] \right| &\leq \sum_{i=1}^l \left| \Pr[ \mathcal{A}(H_i) = 1 ] - \Pr[ \mathcal{A}(H_{i-1}) = 1 ] \right| \\
\therefore \exists j (1 \leq j \leq l) \  s.t. \ & \left| \Pr[ \mathcal{A}(H_j) = 1 ] - \Pr[ \mathcal{A}(H_{j-1}) = 1 ] \right| > \frac{\epsilon}{l}.
\end{align*}$$

Without loss of generality, assume $\Pr[ \mathcal{A}(H_{j-1}) = 1 ] - \Pr[ \mathcal{A}(H_j) = 1 ] > \frac{\epsilon}{l}$.  
We define an adversary $\mathcal{B}$ for predictable PRG experiment.

1. Get the first $j-1$ bits of $G(s)$, denoted as $p$. (prefix)
1. Generate random bit $b \in \{ 0, 1\}$ and uniformly random $l-j$ bit string $r$.
1. Create string $\omega \coloneqq p \Vert b \Vert r$ by appending strings.
1. Perform secure PRG experiment and get the output $b' \coloneqq \mathcal{A}(\omega)$.
1. If $b' = 1$ (i.e. adversary output that this was a random string), output $1-b$.
1. If $b' = 0$ (i.e. adversary output that this was a PRG), output $b$.

We'll prove that $\mathcal{B}$ can predict PRG with a non-negligible probability.  
Let $B \coloneqq G(s) [j]$ (the real j-th bit of the PRG), $p_j \coloneqq \Pr[ \mathcal{A}(H_j) = 1 ]$, $p_{j-1} \coloneqq \Pr[ \mathcal{A}(H_{j-1}) = 1 ]$.

If $b = B$, $\omega$ has the same distribution as $H_j$. Therefore, $\Pr[ \mathcal{B}(p) = B | b = B ] = \Pr[ \mathcal{A}(H_j) = 0 ] = 1 - p_j$.  
If $b \neq B$, $\omega$ has the same distribution as $H_{j-1}$. Therefore, $\Pr[ \mathcal{B}(p) = B | b \neq B ] = \Pr[ \mathcal{A}(H_{j-1}) = 1 ] = p_{j-1}$.

$$\begin{align*}
\therefore \Pr_{s \leftarrow \{ 0, 1 \}^n}[ \mathcal{B}(G(s) [0, 1, \ldots, j-1]) = G(s) [j] ] &= \Pr[ \mathcal{B}(p) = B ] \\
&= \frac{1}{2} \cdot (1 - p_j) + \frac{1}{2} \cdot p_{j-1} \\
&= \frac{1}{2} + \frac{1}{2} (p_{j-1} - p_j) \\
&> \frac{1}{2} + \frac{\epsilon}{2l}.
\end{align*}$$

(If $\Pr[ \mathcal{A}(H_{j-1}) = 1 ] - \Pr[ \mathcal{A}(H_j) = 1 ] < \frac{\epsilon}{l}$, invert the output.)  
Therefore, $\mathcal{B}$ can predict PRG with a non-negligible probability $\frac{\epsilon}{2l}$.  
(You can also repeat this process and take the majority vote to further increase the probability.)

Since insecure PRGs are predictable, unpredictable PRGs are secure!
{% endnote %}

The real problem) Does secure PRG exists?  
In fact we don't know...!  
It is a troublesome problem in cryptography; We can prove that if A is secure, then B is secure. However, it's often not proven that a specific A is secure!  
We have a modern PRG that doesn't have any known attack better than exhaustive search, but we don't know whether it is secure or not.

However, because predictable PRGs are not secure, famous PRG algorithms are not secure!  
e.g. glibc random is not secure!

```c
int random() {
  // Assume that r[i] has previous return values of random(),
  // and i is the number of times random() is called.
  r[i] = (r[i - 3] + r[i - 31]) % (1 << 32);
  return r[i] >> 1;
}
```

## Stream Ciphers

Problem of OTP: $|k| = |m|$  
Stream Ciphers: Make OTP practical by replacing random key with pseudorandom key!

- Let $G: \{ 0, 1 \}^n \rightarrow \{ 0, 1 \}^l$ be a PRG.
- $K = \{ 0, 1 \}^n, M = \{ 0, 1 \}^l$
- $Gen$ samples a uniform random key $s \in K$.
- $Enc_s(m) \coloneqq G(s) \oplus m$
- $Dec_s(c) \coloneqq G(s) \oplus c$

Since $|K| < |M|$, stream cipher cannot be perfectly secure.  
However, if PRG is secure, stream cipher is semantically secure!

### Proofs by reduction

How do we prove that a given construction (e.g. encryption scheme) is secure?  
We first assume that low-level cryptographic primitive is secure, then prove that the given construction based on that primitive is secure.  
We can prove this by presenting a reduction showing how to transform any efficient adversary $\mathcal{A}$ that succeeds in solving/breaking the given construction into an efficient algorithm $\mathcal{B} that solves problem/primitive.  
a.k.a. If construction is not secure, then primitive is not secure.  
a.k.a. If primitive is secure, then construction is secure!

Of course, we don't know if given stream cipher is secure...  
But we can prove that if PRG is secure, then stream cipher is semantically secure.  
Since we don't know if modern PRG is broken, so maybe modern stream cipher is secure..?  
Recall) Semantically secure scheme is equivalent to indistinguishable scheme.

Theorem: Let $G: \{ 0, 1 \}^n \rightarrow \{ 0, 1 \}^l$ be a secure PRG. Then, the stream cipher $\mathcal{E}$ derived from $G$ is semantically secure. More specifically, for any adversary $\mathcal{A}$ for stream cipher $\mathcal{E}$, there exists a PRG adversary $\mathcal{B}$ such that

$$Adv_G(\mathcal{B}) \geq \frac{1}{2} Adv_\mathcal{E}(\mathcal{A})$$

This is slightly stronger than what we wanted to prove: If there exists an adversary for stream cipher, there exists an adversary for PRG.

{% note no-icon Proof %}
Let's assume that $\mathcal{A}$ is an adversary for a stream cipher $\mathcal{E}$ which uses PRG $G(s)$.  
Then we can define adversary $\mathcal{B}$ for PRG $G$.

1. A challenge string $\omega$ is given to $\mathcal{B}$.
1. $\mathcal{B}$ gets two messages $m_0, m_1$ from $\mathcal{A}$.
1. $\mathcal{B}$ randomly choose $b \in \{ 0, 1 \}$, then give ciphertext $\omega \oplus m_b$ back to $\mathcal{A}$. (i.e. $\mathcal{B}$ just construct stream cipher for $\mathcal{A}$.)
1. $\mathcal{B}$ gets $\mathcal{A}$'s output $b'$.
1. $\mathcal{B}$ outputs 0 if $b = b'$ (this is a PRG), and 1 if $b \neq b'$ (this is a random string).

We'll prove that $\mathcal{B}$'s advantage is half of $\mathcal{A}$'s advantage.

If a challenge string was a PRG, this is a stream cipher experiment from $\mathcal{A}$'s point of view.

$$\begin{align*}
\therefore \Pr_s[ \mathcal{B}(G(s)) = 1 ] &= \Pr[b' = 1 | b = 0] + \Pr[b' = 0 | b = 1] \\
&= \frac{1}{2} \cdot \Pr[EXP_{0,\mathcal{E}}(\mathcal{A}) = 1] + \frac{1}{2} \cdot \Pr[EXP_{1,\mathcal{E}}(\mathcal{A}) = 0] \\
&= \frac{1}{2} \cdot (\Pr[EXP_{0,\mathcal{E}}(\mathcal{A}) = 1] + 1 - \Pr[EXP_{1,\mathcal{E}}(\mathcal{A}) = 1]) \\
&= \frac{1}{2} + \frac{1}{2} \cdot (\Pr[EXP_{0,\mathcal{E}}(\mathcal{A}) = 1] - \Pr[EXP_{1,\mathcal{E}}(\mathcal{A}) = 1])
\end{align*}$$

If a challenge string was a random string, $\omega \oplus m_b$ is also a random string. $\therefore \Pr_r[ \mathcal{B}(r) = 1 ] = \frac{1}{2}$

$$\begin{align*}
\therefore Adv_G(\mathcal{B}) &= \left| \Pr_s[ \mathcal{B}(G(s)) = 1 ] - \Pr_r[ \mathcal{B}(r) = 1 ] \right| \\
&= \frac{1}{2} \cdot \left| \Pr[EXP_{0,\mathcal{E}}(\mathcal{A}) = 1] - \Pr[EXP_{1,\mathcal{E}}(\mathcal{A}) = 1] \right| \\
&= \frac{1}{2} Adv_{\mathcal{E}}(\mathcal{A})
\end{align*}$$
{% endnote %}
