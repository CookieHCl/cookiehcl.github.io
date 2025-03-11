---
title: Affine Geometry
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 35
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

$$\mathbf{v} = \sum_{i=0}^{N} c_i\mathbf{v}_i$$

## Affine combination

Linear combination of points????  
It is even possible??

$$\sum_{i=0}^{N} c_i\mathbf{p}_i = \left(\sum_{i=0}^{N} c_i\right)\mathbf{p}_0 + \sum_{i=0}^{N} c_i(\mathbf{p}_i-\mathbf{p}_0)$$

$\sum_{i=0}^{N} c_i(\mathbf{p}_i-\mathbf{p}_0)$ is actually a vector.  
If $\sum_{i=0}^{N} c_i$ is 0, this is just a linear combination of vectors.  
If $\sum_{i=0}^{N} c_i$ is 1, this is a point, and we call this an **affine combination**.  
Otherwise, this is undefined.

## Affine Frame

A frame is defined as a basis of a vector space and a point o (called *origin*).

Any point p can be written as $\mathbf{p} = \mathbf{o} + c_1\mathbf{v}_1 + \cdots + c_N\mathbf{v}_N$.  
Any vector v can be written as $\mathbf{v} = c_1\mathbf{v}_1 + \cdots + c_N\mathbf{v}_N$.

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

For example, let $\mathbf{p}_1, \mathbf{p}_2, \mathbf{p}_3$ is points of a triangle.  
Then any point q can be represented as

$$\begin{align*}
\mathbf{q} &= \mathbf{p}_3 + c_1(\mathbf{p}_1 - \mathbf{p}_3) + c_2(\mathbf{p}_2 - \mathbf{p}_3) \\
&= c_1\mathbf{p}_1 + c_2\mathbf{p}_2 + (1 - c_1 - c_2)\mathbf{p}_3 \\
&= w_1\mathbf{p}_1 + w_2\mathbf{p}_2 + w_3\mathbf{p}_3
\end{align*}$$

Barycentric coordinates must satisfy $\sum_{i=1}^{N} w_i = 1$!  
If and only if $\forall w_i, 0 \leq w_i \leq 1$, q is located inside given simplex.  
c.f. $\mathbf{q} = \sum_{i=1}^{N} w_i\mathbf{p}_i$ is called a convex combination if $\forall w_i, 0 \leq w_i \leq 1$.

Barycentric coordinates can be computed!

$$\begin{align*}
\mathbf{q} &= w_1\mathbf{p}_1 + w_2\mathbf{p}_2 + (1 - w_1 - w_2)\mathbf{p}_3 \\
&= \mathbf{p}_3 + w_1(\mathbf{p}_1 - \mathbf{p}_3) + w_2(\mathbf{p}_2 - \mathbf{p}_3) \\
&= \mathbf{p}_3 + w_1\mathbf{v}_1 + w_2\mathbf{v}_2 \\
\mathbf{u} &\coloneqq q - \mathbf{p}_3 = \begin{bmatrix}\mathbf{v}_1 & \mathbf{v}_2\end{bmatrix}\begin{bmatrix}w_1 \\ w_2\end{bmatrix} \\
\therefore \begin{bmatrix}w_1 \\ w_2\end{bmatrix} &= \begin{bmatrix}\mathbf{v}_1 & \mathbf{v}_2\end{bmatrix}^{-1}\mathbf{u}
\end{align*}$$
