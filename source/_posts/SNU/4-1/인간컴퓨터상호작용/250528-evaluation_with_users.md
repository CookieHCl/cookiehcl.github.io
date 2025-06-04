---
title: Evaluation with users
categories:
  - SNU
  - 4-1
  - 인간컴퓨터상호작용
abbrlink: 84
date: 2025-05-28 14:05:10
tags:
---

# User Testing

Test the interface with real users!  
Problem: Users are human beings with feelings and rights...  
The ethics and responsibility of evaluators are necessary.

- Qualitative/Naturalistic
- Quantitative/Experimental
- Field Study (usually long term and qulitative)

## Milgram's Obedience Experiment

Measured the willingness of study participants to obey an authority figure who instructed them to perform acts that conflicted with their personal conscience.  
e.g. Martial law by president Yoon?

The experimenter told the participants that we will test how shocks might improve recall of word associations;  
The experimenter encouraged the participants to continue raising the voltage of the shocks (up to 450V) whenever the learner gave wrong answers.  
However, this was a fake experiment! The real purpose of the experiment was to see if the participants would follow orders.  
The experimenter played pre-recorded sounds for each shock level to make participants believe.

Milgram discoverd that over seventy percent of participants delivered lethal shocks to an innocent person!

### Ethics of the milgram experiment

The participant was given incorrect information about the experiment.  
They were also under more pressure than many believe was necessary. (Was it necessary to watch a person receiving electric shocks?)

- Was it useful?: Did we learn anything that can be broadly applied?
- Was it ethical?: Could we have gathered this knowledge by other means?

# Treating Subjects with Respect

- Follow human subject protocols
  - Individual test results should be kept confidential
  - Users can stop the test at any time
  - Users are aware and understand the monitoring technique
  - Their performance will not have implication on their life
  - Records will be anonymous and must be explicitly approved
- Use standard informed consent form
  - Especially for quantitative tests
  - Be aware of legal requirements
- Special protocol for children
  - Consent from their parents

There are many legal ways to force the experimenters to treat subjects with respect!

# Conducting the Experiment

- Before the experiment
  - Have them read and sign the consent form
  - Explain the goal of the experiment
    - In a way accessible to users
    - Answer questions
- During the experiment
  - Stay neutral
  - Never indicate displeasure with users' performance
- After the experiment
  - Debrief users
  - Inform users about the goal of the experiment
  - Answer any questions they have

# Managing Subjects

- Don't waste users' time
  - Use pilot tests to debug experiments, questionnaires, etc.
  - Have everything ready before users show up
  - If an error occurs during the experiment, stop it and find other participants.
- Make users comfortable
  - Keep a relaxed atmosphere
  - Allow for breaks
  - Pace tasks correctly
  - Stop the test if it becomes too unpleasant
- Compensation
  - Pay participants whether they complete the study or not

# Concerns of User Testing

- Internal validity
  - observed results caused by the independent variables? (i.e. Are controlled variable actually controlled?)
  - confidence in our explanation of experimental results
  - usually good in experimental settings
  - watch for "confounding" variables
- External validity
  - generalizability of observed results
  - confidence that results applies to real situations
  - usually good in natural settings
- Reliability
  - Would the same results be achieved if the test were repeated?

## Considerations on internal validity

- Ordering effects
  - Interface X first or Y first?
  - Learning effect: Learning may influence performance
  - Get tried or bored over time
- Selection Bias
  - Assigning pre-existing groups to different levels of an independent variable can skew results
  - Use random assignment to ensure fairness and balance
- Experimenter bias
  - Tendency to favor expected or desired results
  - Mitigate with a rigid standardized experiment protocol
- How to counter-balance
  - Randomization, double-blind experiment (both experimenter & subjects unaware of conditions)

## Considerations on external validity

- Population validity: How well does the sample reflect the target population?
- Ecological validity: How similar is the testing environment to the real world?
- Training validity: Does the training provided simulate realistic learning conditions?
- Task validity: Are the experimental tasks representative of real world activities?

# Qualitative Evaluation

- The raw data is text, picture, or artifacts (not numbers)
  - Observations, video
  - Open-ended interviews and questionnaires
  - Collections of work samples, artifacts
  - Narrative, textual descriptions
- Key Characteristics
  - Focus on richness and depth of data, not reduction to numbers
  - Captures context, meaning, and complexity of user experiences
- Grounded Theory Approach
  - a data-driven method for building theory from qualitative data
  - Aim: to generate new theories grounded in the data itself

## Usability Study - Qualitative approach

