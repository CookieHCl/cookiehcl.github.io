---
title: Information VIsualization
categories:
  - SNU
  - 4-1
  - 인간컴퓨터상호작용
date: 2025-05-21 14:08:10
tags:
---

# Visualization

- Scientific Visualization: Render actual objects
- Information Visualization: Visualize abstract data, also called InfoVis

## Benefits of visualization

- External representation acts as an artificial memory that best supports our natural means of perception.
- Problem solving can proceed through a smooth traversal of the diagram.
- Visualizations can reveal structures, while summarization such as mean, variance lose information.

# InfoVis Reference Model

![InfoVis Reference Model](infovis_reference_model.png)

InfoVis is interdisciplinary!

- Graphics: Drawing in real time, <100 ms
- Cognitive psychology: Need appropriate representation
- HCI: Users and tasks to guide design and evaluation

## Considerations for designing InfoVis

- Relative percption: e.g. Luminance contrast: Luminance perception is based on relative judgements
- Expressiveness: Vis idiom should express all of, and only, the information in the dataset attributes
- Effectiveness: Most important attributes should be encoded with the most effective channels

## Steven's Power Law

$$p = ka^\alpha, \therefore \frac{p_1}{p_2} = \left( \frac{a_1}{a_2} \right)^\alpha$$

- p is perceived magnitude
- a is actual magnitude
- $\alpha$ varies across tasks

e.g. $\alpha \approx 1$ if judging length, $\alpha < 1$ if judging area, $\alpha \ll 1$ if judging volume.  
In layman's terms, we perceive length as it is, but we perceive volume to be much smaller than it actually is.

## Preattentive Processing

Preattentive processing is a cognitive operation that are done preattentively, without the need for focused attention.  
It takes the minimum amount of time to initiate eye movement, which is less than 200~250ms. (c.f. eye movement takes 200ms)  
It only involves information available in a single glance.

- Popout effects: Different features pop out.
- Segmentation effects: Visualization is divided into different features. (Boundary detection)

### Preattentive tasks

Visual features that are detected very rapidly by low-level, fast-acting visual processes.  
Precedes focused attention, occuring within a single fixation.

It is easily detected (pop out) regardless of the number of distractors.

e.g. finding different color, orientation, shape, size, convex/concave, curved/straight  
e.g. boundary detection (segmentation), region tracking (can a moving group be traced?), counting (how many elements of a certain type are present?)

### Laws of Preattentive display

- Must stand out on some simple dimension. e.g. color, shape, motion, depth
- Some dimension is more accurate than others.  
  e.g. Position, length is more accurate than volume, color.
- Only few should be highlighted.  
  e.g. If you have a mixture of circles of different colors, you can't just find the red circle at once.

# Design Principles/Guidelines

- Visual presentation of query components and results
- Rapid, incremental and reversible actions
- Immediate and continuous feedback
- Selection by pointing

## Multidimensional Projection

Sometimes, we have to visualize data with higher dimension, especially in machine learning.  
Commonly we represent data as a 2D scatterplot.

However, multidimensional projections suffer due to distortions!  
i.e. The features of high-dimensional data (e.g. area, volume) are highly distoreted in the projection.

### Measuring misrepresentation

Visual attribute value should be directly proportional to data attribute value.

$$\text{Lie factor} = \frac{\text{Size of effect shown in graphic}}{\text{Size of effect in data}}$$

### Distortions in projeciton

- Point-point relationships
  - Missing Neighbors: Neighbors in the original space are no more neighbors in the projection
  - False Neighbors: Neighbors in the projection are actually not neighbors in the original space
- Cluster-cluster relationship
  - Missing Groups: Clusters in the original space are missing in the projection
  - False Groups: Clusters in the projection are actually not clusters in the original space

## Avoid chartjunk

Avoid chartjunk, that are all visual elements (in charts and graphs) that are not necessary to comprehend the information represented on the graph, or that distract the viewer from the information.

$$\text{Data-ink ratio} = \frac{\text{Data ink}}{\text{Total ink used in graphic}}$$

Maximizing data-ink ratio can reduce chartjunk.

## Use small multiples

Repeat visually similar graphic elements nearby rather than spreading far apart.

- Learn once and compare (Invite users to compare)
- Reveal, all at once, a scope of alternatives, and a range of options (i.e. Act as a overview)

## Negative Space

Space can deliver messages!

e.g. 화학공/정신/기술/연구소 or 화학공정 신기술연구소...?
