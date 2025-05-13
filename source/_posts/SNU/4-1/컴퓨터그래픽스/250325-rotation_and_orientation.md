---
title: Rotation and Orientation
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 61
date: 2025-03-25 11:05:15
tags:
---

# What is Rotation?

Rotation is very nonintuitive;

In geometry, rotation is a movement that keeps at least one point fixed.  
But in physics, rotation is extremely complex!

Intermediate axis theorem: Rotation around major and minor axis is stable, but rotation around intermediate axis is unstable!  
The rotation axis keeps chaning, and the object can even be flipped!

## Orientation vs. Rotation

Orientation is the state of being oriented.  
Given a coordinate system, the orientation of an object can be represented as a rotation relative to a reference pose (similar to origin)

Rotation is a circular movement.

# 2D Orientation

Just use angle, right?

Problem: Object has same orientation if it makes a full turn.  
e.g. What is the middle orientation between $\frac{\pi}{2}$ and $\frac{5\pi}{2}$?  
We can't just average the numbers!

Solution: Add extra parameters and constraints.  
We represent 2D rotation as a complex number $a + bi$, but it's constrained to the unit circle $a^2 + b^2 = 1$.

Multiplying rotation is equal to a composition of rotation!!  
In fact, it's actually $e^{i\theta} = \cos\theta + i \sin\theta$.

# 2D Rotation

We can't use complex number for rotation;  
We have to distinguish between 1 full turn and 2 full turns.

We'll just use angle to represent 2D rotations. (as we've been doing)  
Unlike point and vectors, we have to choose different representation for rotation and orientation.

# 3D Rotation

Euler's rotation theorem: The general displacement of a rigid body with one point fixed is a rotation about some axis.  
i.e. any 3D rotation can be represented as a one rotation around an axis.

- Axis-angle: Use 4 parameters. $(\theta, x, y, z)$
- Rotation vector: Use only 3 parameters! $\mathbf{v} = \theta\hat{\mathbf{v}}$  
  Vector's direction represents axis, and vector's magnitude represents angle.

Rotation vector is better!

# 3D Orientation

## Euler parameters

Euler angle has gimbal lock problem.  
We can use 4 parameters to solve gimbal lock problem,

$$e_o = \cos\frac{\theta}{2}, (e_1, e_2, e_3) = \hat{\mathbf{v}}\sin\frac{\theta}{2}$$

where $\theta$ is rotation angle and $\hat{\mathbf{v}}$ is rotation axis.

But how do we use this?

## Quaternions

$w + ix + jy + kz$ where $i^2 = j^2 = k^2 = ijk = -1, ij = k, jk = i, ki = j, ji = -k, kj = -i, ik = -j$

c.f. Trinion(?) can't exist! It's proven that you can't define multiplication in tirion.

We can represent quaternions as a scalar and a vector!

$$\begin{align*}
\mathbf{q} &= w + xi + yj + zk \\
&= (w, x, y, z) \\
&= (w, \mathbf{v})
\end{align*}$$

## Rotation as Unit Quaternion

We use unit quaternions, i.e. $w^2+x^2+y^2+z^2 = 1$.

$$\begin{align*}
\mathbf{q}_1 \mathbf{q}_2 &= (a, \mathbf{u}) (b, \mathbf{v}) \\
&= (ab - \mathbf{u}\cdot\mathbf{v}, a\mathbf{v} + b\mathbf{u} + \mathbf{u} \times \mathbf{v})
\end{align*}$$
$$ (w, x, y, z)^{-1} = (w, -x, -y, -z) = (-w, x, y, z) $$

We use euler parameters as a quaternion. Rotating $\theta$ along axis $\hat{\mathbf{v}}$ is represented as $(\cos\frac{\theta}{2}, \hat{\mathbf{v}}\sin\frac{\theta}{2})$.  
We represent 3D vectors $(x, y, z)$ as a pure imaginary Quaternions $(0, x, y, z)$.  
Then rotating vector $\mathbf{x}$ about rotation $\mathbf{q}$ is represented as $\mathbf{x}' = \mathbf{q}\mathbf{x}\mathbf{q}^{-1}$.

## Antipodal Equivalence

$\mathbf{q}$ and $-\mathbf{q}$ represents same rotation.

Mathmatically saying, this is a 2-to-1 mapping between $S^3$ (surface of unit sphere in 4D space) and SO(3).  
That's why we have to use $\frac{\theta}{2}$ instead of $\theta$!

## Why not use rotation matrix?

Every representation have a conversion between two.  
But it's challenging due to differences in conventions.  

Unit quaternion is the most efficient method!  
It's very similar to rotation matrix, and has fewer paramers.  
Also, normalizing matrix is very hard (Gram-Schmidt Process), while normalizing quaternion is easy.

e.g. Quaternion to Rotation matrix

$$R = \begin{bmatrix}
q_0^2 + q_x^2 - q_y^2 - q_z^2 & 2q_xq_y - 2q_0q_z & 2q_xq_z + 2q_0q_y & 0 \\
2q_xq_y + 2q_0q_z & q_0^2 - q_x^2 + q_y^2 - q_z^2 & 2q_yq_z - 2q_0q_x & 0 \\
2q_xq_z - 2q_0q_y & 2q_yq_z + 2q_0q_x & q_0^2 - q_x^2 - q_y^2 + q_z^2 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}$$

