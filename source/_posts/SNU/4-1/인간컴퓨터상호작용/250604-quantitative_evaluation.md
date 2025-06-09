---
title: Quantitative Evaluation
abbrlink: 87
categories:
  - SNU
  - 4-1
  - 인간컴퓨터상호작용
date: 2025-06-04 14:03:39
tags:
---

# Qualitative vs Quantitative

- Qualitative
  - Develop understanding of human experience
  - Emphasis on preserving the richness of the data
  - Better external validity
- Quantitative
  - Objectively measure human performance
  - More narrowly focused
  - Better internal validity

## Qualitative approach

Qualitative approaches focus on high-level effects!

- Identifies task flow problems
- Highlights ambiguities in task description
- Revel contextual and situational insights e.g. conflict with social norms or expectations, usability mismatches

It can reflect a real-world usage and context, leads to strong external validity.  
But it have lower internal validity, and relies on subjective interpretations of data.

## Quantitative approach

Quatitative approaches focus on low-level effects!

- Captures patterns of use

It provides objective measurements, leads to strong internal validity.  
But it might be difficult to interpret real world implications, and small differences may lack practical significance (even if they are statistically significant).  
e.g. Is difference between 3.05s and 3.00s really meaningful?

# Quantitative evaluation

- More scientific approach?
- Specify users and tasks
- Predict and measure...
  - time to learn
  - speed of performance
  - rate of human errors
  - human retention over time
  - subjective satisfaction
- by using...
  - User events collection (e.g. mouse clicks, key presses, mouse moving distance)
  - Analytics tool (e.g. Google Analytics)
  - Controlled experiments
    - Lucid/testable hypothesis
    - Independent variables
    - Dependent variables
    - Should be able to reproduced by others
- Accomodate individual differences
- Consider social, organizational, and cultural context

e.g. Google SktechUp found that undo and erase events can detect over 90% of the severe usability problems.

# Controlled Experiments

Based on practical problem and existing theory!  
It can be:

- a guidance for practitioners
- an advice for experimenters
- a refined theory

1. State a lucid, testable hypothesis
    - e.g. With a proper acceleration function, a scroll-wheel based system can be faster than a ScrollPoint
1. Identify independent and dependent variables
1. Design the experimental protocol
1. Choose the user population
1. Apply for human subjects protocol review
1. Run a couple of pilots
1. Run the experiment
1. Run statistical analysis
1. Draw conclusions

## Notes for running the experiment

- Always run pilots first!
  - There are always unexpected problem!
  - When the experiment has started you cannot change
- Use a check-list so that all subjects follow the same steps (i.e. specific protocol)
- Don't forget the informed consent form
- Don't forget to debrief each subject

Always ask these questions:

- Is it ethical?
- Is it useful?
- Is it reliable?
  - Does repeating the experiment yield the same result?
- Is it valid?
  - (internal) Does the experiment consider variations between subjects?
    - Need for testing an enough samples of subjects
  - (internal) Was the experience biased?
  - (external) Does the experiment reflect target use?
    - Were users typical?
    - Were tasks typical?
    - Was the setting realistic?

## Independent/Dependent variables

Independent variables are the things you manipulate independent of a subject's behavior.  
It determines a modification to the conditions the subjects undergo.

Dependent variables are the things you set out to quantitatively measure.  
It depends on the subject's behavior or reaction to the independent variable.

## Control variables

Control variables are circumstances that is kept constant while testing the effect of an independent variables to dependent variables.

Number of control variables should be small!!  
More control means the experiment is less generalizable.

## Random variables

Random variables are circumstances that is allowed to vary randomly.  
More variability is introduced by random variables in the measures, but the results are more generalizable.  
i.e. Internal validity is bad, but external validity is good.

## Confounding variables

Confounding variables is an external factor that can affect the results of the experiment or user study, making it difficult to determine the true effect of the independent variable on the dependent variable.  
It varies systematically with independent variables (and dependent variables)!

Confounding variables cause Type I errors (false positive), thus hurting internal validity.  
We should find it, and control/randomize it to avoid misleading results!

e.g. Consider a study comparing the target selection performance of a mouse and a gamepad where all participants are mouse experts, but gamepad novices.  
Confounding variable **"Prior experience"** affects experiment.

### Controlling confounding variable

- Case-Control Study: A study where subjects with a particular outcome or behavior (cases) are compared to those without it (controls) a identify factors that may be associated with the outcome
- Cohort Study: A study that follows a group of people who share a common characteristic or experience over time.
- Blocking: Grouping experimental units that are similar to each other to control for confounding variables.
  - Blocking Factor: a source of variability that is not of primary interest to the experimenter.
  - Randomize within each block, then measure differences within the block.
  - e.g. First divide participants into male and female groups (blocks), then randomly assign half of each group to a different condition.
  - Block what you can, randomize what you cannot!
- Randomization: Randomly assigning subjects to different groups to ensure that confounding variables are evenly distributed

## Experimental Protocol

- Between subjects: each subjects runs one condition
  - Compare observed results between independent groups
  - Can eliminate ordering and learning effects
  - Difference between subjects might introduce a bias
  - Need more subjects
  - Might allow confounding variables to affect results
- Within subjects: each subjects runs several conditions
  - Compare observed results within each subject (e.g. paired t-Test)
  - Can eliminate variation due to subject differences
  - Need fewer subjects
  - Might suffer from ordering and learning effects (reduce it by randomizing the treatment order)
- Very important for the statistical analysis phase!

## IRB (Institutional Review Board) Review

IRB is a committee to approve, monitor, and review research involving human subjects with the aim to protect the rights and welfare of the research subjects.

IRB review is required for research involving human subjects.  
~~But lazy people don't do this...~~

## User population

Pick a well-balanced samples considering novices, experts, age group, and gender.  
Population group may be one of the independent variable.

## Statistical Analysis

![Various methods of statistical analysis](statistical_analysis.png)

There are various methods to perform statistical analysis...

Consider:

- Properties of our population (e.g. mean, variance)
- How different data sets relate to each other
- Probability that our claims are correct
  - Confidence level: 95% or 99%?
  - Usually use the level of statistical significance, tested with p-value. (e.g. p < 0.05)

### Analysis of Variance (ANOVA)

Analysis of variance is the most widely used statistical test for hypothesis testing in factorial experiments.

Goal: Determine if an independent variable has a significant effect on a dependent variable.  
e.g. Is the time to complete a task less using method A than using method B?

#### ANOVA example

The mean task completion time for Method A was 4.5s. This was 20.1% less than the mean of 5.5s observed for Method B. The difference was statistically significant (F1,9 = 9.80, p < .05)

The mean task completion time were 4.5s for Method A and 5.5s for Method B.
As there was substantial variation in the observations across participants,
the difference was not statistically significant as revealed in an analysis of variance (F1,9 = 0.626, ns)

ns means not significant. Use **ns** if F < 1.0, or use **p > .05** if F > 1.0.
