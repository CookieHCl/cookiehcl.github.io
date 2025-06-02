---
title: Network Security
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
date: 2025-05-28 16:16:18
tags:
---

# Network security

- Confidentiality: only sender, intended receiver should understand message contents
  - Sender encrypts message
  - Receiver decrypts message
- Authentication: sender, receiver want to confirm identity of each other
- Message integrity: sender, receiver want to ensure message not altered (in transit, or afterwards) without detection
- Access and availability: services must be accessible and available to users

## Attacks on internet security

Bob and Alice want to communicate securely each other.  
Trudy (intruder) may interrupt!

- Eavesdrop: intercept messages
- Actively insert messages into connection
- Impersonation: can fake (spoof) source address in packet (or any field in packet)
- Hijacking: take over ongoing connection by removing sender or receiver, then inserting himself in place
- Denial of Service: prevent service from being used by others (e.g. by overloading resources)

# Cryptography

Alice wants to send a plaintext message $m$.  
She sends a ciphertext $K_A(m)$ encrypted with her encryption key $K_A$.
Bob decrypt it with Bob's decryption key $K_B$, and get the original message $m$.

## Breaking an encryption scheme

- Cipher-text only attack: Trudy has ciphertext she can analyze.
  - Brute force: Search through all keys
  - Statistical analysis
- Known-plaintext attack: Trudy has plaintext and corresponding ciphertext. (e.g. ciphertext for a, b, c, ...)
- Chosen-plaintext attack: Trudy can get ciphertext for chosen plaintext.

## Symmetric key cryptography

Bob and Alice share same (symmetric) key $K_S$.  
Bob and Alice should agree on key value.

### Substitution cipher

Substitute one letter for another.  
Encryption key is mapping from set of 26 letters (alphabets) to set of 26 letters.

We can also use n subtitution ciphers (e.g. $M_1, M_2, M_3, M_4, M_5$) and cycling pattern. (e.g. $M_1, M_3, M_4, M_5, M_2$).

For each new letter, use subsequent substitution pattern in cyclic pattern.  
e.g. When encrypting *dog*, encrypt *d* with $M_1$, encyrpt *o* with $M_3$, then encrypt *g* with $M_4$.  
Encryption key is n substitution ciphers and cyclic pattern.

### Attack on Substitution cipher

If input is same, output is always same! Statistical analysis can be used to get the mapping.

## DES, AES

DES (Data Encyrption Standard) is US encryption standard, (NIST 1993) but it can be decrypted in less than a day with bruteforce.  
However, there are no known good analytic attack.  
3DES was used briefly, which encrypt 3 times using DES, with 3 different keys.

Later AES replaced DES in November 2001.  
Brute force decryption takes 149 trillion years for AES.  
This is widely used, and even CPU and datacenter network cards have hardware implementation for AES.

## Public key cryptography

Alice and Bob have public key and private key.  
Public encryption key is known to everyone, but private decryption key is known only to them.

1. Alice encrypt plaintext message $m$ with Bob's public key $K_B^+$.
1. Bob decrypt ciphertext $K_B^+(m)$ with Bob's private key $K_B^-$.

Ciphertext can't decrypted with public key!  
We can just open public key to anyone.

### Requirements of public key cryptography

- Private key can decrypt message encrypted with public key.
- Private key can't be computed from public key.

Obviously, public key and private keys are paired!  
We cannot change only one of the keys.

### RSA (Rivest, Shamir, Adelson) algorithm

Every message can be represented as bit pattern, and bit pattern can be uniquely represented by an integer number.  
Therefore, we can encrypt any message if we can encrypt any number.

RSA is actually slower than AES, so normally we use RSA to only establish secure connection.  
First, Bob and Alice use RSA to exchange a symmetric session key.  
Then, they use symmetric key cryptography to actually send the data.

#### Creating public/private key pair

1. Choose two large prime numbers p, q. (Normally 1024 bits)
1. $n = pq, z = (p - 1)(q - 1)$.
1. Choose $e < n$ that has no common factors with $z$. (i.e. e and z are relatively prime)
1. Choose $d$ such that $ed-1$ is divisible by $z$. (i.e. $ed \bmod z = 1$)
1. Public key is $K_B^+ = (n, e)$, and private key is $K_B^- = (n, d)$.

#### Encryption and decryption of RSA

- To encrypt message $m < n$, compute $c = m^e \bmod n$.
- To decrypt ciphertext $c$, compute $m = c^d \bmod n$.

Euler's Theorem states that if $\gcd(x, n) = 1$, then $x^z \equiv 1 \mod n$.  
Recall) $n = pq, z = (p-1)(q-1)$.

Therefore, $\forall x,y, x^y \bmod n = x^{y \bmod z} \bmod n$ if $\gcd(x, n) = 1$.

$$\begin{align*}
\therefore c^d \bmod n &= \left( m^e \bmod n \right)^d \bmod n \\
&= m^{ed} \bmod n \\
&= m^{ed \bmod z} \bmod n \\
&= m^1 \bmod n \\
&= m
\end{align*}$$

