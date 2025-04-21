---
title: Splines
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-04-03 11:06:25
tags:
---

# Motivation

Implementing curves and surfaces with lots of points is inefficient.  
We want higher-level representation of curves and surfaces.  
Specifically, we would like to find a smooth curve/surface with a minimal number of control points.

# Parametric Geometry

$$p(t) = (x(t), y(t))$$
$$p(u, v) = (x(u, v), y(u, v), z(u, v))$$

e.g. parameterized line passing through $(t_0, p_0), (t_1, p_1)$ is

$$p(t) = \frac{t_1-t}{t_1-t_0}p_0 + \frac{t-t_0}{t_1-t_0}p_1$$

## Why parameteric?

It matches the intrinsic dimension of objects we want to manipulate.  
Curves are 1D, surfaces are 2D.  
It may exist in higher dimensions, but it doesn't matter!

Also, once a curve/surface is parameterized, sampling process is easy, so our graphics hardware can render easily.  
We can sample like $P(0), P(0.1), P(0.2), \ldots$

## Differential Properties of Parameteric Curves

### Velocity

Instantaneous positional change: $P'(t)$

### Tangent

Normalized velocity vector: $T(t) \coloneqq \frac{P'(t)}{\|{P'(t)}\|}$

### Curvature

Instantaneous tangential change: $K(T) \coloneqq T'(t)$  
Curvature is always orthogonal to tangent, $K(t) \cdot T(t) = 0$

In geometry, $\frac{1}{\|K(t)\|}$ is same as the radius of the circle that touches $P(t)$ at $t$.

### Curve Normal

Normalized curvature vector: $N(t) \coloneqq \frac{K(t)}{\|{K(t)}\|}$

In 3D, there is also a binormal vector: $B(t) \coloneqq T(t) \times N(t)$

Tangent vector, Curve normal vector, Binormal vector form a coordinate system called Frenet frame.  
However, it is not well defined (curvature can be 0).

# 1D Interpolation

If n+1 points $(0, x_0), (t_1, x_1), \ldots (t_{n-1}, x_{n-1}), (1, x_n)$ are given, degree is n, and order is n + 1.

$$x(t) = h_nt^n + \cdots h_1t + h_0$$

How do we solve this linear system???

## Lagrange Polynomial

