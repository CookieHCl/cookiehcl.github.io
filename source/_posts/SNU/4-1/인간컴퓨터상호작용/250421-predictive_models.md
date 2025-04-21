---
title: Predictive Models
date: 2025-04-21 14:01:16
tags:
---

# Predictive Models

A predictive model is a mathematical formula used to estimate outcomes.  
It predicts the result for a criterion variable (aka dependent variable) based on one ore more predictor variables. (aka independent variables)

Predictor variables should be numeric or encoded in a way that the model can use.  
Ratio-scale is ideal, but ordinal and categorical predictors can be used with proper encoding.

Predictive models, like descriptive models, help us explore how users behave.  
However, unlike descriptive models, predictive models deal with numbers, not just ideas or concepts.

## Levels of Measurements

- Nominal: Attributes are only named
- Ordinal: Attributes can be ordered
- Interval: Distance is meaningful
- Ratio: Ratio is meaningful, attributes have a absolute zero point.

## Why use predictive models?

Good predictive models can predict human response!

- The need for some experiments might be obviated. Theoretical account of results eliminates the need for further experiments.
- Ways of improving pointing performance might be suggested. The equation can tell us how human response changes.

## Linear Prediction Equation

With linear regression, we can find the coefficients for the line that minimizes the squared distances. (least squares)

Results are shown as scatterplot with 95% confidnence interval.

## Fitt's Law

Model for rapid aimed movements!  
Widely used to predict and compare design alternatives.

- Fitts(1954): $T = I_M\log_2 \left( \frac{2D}{S} \right)$
- Welford(1968): $T = I_M\log_2 \left( \frac{D}{S} + 0.5 \right)$
- MacKenzie(1980s): $T = a + b \log_2 \left( \frac{D}{S} + 1 \right)$

### Index of Difficulty (ID)

$$ID = \log_2 \left( \frac{A}{W} + 1 \right)$$

Where A is a distance to the target, and W is a width of the target.  
Fitts hypothesized that movement time increases linearly with ID.

ID represents difficulty of task, the unit of ID is bits!

But in real tasks, users may not hit the target precisely.  
We use the effective index of difficulty to account for actual behavior.  
$ID$ captures what a participant was asked to do, $ID_e$ captures what a participant actually did.

$$ID_e = \log_2 \left( \frac{A}{W_e} + 1 \right)$$

$W_e = 4.133 \cdot SD_x$, where $SD_x$ is the standard deviation in click locations.

## Choice reaction time

When n stimuli are each linked to a different response, the time it takes to respond is called choice reaction time.

$$RT = a + b \log_2(n+1)$$

Where $a \approx 200ms$, $b \approx 150ms/bit$.

### Hick-Hyman Law

$$\begin{align*}
H &= \sum_i p_i \log_2 \left( \frac{1}{p_i} + 1 \right) \\
RT &= a + bH
\end{align*}$$

Where $p_i$ is a probability of occurrence of the ith item in the set.

H is an information-theoretic entropy of the decision, it is an uncertainty about whether to respond or not.

e.g. Is a one-level menu with eight items is better, or is a two-level menu with four items at the top level is better?  
We can solve this by comparing $\log_2(8+1)$ and $\log_2(4+1) + \log_2(2+1)$.

## Skill Acquisition

When learning a skill, we begin as novices.  
With pratice, performance improves: faster, more accurate, more efficient.

### Power Law of Learning

$$T_n = T_1 \times n^{-\alpha}$$

Where $T_i$ is a time to do the task on the ith trial, and $\alpha$ is constant between 0.2 ~ 0.6.

We can also use speed as a dependent variable.

$$S_n = S_1 \times n^{\alpha}$$

### Stage of Skill Acquisition

- Cognitive: Verbal representation of knowledge, learn through problem-solving
- Associative: Proceduralization, from rehearsal to recognition
- Autonomous: No cognitive involvement, become difficult to verbally describe the skill. Only motor system is used!

In the cognitive stage, users often face novel problems.  
They must figure out how to perform the task before they can perform it efficiently.

#### Operator Subgoaling

Divide-and-conquer method: Problem solving involves creating subgoals to reduce the difference between the current state and the goal state using available operators.

- Subgoals Creation: The larger problem is divided into smaller, more manageable parts, each representing a milestone on the way to solving the entire problem.
- Operator Application: For each subgoal, specific actions or operators are applied. These are the steps or procedures used to achieve the subgoal.
- Iterative Process: This process may be iterative, as solving one subgoal may reveal new challenges or even new subgoals, which then require their own specific operators.

#### Backward Planning

Sometimes it's easier to start with the goal and work in reverse.

This approach is used in chess, programming, and even in AI.

#### Production Rules

Production rules are a set of rule-based instructions used to control a system or predict an outcome, often formatted as if-then statements.  
Subgoaling is used to solve unfamiliar problems, production rules are used to solve familiar problems.

- Production rules enable structured control over complex tasks.
- Production rules reduce memory load through proceduralization.
- Production rules allow fast, direct action without cognition.