- Purpose
  - Understand the user's perception of the interaction
  - Focus on the perceived quality of the experience
  - Emphasize the user's ability to use the system, rather than just how much they like it
- Qualitative Methods
  - Introspection
    - Cognitive Walkthroughs (conducted by designers)
  - Direct observation
    - Simple observation
    - Think aloud protocols
    - Constructive interaction (e.g., co-discovery)
  - Interviews, questionnaires and surveys
    - Open-ended questions to explore user experience in depth

## Prepare Experiment

- Select the correct population
- Set objectives and tasks
  - Realistic
  - Informative
- Apply for the IRB (irb.snu.ac.kr)
- Hardware e.g. Computer, video equipment
- Software e.g. Up and running, properly debugged
- Facilitator (Experimenter)
  - Using a checklist might be useful
  - Practice and practice!

## Create tasks

- Describe in terms of end goals
- Specific and realistic
- Doable
- Not too long (about 3 minutes each)

## Direct Observation

- Observing (and recording) users interacting with the system
  - In lab or in the field
  - For a set of pre-determined tasks or through normal duties
- Excellent at identifying gross design/interface problems

- Observation methods:
  - simple observation
  - think-aloud
  - constructive interaction (question-suggestion protocol)
  - interview and questionnaire

### Recording Observations

- Why keep a record?
  - Easy to forget details
  - Further analysis (post-analysis)
  - Useful for justifying findings in discussions
- Techniques
  - Paper and pencil
    - Simple to set up
    - Need coding scheme (e.g. tabular?)
    - Might be biased
  - Audio/Video recording
    - More accurate
    - Time consuming to analysis

### Simple Observation Method

Evaluator observes interacting users.  
Easy, but we get no insight into the user's decision process or attitude.

### Think-aloud Method

- Subjects are asked to say what they are thinking/doing
  - What they believe is happening
  - What they are trying to do
  - Why they took an action
- Widely used in industry
- Drawbacks
  - Awkward/uncomfortable for subject (thinking aloud is not natural!)
  - "Thinking" about it may alter the way people perform their task
  - Hard to talk when they are concentrating on problem

### Constructive Interaction Method

- Two people work together on a task
  - Normal conversation between the two users is monitored (less distortion)
  - removes awkwardness of think-aloud
- Variant: Co-discovery learning (question-suggestion protocol)
  - Use semi-knowledgeable "coach" and naive subject together
  - Make naive subject use the interface
- Drawback: Need a good team

### Interviews

- Method
  - Pick the right population (Individual or group discussion)
  - Plan a set of central questions
  - Probe more deeply on interesting issues as they arise
    - Focus on goals not technology
    - Find the root of the problem
- Pros and cons
  - Very good at directing next design phase
  - Provide many constructive suggestions
  - Subjective (e.g. Leading questions should not be asked)
  - Time consuming

### Debriefing

- Post-observation interviews
  - Questions from your notes
  - Questions from users' diary
  - Questions from a video footage
- Pros and Cons
  - Avoids erroneous reconstruction
  - Provide many constructive suggestions
  - Time consuming
  - But extremely valuable

### Questionnaires and Surveys

- Method
  - Pick the population e.g. Between 50 and 1000 subjects
  - Establish the purpose of the questionnaire
    - What information is sought?
    - How would you analyze the results?
  - Establish the means of deliver/collection
    - On-line
    - Direct interaction with users
      - Walking in the street
      - Post-user testing
    - Surface mail
      - including a pre-addressed reply envelope gives far better response
  - Design the questionnaire
    - Don’t forget to debug it!
  - Deliver
  - Collect and analyze the data
  - Establish the main finding
- Pros and cons
  - Preparation is expensive
  - Need to design and debug the questionnaire
  - Can reach a large population, but often a low return rate
  - As good as the questions asked
  - Data collection can be tedious
    - Use automatic forms for large volume
    - Google doc forms, survey monkey

#### Type of questions

- Closed Question
  - Scalar, e.g. 1~5
    - Be sure to pick odd numbers of choice, so user can pick middle.
  - Multi-choice
    - Choices can be mutually exclusive, or not (inclusive)
  - Ranked chocie
    - Helpful to understand user's preference
- Open Ended Questions
  - Good for general information
  - Difficult to analyze
  - Can complement closed questions

## Qualitative Approaches Outcome

- High level effects
  - Task flow problems
  - Task description problems
  - Contextual findings
    - e.g. Conflict with social pattern
    - Two hands needed but only one available
- Pros and Cons
  - Apply to a real situation
  - Good external validity, but poor internal validity
  - Poor control of independent variables
  - Often subjective data
