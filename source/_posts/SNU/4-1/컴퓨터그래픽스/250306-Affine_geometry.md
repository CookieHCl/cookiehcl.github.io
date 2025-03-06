---
title: Affine Geometry
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-03-06 11:02:21
tags:
---

# 2D/3D Geometry Representation

Basic elements: vertices, edges

A vector represents an edge, and a point represents a vertex.  
In computer view, vectors and points are represented as tuple.  
But they are totally different!!!

Points are actually vector from origin.  
If we change origin, sum of two points will be different.  
Adding points is coordinate-dependent!  
We should use only coordinate-free operations.

## Recall) Vector space

Vector space consists of

- set of vectors
- two operations
  - vector addition
  - scalar multiplication

TMI) Vector space + metric (norm, etc.) = Euclidean space

## Affine space

Vector space + points!

Affine space consists of

- set of points
- associated vector space
- additional operations on points
  - difference between two points
  - addition of a vector to a point
  - scalar multiplication of point

# Coordinate-Invariant Geometric Operations

## Addition

Vector added by vector is a vector.  
Point added by vector is a point.

## Subtraction

Vector subtracted by vector is a vector.  
Point subtracted by vector is a point.  
Point subtracted by point is a vector.

## Scalar multiplication

Scalar multiplication of vector is a vector.  
Point multiplied by 1 is a point.  
Point multiplied by 0 is a **zero vector**.  
Point multiplied by any other scalar is **undefined**.

## Linear combination

Linear combination of vector.

$$ v = \sum_{i=0}^{N} c_iv_i $$

## Affine combination

Linear combination of points????  
It is even possible??

$$ \sum_{i=0}^{N} c_ip_i = \left(\sum_{i=0}^{N} c_i\right)p_0 + \sum_{i=0}^{N} c_i(p_i-p_0) $$

$\sum_{i=0}^{N} c_i(p_i-p_0)$ is actually a vector.  
If $\sum_{i=0}^{N} c_i$ is 0, this is just a linear combination of vectors.  
If $\sum_{i=0}^{N} c_i$ is 1, this is a point, and we call this an **affine combination**.  
Otherwise, this is undefined.

## Affine Frame

A frame is defined as a basis of a vector space and a point o (called *origin*).

Any point p can be written as $p = o + c_1v_1 + \cdots + c_Nv_N$.  
Any vector v can be written as $v = c_1v_1 + \cdots + c_Nv_N$.

Recall) A coordinate in a vector space is defined as a coefficients of linear combination on given basis.

# Coordinate system of a point

## Homogeneous Coordinates

Use an extra dimension!  
Points are represented as (x, y, 1).  
Vectors are represented as (x, y, 0).

Now we can just add and multiply like vectors!  
If extra dimension of a result of operation is not 0 or 1, this operation is undefined.

## Barycentric Coordinate System

A barycentric coordinate system is a coordinate system in which the location of a point is specified by reference to a simplex.

A simplex is a *simplest* shape in given dimension.  
In 2D space, it is a triangle.  
In 3D space, it is a tetrahedron.

For example, let $p_1, p_2, p_3$ is points of a triangle.  
Then any point $q$ can be represented as

$$\begin{align*}
q &= p_3 + c_1(p_1 - p_3) + c_2(p_2 - p_3) \\
&= c_1p_1 + c_2p_2 + (1 - c_1 - c_2)p_3 \\
&= w_1p_1 + w_2p_2 + w_3p_3
\end{align*}$$

Barycentric coordinates must satisfy $\sum_{i=1}^{N} w_i = 1$!  
If and only if $\forall w_i, 0 \leq w_i \leq 1$, $q$ is located inside given simplex.  
c.f. $q = \sum_{i=1}^{N} w_ip_i$ is called a convex combination if $\forall w_i, 0 \leq w_i \leq 1$.

Barycentric coordinates can be computed!

$$\begin{align*}
q &= w_1p_1 + w_2p_2 + (1 - w_1 - w_2)p_3 \\
&= p_3 + w_1(p_1 - p_3) + w_2(p_2 - p_3) \\
&= p_3 + w_1v_1 + w_2v_2 \\
u &\coloneqq q - p_3 = \begin{bmatrix}v_1 & v_2\end{bmatrix}\begin{bmatrix}w_1 \\ w_2\end{bmatrix} \\
\therefore \begin{bmatrix}w_1 \\ w_2\end{bmatrix} &= \begin{bmatrix}v_1 & v_2\end{bmatrix}^{-1}u
\end{align*}$$
