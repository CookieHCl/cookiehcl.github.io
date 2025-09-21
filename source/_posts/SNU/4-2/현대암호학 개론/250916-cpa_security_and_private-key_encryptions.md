---
title: CPA Security and Private-key Encryptions
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
date: 2025-09-16 14:05:41
tags:
---

# Security for multiple encryptions

Generally, a secret key is used more than once.  
We cannot assume single ciphertext attack!

We'll now assume chosen-plaintext attacks (CPA).  
Adversary can control over what the honest parties encrypt.  
The adversary can influence a party to encrypt certain messages and observe the resulting ciphertexts.  
Later the attacker observes a ciphertext of some unknown meessage.

## CPA-security

![CPA indistinguishability experiments](cpa_indistinguishability.png)

1. A key $k \leftarrow Gen$ is generated.
1. The adversary $\mathcal{A}$ is given oracle access to $Enc_k(\cdot)$. i.e. $\mathcal{A}$ can receive any number of ciphertexts $c^* \leftarrow Enc_k(m^*)$ for messages $m^*$ of its choice.
1. $\mathcal{A}$ outputs a pair of messages $m_0, m_1$. A ciphertext $c \leftarrow Enc_k(m_b)$ is computed and given to $\mathcal{A}$.
1. $\mathcal{A}$ continues to have oracle access to $Enc_k(\cdot)$. Then it outputs a bit $b'$.

The advantage of $\mathcal{A}$ is defined to be $Adv_{\mathcal{E}}(\mathcal{A}) = |\Pr[EXP_{0, \mathcal{E}}(\mathcal{A}) = 1] - \Pr[EXP_{1, \mathcal{E}}(\mathcal{A}) = 1]|$.

Def: A private-key encryption scheme $\mathcal{E}$ is indistinguishable under chosen plaintext atack, or simply CPA-secure, if for any efficient $\mathcal{A}$, $Adv_{\mathcal{E}}(\mathcal{A})$ is negligible.

Note that every CPA-secure scheme should be probabilistic!  
If scheme is deterministic, $\mathcal{A}$ can just query $m_0, m_1$.

### CPA-security for Multiple Encryptions

We can extend CPA-security definition to the case of multiple encryptions.  
Instead of single challenge ciphertext $c$, adversary now get lists of challenge ciphertexts, using lists of plaintexts.

![CPA indistinguishability experiments for multiple encryptions](cpa_indistinguishability_multiple.png)

We now give the adversary access to left-or-right oracle $LR_{k,b}(\cdot, \cdot)$. The oracle, on input a pair of messages $(m_0, m_1)$, computes and returns $c \leftarrow Enc_k(m_b)$.  
This is stronger oracle than $Enc_k(\cdot)$, because we can get $Enc_k(m)$ with left-or-right oracle by querying the oracle with $(m, m)$.

1. A key $k \leftarrow Gen$ is generated.
1. The adversary $\mathcal{A}$ is given oracle access to $LR_{k,b}(\cdot, \cdot)$. i.e. $\mathcal{A}$ can receive any number of ciphertext pairs $(c_{i,0}, c_{i,1}) \leftarrow LR_{k,b}(m_{i,0}, m_{i,1})$ for message pairs $(m_{i,0}, m_{i,1})$ of its choice.
1. $\mathcal{A}$ outputs a bit $b'$.

The advantage of $\mathcal{A}$ is defined to be $Adv_{\mathcal{E}}(\mathcal{A}) = |\Pr[EXP_{0, \mathcal{E}}(\mathcal{A}) = 1] - \Pr[EXP_{1, \mathcal{E}}(\mathcal{A}) = 1]|$.

Def: A private-key encryption scheme $\mathcal{E}$ is CPA-secure for multiple encryptions, if for any efficient $\mathcal{A}$, $Adv_{\mathcal{E}}(\mathcal{A})$ is negligible.