$$L_k(t) \coloneqq \frac{(t-t_0)\cdots(t-t_{k-1})(t-t_{k+1} \cdots (t-t_n)}{(t_k-t_0)\cdots(t_k-t_{k-1})(t_k-t_{k+1} \cdots (t_k-t_n)}$$

Then $L_k(t)$ is 1 if $k=i$, or it is 0 otherwise.

$$\therefore x(t) = L_0(t)x_0 + L_1(t)x_1 + \cdots L_n(t)x_n$$

## Cubic Hermite Interpolation

New idea: only two control points and their derivatives are given, intermediate parts are smoothly connected.  
Assume that $x_0, x'_0, x_1, x'_1$ is given.

$$\begin{align*}
x(t) &= at^3 + bt^2 + ct + d \\
x'(t) &= 3at^2 + 2bt + c \\
\therefore x_0 &= d, \\
x_1 &= a + b + c + d, \\
x'_0 &= c, \\
x'_1 &= 3a + 2b + c \\
i.e. \begin{bmatrix}
x_0 \\
x_1 \\
x'_0 \\
x'_1
\end{bmatrix} &= \begin{bmatrix}
0 & 0 & 0 & 1 \\
1 & 1 & 1 & 1 \\
0 & 0 & 1 & 0 \\
3 & 2 & 1 & 0
\end{bmatrix}\begin{bmatrix}
a \\
b \\
c \\
d
\end{bmatrix} \\
\therefore \begin{bmatrix}
a \\
b \\
c \\
d
\end{bmatrix} &= \begin{bmatrix}
2 & -2 & 1 & 1 \\
-3 & 3 & -2 & -1 \\
0 & 0 & 1 & 0 \\
1 & 0 & 0 & 0
\end{bmatrix}\begin{bmatrix}
x_0 \\
x_1 \\
x'_0 \\
x'_1
\end{bmatrix}
\end{align*}$$

### Hermite bases

We can think cubic polynomial as a 4D vector $(a, b, c, d)$ of which bases are $t^3, t^2, t, 1$.  
We can change bases to use independent bases instead of monomial bases.

$$\begin{align*}
x(t) =& \begin{bmatrix}
x_0 & x_1 & x'_0 & x'_1
\end{bmatrix}\begin{bmatrix}
1 & 0 & -3 & 2 \\
0 & 0 & 3 & -2 \\
0 & 1 & -2 & 1 \\
0 & 0 & -1 & 1
\end{bmatrix}\begin{bmatrix}
1 \\
t \\
t^2 \\
t^3
\end{bmatrix} \\
=& x_0(2t^3 - 3t^2 + 1) + x_1(-2t^3 + 3t^2) \\
&+ x'_0(t^3 - 2t^2 + t) + x'_1(t^3 - t^2) \\
=& x_0H_0(t) + x_1H_1(t) + x'_0H_2(t) + x'_1H_3(t)
\end{align*}$$

These four bases are called Hermite bases.

## Cubic Bezeier Curve (Cubic Bernstein Polynomial)

Instead of two control points and its derivatives, we use four control points.

Bernstein Bases are used, $B_i(t) = \binom{3}{i} (1 - t)^{3 - i} t^i$.  
Partition of Unity is hold, sum of bases is 1. $\sum_{i=0}^3 B_i(t) = 1$

$$\begin{align*}
x(t) &= x_0B_0(t) + x_1B_1(t) + x_2B_2(t) + x_3B_3(t) \\
&= x_0 \cdot (1-t)^3 + x_1 \cdot 3t(1-t)^2 + x_2 \cdot 3t^2(1-t) + x_3 \cdot t^3\\
&= \begin{bmatrix}
x_0 & x_1 & x_2 & x_3
\end{bmatrix}\begin{bmatrix}
1 & -3 & 3 & -1\\
0 & 3 & -6 & 3\\
0 & 0 & 3 & -3\\
0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 \\
t \\
t^2 \\
t^3
\end{bmatrix}
\end{align*}$$

### Properties of Cubic Bezier Curve

- End-point interpolation. $x(0) = x_0, x(1) = x_3$
- Deritvatives are 3 times difference between control points. $x'(0) = 3(x_1 - x_0), x'(1) = 3(x_3 - x_2)$
- The curve is contained in the convex hull of the control polygon.
- Invariance under affine transformation. i.e. Applying affine transformation to the curve is the same as applying affine transformation to the control points then evaluating the curve.

### De Casteljau Algorithm

x(t) can be evaluated by recursively interpolating control points with the ratio of (t, 1-t).

$$x_0, x_1, x_2, x_3$$

$$\begin{align*}
x_0^{(1)}(t) &= (1 - t) x_0 + t x_1 \\
x_1^{(1)}(t) &= (1 - t) x_1 + t x_2 \\
x_2^{(1)}(t) &= (1 - t) x_2 + t x_3
\end{align*}$$

$$\begin{align*}
x_0^{(2)}(t) &= (1 - t) x_0^{(1)}(t) + t x_1^{(1)}(t) \\
x_1^{(2)}(t) &= (1 - t) x_1^{(1)}(t) + t x_2^{(1)}(t)
\end{align*}$$

$$x_0^{(3)}(t) = (1 - t) x_0^{(2)}(t) + t x_1^{(2)}(t) = x(t)$$

![Subdivision of Bezier Curve](subdivision_of_bezier_curve.png)

After De Casteljau algorithm, bezier curve can be divided into two parts with new control polygons!  
$x_0, x_0^{(1)}(t), x_0^{(2)}(t), x(t)$ and $x(t), x_1^{(2)}(t), x_2^{(1)}(t), x_3$ forms two control polygons.

# 2D, 3D Interpolation

Curves in higher dimensions can be constructed by simply expanding coordinates.

$$P(t) = (x(t), y(t), z(t)), P'(t) = (x'(t), y'(t), z'(t))$$

e.g. 2D Bezier Curve is constructed from four control points:

$$\begin{align*}
P(t) &= \begin{bmatrix}
x_0 & x_1 & x_2 & x_3 \\
y_0 & y_1 & y_2 & y_3
\end{bmatrix}\begin{bmatrix}
1 & -3 & 3 & -1\\
0 & 3 & -6 & 3\\
0 & 0 & 3 & -3\\
0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 \\
t \\
t^2 \\
t^3
\end{bmatrix} \\
&= \begin{bmatrix}
\mathbf{p}_0 & \mathbf{p}_1 & \mathbf{p}_2 & \mathbf{p}_3
\end{bmatrix}\begin{bmatrix}
1 & -3 & 3 & -1\\
0 & 3 & -6 & 3\\
0 & 0 & 3 & -3\\
0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 \\
t \\
t^2 \\
t^3
\end{bmatrix}
\end{align*}$$

# Spline

A piecewise polynomial with a high degree of smoothness where pieces meet.  
Use multiple curves to make complex curve!

e.g. TrueType fonts use quadratic bezier curve, and PostScript fonts use cubic bezier curve.

## Continuity

To ensure a smooth transition from one section of a piecewise parametric spline to the next, we can impose various continuity conditions at the connection points.

- Parametric continuity: Matching the parametric derivatives of adjoining curve sections at their common boundary
- Geometric continuity: Geometric smoothness independent of parametrization (i.e. parametrization can be different between curves!)

### Orders of Continuity

- $C^0$, $G^0$ continuity (positional continuity): The positions of common control points are the same
- $G^1$ continuity (tangency continuity): $C^0$ and the directions of derivates are the same
- $C^1$ continuity: $C^0$ and the derivatives are the same
- $G^2$ continuity (curvature continuity): $G^1$ and the second derivatives (or curvature) are the same
- $C^2$ continuity: $C^1$ and the second derivatives (or curvature) are the same

$G^2$, $C^2$ continuity is extremely hard...

e.g. When connecting cubic bezier curves,

- $C^0$ continuity is guaranteed if points are same.
- $G^1$ continuity is guaranteed if three control points are on a straight line.
- $C^1$ continuity is guaranteed if three control points are on a straight line, and the distance is the same. (recall: bezier curve's derivative is 3 times difference between control points.)

c.f. Fonts someimtes need to be angled.  
Solution: Overlap control points!  
By overlapping two control points, we lose $C^1$ continuity, but we get angled curve.

## Bezier Splines with Tangent Conditions

![Bezier Splines with Tangent Conditions](bezier_spline_with_tangent_condition.png)

Bezier curve is tedious - we need to position every control points carefully.

Instead, just give points and tangent vectors of each points.  
Then we can poisition control points by moving 1/3 of the tangent vector.

## Catmull-Rom Splines

Giving tangent vectors is tedious - just give points and calculate tangent vectors!  
First and last tangents are set to be zero, and other tangents are set to difference between adjacent points.

$$\mathbf{p}'_0 = \mathbf{p}'_n = 0, \mathbf{p}'_i = \frac{\mathbf{p}_{i+1} - \mathbf{p}_{i - 1}}{2}$$

Only points are needed to create $C^1$ continuous curve that passes through them!

## Natural Cubic Splines

Is $C^1$ enough? Car surface have to guarantee at least $G^3$ continuity.  
Theoretically, splines of degree n can guarantee $C^{n-1}$ continuity.

Given n + 1 control points, we want to find n connected Bezier curves passing through the points with $C^2$ continuity.

- We have 4n unknowns (4 control points per each curve)
- We have 4n-2 equations
  - 2n equations for end point interpolations
  - n-1 equations for tangential continuity
  - n-1 equations for second derivative continuity

We need 2 more equations! We need to specify boundary conditions.

- For open curve, $p''(t_0) = p''(t_n) = 0$ (i.e., curve ends with a straight line)
- For closed curve, $p'(t_0) = p'(t_n)$ and $p''(t_0) = p''(t_n)$

Natural Cubic Splines is affine-invariant!  
But we lose local controllability, i.e. moving one point affects the entire curve.

## B-splines

Motivation: We need $C^2$ continuous curve with local controllability.

Use all four consecutive points as control points.  
e.g. $p_0, p_1, p_2, p_3$ forms control points, $p_1, p_2, p_3, p_4$ forms control points, ...

We get local controllability, but we lose interpolation, i.e. curves no longer pass through any points.

### Uniform Cubic B-spline bases

![Uniform Cubic B-spline bases](uniform_cubic_b_spline_bases.png)

Why this works? B-spline bases are $C^2$ continuous!

$$\begin{align*}
B_0(t) &= \frac{1}{6}(1-t)^3 \\
B_1(t) &= \frac{1}{6}(3t^3 - 6t^2 + 4) \\
B_2(t) &= \frac{1}{6}(-3t^3 + 3t^2 + 3t + 1) \\
B_3(t) &= \frac{1}{t} t^3 \\
P(t) &= \begin{bmatrix}
\mathbf{p}_0 & \mathbf{p}_1 & \mathbf{p}_2 & \mathbf{p}_3
\end{bmatrix}
\frac{1}{6}
\begin{bmatrix}
1 & -3 & 3 & -1\\
4 & 0 & -6 & 3\\
1 & 3 & 3 & -3\\
0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 \\
t \\
t^2 \\
t^3
\end{bmatrix}
\end{align*}$$

### Properties of B-splines

- Convex hull
- Affine invariance
- $C^{n-1}$ continuity
- Local controllability
- Variation diminishing: B-spline never crosses any given plane more often than its control polygon does.

## Conversion between Bezier & B-Spline

$$\begin{align*}
P(t) &= G_{Bezier} \cdot B_{Bezier} \cdot M(t) \\
&= G_{Bezier} \cdot B_{Bezier} \cdot B_{Bspline}^{-1} \cdot B_{Bspline} \cdot M(t) \\
&= G_{Bspline} \cdot B_{Bspline} \cdot M(t) \\
\therefore G_{Bspline} &= G_{Bezier} \cdot B_{Bezier} \cdot B_{Bspline}^{-1}
\end{align*}$$

## NURBS (Non-Uniform Rational B-Spline)

$$\mathbf{p}(t) = \frac{\sum w_j\mathbf{p}_jB_j(t)}{\sum w_jB_j(t)}$$

Generalized version of B-Splines!  
We use rational polynomial to represent conics (circle, ellipses, hyperbolics).
Rational polynomial is invariant under projective transformation.  
Non-uniform means we can use non-uniform location of control points.

# Surfaces

## Bicubic Bezier Surfaces

Each control vector is also on the bezier curve!

$$\begin{align*}
\mathbf{p}(u,v) &= \sum_{i=0}^3 B_i(u)\mathbf{p}_i(v) \\
&= \sum_{i=0}^3 B_i(u) \left[ \sum_{j=0}^3 \mathbf{p}_{ij}B_j(v) \right] \\
&= \sum_{i=0}^3\sum_{j=0}^3 \mathbf{p}_{ij}B_{ij}(u, v)
\end{align*}$$

In matrix form,

$$\begin{align*}
x(u,v) &= \sum_{i=0}^3\sum_{j=0}^3 x_{ij}B_i(u)B_j(v) \\
&= M(u)^T \cdot B_{Bezier}^T \cdot G^x \cdot B_{Bezier} \cdot M(v) \\
&= \begin{bmatrix}
1 & u & u^2 & u^3
\end{bmatrix}\begin{bmatrix}
1 & 0 & 0 & 0 \\
-3 & 3 & 0 & 0 \\
3 & -6 & 3 & 0 \\
-1 & 3 & -3 & 1
\end{bmatrix}\begin{bmatrix}
x_{00} & x_{01} & x_{02} & x_{03} \\
x_{10} & x_{11} & x_{12} & x_{13} \\
x_{20} & x_{21} & x_{22} & x_{23} \\
x_{30} & x_{31} & x_{32} & x_{33}
\end{bmatrix}\begin{bmatrix}
1 & -3 & 3 & -1 \\
0 & 3 & -6 & 3 \\
0 & 0 & 3 & -3 \\
0 & 0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
1 \\
v \\
v^2 \\
v^3
\end{bmatrix}
\end{align*}$$

We need 4x4 control points and 4x4 2D basis functions to create a surface.  
Each sub-surface is called patch.

Also called bicubic tensor product surface because it's cubic bezier curve in two direction, and surface is made with tensor product of two bezier curves.

Tensor Product B-Spline Patches, Rational splines, NURBS is also possible!
