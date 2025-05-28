---
title: Conceptual Frameworks
abbrlink: 76
categories:
  - SNU
  - 4-1
  - 인간컴퓨터상호작용
date: 2025-05-14 14:18:12
tags:
---

# Conceptual models and mental models

Conceptual frameworks help us explain and predict user behavior based on theories of cognition.  
Conceptual frameworks help us:

- Understand how users approach a task
- Predict where confusion or failure may occur
- Improve interface design by addressing these breakdowns.

To design effective interfaces, we must align three models:

- Design Model (Conceptual model): The system concept as intended by the designer
- User's Model (Mental model): The user's mental understanding of the system
- System Image: What the system presents to the user
through interface and behavior

Designer creates a conceptual model and communicates it via the system image.  
A good conceptual model bridges the gap between design and user understanding via the system image.

# Norman's Seven Stages of Action Model

![Norman's Seven Stages of Action Model](normans_seven_stages_of_action_model.png)

1. Forming the goal
    - "What do I want to achieve?"
    - The desired outcome or state the user wants to reach
    - Design question: "Can user determine the function of the device?"
1. Forming the intention
    - "What approach will I use to achieve it?"
    - A chosen strategy or plan to fulfill the goal
    - Design question: "Can user tell what actions are possible?"
1. Specifying the action
    - "What steps must I take?"
    - Mapping the plan to specific actions supported by the system
    - Design question: "Can user determine the mapping from intention to physical movement?"
1. Executing the action
    - Do the steps physically using the system
    - Physically performs the action specified in the previous stage
    - Design question: "Can user perform the action?"
1. Perceiving the state
    - "What does the system do in response?"
    - Noticing the system's response
    - Design question: "Can user tell what state the system is in?"
1. Interpreting the feedback
    - "What does the feedback mean?"
    - Understanding what the response mean
    - Design question: "Can user determine the mapping from system state to interpretation?"
1. Evaluating the outcome
    - "Did I succeed in achieving my goal?"
    - Comparing the outcome with the original goal
    - Design question: "Can user tell if the system is in the desired state?"

# Cognitive Engineering

Cognitive Engineering applies cognitive psychology and human factors to the design of interactive system.

Goals:

- Understand how people think, perceive, and act
- Reduce cognitive load in complex interactions
- Match human capabilities and mental models

Design Emphasis:

- Support user-centered design, not just system functions
- Promote direct manipulation and intuitive interfaces
- Enable engagement, clarity, and error resistance

Cognitive Engineering helps explain why users fail, and how better design can prevent it.

## Gulf of execution and gulf of evaluation

Cognitive engineering highlights two key breakdown points in user interaction.

Gulf of execution: Can the user figure out how to take the intended action?  
Gulf of evaluation: Can the user understand what the system did?

Neither gulf is under the control of the designer!  
It depends on each individual's the cultural convention or technical knowledge.

### Gulf of execution

The gulf of execution is the gap between the intention (what the user wants to do) and the allowable actions (what the system supports).  
It is related to functionality and usability.

- Can users easily figure out what actions are possible?
- Can they map their intentions to those actions?
- Can they execute the actions without unnecessary effort?

To reduce the gap, designers should make the commands and mechanisms of the system match the thoughts and goals of the users.

- Use clear affordances
- Make actions visible and intuitive
- Minimize the number of steps needed to perform a task

### Gulf of evaluation

The gulf of evaluation is the gap between the physical representation (what the system does) and the user's interpretation (what users understand).  
It is related to feedback and visibility.

- Can the user perceive the system state after taking an action?
- Can they interpret what happened and why?
- Can they determine whether their goal was achieved?

To reduce the gap, designers should present a clear and consistent conceptual model through intuitive feedback.

- Provide immediate and meaningful feedback
- Make system state visible and understandable
- Avoid ambiguous indicators

### Distance in meaning and form of expression

![Gulfs and distances](gulfs_and_distances.png)

Semantic distance: Distance between goal and the meaning of expression  
Articulatory distance: Distance between meaning of expression and the form of expression

# Direct manipulation

Direct manipulation is an interaction style where users directly act on visible objects using intuitive physical actions, rather than issuing abstract commands.  
In other words, object should be understood by their visual characteristics

Three principles of direct manipulation:

- Continuous representation of the objects and actions using meaningful visual metaphors
- Use of physical actions (e.g. clicking, dragging) instead of complex command syntax
- Rapid, incremental, reversible actions with immediate visible feedback

## Central ideas of direct manipulation

Object is understood by their visual characteristics. (using good affordances, good conceptual model, and convincing metaphors)  
Actions is understood in term of their effects on the screen. Action should be rapid and incremental, with immediate visual feedback, and easily reversible.

This enables WYSIWYG interface, with direct engagement.

## Problems with direct manipuplation

- Consumes valuable screen space
- Must learn the meaning of visual representations
- Visual representation can be misleading
- Need to consider blid/vision-impaired users
- Might not work well in small screens
- Too repetitive and low accuracy for experts

# Interface language

## Object-Action (Noun-Verb)

The user select an object first, then perform an action on it.

- Typically modeless
- Actions always occur within the context of the object
- e.g. double-click on a file to open it, select and delete, drag and drop

## Action-Object (Verb-Noun)

The user chooses an action (or task) first, then specifies the object.

- Typically modal, requires the user to stay in the correct mode
- Often more efficient for repetitive tasks
- e.g. use menu to open a file, pick a tool to use it

# Interface metaphors

Metaphor is using one kind of (familiar) object or idea in place of another (unfamiliar) one to suggest a likeness or analogy between them, creating a mental bridge between the two.

- Leverages users' prior knowledge of familiar, concrete real-world objects/experiences
- Transfer this knowledge to abstract computer and task concepts
- Reduces the learning curve and improves usability

e.g. Desktop, files, folders, trash can is a metaphor of office workspace.  
Paintbrush in a painting program is a metaphor of real-world art.

## Two types of interface metaphors

- Conversation metaphor (common in CLI)
  - The interface is a language medium to express assumed implicit objects
  - Users think of the interface as an intermediary to a world that is not explicitly represented
  - Users interact by providing the intermediary with linguistic descriptions of actions to be accomplished
- Model world metaphor (Common in GUIs, simulations and direct manipulation systems)
  - The interface is itself a world where the user can act and get response
  - The world is explicitly depicted, the represented objects behave as if they were the things they refer to
  - Users manipulate objects directly rather than describe actions

## Metaphors Caveats

- Too limited: The metaphor restricts interface possibility
- Too powerful: The metaphor makes believe that the system can do things it can't
- Too literal or cute: Overly detailed metaphors can be tedious, confusing, or gimmicky
- Mismatched: The metaphor doesn't align with the task or user mental model, leading to confusion
- WYSIAYG (What You See Is All You Get): limits access to hidden or abstract capabilities, can discourage exploration beyond visible options