Since left-or-right oracle is stronger, if $\mathcal{E}$ is CPA-secure for multiple encryptions, $\mathcal{E}$ is CPA-secure.  
However, it is also known that if $\mathcal{E}$ is CPA-secure, $\mathcal{E}$ is CPA-secure for multiple encryptions! (Although this is very hard to prove...)  
Therefore, two definitions are equivalent!

{% note no-icon Proof %}
Let's assume that $\mathcal{E}$ is not CPA-secure for multiple encryptions, i.e. there exists an adversary $\mathcal{A}$ and non-negligible $\epsilon > 0$ such that

$$|\Pr[EXP_{0, \mathcal{E}}^{multi}(\mathcal{A}) = 1] - \Pr[EXP_{1, \mathcal{E}}^{multi}(\mathcal{A}) = 1]| > \epsilon.$$

Let $Q$ is the total number of queries that $\mathcal{A}$ asks.  
We define the hybrid experimetns $H_i$ for $0 \leq i \leq Q$, where $H_i$ gives $Enc_k(m_0)$ for $i$ queries, then gives $Enc_k(m_1)$ for the remaining $Q-i$ queries.  
Let $p_i \coloneqq \Pr[EXP_{H_i, \mathcal{E}}^{multi}(\mathcal{A}) = 1]$.

$$\begin{align*}
Adv_{\mathcal{E}}(\mathcal{A}) = |p_Q - p_0| &\leq \sum_{i = 1}^Q |p_i - p_{i-1}| \\
\therefore \exists j (1 \leq j \leq Q) \  s.t. \ & |p_j - p_{j-1}| > \frac{\epsilon}{Q}
\end{align*}$$

Now we define adversaries $\mathcal{B_i}$ ($1 \leq i \leq Q$) for CPA-secure experiment.

1. Get queries $(m_{j,0}, m_{j,1})$ from $\mathcal{A}$.
1. For $j < i$, give $Enc_k(m_{j,0})$ to $\mathcal{A}$.
1. For $j = i$, output $(m_{j,0}, m_{j,1})$ as a challenge pair, and give the result $c$ to $\mathcal{A}$.
1. For $j > i$, give $Enc_k(m_{j,1})$ to $\mathcal{A}$.
1. Get $b'$ from $\mathcal{A}$, and output $b'$.

If $b = 0$ (i.e. $c = Enc_k(m_{i,0})$), this is a $H_i$ experiment from $\mathcal{A}$'s point of view.

$$\therefore \Pr[EXP_{0, \mathcal{E}}^{single}(\mathcal{B_i}) = 1] = p_i$$

If $b = 1$ (i.e. $c = Enc_k(m_{i,1})$), this is a $H_{i-1}$ experiment from $\mathcal{A}$'s point of view.

$$\therefore \Pr[EXP_{1, \mathcal{E}}^{single}(\mathcal{B_i}) = 1] = p_{i-1}$$

$$\begin{align*}
&\therefore Adv_{\mathcal{E}}(\mathcal{B_i}) = |p_i - p_{i-1}| \\
&\therefore \exists j (1 \leq j \leq Q) \  s.t. \  Adv_{\mathcal{E}}(\mathcal{B_j}) > \frac{\epsilon}{Q}
\end{align*}$$

Therefore, $\mathcal{B_j}$ can distinguish $\mathcal{E}$ under chosen plaintext attack with a non-negligible probability $\frac{\epsilon}{Q}$.

Since $\mathcal{E}$ is not CPA-secure if it is not CPA-secure for multiple encryptions, $\mathcal{E}$ is CPA-secure for multiple encryptions if $\mathcal{E}$ is CPA-secure.
{% endnote %}

### plaintext length

Definition of secure encryptions does not require the encryption scheme to hide the plaintext length!  
All commonly used encryption schemes reveal the plaintext length (or a close approximation).  
c.f. If the encryption scheme doesn't hide the plaintext length, the adversary must choose messages of the same length in the security game.

It is impossible to support arbitrary length messages while hiding all information about the plaintext length. (However encryption scheme can hide the exact length, while revealing an approximation.)  
This is due to information theory, a set of arbitrary length plaintext is larger than a set of fixed length ciphertext. (The ciphertext has fixed length because we obviously know its length when we receive it.)

