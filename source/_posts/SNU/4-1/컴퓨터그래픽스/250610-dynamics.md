---
title: Dynamics
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 97
date: 2025-06-10 11:03:47
tags:
---

# Dynamics

Simulation is the most popular method to create computer animation procedurally.

Unlike kinematics, dynamics concerns forces and their effect on motion.

# Animation Equation

The basic equation: $F=ma$??

- Any system has a configuration $q(t)$
- It also has a velocity $\dot{q} = \frac{dq}{dt}$
- Usually have some constraints $g(q, \dot{q}, t) = 0$

$(q, \dot{q})$ is called the state of the system!  
To change, we need to apply forces! $\ddot{q} = \frac{F}{m}$.

## Generalized Coordinates

Often we describe systems with many moving pieces.  
$q$ is the collection of the position of the objects.

$$q = (x_0, x_1, \ldots, x_n)$$

Then, we can think of $q$ as a single point moving along a trajectory in $R^n$!

## Generalized Velocity

Similarily, $\dot{q}$ is the collection of the velocity of the objects.

$$\dot{q} = (\dot{x}_0, \dot{x}_1, \ldots, \dot{x}_n)$$

## Ordinary Differential Equations (ODE)

Many dynamical systems can be described via an ODE in generalized coordinates.  
**Ordinary** means only derivatives in time (but not space) is used.

$$\frac{d}{dt}q = f(q, \dot{q}, t)$$

### Higher order ODEs

In face, newton's law is second order ODE!

$$\ddot{q} = \frac{F}{m}$$

Higher order ODEs can be written as first order ODE by introducing dummy variables.

$$\begin{align*}
\dot{q} &= v \\
\dot{v} &= \frac{F}{m}
\end{align*}$$

Therefore, we can only focus on first order ODEs.

## Lagrangian Mechanics

Lagrangian is defined as kinetic energy subtracted by potential energy. $\mathcal{L} = K-U$  
Dynamics can be given by Euler-Lagrange equation.

$$\frac{d}{dt}\frac{\partial\mathcal{L}}{\partial{\dot{q}}} = \frac{\partial\mathcal{L}}{\partial{q}}$$

This is a extreme way to write $F=ma$... Why do we even use this?  
Newton's law use coordinates, but lagrangian equation use energy.  
Therefore, it can be used for systems where it is difficult to define coordinates. e.g. Optics.

### Example - Pendulum

Use angle as a coordinate! $q = \theta$  
Let $m$ is the mass, then we can calculate kinetic and potential energy.

$$\begin{align*}
K &= \frac{1}{2}I\omega^2 = \frac{1}{2}m(L\dot{\theta})^2 \\
U &= mgh = -mgL\cos\theta \\
\therefore \mathcal{L} &= m \left( \frac{1}{2}L^2\dot{\theta}^2 + gL\cos\theta \right)
\end{align*}$$

By solving lagrangian equation, we get $\ddot{\theta} = -\frac{g}{L}\sin\theta$!

Problem: we don't have a closed form solution...

## Chaotic systems

If we perturb input, output will change widely.  
Even Lagrangian equation can't help us...  
Only numerical solution exists!

e.g. Double pendulum  
Pendulum swings from pendulum!

e.g. n-Body problem  
If $n \geq 3$ objects interact with each other gravitationally, how does the objects move?

e.g. Rigid body  
We were assuming point mass so far!!!  
What happens if we drop the rigid body?  
Even with a small orientation difference, object will bounce in all directions.

## Particle Systems

Model phenomena as a large collection of particles.  
Each particle has a behavior described by forces.  
Then particles are numerically computed!

Normally, forces are only applied by k-nearest neighbors.  
Fast hierarchical data structure (kd-tree, BVH) can be used!

e.g. crowds, particle-based fluids, granular materials (such as snow), molecular dynamics, mass-spring system (clothes can be simulated with 2D spring!!!), hair, ...

Extremely common in graphics/games!  
Simple equation + easy to scale up/down!

### Example - Flocking

Each bird is a particle.  
Use simple forces:

- Attraction to center of neighbors
- Repulsion from individual neighbors
- Alignment toward average trajectory of neighbors

To simulate flocking, solve large system of ODEs!
