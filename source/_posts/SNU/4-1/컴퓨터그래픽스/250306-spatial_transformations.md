---
title: Spatial Transformations
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 36
date: 2025-03-06 12:03:27
tags:
---

# Recall) Linear transformation

Linear transformation $T_L$ is a mapping between vector spaces.  
Linear combination is invariant under $T_L$.

$$T_L\left(\sum_{i=0}^{N}c_i\mathbf{v}_i\right) = c_0T_L(\mathbf{v}_0) + \cdots + c_NT_L(\mathbf{v}_N)$$

In 3D space, $T_L$ can be represented by a 3x3 matrix $A$.

$$T_L(\mathbf{v}) = A_{3 \times 3}\mathbf{v}_{3 \times 1}$$

## Examples of linear transformation

- 2D rotation $\begin{bmatrix}\cos\theta & -\sin\theta\ \\ \sin\theta & \cos\theta \end{bmatrix}$
- 2D scaling $\begin{bmatrix}s_x & 0 \\ 0 & s_y \end{bmatrix}$
- 2D shear
  - along x-axis $\begin{bmatrix}1 & s \\ 0 & 1 \end{bmatrix}$
  - along y-axis $\begin{bmatrix}1 & 0 \\ s & 1 \end{bmatrix}$
- 2D reflection
  - along x-axis $\begin{bmatrix}1 & 0 \\ 0 & -1 \end{bmatrix}$
  - along y-axis $\begin{bmatrix}-1 & 0 \\ 0 & 1 \end{bmatrix}$
- 3D rotation
  - along x-axis (pitch) $\begin{bmatrix}1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{bmatrix}$
  - along y-axis (yaw) $\begin{bmatrix}\cos\psi & 0 & \sin\psi \\ 0 & 1 & 0 \\ -\sin\psi & 0 & \cos\psi \end{bmatrix}$
  - along z-axis (roll) $\begin{bmatrix}\cos\phi & -\sin\phi & 0 \\ \sin\phi & \cos\phi & 0 \\ 0 & 0 & 1 \end{bmatrix}$

Any linear transformation between 3D spaces can be represented as a combination of rotation, shear, and scaling.  
In fact, rotation can be represented as a combination of scaling and two-axes shear, or as a combination of two one-axis shear transformation!  
This can be efficient than computing cosine and sine values.

## Linear transformation as a change of basis

Array is usually written as column-major Representation.

$$ \bm{A}\mathbf{v} = \begin{bmatrix}
\mathbf{a}_1 & \mathbf{a}_2 & \mathbf{a}_3
\end{bmatrix} \begin{bmatrix}
x \\ y \\ z
\end{bmatrix}$$

In fact, each column is a linear tranform of basis.

$$\mathbf{a}_1 = \bm{A}\begin{bmatrix}
1 \\ 0 \\ 0
\end{bmatrix}, \mathbf{a}_2 = \bm{A}\begin{bmatrix}
0 \\ 1 \\ 0
\end{bmatrix}, \mathbf{a}_3 = \bm{A}\begin{bmatrix}
0 \\ 0 \\ 1
\end{bmatrix}$$

Instead of viewing linear transformation as transforming vector, we can view as changing basis.  
e.g. Instead of thinking as shearing, we can view as moving x-axis.

$$\begin{align*}
x\mathbf{v}_0 + y\mathbf{v}_1 &= x'\mathbf{v}'_0 + y'\mathbf{v}'_1 \\
\begin{bmatrix} \mathbf{v}_0 & \mathbf{v}_1 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} &= \begin{bmatrix} \mathbf{v}'_0 & \mathbf{v}'_1 \end{bmatrix} \begin{bmatrix} x' \\ y' \end{bmatrix} \\
\begin{bmatrix} \mathbf{v}'_0 & \mathbf{v}'_1 \end{bmatrix}^{-1} \begin{bmatrix} \mathbf{v}_0 & \mathbf{v}_1 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} &= A\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} x' \\ y' \end{bmatrix}
\end{align*}$$

# Affine transformation

Affine transformation $T_A$ is a mapping between affine spaces.  
$T_A$ maps vectors to vectors, and points to points.  
$T_A$ is a linear transformation on vectors.  
Affine combination is invariant under $T_A$.

$$T_A\left(\sum_{i=0}^{N}c_i\mathbf{p}_i\right) = c_0T_A(\mathbf{p}_0) + \cdots + c_NT_A(\mathbf{p}_N)$$

In 3D space, $T_A$ can be represented by a 3x3 matrix $A$ with a 3x1 translation vector.

$$T_A(\mathbf{p}) = A_{3 \times 3}\mathbf{p}_{3 \times 1} + \mathbf{t}_{3 \times 1}$$

## Homogeneous Coordinates

With homogeneous coordinates, any affine transformation between 3D spaces can also be represented by a 4x4 matrix.

