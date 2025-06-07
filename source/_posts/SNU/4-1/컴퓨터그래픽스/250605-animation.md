---
title: Animation
abbrlink: 90
categories:
  - SNU
  - 4-1
  - 컴퓨터그래픽스
date: 2025-06-05 11:04:22
tags:
---

# History of Animation

Ancient Egypt, Leonardo da Vinci, ...  
Lots of people drew movement as a series of frame!

Phenakistoscope: Draw frames on the disk, then spin it to animate it!  
In fact we have a 3D version of phenakistoscope, called zoetrope!

The first film captured movement of the horse!  
Multiple cameras were placed in the path of the horse.  
In fact this was only a set of photos, not a real animation.

The first animation on film was made by hand!  
Photos of chalkboard drawing were taken and animated. (about 15 min)

The first feature-length animation (about 1.5 hour) was made with pictures of paper.

The first hand-drawn feature-length animation was made by Disney. (Snow White)  
Although some people still use hand-drawn animation, most people use computer-generated animation nowadays.

The first computer-generated animation was made with math functions.  
In 1970s, hand and face was animated using polygon mesh and Phong shading.

The first CG feature film was made by Pixar. (Toy Story)  
Computer animation is the standard for modern animation!

# Computer Animation

- Artist-directed (e.g. keyframing)
- Data-driven (e.g. motion capture)
- Procedural (e.g. simulation)
- AI based?

Historically, hand-drawn animation was made by senior artists and apprentices.  
Senior artist draw important frames, and apprentice draws inbetweens.
The important frames is called keyframe!

## Keyframing

Specify important events only, computer fills in the rest via interpolation/approximation.

Events can be anything! e.g. position, color, materials, light intensity, camera zoom, ...  
How do we interpolate? Use spline!

### Character Animation

Character often have sophisticated rigs.  
Keyframe only set rigs, then character is made from rigs by computer.

Blend shapes interpolate directly between surfaces instead of skeleton!  
Facial expressions are usually made with blend shapes.

Blend shapes can be also made automatically with 4D scanning and machine learning.

## Motion Capture

Use lots of calibrated cameras! (From 6~7 cameras to 200 cameras!)  
Each camera have light sources (e.g. visible red, near infra red) and filter that only allows that particular light.  
Then each camera can only see markers as a white dot!  
By examining which camera saw which markers, we can reconstruct model and animation.

In fact, motion capture is rarely used...  
It is only used when we have to create a new data.  
Mostly we just gather data from internet and use machine learning.