In fact, public key and private key can be applied in any order!

$$\left( m^e \bmod n \right)^d \bmod n = m^{ed} \bmod n = \left( m^d \bmod n \right)^e \bmod n$$

#### Attacking RSA?

To get a private key from public key, essentially you need to find factors of $n$.  
Howevery, factoring a big number is very hard!

If quantum computers are commercialized, prime factorization will become easier and RSA will be vulnerable.  
There are post-quantum cryptography which is safe even when quantum computers are used.

# Authentication

Goal: Bob wants Alice to prove her identity to him

## ap1.0

Alice says *"I am Alice"*, but Trudy can do the same..

## ap2.0

Alice says *"I am Alice"* with Alice's IP address, but Trudy can do the same... (Packet spoofing)

## ap3.0

Alice says *"I am Alice"* with Alice's password, but Trudy can record and repeat Alice's packet. (Playback attack)

(Alice can encrypt her password with Bob's public key, but playback attack still works)

## ap4.0

Alice says *"I am Alice"*, then Bob send nonce to Alice.  
Nonce is a random number used only once-in-a-lifetime.  
Alice must return nonce, encrypted with shared secret key.

This works, but how do we get shared secret key in the first place?

## ap5.0

Alice says *"I am Alice"*, then Bob send nonce to Alice.  
Alice return nonce encrypted with Alice's private key.  
Bob gets Alice's public key, then verify nonce.  
Afterwards, Bob send message to Alice using Alice's public key!

Also called challenge-response protocol!

Recall) RSA can swap private/public keys! Encrypted message with private key can decrypted with public key.

### Man in the middle (MITM) attack

![Man in the middle attack](mitm_attack.png)

Problem: We don't verify whether public key actually belongs to Alice!

Trudy poses as Alice to Bob, and as Bob to Alice.  
Bob gets Trudy's public key instead of Alice's public key!  
Trudy can read every message (or even modify it).

# Message Integrity

## Digital Signatures

Goal: Verifable and nonforgeable. Recipient (Alice) can prove to someone that sender (Bob), and no one else, must have signed document.

1. Bob sends message m with signature $K_B^-(m)$. (message encrypted with Bob's private key)
1. Alice verifies signature with Bob's public key.
1. If $K_B^+(K_B^-(m)) = m$, Alice can verify that:
    1. Bob signed m
    1. No one else signed m
    1. Bob signed m and not m'

## Message digests

It is computationally expensive to encrypt/decrypt long messages.  
Goal: We need fixed-length, easy-to-compute digital fingerprint!

Instead of the entire message, we apply hash function to message, then encrypte it.  
Hashed message is called message digest.

1. Bob sends message m with signature $K_B^-(H(m))$.
1. Alice receives m, and apply hash function to get $H(m)$.
1. Alice verifies signature with Bob's public key, then check if $K_B^+(K_B^-(H(m))) = H(m)$.

### Hash function algorithms

MD5 was widely used, but deprecated due to vulnerability. (Collisions can made in less than 1 second)  
SHA-1 is used, but it was not secure enough, and it should be phased out by 2030.

Currently SHA-256 is used.  
We can get more secure hash function by increasing hash length. (e.g. SHA-512, SHA-3)  
But secure hash functions are slower, so SHA-256 is favored.

## Public key certification authorities (CA)

Problem: Signature doesn't help MITM atack, we still doesn't know whether the public key belongs to Alice!  
We need a way to verify which public key belongs to an entity.

CA binds public key to particular entity.  
When entity E registers its public key with CA, CA creates certificate binding identity E to its public key.  
Essentially it is a E's public key encrypted with CA's private key. $K_{CA}^-(K_E^+)$.  
Receiver can verify certificate with CA's public key to get E's public key. $K_{CA}^+(K_{CA}^-(K_E^+)) = K_E^+$.

Problem: How do we even believe CA?? + How do we get CA's public key in the first place?  
Solution: Browsers hardcode known CA's public keys...

solutions: CA public key는 browser에 있음

# Secure message

How can Alice send message m to Bob, with confidentiality, message integrity, and authentication?

1. Alice generates message digest with Alice's private key. $K_A^-(H(m))$.
1. Combine message and message digest to one message. (Message integrity, Authentication) $M = m + K_A^-(H(m))$
1. Alice generates random symmetric private key $K_S$.
1. Alice encrypts message with symmetric key. $K_S(M)$
1. Bob needs to know the symmetric key too, Alice encrypts symmetric key with Bob's public key. $K_B^+(K_S)$
1. Alice sends Bob $K_S(M)$ and $K_B^+(K_S)$. (Confidentiality)

Alice need three keys: Alice's private key, Bob's public key, new symmetric key.

1. Bob decrypt $K_B^+(K_S)$ with his private key and recover $K_S$.
1. Bob decrypt $K_S(M)$ with $K_S$ and recover $M = m + K_A^-(H(m))$.
1. Bob apply hash function to message. $H(m)$
1. Bob decrypt message digest using Alice's public key. $K_A^+(K_A^-(H(m)))$
1. Bob verify whether two are same.