In many cases, revealing the plaintext length is acceptable as it is already public or is not sensitive.  
However, leaking the plaintext length can be problematic in some cases. (e.g. simple numberic/text data, compression)

Solution: Pad all messages to some pre-determined length before encrypting them.  
e.g. append 1 followed by several 0's. (message and plaintext have one-to-one correspondence!)  
Now the plaintext's length is fixed and known to the adversary, but we can't get "actual" length of the message!

Note that due to information theory, padded message should be longer than previous message. We cannot have one-to-one correspondence between $\bigcup_{i=1}^n \{0, 1\}^i$ and $\{ 0, 1 \}^n$.

## CPA security from PRF

Recall) Block cipher cannot be CPA secure! (Because block ciphertext is deterministic!)  
e.g. Block cipher will encrypt sex data (man/woman) into $c_m$ or $c_w$... Encryption is meaningless!  
If your security company claims that they encrypted data using a plain block cipher (e.g. AES), don't believe them...  
But we want to use block cipher.... How do we make CPA-secure scheme with block cipher?

Let $F: \{ 0, 1 \}^n \times \{ 0, 1 \}^l \rightarrow \{ 0, 1 \}^l$ be a PRF. Then we can make a construction $\mathcal{E} = (Gen, Enc, Dec)$:

- $Gen$: Choose uniform $k \in \{ 0, 1 \}^n$.
- $Enc_k(m)$: On input a key $k \in \{ 0, 1 \}^n$ and a message $m \in \{ 0, 1 \}^l$, choose uniform $r \in \{ 0, 1 \}^l$ and output the ciphertext $c \coloneqq (r, F_k(r) \oplus m) \in \{ 0, 1 \}^{2l}$.
- $Dec_k(c)$: On input a key $k \in \{ 0, 1 \}^n$ and a ciphertext $c = (r, s)$, output the message $m \coloneqq F_k(r) \oplus s$.

Theorem: For any $q$-query adversary $\mathcal{A}$, there exists a $q$-query adversary $\mathcal{B}$ such that $Adv_{\mathcal{E}}(\mathcal{A}) \leq 2 \cdot \left( Adv_F(\mathcal{B}) + \frac{q}{2^l} \right)$.  
i.e. If F is secure PRF, then the construction is CPA-secure!

{% note no-icon Proof %}
Let $\mathcal{A}$ is an adversary for the CPA indistinguishability experiment.  
We define an adversary $\mathcal{B}$ for PRF experiment.

1. For each query $m$ from $\mathcal{A}$, generate uniformly random $l$ bit string $r$, query $y_r$ ($\mathcal{B}$ gets either $F_k(r)$ or $f(r)$), then give $c = (r, y_r \oplus m)$ to $\mathcal{A}$.
1. For challenge query $(m_0, m_1)$ from $\mathcal{A}$, generate random bit $b \in \{ 0, 1 \}$ and random $l$ bit string $r^*$, query $y_{r^*}$, then give $c_b = (r^*, y_{r^*} \oplus m_b)$ to $\mathcal{A}$.
1. Get the output $b'$ from $\mathcal{A}$.
1. If $b = b'$ (i.e. adversary was correct), output 0 (i.e. this was a PRF).
1. If $b \neq b'$ (i.e. adversary was wrong), output 1 (i.e. this was a random function).

Let $p_{\mathcal{A},b} \coloneqq \Pr[EXP_{b, \mathcal{E}}(\mathcal{A}) = 1]$, $p_{\mathcal{B},b} \coloneqq \Pr[EXP_{b, F}(\mathcal{B}) = 1]$.

If this was a experiment 0 (i.e. PRF was given), this is same experiment from $\mathcal{A}$'s point of view.