## Tangent Vector

Tangent space of a point $\mathbf{q}$ on $S^3$ is three-dimensional space of quaternions, $T_{\mathbf{q}} S^3$.

If a point $\mathbf{q}$ is given, we apply $\mathbf{q}^{-1}$ and use tangent space $T_I S^3$. ($I = (1,0,0,0)$)  
Every vector in $T_I S^3$ is purely imaginary quaternion - i.e. real part should be 0 such as (0, x, y, z).  
We call tangent vector $\dot{\mathbf{q}}$ is a vector from I to the projection of $\mathbf{q}$ onto $T_I S^3$.  
$\dot{\mathbf{q}}$ isn't related to velocity, but it is related to angular velocity. $\omega = 2\mathbf{q}^{-1}\dot{\mathbf{q}}$

### Exp and Log

We define log as a map from $\mathbf{q}$ to $\dot{\mathbf{q}}$, and exp as a map from to $\dot{\mathbf{q}}$ to $\mathbf{q}$.  
i.e. log is a map from $S^3$ to $T_I S^3$, following the shortest path on the sphere, a.k.a. the great arc.

Exp maps 3D vector (in form of purely imaginary quaternion) to quaternion.  
i.e. it maps 3D rotation vector to a corresponding rotation quaternion.

$$\exp(\mathbf{v}) = \exp(\theta\hat{\mathbf{v}}) \coloneqq (\cos\theta, \hat{\mathbf{v}}\sin\theta)$$

Note that rotation quaternion of rotation vector $\theta\hat{\mathbf{v}}$ is $\exp(\frac{\theta}{2}\hat{\mathbf{v}})$!!!

## Rotation Vector

Let's say if you rotate orientation $\mathbf{q}_1$ by the rotation vector $\mathbf{v}$, you get orientaiton $\mathbf{q}_2$. i.e. $\mathbf{q}_2 = \mathbf{q}_1\exp(\mathbf{v})$.

If we apply $\mathbf{q}_1^{-1}$, rotation vector $\mathbf{v}$ is a rotation from $I$ to $\mathbf{q}_1^{-1}\mathbf{q}_2$.  
Therefore, $\mathbf{v}$ is a projection of $\mathbf{q}_1^{-1}\mathbf{q}_2$, i.e. $\mathbf{v} = \log(\mathbf{q}_1^{-1}\mathbf{q}_2)$

Now we get rotation quaternion from $\mathbf{q}_1$ to $\mathbf{q}_2$ is $\exp(\log(\mathbf{q}_1^{-1}\mathbf{q}_2))$.  
i.e. $\mathbf{q}_2 = \mathbf{q}_1\exp(\log(\mathbf{q}_1^{-1}\mathbf{q}_2))$.

### Finite rotation

e.g. Angular displacement

We can't just add rotation vectors in 3D!

$$e^u e^v \neq e^{u+v} \neq e^v e^u$$

### Infinitesimal rotation

e.g. Instantaneous angular velocity

Addition of angular velocity is possible.

### Spherical Linear Interpolation (SLERP)

Linear interpolation of two orientations!

We interpolate great arc between two orientations.  
Regarding radians, we can think of this as an interpolation of angle.

![SLERP](slerp.png)

$$\begin{align*}
\operatorname{slerp}_t(q_1, q_2) &= q_1\exp(t \cdot \log (q_1^{-1}q_2)) \\
&= q_1(q_1^{-1}q_2)^t
\end{align*}$$

Unlike interpolating with Euler angles or rotation vectors, slerp interpolates along the shortest route (i.e. straight line path).

## Coordinate-Invariant Operations

![Coordinate-Invariant Operations](coordinate_invariant_operations.png)

- orientation is quaternion representing orientation.
- exp of rotation vector is quaternion representing rotation.
- $q_1^{-1}q_2$ is quaternion representing rotation.
- power of quaternion representing rotation is well defined. $(q_1^{-1}q_2)^t = \exp(t \cdot \log (q_1^{-1}q_2))$
- power of quaternion representing orientation is only defined when power is 0 or 1.

### Adding rotation vectors

Quaternion multiplication is non‑commutative.

$$e^ve^u \neq e^ue^v$$

If we divide rotation into half, it's still non-commutative, but the difference has decreased.

$$e^{\frac{u}{2}}e^{\frac{v}{2}}e^{\frac{u}{2}}e^{\frac{v}{2}} \neq e^{\frac{v}{2}}e^{\frac{u}{2}}e^{\frac{v}{2}}e^{\frac{u}{2}}$$

If we divide rotation infinitely, we can swap the rotations!  
We define this as the **addition** of the rotation vectors.

$$e^{u+v} \coloneqq \lim_{n\to\infty} (e^{\frac{u}{n}}e^{\frac{v}{n}})^n = \lim_{n\to\infty} (e^{\frac{v}{n}}e^{\frac{u}{n}})^n$$

### Affine combination of orientations

There are some definitions about affine combination of orientations.  
But it's very complex, and each definitions results different orientations.
