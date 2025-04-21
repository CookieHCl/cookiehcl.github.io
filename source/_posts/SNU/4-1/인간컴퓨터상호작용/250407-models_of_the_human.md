---
title: Models of the Human
categories:
  - SNU
  - 4-1
  - 인간컴퓨터상호작용
abbrlink: 58
date: 2025-04-07 14:02:31
tags:
---

# Models of the Human

Descriptive models help us think more clearly about human behavior.  
Model helps us design better systems that match how people actually think and act.

There are many models of the human, but we begin with two useful models,  
Newell's Time Scale of Human Action, and Human Factors Model.

# Newell's Time Scale of Human Action

Human actions happen at different time scales.

- 100μs ~ 10ms: Biological Band, happens in neuron, cells, etc.
- 100ms ~ 10s: Cognitive Band, Unit task, Operations, Reactions
- 100s ~ 10^5s (hours): Rational Band, Complex task
- 10^6s (days) ~ 10^8s (months): Social Band

Time is the most common dependent variable in experimental HCI research!  
e.g. The time for a user to do a task.

This model shows how HCI spans biology to social behavior.  
Larger scale need qualitative and non-experimental research methods.  
Smaller scale need quantitative (experimental) and empirical research methods.

- Social Band: Workplace habits, privacy, social networking, ...
- Rational Band: Web navigation, collaborative computing, ...
- Cognitive Band: Menu design, gestural input, ...
- Biological Band: Not widely used, probably brain wave?

# Human Factors Model

![human_factors_model](human_factors_model.png)

## Sensors

- Vision (sight)
- Hearing (audition)
- Touch (tactition)
- Smell (olfaction)
- Taste (gustation)

### Vision

People obtain about 80% of their information through vision.

Fovea image is the sharpest central vision.  
It covers 1° of the visual angle - only 1% of the retina, but 50% of the visual cortex!

#### Visual Stimulus

Physical properties of light: frequency and intensity (luminance)  
create subjective properties of vision: colour and brightness

Brightness is determined by luminance contrast! (not luminance values)

#### Scan Paths

Fovea image covers only small area of the vision.  
Solution: eyes actual moves to get an idea of the whole vision!

Fixation: Eyes stop and take in visual detail from the environment (at least 200ms)
Saccade: Rapid repositioning of the eye to fixate on a new location (about 120ms)

Scan path is the visual depicition of saccades and fixations (using eye trackers).  
Saccades are shown as straight lines and fixations are shown as circles.  
The diameter of the circle is proportional to the duration of fixation.

Scan path is used in user behaviour research (e.g. reading patterns) or marketing research (e.g. ad placement).

### Hearing

Sound is a cyclic fluctuations of pressure in a medium, such as air.  
Sound is created when physical objects are moved or vibrated.

Physical properties of sound (frequency, intensity) create subjective properties of hearing. (pitch, loudness)

But there are other properties of sounds: timbre and attack!

#### Timbre (richness, brightness, 음색)

Timbre results from harmonic structure of sound.  
e.g. a musical note of 200Hz has harmonics at 400Hz, 600Hz, 800Hz, etc.

Notes of the same frequency from different instruments are distinguished due to harmonic structure (i.e. timbre)

#### Attack (envelop, 음의 발생)

Attack results from the way a note and its harmonics build up and transition in time - from silent, to audible, to silent

### Touch (Tactition)

Part of somatosensory system.

Receptors are in skin, muscles, joints, bones.  
They sense touch, pain, temperature, position, shape, texture, resistance, etc.

### Flavour

Smell (olfaction) is ability to perceive odours through sensory cells in nasal cavity.

Taste (gustation) is chemical reception of sweet, salty, bitter, and sour sensations.

Flavour is a perceptual process that combines smell and taste.

## Responders

Humans control their environment through responders.  
e.g. finger, feet, eyebrow, torso, ...

### Motor homunculus

Penfield showed that human responders are dedicated to each relative area of the motor cortex.

### Handedness

Some users are left-handed, others are right-handed.

But handedness exists by degree. (e.g. 80% left-handed, 20% right-handed)  
Edinburgh Handedness Inventory is used to measure handedness.

### Human Voice

Human vocal cords are responders.

Sounds are created through combination of movement in the larynx and pulmonary pressure in the lungs.

There are two kinds of vocalized sounds: speech and non-speech.  
Both have potential for computer control.

e.g. NVVI (non-verbal voice interaction) uses signal detection such as frequency, duration, loudness, etc.

### Eye as a responder

As a controller, the eye is called upon to do double duty:

- Sense and perceive the environment/computer
- Act as a controller via saccades and fixations

e.g. Eye Typing - use eye tracker to type on on-screen keyboard

Human Factors Model can be modified?

![Modified Human Factors Model](modified_human_factors_model.png)

## The Brain

Brain is the most complex biological structure known!

