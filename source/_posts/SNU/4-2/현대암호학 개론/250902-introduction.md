---
title: Introduction
categories:
  - SNU
  - 4-2
  - 현대암호학 개론
abbrlink: 99
date: 2025-09-02 09:33:36
tags:
---

# Cryptography

1. 1G: Classical Cryptography  
  (Oxford) The art of writing or solving "codes"  
  Is wasn't even called cryptography...
1. 2G: Modern Cryptography  
  Research has been active enough to establish cryptography since the 1970s
1. 3G: Advanced Cryptography
  The real "modern cryptography"

The book only focus on 1970s modern cryptography... But we will learn some advanced cryptography too.

## What is cryptography?

~~Not cryptocurrency~~

Is cryptography cyber security?  
Sort of... Cryptography can be viewed as a subcategory of cyber security, but it deals with a much more primitive level.

Cyber security - Talks about software security, hardware security, ...
Cryptography - Talks about file encryption, data integrity, ...

Cryptography is not a panacea!  
e.g. Offline attack (rubber-hose attack): Instead of attacking victim's device, attack victime directly...  
e.g. Side-channel attack: Measure physical information (temperature, program's running time) to extract data

Cryptography is all about encryption schemes: definition of how to encrypt (or decrypt) messages

Classical cryptography used deterministic encryption scheme, but modern cryptography uses probablistic encryption scheme.

## Kerckhoffs' Principle

> The cipher method must not be required to be secret, and it must be able to fall into the hands of the enemy without inconvenience.

i.e. An encryption scheme should be designed to be secure even if an eavesdropper knows all the details of the scheme.  
i.e. Security should rely solely on secrecy of the key (not secrecy of the encryption scheme).

It is VERY EASY for an encryption scheme to be leaked.  
e.g. reverse engineering, leak by employee, ...

# Classical cryptography

Usually we assume private-key encryption scheme.  
A private-key encryption scheme is defined by specifying a message space $M$ and a key space $K$ along with three algorithms: key generation $Gen$, encryption $Enc$, and decryption $Dec$.

- $Gen(\cdot)$ is a probabilistic algorithm tjhat outputs a key $k \in K$ chosen according to some distribution. (e.g. uniform distribution)
- $Enc_k(m)$ takes a key $k$ and a message $m$ as a input and outputs a ciphertext $c$.
- $Dec_k(c)$ takes a key $k$ and a ciphertext $c$ as a input and outputs a plaintext $m$.
- $\forall k \leftarrow Gen(\cdot), \forall m \in M, Dec_k(Enc_k(m)) = m$

## Shift Cipher (Ceasar Cipher)

Classic Cipher (e.g. a -> d, b -> e, ...)

- $M = K = \{ 0, 1, \ldots, 25\}$
- $G(\cdot) = k \in \{ 0, 1, \ldots, 25\}$
- $Enc_k(m_i) = (m_i + k) \bmod 26$
- $Dec_k(c_i) = (c_i - k) \bmod 26$

The biggest problem: $|K| = 26$  
Exhaustive search (brute-force attack) works!

## Substitution Cipher

Now the key is chosen as arbitrary permutation of the alphabet.  
Now the key space is sufficiently large! $|K| = 26! \approx 2^{88.4}$  
However, frequency analysis can break it...

c.f. We call an encryption scheme is a n-bit security level if the attacker must perform $2^n$ operations to break it.  
128-bit security level is considered the baseline for safety, but 80-bit security level is also quite secure.

c.f. Bitcoin hashrate (number of computed hash) has already surpassed $2^80$.  
Note that computing a hash requires several operations!  
In theory, if everyone in the world worked together, an 80-bit security level could be broken..?

## Enigma

Each keystroke rotates rotor, just like 4-digit base-26 number. $|K| = 26^4 \approx 2^{18}$  
The enigma machine also had an additional secondary key called a plugboard. Total size of key space is about $|K| \approx 2^{36}$!

It was a perfect encryption scheme that couldn't be cracked  by the computers used back then!  
But stupid German army used the same code for several days in a row when they were supposed to change it daily...

# Modern cryptography

Historical approach didn't have an agree-upon notion of what requirements a secure scheme should satisfy.  
Schemes were designed in an heuristic manner: If any attack is found, the scheme would be patched to thwart that attack.

Modern cryptography have a formal definitions of security - with assumptions and proofs.  
Its scope is much broader than just encryption; e.g. authentication, protocols, group communication

## Terminology

Alice sends data to Bob, but Eve (name from the word eavesdropper) tries to steal the data.

- Privacy: Eve should not be able to read message.
- Integrity: Eve should not be able to modify message.
- Authenticity: Bob should know that message is really originated from Alice.

# Advanced crpytography

Previously, we only needed that the data transmission is secure.  
Nowdays, we also have to guarantee that the data transmission, storing data, and using data is secure.

We should protect computation, not just data itself!  
a.k.a. Privacy-Enhancing Cryptography (PEC)

Central theorem (what cryptographers want to believe): Anything that can be done with a trusted authority can also be done without it!  
Ironically, that's why cryptographers never assumes trusted authority.

## Internet Casino Problem

Player gives Casino $1 and $G$ (Guess).  
Casino draw $T$ (target) randomly from 1~100, and give $d$ (reward) to Player.  
If $G = T$, casino gives $200.  
If $G \neq T$, casino gives $0.

Theoretically, expected value of $d$ is $2, so you should play it!  
Problem: Casino can cheat... How can we ensure safe internet casino?

Player and casino need to exchange G, T that satisfies:

- Casino cannot choose T as a function of G
- Player cannot choose G as a function of T

![Internet Casino](internet_casino.png)

1. Player gives Casino $1 and $G$ in the box.
1. Casino gives Player T.
1. Player gives Casino the key (for the $G$ in the box).
1. Casino gets $G$ with the key and give Player d according to the G.

This is perfect scheme for the player... but now player can cheat!  
If we make message well enough, we can make a box that can be decrypted into any number!  
Player first look at T, and then give $k_T$ that decrypts the box into T.

How can we prevent casino or player from cheating?

## Mutual Interest

Alice and Bob have a secret - their mutual interest toward each other.  
If they both have mutual interest toward each other, they will go on a date!  
But Alice and Bob don't want to share its mutual interest to each other.  
(Of course, you will eventually know other's mutual interest if you say YES, but you don't want to know other's mutual interest if you say NO.)

![Five-Card Trick](five_card_trick.png)

A simple(?) solution with pen and paper exists!  
Alice and Bob place the smiley face in correct position if they say YES, and place in wrong position if they say NO.  
Then, Alice and Bob rotate the smiley face without watching it.  
If smiley face appears, both said YES!  
If smiley face isn't present, someone said NO...  
~~Try using this on a date!~~

## Card shuffling

Alice wants to convince Bob that she can distinguish two cards, but she doesn't want to reveal any information about the cards.

1. Alice arranges the cards in order and gives them to Bob.
1. Bob may or may not shuffle the cards.
1. Alice answers whether or not the cards have been shuffled.
1. Since Alice can guess the answer with a 50% probability, Alice and Bob repeat this process (about 100 times).

## Privacy-preserving personalized services

Can we get personalized services without actually providing personal data?

In fact this is possible!  
But for *technological advancement* of AI, companies/government are recklessly collecting data...  
~~Cryptographers are hoping for a major crisis to break out in order to adopt privacy-preserving personalized services.~~
