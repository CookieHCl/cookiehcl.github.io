---
title: High Level Model of Human Behavior
abbrlink: 74
categories:
  - SNU
  - 4-1
  - 인간컴퓨터상호작용
date: 2025-05-12 13:57:49
tags:
---

# GOMS

Model Human Processor (HIP) is good for modeling short, isolated tasks, but it doesn't scale to complex, routine tasks.  
e.g. matching a symbol to memory, determining the fastest speed to type on two different keyboards

CNM-GOMS (Card, Newell, and Moran) is a higher-level model that models skilled behavior using Goals, Operators, Methods, and Selection rules.  
It predicts the performance time of experienced workers to perform a task with an interface design.  
Other model like CPM-GOMS (Critial-Path Method), NGOMSL (Natrual GOMS Language) address learning and/or parallel behvaior.

- Goals: Desired outcomes or tasks
- Operators: Elementary perceptual, motor or cognitive actions
- Methods: Sequences of sub-goals and operators that can accomplish a goal
- Selection rules: Choose between alternative methods available for a given goal

In programmers view, goal is a funtion name, method is a body of a function, selection rules is a program.

## CNM-GOMS example

### Top-level goal

Edit manuscript, or, more specifically, move "quick brown" to before "fox"

### Subgoal

Highlight text

### Operators

- Move-mouse
- Click mouse button
- Type characters (keyboard shortcuts)

### Methods

- For the editing goal:
    1. Delete-word-and-retype (retype method)
    2. Cut-and-paste-using-keyboard-shortcuts (shortcuts method)
    3. Cut-and-paste-using-menus (menus method)

- For the highlighting subgoal:
    1. Drag across text (dragging method)
    2. Double-click first; shift-click last (all-clicking method)

### Selection rules

- For the editing goal:
  - If the text to be moved is one or two characters long, use retype method  
  - Else, if remember shortcuts, use shortcuts method  
  - Else, use menus method

- For the highlighting subgoal:
  - If the text to be moved is not whole words, use dragging method  
  - Else, use all-clicking method

## KLM (Keystroke Level Model)

KLM is a simplified version of CNM-GOMS.  
KLM doesn't have selection rules, and have only 5 operators:

- K: Key/Button press/release, $t_K = 0.2s$
- P: Pointing with mouse, $t_P = 1.1s$
- H: Homing between devices (e.g. from keyboard to mouse), $t_H = 0.4s$
- M: Mental preparation, $t_M = 1.35s$
- R(t): System response time, $t_R = t$

Operator time can be debated, but it is a measurement from the user. We can change the operator time as we wish.

### Using KLM

1. Encode the task using all physical operators (K, P, H, R(t))
1. Insert M using KLM heuristics  
  M indicates routine thinking - not problem solving (e.g. remembering a filename)
1. Adjust R(t) (system response time) followed by an M  
  Since computer and user can work at the same time, $R(t) = \max(t - t_M, 0)$
1. Compute the total time by adding all operator times  
  Result can be used to predict time for an expert user!

Problem: KLM heuristics is actually very complex...  
Simple summary: Insert M in front of all K and Ps, then remove M to leave only 1 M for 1 cognition unit.

### KLM variation

Add operator B: Seperate operator for mouse button press/release

Instead R, use W: Represent wait time if system response is involved

More detailed K operator: Pressing SHIFT/CONTROL is a seperate keystroke, use type operator T(n) for a series of Ks

### Criticism of KLM model

- Learnability: Only assumes skilled users, doesn't deal with skill acquisition
- Accuracy: Even skilled users make mistakes and errors.
- Cognitive load: Less finger movement doesn't always mean better UI; M is different for each UI

## CPM-GOMS (Cognitive-Perceptual-Motor GOMS)

![CPM-GOMS](cpm_goms.png)

CPM-GOMS models parallel operations.  
Each processor (Perceptual, Cognitive, Motor) is serial, different processors run in parallel. (Each motor processors run in parallel, e.g. left hand, right hand, etc.)

CPM-GOMS can explain whether removed keystrokes are on the critical path. i.e. It can determine bottleneck.

## NGOMSL (Natural GOMS Langauge)

- Top-down breadth-first task decomposition
  1. Start with the user's top-level goals
  1. Write a step-by-step procedure for accomplishing each goal in terms of subgoals or keystroke-level operators.
  1. Recursively write a method for each subgoal until all methods contain only keystroke-level operators
  1. Write a selection rule to specify which method to use if more than one for a goal
- Count the number of statements in methods to predict learning time
  - If similar methods or re-used submethods exists, (i.e. consistency) learning time is reduced.
- For a specific task scenario, count the number of statements and operators executed to predict execution time.

General version of CNM-GOMS?

# Value of GOMS

- Provide reason for high value decisions - not "I think so"
- Designers can develop an intuition about what works and what doesn't and the impact of design decisions on speed.