Sensors (human inputs) and responders (human outputs) are connected by the brain.

### Human Uniqueness

People excel at perception, at creativity, at the ability to go beyond the information given, making sense of otherwise chaotic events. We often
have to interpret events far beyond the information available, and our ability to do this efficiently and effortlessly, usually without even being aware that we are doing so, greatly adds to our ability to function. (from *The design of everyday things*)

This is a very difficult thing for AI to do!

### Perception

1st stage of processing for sensory input

Forms associations - e.g.

- Auditory stimulus -> harmonious, discordant
- Visual stimulus -> familiar, strange
- Tactile stimulus -> warm, hot
- Smell stimulus -> pleasurable, abhorrent
- Taste stimulus -> sweet, sour

#### Phychophysics

Study relationship between human perception and physical phenomena

Experimental method:

- Present subject with two stimuli, one after the other
- Randomly vary the difference
- Determine threshold below which the subject deems the two stimuli "the smae" (JND, just noticeable different)

#### Ambiguity, Illusion

Perception may vary!  
In addition to vision, other senses such as tactile and auditory senses can evoke illusion.

### Cognition

Cognition is the human process of conscious intellectual activity. i.e. decision making.

It's impossible to directly measure the time for a human to "make a decision".  
We assume sensory stimulus and motor response brackets the decision.  
(i.e. cognition time(decision time) is time between sensory stimulus and motor response)

#### Simple Decisions

e.g. press CALL in response to an incoming call

These are called the reaction time tasks.

What about a more involved decision?  
e.g. should I hit in blackjack?

### Memory

- Long-term memory
  - Declarative/Explicit area: information about events in time and objects in the external world (data segment)
  - Procedural/Implicit area: information about how to use objects and how to do things (code segment)
- Short-term memory (working memory)
  - Information is active and readily available for access
  - Amount of working memory is small, about 7 ± 2 units or chunks

#### Short Term Memory Experiments

1. Random sequences of digits is recited to subjects
1. Sequences vary from 4 to 13 digits
1. After recitation, subjects copy sequence from memory to a sheet of paper
1. Transcriptions on sheets is scored

Human record short term memory in chunks!

### Language

The mental faculty that allows humans to communicate.

Speaking is available to all humans without effort.  
Writing is only available with considerable effort.
HCI is primarily interested in writing!

#### Corpus

Large collection of representative text samples.

A corpus may be reduced to a word-frequency list.

#### Part-of-speech (POS) Tagging

Each word is tagged by its category (e.g. noun, verb, adjective).  
Used in word prediction to narrow search space.

#### Statistics and Language

Native speakers intuitively understand the statistical nature of their language.  
We can fill in missing parts based on statistics!

#### Redundancy and Language

Since humans can fill in missing parts, perhaps the missing parts can be eliminated.

e.g. remove vowels, replace words/characters with acronyms or homophone

### Entropy in Language

Redundancy is what we know, entropy is what we don't know.

Entropy is the uncertainty about forthcoming letters, words, phrases, ideas, etc.

#### Shannon's letter guessing experiment

1. Hide every letters
1. Subject guesses letters one at a time
1. Show '-' when correct, show correct letter when incorrect

Errors are most common at beginning of words.  
Errors are less common as a wrod progresses.  
Errors are even less common as a phrase progresses.

With a good statistical model, the original text could be obtained from the reduced text.

#### Entropy of Printed English

Single letter frequency's entropy is 4.25 bits per letter.  
100 letters frequency's entropy is about 1 bit per letter.  
Redundancy is about 75%!

## Human Performance

Humans uses their sensors, brain, and responders to do things.  
When these three work together to achieve a goal, human performance arises.

### Speed-accuracy Trade-off

If human go faster, errors increase.  
If human slow down, accuracy improves.

### Human Diversity

Human performance is highly complex; Humans differ in age, gender, skills, motivation, environmental conditions, secondary tasks, etc.

Human diversity and human performance is shown in a distribution. (Often n normal distribution)

### Reaction Time

Simple reaction time: The delay between the occurrence of a single fixed stimulus and the initiation of a response assigned to it

Delay time varies by type of sensory stimuli.

- Auditory -> 150ms
- Visual -> 200ms
- Smell -> 300ms
- Pain -> 700ms

Complex task have longer delay. e.g. visual search, name matching

### Skilled Behaviour

For many tasks, human performance improves considerably and continously with practice.  
However, in the simple reaction time tasks, human performance improves very little.

### Attention

Human can text while driving!

Attention is complex:

- Divided attention: Attention can be divided to secondary tasks
- Selected attention: Attending to one task can exclude attention to other tasks

### Human Error

An error is a discrete event where the outcome deviated from the desired outcome.  
But in practice, tasks that are performed in error are often at least partly correct.

### Accidents

Human error cause accidents.  
But design induced error might cause accidents too.

Interaction errors are likely caused by design induced error.
