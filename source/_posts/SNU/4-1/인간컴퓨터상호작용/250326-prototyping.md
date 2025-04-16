---
title: Prototyping
date: 2025-03-26 14:05:08
tags:
---

# Prototypes

We need to test our ideas!  
A prototype is a simplified and incomplete models of a design used to:

- explore ideas
- elaborate requirements
- refine specifications
- validate functionality

## Why prototypes?

- Designers can understand real-world design requirements
- Designers can visualize, test, and improve design ideas early in the process
- Early usability testing - we can catch issues before investing in full development
- Investing early prevents expensive rework! (Pay less now or more later)
- Prototypes are inexpensive, fast, flexible, so you can do more of them
- More prototypes = More ideas = Better ideas (Quantity breeds quality!)

## Idea Selection: Prioritizing ideas for prototyping

1. Define each idea's importance
    - Think about real-world requirements
    - User preference and target user population
    - Feasibility (available hardware, available software, cost)
    - Team skills and resources
1. Rank ideas
1. Pick the tops
    - Number of ideas to pick depends on resources and stage of the project
    - Remember: prototyping is about learning, not perfection

## Prototyping methods

1. Phase I - Early Exploration
    - Goal: Understand user needs, test rough ideas
    - Rapid low-fidelity implementation
    - Walk-throughs, storyboards
    - Paper prototypes (sketches, printouts)
1. Phase II – Concept Validation
    - Goal: Test with real users in more realistic settings
    - Rapid prototyping with:
        - Digital mockups (e.g. Figma, Sketch, Adobe XD)
        - Wizard of Oz simulations
        - Clickable or partially interactive UIs
1. Phase III – User Evaluation with Working Systems
    - Goal: Test in more realistic settings
    - Toolkit-based implementation
    - Test with real users in more realistic settings
    - Built with actual UI libraries
    - Larger and larger group of users using the real interface
1. Phase IV – Final Product
    - Goal: Validate and polish
    - Fully functional system
    - Performance, edge case, and full usability testing

## Low-Fidelity Prototype

![Low-Fidelity Prototype](low_fidelity_prototype.png)

Paper/plastic-based interface simulation...

- User interacts with the paper interface
- A person who act as a computer (usually the designer) manually changes interface elements)
- Observer watches and records actions

### Pros and Cons

- Inexpensive: Easy and fast to create
- Provide high-level feedback: Useful for testing overall flow, structure, and dynamic of the interface
- Trigger user reactions: Help uncover user expectations and issues

- Might be inaccurate: Does not reflect actual system speed or responsiveness
- Human error: Human-as-computer may unintentionally interfere with the user’s experience
- Design changes are cumbersome: repetitive earsing and drawing
- Doesn't scale well: Humans struggle to manually keep up with fast transitions across hundreds of screens

### Sketches

- Drawing of the outward appearance of the intended system.
- Should be rough and crude! Crudity helps people concentrate on high level concepts.
- Harder to test complex flows or interactive behaviors.

Sketching is not about drawing!  
Sketching is part of a design process:

- idea generation
- design elaboration
- design choices
- engineering

Sketching can help you:

- express and develop ideas
- visualize and think through ideas
- record and archive ideas that you come across
- communicate (reflect, share, critique, decide) ideas

## Getting the right design vs. getting the design right

- Getting the Right Design
  - Generate many ideas
  - Focus on what to solve
  - Explore different directions
  - Think broadly and creatively
- Getting the Design Right
  - Polish a chosen idea
  - Focus on how to solve it
  - Improve usability and aesthetics
  - Test, refine, and finalize

1. Elaborate(Getting the right design) - generate many ideas and variations
1. Reduce(Getting the design right) - decide on the ones worth pursuing
1. Repeat until you get the best idea!

### Wizard of OZ (originally OZ Paradigm)

Experimeter (the wizard) simulates the behavior of a theoreticla intelligent computer application in a laboratory without the system actually being built.

We can test a system that does not exist!  
Users don't know that someone is faking all the responses.  
In an iterative design process, the wizard can be replaced step-by-step with real algorithms.

## Medium-Fidelity Prototypes

Use prototyping tools! (e.g. Figma, Sketch, Javascript)

- Vertical prototype: provide answer about a specific question
  - includes in-depth functionality for only a few selected features
  - Good for performance comparison or usability tests
- Horizontal prototype: provide full interface without the functionality
  - Simulates the entire interface layout, but with no real functionality
  - Great for testing structure or layout
- Scenario prototype: pre-scripted walkthrough for specific task
  - Rigid: no deviation allowed
  - Useful for simulating a user journey

### Pros and Cons

- Time consuming: requires more effort than low-fidelity sketches or paper prototypes.
  - However CSE students may think that coding is better than papers...
- Beware of misaligned expectations
  - Developer might resist changes once effort has been spent
  - Management or stakeholders might mistake the prototype for the final product
- Stay focused on function over form
  - Do not get distracted by too small detail
  - e.g. Don’t waste time debating fonts or colors at this stage

## High-Fidelity Prototypes

- Piecewise prototype
  - Built in horizontal, vertical, or scenario-based slices.
  - Can be tested in a controlled, lab-like setting.
- Alpha and Beta releases
  - Distributed to small groups for real-world testing
  - Gather feedback before full-scale release

- Requires monitoring help lines or sales/support teams for post-deployment feedback
- Expensive to change: mistakes at this stage are costly!  
- Problem can be deeply rooted in the software architecture.

## Alternative classification

- Concept prototyping: develop and evaluate preliminary design ideas
  - Concept sketches and storyboards
  - Artificial reality problem: Designs by a good artist or modeler look like they will work. You should be terrible at drawing!!
- Rapid(throw-it-away) prototyping: explore and test functionalities and performances
  - e.g., New automobile design in wind tunnels
  - Scaling fallacy problem: Success in rapid prototype doesn't always mean success in full-scale model.
- Evolutionary prototyping (Incremental prototyping): used when design specs are uncertain or changing
  - ~~The average programmer's day in the life~~
  - ~~Often glorified as an iterative process~~ (design → evaluation → refine)
  - Software developers using the facilities for actual product development
  - Designers tend to get tunnel vision, not exploring design alternatives