$$\begin{align*}
\therefore p_{\mathcal{B},0} &= \Pr[b = 0] \cdot \Pr[EXP_{0, \mathcal{E}}(\mathcal{A}) = 1] + \Pr[b = 1] \cdot \Pr[EXP_{1, \mathcal{E}}(\mathcal{A}) = 0] \\
&= \frac{1}{2} \cdot p_{\mathcal{A},0} + \frac{1}{2} \cdot (1 - p_{\mathcal{A},1}) \\
&= \frac{1}{2} + \frac{1}{2} \cdot (p_{\mathcal{A},0} - p_{\mathcal{A},1})
\end{align*}$$

If this was a experiment 1 (i.e. random function was given), $y_{r^*} \oplus m_b$ is a random string. Therefore, $\mathcal{A}$ cannot distinguish $c_0, c_1$ unless $r^*$ is the same as $r$ from one of the other queries.

$$\therefore \left| p_{\mathcal{B},1} - \frac{1}{2} \right| \leq \Pr[r^* \in \{ r_1, \ldots, r_q \}] \leq \frac{q}{2^l}$$

$$\begin{align*}
\because Adv_F(\mathcal{B}) &= |p_{\mathcal{B},0} - p_{\mathcal{B},1}|, \\
\left| p_{\mathcal{B},0} - \frac{1}{2} \right| &\leq |p_{\mathcal{B},0} - p_{\mathcal{B},1}| + \left| p_{\mathcal{B},1} - \frac{1}{2} \right| \\
&\leq Adv_F(\mathcal{B}) + \frac{q}{2^l} \\
\therefore Adv_{\mathcal{E}}(\mathcal{A}) &= |p_{\mathcal{A},0} - p_{\mathcal{A},1}| \\
&= 2 \cdot \left| p_{\mathcal{B},0} - \frac{1}{2} \right| \\
&\leq 2 \cdot \left( Adv_F(\mathcal{B}) + \frac{q}{2^l} \right)
\end{align*}$$
{% endnote %}

Problem) Expansion rate $\frac{|C|}{|M|}$ is not good.  
Since CPA-secure scheme is probablistic, plaintext can be encrypted to multiple ciphertexts. (i.e. expansion rate is larger than 1.)  
However, an expansion rate of 2 is too high...

# Modes of operation

The previous construction is defined only for the encryption of fixed-length messages. Can we encrypt arbitrary-length messages?  
We can divide a long message into multiple short messages and encrypting them one-by-one.

This is called **mode of operation**: an efficient symmetric-key encryption schemes from block ciphers.

## Electronic Code Book (ECB) Mode

![ECB mode](ecb.png)

$$Enc_k(m) \coloneqq E_k(m_1) \Vert \cdots \Vert E_k(m_L)$$

ECB Mode just concatenate ciphertexts... although this has very serious problems!!!!

Problem 1) Since block cipher is deterministic, ECB mode is also deterministic.  
Generally, secure modes use a uniform initialization vector (IV) to introduce randomness.

![ECB penguin](ecb_penguin.png)

Problem 2) ECB preserves patterns of the original message because same block of message will encrypted to same ciphertext.  
e.g. If every block is just 0s or 1s, this will be encrypted to two different ciphertext... which is very predictable!  
e.g. ECB penguin (in the above) still looks like penguin because same pixels are encrypted to same value.

## Cipher Block Chaining (CBC) Mode

![CBC mode](cbc.png)

1. A uniform initialization vector (IV) is chosen as the initial ciphertext block. ($c_0 \coloneqq IV$)
1. Each ciphertext blocks are generated by applying the block cipher to the XOR of the current plaintext block and the previous ciphertext block. ($c_i \coloneqq E_k(c_{i-1} \oplus m_i)$)

Theorem (Security of CBC mode): If $E: K \times X \rightarrow X$ is a secure PRP, then CBC mode is CPA-secure.  
For any $q$-query adversary $\mathcal{A}$ against $\mathcal{E}_{CBC}$, there exists a PRP adversary $\mathcal{B}$ against $E$ such that

