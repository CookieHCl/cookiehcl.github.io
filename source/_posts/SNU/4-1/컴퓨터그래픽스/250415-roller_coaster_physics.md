---
title: Roller Coaster Physics
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 64
date: 2025-04-15 11:03:22
tags:
---

# Roller Coaster Physics

- a point mass moving on a spline
- frictionless with gravity
- energy conservation law applies

$$E_K + E_P = \frac{1}{2} m \| v \|^2 + mgh = mgh_{max}$$

We can always compute the magnitude of the velocity of any given point!

$$\| v \| = \sqrt{2g(h_{max}-h)}$$

## Motion on a spline

Problem: our mass point moves on a parametric function $P(u) = (x(u), y(u), z(u))$ where $u(t)$ is a function of time $t$.  
We know the initial position of the point and its velocity $v = v(u)$ at any time $u$.

Can we compute the position of the point at arbitrary time $t$?

## Arc-length Parameterization

Arc-length $s(u)$ is the distance from the initial position along the curve.  
We need to reparameterization to arc-length.

$$\begin{align*}
s &= \text{LENGTH}(u, u_0) \\
&= \int_{u_0}^{u} \sqrt{ \left( \frac{dx(\tilde{u})}{d\tilde{u}} \right)^2 + \left( \frac{dy(\tilde{u})}{d\tilde{u}} \right)^2 + \left( \frac{dz(\tilde{u})}{d\tilde{u}} \right)^2 } d\tilde{u}
\end{align*}$$

$s(u)$ is monotonically increasing!  
But the integral cannot be evaluated analytically, not even for polynomials.  
We need to compute integral numerically.

### Chord Length Approximation

Sample the curve and estimate the arc length by computing the linear distance through the sequence of samples.

$$s(u) = \sum d_i = \sum \| p(u_{i+1}) - p(u_i) \|$$

If curvature is high, the error between the chord and the curve can become too large.  
Solution: Adaptive sampling!  
If adding a new sample at the midpoint changes total length above give tolerance, add it.  
Repeat until there is no more point to add.

### General Numerical Integration Methods

We use error rate to evaluate integration methods.  
If an error rate is $O(n^2)$, it means that if a sampling interval is reduced to 1/2, the error rate will decrease to 1/4.

- Trapezoidal rule: piecewise linear, error rate $O(n)$
- Simson's rule: piecewse quadratic, error rate $O(n^2)$
- Gaussian quadrature rule: used for prodcution

Adaptive sampling can be also used!

Only polynomials up to the fourth order are used, higher order don't reduce the error rate.

### Computing inverse

Given arc-length $s$, determine the original parameter $u$.  
Since $s(u)$ is monotonically increasing, so is $u(s)$.  
We can formulate as a root finding problem.

$$f(u) = s - \text{LENGTH}(u, u_0) = 0$$

Bisection algorithm may be used, (since s(u) is monotonically increasing) but Newton-Raphson iteration is faster.

## Simulating mass point on a spline

Assume we know $\| v(u) \|$ at any $u$, and initial point is $u_0, s_0, t_0$.

We simulate the point with constant time step $\Delta t$.

$$\begin{align*}
s &\leftarrow s + \| v(u) \| \Delta t \\
t &\leftarrow t + \Delta t
\end{align*}$$

$u$ can be computed by root finding $f(u) = 0$.

# Camera movement along a Spline

## Frenet frame

Well-defined and continuous as long as $P'$ and $P''$ do not vanish.

- tangent vector $T(u) = \frac{P'(u)}{|P'(u)|}$
- binormal vector $B(u) = \frac{P'(u) \times P''(u)}{|P'(u) \times P''(u)|}$
- normal vector $N(u) = B(u) \times T(u)$

Problem: if spline is straight line, (i.e. curvature is 0) $P''$ do vanish.

### Continuous Frenet Frame?

We can use this:

$$\begin{align*}
T_{n+1} &= T(u_{n+1}) \\
N_{n+1} &= B_n \times T_{n+1} \\
B_{n+1} &= T_{n+1} \times N_{n+1}
\end{align*}$$

This is not frenet frame, and eventually frame will be disorted, but anyway it's continuous.

## Unit Quaternion Splines

A curve is constructed as affine combination of control points.

$$P(t) = \sum \mathbf{p}_0 B_0(t)$$

