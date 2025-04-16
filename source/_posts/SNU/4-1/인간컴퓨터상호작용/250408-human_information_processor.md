---
title: Human Information Processor
categories:
  - SNU
  - 4-1
  - 인간컴퓨터상호작용
date: 2025-04-08 16:01:47
tags:
---

# The Human Information Processor (HIP) Model

Combines several cognitive psychology concepts into a simplified, unified framework.  
It's a simplified approximation of human information processing for computer scientists.

View human mind as an information processing system.  
Each system has memory and processor.  

- Memory has capacity, decay time, code type (physical, acoustic, visual, ...).
- Processor operates on a fixed cycle time. (Perceptual processor cycle $\tau_P$, Cognitive processor cycle $\tau_C$, Motor processor cycle $\tau_M$)

## Human Performance

Of course, parameters of Model Human Processor has uncertainties. (i.e. is ranged)  
e.g. $\tau_C$ is between 25ms and 170ms.

We use three versions of the MHP model.

- Slowman: worst performance
- Fastman: best performance
- Middleman: nominal performance

## Perceptual system

- Detects input through visual and auditory sensors.
- Stores data in sensory memory that is short-lived. (as visual image and auditory image)
- Converts sensory data into symbolic codes and stores in working memory.

### Eye

- Central vision: fovea
- Peripheral vision: retina
- Head movement: If target is more than 30° away from fovea, head should be moved.

### Visual Image Store (iconic memory)

- Duration: Less than 1 seond (200ms)
- Capacity: 17 letters
- Type: Physical

- Passive system (remember everything)
- Holds physically coded raw visual info
- Pre-attentive (no conscious effort)
- Info is sensory and unprocessed
- Rapid decay if not attended to

### Working Memory (WM)

- Duration: few seconds
- Capacity: 7 ± 2 chunks (working memory is accessed in chunks!)
- Type: Visual or acoustic

- Active system (remember on demand)
- Holds and processes attended info
- Requires attention and effort
- Info is abstract and manipuable
- Supports comparison, manipuation, decisions

#### Decay rate of WM

Working memory decays very fast!  
Half-life for 3 chunks is about 7 sec. (i.e. After 7 sec, you forget half of the working memory)  
If only 1 chunk is presented, working memory last for about 73 sec.

Effect of interference: if you try to remember something, long term memory kicks in.

#### Chunks of WM

Chunks are unit of memory or perception.  
It depends on presentation and what you already know.  
e.g. you can remember phone number as 8 digit number, or 2 chunks of 4 digit number.

Chunks can be related to other chunks.  
Activation spread in long term memory, and interfere with old ones.  
But we have limited amount of activation resource -> decay happens!

#### Capacity of WM

Pure capacity of working memory is about 3 chunks.  
This is the number of immediately preceding digits recallable from a long series when the series unexpectedly stops.

Effective capacity of working memory is about 7 ± 2 chunks.  
Attention helps to remember more chunks.

### Long Term Memory (LTM)

- LTM is a network of related chunks, accessed associatively from the WM.
- Has very large capacity, more than enough for a person to remember everything in their life.  
  - We'll just say that LTM has infinite capacity.
- Information is stored in semantic encoding, not in perceptual encoding.

- Fast read (70ms): can be accessed by pattern matching during each processing cycle.
- Expensive write (10s): noisy (can be interfered), need several rehearsal and/or recall to remember correctly.
- Context at the time of acquisition is the key for the retrieval.

#### LTM can fail

LTM has unlimited capacity, little decay, and no erasure!  
Then why do we forget?

Retrieval could fail if:

- No effective associations exists
- Similar associations interferes

To remember something later:

- Associate it with items already in LTM in novel ways.
- Elaborative Rehearsal: associate with information already known.
- Maintenance Rehearsal: repetition of memorization.

### Perceptual Processor

- Physical store raw sensory input from our senses (see/hear/smell).
- Transform physical perception into abstract concepts
  - unidentified non-symbolic into recognized symbols (visually coded representation)
  - e.g. transform color, shape, orientation, brightness, movement into circle

- Progressive decoding: Decode sensory input incrementally rather than all at once (about 10ms/letter)
- Selective decoding: Focused on spatial cues or pre-attentive features (hue, motion, etc.)

#### Visual Memory experiment

- Whole-Report Procedure: Present a matrix of letters for 50ms
- Partial-Report Procedure: Present a matrix of letters with tone or arrows, participant only need to remember a specific cued row.

Recall is much higher in the partial report procedure!

### Variable Perceptual Processor Rate Principle

Cycle Time of Perceptual Processor: $\tau_P$ = 100ms (이거 시험에 나옴)  
Time that takes before human claims to see it after impulse (unit impulse response)

But it may vary according to stimulus intensity.  
High-intensity / High-contrast stimuli have shorter cycle time!

Quantum experience: within perceptual cycle $\tau_P$, stimuli can be

- Fused together (Perceptual Fusion)
- Perceived as causally linked (Causality)

#### Bloch's Law

$R = lt$ is constant!

- R: response (perceived brightness)
- l: intensity of the stimulus
- t: lasting time of the stimulus (should be smaller than perceptual cycle)

Your brain can't distinguish pulse of 10ms at intensity 50 and pulse of 20ms at intensity 25!  
Stimuli are fused together into one perception.

#### Perceptual Causality

When two stimuli are fused, the first event appears to cause the second.

When fram rate is higher than 10 fps (1/$\tau_P$ = 10fps), moving picture is perceived as a smooth motion, not separate images.

If UI feedback happens faster than cycle time, it feels instantaneous to the user!

### Pre-attentive variables

Some differences are pre-attentive - it can perceived before attention.

e.g. hue (color), orientation, shape, size, number, curvature (curved/straight), motion (Very strong!!!)