$$Adv_{\mathcal{E_{CBC}}}(\mathcal{A}) \leq 2 \cdot Adv_{E}(\mathcal{B}) + 2\frac{q^2L^2}{|X|}$$

Proof sketch: Each query use $L$ block ciphers, resulting total of $qL$ block ciphers. By birthday paradox, we have $q^2L^2$ term.

This is secure, and have better expansion rate (ciphertext is only l bit longer), but it is not used today.

- Encryption is sequential; Not parallelizable!  
  Note that decryption is parallelizable.
- Decryption need inverse of block cipher.
- We need different algorithms for encryption and decryption.
- The message must be padded to a multiple of the block size. (This can be handled by ciphertext stealing with an extra complexity.)  
  - Since padded message should be longer than the original message, if the message is already a multiple of the block size, padding can be up to block size!
  - Extremely, when sending 1 byte message, message should be padded up to block size.

Warning: CBC mode is not secure if the adversary can predict IV for the next message!  
e.g. A stateful variant of CBC-mode encryption (a.k.a. chained CBC mode) use the last block of the previous ciphertext as the IV of the next message. (This was actually used in SSL 3.0 and TLS 1.0!!!!!)  
This is vulnerable to a chosen-plaintext attack! (And again, this was used in SSL 3.0 and TLS 1.0!)  
Lesson: **NEVER** make modifications to cryptographic schemes, even if those modifications seem benign.

## Counter (CTR) Mode

![CTR Mode](ctr.png)

1. A uniform initialization vector (IV) is chosen as the initial ciphertext block. ($c_0 \coloneqq IV$)
1. Each ciphertext blocks are generated by applying the block cipher to $IV + i$, then XORing with the current plaintext block. ($c_i \coloneqq F_k(IV + i) \oplus m_i$)

Technically, $IV$ is a random string, but we view as number and compute $IV + i$.

Theorem (Security of CTR mode): If $F: K \times X \rightarrow X$ is a secure PRF, then CTR mode is CPA-secure.  
For any $q$-query adversary $\mathcal{A}$ against $\mathcal{E}_{CTR}$, there exists a PRF adversary $\mathcal{B}$ against $F$ such that

$$Adv_{\mathcal{E_{CTR}}}(\mathcal{A}) \leq 2 \cdot Adv_{F}(\mathcal{B}) + 2\frac{q^2L}{|X|}$$

Proof sketch: Each query use $L$ block ciphers, resulting total of $qL$ block ciphers. However, because we are using consecutive strings ($IV+1$ ~ $IV+L$) instead of random $L$ strings, collision probability is $q^2L$ instead of $q^2L^2$.

This is a complete upgrade over CBC mode!

1. We only need PRF instead of PRP!
1. Encryption/decryption is parallelizable!  
  In fact CTR can precompute encryption! We generate IV and precompute block ciphers before receiving message.
1. Factor is $q^2L$ instead of $q^2L^2$!  
  This means that CTR takes less time to change keys than CBC.
  This was meaningless when CBC came out, (old systems didn't track $q, L$ at all) but it's important nowadays because of too many queries.
1. CTR can reuse same algorithm for encryption/decryption!
1. CTR doesn't need padding!

## Nonce-based Encryption

IV should be random and generated for each message. This is very tedious...  
Instead, we can make nonce-based encryption, where the encryption and decryption algorithms additionally accept a nonce as input. $Enc_k(m,n)$

- Nonce should be used once, and never repeated.
- Nonce doesn't have to be a true random string, it can be a counter value, or the current time!  
  This is useful for lightweight systems where generating high-quality randomness is expensive or impossible.  
  You can even reveal the nonce, and it's still secure!
- Since nonce provides sort of non-deterministic way, encryption/decryption algorithm can be deterministic (and it's still secure)!  
  CPA security definition can be defined in a similar manner, but the adversary cannot choose the same nonce more than once during the security game.

Nonce-based encryption is very good!  
However, it's not suitable for communicating with millions of clients. (You have to ensure that each client's nonce is unique!)  
Generating IV from your side is much easier and faster way to achieve security.