$$T_A(\mathbf{p}) = \begin{bmatrix}
A_{3 \times 3} & \mathbf{t}_{3 \times 1} \\
0 & 1
\end{bmatrix}\begin{bmatrix}
\mathbf{p}_{3 \times 1} \\ 1
\end{bmatrix} = \begin{bmatrix}
A_{3 \times 3}\mathbf{p}_{3 \times 1} + \mathbf{t}_{3 \times 1} \\
1
\end{bmatrix}$$

$$T_A(\mathbf{v}) = \begin{bmatrix}
A_{3 \times 3} & \mathbf{t}_{3 \times 1} \\
0 & 1
\end{bmatrix}\begin{bmatrix}
\mathbf{v}_{3 \times 1} \\ 0
\end{bmatrix} = \begin{bmatrix}
A_{3 \times 3}\mathbf{v}_{3 \times 1}\\
0
\end{bmatrix}$$

## Examples of affine transformation

Obviously linear transformations (rotation, scaling, shear, reflection) are affine transformations

- 2D translation $\begin{bmatrix}1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1\end{bmatrix}$

## Composite transformation

- 2D translation $T(\mathbf{t}_2) \cdot T(\mathbf{t}_1) = T(\mathbf{t}_2 + \mathbf{t}_1)$
- 2D scaling $S(\mathbf{s}_2) \cdot S(\mathbf{s}_1) = S(\mathbf{s}_2 \odot \mathbf{s}_1)$ ($\odot$ is hadamard product, i.e. element-wise multiplication)  
- 2D rotation $R(\theta_2) \cdot R(\theta_1) = R(\theta_2 + \theta_1)$

### Order of matrix multiplication

Let $T(\mathbf{p}) = T_x(3) \cdot R(-90\degree) \cdot \mathbf{p}$.

![R to L multiplication](RL_multiplication.png)

R to L multiplication interpret operations with respect to world coordinates.

![L to R multiplication](LR_multiplication.png)

L to R multiplication interpret operations with respect to moving local coordinates.

### Using translation

- Pivot-point rotation $T(\mathbf{p}) \cdot R(\theta) \cdot T(-\mathbf{p})$
- Fixed-point scaling $T(\mathbf{p}) \cdot S(\mathbf{s}) \cdot T(-\mathbf{p})$
- Scaling along arbitrary axis $R(-\theta) \cdot S(\mathbf{s}) \cdot R(\theta)$

## Properties of affine transformations

Any affine transformation between 3D spaces can be represented as a combination of linear transformation followed by translation.

- Maps parallel lines to parallel lines
- Preserves ratios of distance along a line
- Does not preserve absolute distances and angles
- Does not preserve the origin

## Affine transformation as a change of frame

$$\begin{align*}
x\mathbf{v}_0 + y\mathbf{v}_1 + \mathbf{o} &= x'\mathbf{v}'_0 + y'\mathbf{v}'_1 + \mathbf{o}' \\
\begin{bmatrix} \mathbf{v}_0 & \mathbf{v}_1 & \mathbf{o} \end{bmatrix} \begin{bmatrix} x \\ y \\ 1\end{bmatrix} &= \begin{bmatrix} \mathbf{v}'_0 & \mathbf{v}'_1 & \mathbf{o}' \end{bmatrix} \begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} \\
\begin{bmatrix} \mathbf{v}'_0 & \mathbf{v}'_1 & \mathbf{o}' \end{bmatrix}^{-1} \begin{bmatrix} \mathbf{v}_0 & \mathbf{v}_1 & \mathbf{o} \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix} &= \begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix}
\end{align*}$$

# Rigid transformation

Rigid transformation $T_R$ is a special case of affine transformation that consists of rotation and translation.

- $T_R$ preserves distances between all points. (Therefore preserves angles as well - SSS Congruence)
- $T_R$ preserves cross product for all vectors. (i.e. $T_R$ is not reflection)

In 3D space, $T_R$ can be represented by a 3x3 **rotation matrix** $R$ with a 3x1 translation vector.

$$T_R(\mathbf{p}) = R_{3 \times 3}\mathbf{p}_{3 \times 1} + \mathbf{t}_{3 \times 1}$$

## Rotation matrix

Rotation matrix rotates basis, so column vectors should be normalized and orthogonal.  
Therefore $R^TR = I$, i.e. $R^{-1} = R^T$.

Also, we only choose matrices with a determinant of 1. Determinant of -1 means reflection!  
In mathematics, rotation matrices in 3D space are called SO(3) (Special orthogonal group).

## Euler angles

Any rotation matrix can be decomposed as a product of three elemental rotation matrices!

$$R = R_x(\theta)R_y(\psi)R_z(\phi)$$

c.f. In 2D sapce, degree of rotation is 1.  
In 4D space, degree of rotation is 6???

Actually, 12 different combinations exists. Just don't rotate along same axis twice!  
XYZ, XYX, XZY, XZX, YZX, YZY, YXZ, YXY, ZXY, ZXZ, ZYX, ZYZ

### Problems of Euler angles

Gimble Lock: In certain alignments of the axes, we lose degree of freedom.  
Not unique: Two different euler angles can represent the same rotation.