Similiary, we can construct a curve on unit quaternion space if an affine combination of unit quaternions is defined.  
Recall) we already know one affine combination: slerp!

Problem: Quaternion doesn't match with tanget of the spline.  
Solution: Fix tangent vector and project to $S^3$, or make orthogonal matrix with modified vectors.

### Affine Combination in $S^3$

Problems:

- Ambiguity
  - Antipodal equivalence
  - Spherical structure
- Unstable
  - e.g. let's just average and projection to $S^3$. If average results near the center of the sphere, projection will vary a lot.

Solution? We'll assume that we're computing affine combination only for points that are close to each other.

### Re-normalization

Just treat unit quaternions as 4D vectors, then project the affine combination to $S^3$.

$$\mathbf{q} = \frac{w_0 \mathbf{q}_0 + \cdots + w_n \mathbf{q}_n}{\| w_0 \mathbf{q}_0 + \cdots + w_n \mathbf{q}_n \|}$$

Pros: simple, efficient  
Cons: Linear precision doesn't holds. i.e. Re-normalization of $f(\mathbf{q}_i)$ is not $f(\mathbf{q}_i)$ for linear function $f$.

### Multi-Linear Method

Evaluate n-point weight sum as a sequence of slerps.  
Recall) $
\text{slerp}_t(q_1, q_2) = q_1\exp(t \cdot \log (q_1^{-1}q_2))$

e.g. Let's calculate $\mathbf{c} = \frac{1}{2}\mathbf{p}_1 + \frac{1}{4}\mathbf{p}_2 + \frac{1}{4}\mathbf{p}_3$.

$$\begin{align*}
\mathbf{c} &= \frac{1}{2}\mathbf{p}_1 + \frac{1}{4}\mathbf{p}_2 + \frac{1}{4}\mathbf{p}_3 \\
&= \frac{3}{4} \left( \frac{2}{3}\mathbf{p}_1 + \frac{1}{3}\mathbf{p}_2 \right) + \frac{1}{4}\mathbf{p}_3 \\
&= \text{slerp}_\frac{1}{4}\left( \text{slerp}_\frac{1}{3}(\mathbf{p}_1, \mathbf{p}_2), \mathbf{p}_3 \right)
\end{align*}$$

#### Quaternion Bezier Curve

Recall) De Casteljau Algorithm evaluates a point on a Bezier curve by recursively interpolating control points.

We use De Casteljau Algorithm on quaternions, but instead of interpolation, we use slerp.

Pros: Simple, intuitive, inherit good properties of slerp (e.g. coordinate-invariance)  
Cons: Algebraically complicated, need ordering because slerp is not associative.

### Linearization by exp/log

log maps quaternion to vector!

$$\mathbf{q} = \exp(w_0 \log \mathbf{q}_0 + w_1 \log \mathbf{q}_1 + \cdots + w_n \log \mathbf{q}_n)$$

Problem: log are used with rotation, not ment to use with orientation..  
This depends on the choice of the reference frame.

### Functional Optimization

View affine combination as a certain energy function?

$$e(\overline{\mathbf{p}}) = \frac{1}{2} \sum_i w_i \| \overline{\mathbf{p}} - \mathbf{p}_i \|^2$$

To minimize $e(\overline{\mathbf{p}})$, $\frac{d}{d\overline{\mathbf{p}}} e(\overline{\mathbf{p}}) = \sum_i w_i ( \overline{\mathbf{p}} - \mathbf{p}_i ) = 0$ should hold.

$$\therefore \overline{\mathbf{p}} = w_1 \mathbf{p}_1 + w_2 \mathbf{p}_2 + \cdots + w_n \mathbf{p}_n$$

In unit quaternion space, we use spherical (geodesic) distance $\text{dist}(\mathbf{q}_1, \mathbf{q}_2) = \| \log(\mathbf{q}_1^{-1} \mathbf{q}_2) \|$

$$f(\overline{\mathbf{q}}) = \frac{1}{2} \sum_i w_i \| \log(\overline{\mathbf{q}}^{-1} \mathbf{q}_i) \|^2$$

Now we just have to find root of $\frac{\partial}{\partial \mathbf{q}} f(\overline{\mathbf{q}}) = (0, 0, 0, 0)$ with numerical methods!

Pros: ~~COOL!~~ Theoretically rigorous  
Cons: Need numerical iterations, computationally demanding.