Pre-attentive tasks can be performed in less than 250ms.  
It requires only a single glance at the image being displayed!  
e.g. target detection, boundary detection, ...

If variables are mixed, task cannot be done pre-attentively.  
e.g. We can't determine if a red circle is present inside red square, blue circle, blue square.

Some variables has priority!  
e.g. Hue is more important than shape, brightness is more important than hue.

## Cognitive system

- Retrieves symbolic input from working memory.
- Searches for matching patterns in long-term memory.
- Make decisions about how to respond based on learned knowledge.

### Cognitive Processor

The basic principle of operation of the Model Human Processor is the Recognize-Act Cycle of the Cognitive Processor.

1. Recognize: The contents of WM initiate actions associatively linked to them in LTM.
2. Act: These actions in turn modify the contents of WM.

#### Recognize-Act Cycle Time

(Recognize-Act) Cycle time is $\tau_C$ = 70ms.  
Matching time can be different. e.g. digits takes 33ms, colors takes 38ms, geometry takes 50ms, ...

Variable Cognitive Processor Rate Principle: cycle time is shorter when greater effort is induced, or with sufficient practice.

#### Action phase is serial

Cognitive Processor works in parallel in recognition phase, serial in action phase!  
i.e. it can be aware of many things at once, but cannot do more than one at a time.

You can do multiple things at once by silled intermittent allocation of control actions to each task.  
Cognitive processor is interrupt-driven time-sharing system. (similar to context-switching)

"Stay in the Flow": Good interface design should make users focus only one at a time.  
We should divide your interface and what they are doing.  
Goal is to make user spend all their time on what they are doing - interface have to leave as little a cognitive footprint as possible.

## Motor system

- Receive input from the cognitive processor.
- Executes physical actions in response.
- e.g. typing, clicking, ...

Motor programs are not step-by-step, and muscle action is no-return.  
Part of the learning process is to transfer from cognitive to muscle memory.

### Closed Loop vs. Open Loop

Closed Loop (250ms?): Feedback from perception through cognitive to motor.  
Correction happens and muscle is fine-tuned.
e.g. Go back and forth with the pencil as much as you can without going over the line.

Open Loop (74ms/reversal?): Control is planned in advance and motor executes without perception or cognition (of the output of motor system).  
There is no feedback or correction.  
e.g. archery

$\tau_M$ = 70ms

### Fitts' Law

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Predictive model of human movement!  
Fitts' measured time for a human to move pen from start point to target.

- MT: time required
- D: distant to target
- W: width of target

- ID (index of difficulty): $\log_2 \left( \frac{2D}{W} \right)$ difficulty of the task.
- IP (index of performance): $\frac{ID}{T}$ speed of the task. About 63ms / bit?

#### Explaining Fitts' Law

Let's assume that the time to move the hand to the target is $T = n(\tau_P + \tau_C + \tau_M)$.

- $\tau_P$: observe the hand
- $\tau_C$: decide on the correction
- $\tau_M$: do the correction

Let $X_i$ be the distance remaining to the target after the i-th correction, and $X_0 = D$.  
Let's assume the relative accuracy of movemnt $\epsilon = \frac{X_i}{X_{i-1}}$ is constant. (about 0.7)  
The hand will stop when it reaches the target. (i.e. remaining distance is less than $\frac{W}{2}$)

$$\begin{align*}
X_1 &= \epsilon X_0 = \epsilon D \\
X_n &= \epsilon X_{n-1} = \epsilon^n D = \frac{W}{2} \\
n &= \log_\epsilon{\frac{W}{2D}} = -\frac{\log_2{\frac{2D}{W}}}{\log_2{\epsilon}} \\
\therefore T &= -\frac{\tau_P + \tau_C + \tau_M}{\log_2{\epsilon}}\log_2{\frac{2D}{W}} = I_M \log_2{\frac{2D}{W}} \\
I_M &= -\frac{\tau_P + \tau_C + \tau_M}{\log_2{\epsilon}} \approx 63 \text{ms/bit}
\end{align*}$$

#### Implication of Fitts' Law

Fitts' Law relies on "Closed Loop" control of Motor System.

- Larger/Closer targets are easire to click
- Macintosh menu bar is faster to use. (no correction time - since menu bar is at top of the window, we can assume width is infinite)
- Pie menu is faster than popup menu (less distance)

### Power Law of Practice

$$T_n = T_1 n^{-\alpha}$$

The time to do a task decreases with practice.  
The rate of decrease is proportional to a power of the amount of practice!

Typical values for $\alpha$ is between 0.2 and 0.6.

# Put it together: HIP experiments

## Name matching

Do two letters have same name?

- Perceive second letter $\tau_P$
- Recognize letter $\tau_C$
- Match $\tau_C$
- Initiate response $\tau_C$
- Respond $\tau_M$

Total time is $\tau_P + 3\tau_C + \tau_M$!

## Perceiving calendar

How many days are in April, 2025?

- Perceive calendar $\tau_P$
- Recognize last day $\tau_C$
- Decide to move eye to last day $\tau_C$
- Move eye to last number $\tau_M$
- Perceive number $\tau_P$
- Recognize number $\tau_C$
- Initiate response $\tau_C$
- Respond $\tau_M$

Total time is $2\tau_P + 4\tau_C + 2\tau_M$!

### Eye Movement

Eye movement time (saccade + fixation) is about 230ms.  
Saccade takes about 120ms.

If we assume one eye movement per phrase, and one phrase is about 2.5 words, we can read 652 words/minute.  
But speed readers read 2500 words/minute!  
They don't see all words.

We can use RSVP (Rapid Serial Visual Presentation) reader.  
RSVP reader move words, so user can focus on middle of the screen. (no eye movement!)
