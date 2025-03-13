---
title: Hierarchical Modeling
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
abbrlink: 42
date: 2025-03-13 11:04:25
tags:
---

# Hierarchical modeling

Model complex objects by combinig simple primitives. (e.g. triangles, box, cylinders, spheres)

## Static Hierarchical Model

Relative transformations do not change. (e.g. car)

## Dynamic Hierarchical Model

Relative transformations may change on the fly. (e.g. human)  
The movement between connected components are often described by joints.

# Kinematics

Kinematics is the study of motion of systems of bodies without considering the physical forces acting on them.  
c.f. If you consider physical forces, it's called Dynamics.

Tree structure of joints and bodies (links) is used, but base link (root) can be chosen arbitrarily.

## Joint

A joint is an area of connection where two or more bodies meet, allowing relative movement.

Mathematically, joints are constraints that reduce the degrees of freedom (DoF) of a system.

- fixed (weld) joint: does not allow any relative movement (0-DoF)
- revolute (hinge) joint: allows only rotation about a fixed axis (1-DoF)
- prismatic (sliding) joint: allows only translation along a fixed axis (1-DoF)
- universal joint: allows roation around two fixed axes (2-DoFs)
- ball-and-socket joint: allows rotation around an arbitrary axis (3-DoFs)
- free joint: can rotate and translate freely (6-DoFs)

There are many joints - bolts and nuts, crank, etc.

## Local vs. Global configuration

Also called minimal vs maximal representation.

- Local (joint) configuration: Use only relationship between joints. (e.g. joint angle)
- Global configuration: Use rotations and translations of each body with respect to base.

## Forward vs. Inverse Kinematics

- Forward Kinematics (FK): Compute global configuration given local configuration.
- Inverse Kinematics (IK): Compute local configuration given global configuration. (Much harder!!!)

### Forward kinematics map

Local configuration doesn't have origin.  
Forward kinematics map transforms the origin to the position and orientation of the end effector.

Generally, a FK map can be represented as $T = T_{base}T_{L1}T_{J1}T_{L2}T_{J2}\cdots$.

- $T_{base}$ transforms origin to the position and orientation of base.
- Link transformations defines a frame relative to its parent. (often only fixed)
- Joint transformations represents joint movement. (often set by variables)

Any transformation can be represented as a translation followed by a rotation.

$$T=T_x(t_x)T_y(t_y)T_z(t_z)R_x(\theta)R_y(\psi)R_z(\phi)$$

## Kinematic Trees

Each node may include:

- link transformation with respect to its parent
- joint transformation with respect to link transformation
- a list of child joints
- a list of visual node
  - geometry
  - geometry transformation with respect to joint transformation
  - color
  - texture

To process a specific node, just DFS!  
When visiting each node, apply a new state. (a.k.a. multiply matrix)  
When returning back to its parent, restore its state to the previous state. (a.k.a. revert multiplying matrix)

NEVER multiply inverse of matrix!!!!!  
Instead use a state stack - push the current state (multiplied matrix), and pop the current state when returning back

## Scene Graphs

e.g. OpenUSD (Open Universal Scene Description)

We can also use tree idea to the entire scene!  
Instead of link and joint, use group and entities.  
e.g. car -> engine -> its parts

Unfortunately, it's usually a directed acyclic graph.  
Scene graph and its group is not enforced strictly, it's just for convenience.
