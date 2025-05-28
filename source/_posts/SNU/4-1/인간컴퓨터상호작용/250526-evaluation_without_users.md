---
title: Evaluation without users
date: 2025-05-26 14:09:58
tags:
---

# Design Heuristics

Goal: Evaluate the evolving design when no users are present.  
Why? Using users is the best, but it's not always possible.

- Cognitive Walkthroughs: Path through interface with pre-determined tasks and actions
- Action Analysis: Predict the time for an exper to perform a task
- Heuristic Analysis: Interface oriented, Path through interface (without pre-determined tasks)

# Cognitive Walkthrough

Cognitive walkthrough is a formalized way of imagining people's thoughts and actions when they use an interface for the first time.

Requirements:

- Description or prototype of interface (or a prototype)
- Task description
- Complete, written sequence of actions for completing the task
- User background (or profile)
- Usually only one analyzer is required

Goal:

- Will users know how to perform the action? (Will they try to do it?)
- Will users see the control?
- Will users know if the control does what they want?
- Will users understand the feedback?

Method: Select prototype and a task, then try to tell a believable story about each action a user has to take to do the task.  
To make the story believable, you have to motivate each of the user's actions, relying on the user's general knowledge and on the prompts and feedback provided by the interface.

If you can't tell a believable story about an action, then we need to fix the interface.

# Action Analysis

Action analysis allows a designer to predict the time for an expert to perform a task.  
e.g. GOMS models

It forces the designer to take a detailed look at the interface, and forces the designer to decide what physical and mental steps a user will perform to complete tasks.  
By analyzing steps, we can look for problems such as:

- Does it take too many steps to perform a simple task?
- Does it take too long to perform the task?
- Does it take too long to learn about the interface?

# Heuristic Analysis/Evaluation

Heuristic evaluation is a usability inspection method where experts evaluate a user interface (UI) against a set of predefined heuristics or principles.

Usually several analyzers are needed.  
Why? Best analyzers can miss easy problems, while worst analyzers might discover hard problems.  
Using serveral analyzers can find both easy and hard problems.

## Usability Engineering

Introduced by Jakob Nielsen. He involved a structured process that integrates usability principles and methods throughout the entire product development lifecycle.

Requires a small set of evaluators to examine the UI. 3-5 of evaluators are proven to have highest ratio of benefits to costst.

## Nielsen's evaluation phases

- Pre-evaluation training: Provide the evaluator with domain knowledge.
- Evaluation: First get a feel for flow and scope, then focus on specific elements.
- Severity rating: Establishes a ranking between problems, reflecting frequency, impact and persistence.
- Debriefing: Discuss outcome and potential solutions with design team.

# Nielsen's heuristics

- Simple and natural dialog: Visibility of system status
- Speak the users' language: Match the real world
- Minimize user memory load: User control and freedom
- Consistency: Consistency and standards
- Feedback: Error prevention
- Clearly marked exits: Recognition rather than recall
- Shortcuts: Flexibility and efficiency of use
- Prevent errors: Aesthetic and minimalist design
- Good error messages: Help users recognize, diagnose and recover from error
- Provide help and documentation: Help and documentation

## Simple and natural dialog

- Minimalist design: UI should be simplified as much as possible. It reduces learning effort & possibility of errors.
- Present information in a natural order. (logical flow)
- Remove or hide irrelevant or rarely needed information. (e.g. dynamic menus: some menus are hidden under other menus)
- Use windows frugally to avoid complex window management.

## Speak the users' language

- Use a language compatible with users' conceptual model (e.g. DO NOT use error log directly)
- Use meaningful mnemonics, icons and abbreviations.

## Minimize user memory load

- Use recognition rather than recall. i.e. Let user recognize thing previously experienced, instead of recall the things from long-term memory.  
  e.g. Combo box require recognition, while textbox require recall.
- Make things visible.
- Familiar option is selected over unfamiliar options.
- Describe expected input clearly, and don't allow incorrect input.
- Create orthogonal command systems. i.e. Commands shouldn't overlap or interfere with one another, therefore they can be combined in any order without unexpected side-effects.
- Use generic commands such as open, save, cut, copy, and paste.

## Consistency

Be consistent in:

- Command design: Same action, same effect in same situations.
- Graphic design: Same input, output format.
- Flow disign: Similar tasks are handled in similar ways.

## Feedback

Semantic: System status should be visible, but it shouldn't overburden users.  
e.g. Make cursor same as selected tool

Time: Different feedback should be used based on time scales.

- Under 100ms: Causality.
- 1s: Delay but user's flow of thought is uninterrupted. -> Use hourglass cursor!
- Over 10s: Difficult to stay focused, user will switch to another task while waiting. -> Use estimate of time left, always use overestimate!

## Clearly marked exits

Users don't like to be trapped!

e.g. Always responsive cancel button, universal undo/redo

## Shortcuts

- Provides flexibility and efficiency of use
- Let expert users perform operations rapidly

e.g. shortcuts, toolbars and tool palettes (trading screen real estate for rapid access), macros, navigation jumps (history systems)

## Prevent errors

An ounce of prevention is worth more than a pound of cure!

- Mistakes: Conscious decision with unforeseen consequences
  - When users don't know the system well, they cannot formulate the right goal
  - Radical redesign or improved training is necessary.
- Slips: Users know what and how to do, but fail to do it correctly
  - Error in the mental model!!!!
  - e.g. Capture errors, description errors, loss of activation, mode errors

### Capture Error

Frequently done activity takes charge instead of one intended.

We can minimize it by making actions undoable instead of confirmation, or allowing reconsideration of action by user. (e.g. Recycle bin in Windows)

### Description Error

Intended action is similar to others that are possible.  
Usually occurs when right and wrong objects are physically near each other.

We can minimize it by rich feedback, undo, and checking for reasonable input.

### Loss of activation

Forget what the goal is while undergoing the sequence of actions.

We can minimize it by allowing person to see path taken, or making goal explicit if the system knows it. (How????? AI can make it possible!)  
If you are the user... just continue action then you might remember the goal!

### Mode errors

People do actions in one mode thinking they are in another

We can minimize it by having as few modes as possible, or making modes highly visible.

### Forcing functions

- Lockin mechanisms
  - Keep users in a state until conditions are met
  - Process continues unless user removes constraints before stopping it
- Lockout mechanisms
  - Preevnt users from entering a state until conditions are met
  - Process won't occur unless user removes constraints before starting it
- Interlock mechanisms
  - Makes the state of two mechanisms or functions mutually dependent.
  - e.g. The door of a microwave oven is locked while the magnetron is on, and the magnetron is prevented from operating while the door is open

## Good error messages

- Be phrased in clear language, avoid obscure codes
- Be precise rather than vague or general
- Constructively help the user solve the problem
- Be polite, and not intimidate the user
(i.e. don't put the blame on users)
- Provide meaningful error messages, explain the problem in terms of the user conceptual model

## Provide help and documentation

No need of docs is always better, but providing help is not wrong!

Most users will stay at the intermediate level.  
Also, they don't like to read manuals. They would rather learn by making progress towards their goals.

### Types of help

- Tutorial and/or getting started manuals
  - Provide a clear learning path
  - Presents conceptual model of the system
  - Demonstrates basic featrues with online tours and demos
- Reference manuals (only for experts!)
- Reminders (e.g. short reference cards, keyboard templates, tooltips)
- Wizards (e.g. Windows Installer wizard)
  - Walks user through typical tasks
  - Users might feel they are losing control
- Tips
  - Migration path to learning new features
  - Can be boring and tedious
- Context sensitive help e.g. balloon help
  - System provides help on the interface component the user is currently working with
