---
title: Routing
categories:
  - SNU
  - 4-1
  - 컴퓨터네트워크
abbrlink: 89
date: 2025-05-12 16:27:15
tags:
---

# Network-layer functions

- Forwarding: Move packets from router's input to appropriate router output in data plane.
- Routing: Determine route taken by packets from source to destination in control plane.

Per-router control is a traditional way to implement control plane.  
Logically centralized control (SDN) is now used.

# Routing algorithm

Goal: Determine good paths (e.g. least cost, fastest, least congested) from sending hosts to receiving host, through network of routers.

We can abstract network into graphs!  
Cost of direct link can be defined as 1, inverse of bandwidth, or rate of congestion.

- Global: All routers have complete topology, link cost info. Also called **link state** algorithms.
- Decentralized: Routers initially only know link costs to attached neighbors, use iterative process of computation by exchanging info with neighbors. Also called **distant vector** algorithms.

- Static: Routes change slowly over time
- Dynamic: Routes can change quickly, by periodic updates or in response to link cost changes.

## Dijkstra's link-state routing algorihm

- Centralized: All routers have complete topology
- Iterative: After k iterations, routers know the least cost path to k destinations

- $c_{x,y}$ is a direct link cost from node x to y, $c_{x,y} = \infty$ if x, y is not direct neighbors
- $D(v)$ is a current estimate of cost of least-cost-path from source to v.
- $p(v)$ is a predecessor node along path from source to v.
- $N'$ is a set of nodes whose least-cost-path is known.

1. $N' = {u}$
1. For all nodes v,
    - If v is adjacent to u, $D(v) = c_{u,v}, p(v) = u$
    - Else $D(v) = \infty, p(v) = \text{NULL}$
1. Loop until $N' = V$
    1. Find w not in $N'$ such that $D(w)$ is a minimum
    1. Add w to $N'$
    1. For all nodes v adjacent to w and not in N',
        - If $D(v) > D(w) + c_{w,v}$, update $D(v)$ and $p(v) = w$

### Discussion of Dijkstra's link-state algorithm

- Ties can exist, it's up to implementation.
- With priority queue, algorithm complexity is $O((N + M) \log N)$.
- But each router must broadcast its link state information to have complete topology!  
  Efficient broadcast algorithms can broadcast in $O(N)$.  
  Since there are N routers, overall message complexity is $O(N^2)$. (NOT broadcast time complexity)

### Route oscillation of Dijkstra's algorithm

![Route oscillation](route_oscillation.png)

Unlike in graph theory, real network's link costs depend on traffic volume.  
If the cost changes because of traffic, route oscillation is possible!

One way to *reduce* oscillation is to broadcast at random time to prevent all routers from broadcasting at the same time.

## Bellman-Ford's distance vector algorithm

Let $c_{x,y}$ is a direct link cost from node x to y, and $D_x(y)$ is the cost of least-cost path from x to y.  
Then, Bellman-Ford (BF) equation states that $D_x(y) = \min_v (c_{x,v} + D_v(y))$.

1. Each router wait for change in local link cost or message from neighbor.
1. When router receives new DV estimate or new local link cost, it recomputes DV estimates using BF equation $D_x(y) = \min_v (c_{x,v} + D_v(y))$.
1. If DV estimate to any destination has changed, notify other neighbors.
1. After enough iterations, the DV estimate converges to the actual least cost.

### Discussion of Bellman-Ford's distance vector algorithm

- Unlike LS(link-state) algorithm, we don't know actual path to the destination.
- Unlike LS algorithm, we don't have a fixed time complexity because convergence time varies.
- Iterative, asynchronous: Each local iteration is caused by local link cost change or DV update message from neighbor.
- Distributed, self-stopping: Each node notifies neighbors only if necessary. (i.e. only when its DV changes)
- Less robustness: If router malfunctions, LS algorihm only advertises incorrect link cost, and each router computes only its own table.  
  However, DV algorithm advertises incorrect path cost, and each router's table is used by others, so error propagate through the network.

### Count-to-infinity problem of Bellman-Ford's algorithm

Good news travels fast - reduced link cost require only few iterations.  
Bad news travels slow - increased link cost require many iterations.

Count-to-infinity problem: For one iteration, the path cost can increase by up to the direct link cost. If link cost has increased much more than the smallest direct link cost, it will take much more iteration to converge to the actual least cost.  
Even worse, if a link is disconnected resulting in a new link cost of infinity, these routers will count up to infinity!

Solution: If DV estimate is updated by z's DV estimate, do not broadcast DV estimate update to z.

# Scalable routing algorithm

We can have billions of destinations in practice, routing table exchange would swamp links! In fact, we can't even store all destinations in routing tables.

## Autonomous systems (AS)

We aggregate routers into regions known as autonomous systems. (a.k.a. domains)

- Intra-AS (a.k.a. intra-domain): Routing among within same AS  
  All routers in AS must run same intra-domain protocol.  
  We have a gateway router at edge of its own AS, which has links to routers in otehr AS'es.
- Inter-AS (a.k.a. inter-domain): Routing among AS'es  
  - Gateway routers perform inter-domain routing as well as intra-domain routing.

Forwarding table is configured by intra-AS and inter-AS routing algorithms.  
Intra-AS routing determine entries for destinations within AS.  
Inter-AS routing & intra-AS routing determine entries for external destinations.

Why differentiate intra-AS and inter-AS?  
Intra-AS have single admin, so policy is less of an issue, and we can focus on performance.  
Inter-AS have multiple admins that wants to control over how its traffic is routed, so policy dominates over performance.

## Intra-AS routing protocols

- RIP (Routing Information Protocol)
  - Classic DV algorithm, with DVs exchanged every 30 seconds.
  - No longer widely used.
- EIGRP (Enhanced Interior Gateway Routing Protocol)
  - Better DV based algorithm!
  - Formerly Cisco-proprietary, became open in 2013.
- OSPF (Open Shortest Path First)
  - Classic LS algorithm
  - ISO standard IS-IS (Intermediate System to Intermediate System) protocol is same as OSPF. (c.f. OSPF is RFC standard)

### OSPF routing

1. Each router floods OSPF link-state advertisements to all other outers directly over IP (rather than using TCP/UDP)
1. Each router has full topology, so we use Dijkstra's algorithm to compute forwarding table.

- Multiple link costs metrics possible. e.g. bandwidth, delay
- To ensure security, all OSPF messages are authenticated to prevent malicious intrusion.

### Hierarchical OSPF

Two-level hierarchy is used to prevent route oscillation from spreading throughout the entire network.  
Hierarchy also helps us to reduce number of routers to compute distances!

- Backbone is connected to areas and other ASes.
  - Boundary router connects to other Ases.
  - Backbone router runs OSPF limited to backbone.
- Area is only connected to backbone.
  - Local routers flood LS only in its area, and compute routing within its area.
  - Area border routers summarize distances to destinations in own area, and advertise in backbone.
- Link-state advertisements is flooded only in area or backbone.
- Each node has detailed area topology, but only knows direction to reach other destinations.

## Inter-AS routing protocols

BGP (Border Gateway Protocol) is the de facto inter-domain routing protocol.  
Subnets can advertise its existence, and the destinations it can reach to rest of the internet.

### Border Gateway Protocol (BGP)

BGP shares reachability, not cost!

- eBGP: Obtain subnet reachability information from neighboring ASes
- iBGP: Propagate reachability information to all AS-internal routers.

#### BGP path advertisement

A BGP advertised route consists of a prefix and its attributes.  
Prefix contains destination being advertised.  
Attribute *AS-PATH* contains list of ASes through which prefix advertisement has passeed.  
Attribute *NEXT-HOP* contains specific internal-AS router to next-hop AS.

eg. AS X advertises path *AS X, a* to AS Y gateway using eBGP. (i.e. AS X promises to AS Y that it will forward datagrams towards a.)  
AS Y propagates path *AS X, a* to all AS Y routers using iBGP.

To prevent loop, AS doesn't advertise route if path contains itself.  
If every BGP router do the same, loop won't be advertised.

#### BGP messages

BGP session: Two BGP routers exchange BGP messages over semi-permanent TCP connection.  
Gateway routers are directly connected, so we can use TCP connection.

- OPEN: Opens TCP connection to remote BGP peer and authenticates sending BGP peer
- UPDATE: Advertises new path (or withdraws old path)
- KEEPALIVE: Keeps connection alive in absence of UPDATES. Also used to acknowledge OPEN request.
- NOTIFICATION: Reports errors in previous message. Also used to close connection.

### Policy-based routing

BGP is policy-based routing!  
AS receiving route advertisement uses import policy to accept/decline path.  
If AS received multiple paths to destination, it can choose any specific path.  
AS can also determine whether to advertise received path to other neighboring ASes.

c.f. Why wouldn't AS help each other?  
Becuase AS didn't pay other AS...  
~~By following path advertisement, you can see the money flow between ASes.~~

e.g. If customer is dual-homed (i.e. attached to two networks), customer won't want provider network to route via them.  
Therefore, customer network don't advertise route to provider network.

#### Hot potato routing

Routers chooses local gateway that has least intra-domain cost.  
Why? AS is greedy... Don't care about inter-domain cost!

# Software-Defined Networking (SDN)

Internet network layer was historically implemented via distributed, per-router control approach.  
Monolithic router contains switching hardware, runs proprietary implementation of internet standrad protocols in proprietary router OS.  
Different middleboxes are used for different network layer functions.

But internet network layer is being rethought as a network control plane.

- Per-router control plane: Individual routing algorithm components are in each and every routers.
- SDN control plane: Remote controller computes, installs forwarding tables in routers.

SDN analogy made manifactures to use open interfaces instead of specialized applications, OS, and hardware!

## Benefits of SDN

- Easier network management: Avoid router misconfigurations, greater flexibility of traffic flows.
- Table-based forwarding allows programming routers.
  - Centralized programming is easier because we can compute tables centrally and distribute it.
  - Distributed programming is harder because we should compute tables as a result of distributed algorithm implemented in each router.
- Can perform complex traffic engineering.
  - If we want to use different route, we had to redefine link weights so traffic routing algorithm computes to different routes.
  - If we want to split traffic to multiple routes, we had to use new routing algorithm.
  - If we want to route differently based on source, we can't do this with destination-based forwarding.

## Elements of SDN

- Data-plane switches
  - Fast, simple, commodity switches implementing generalized data-plane forwarding in hardware
  - Flow (forwarding) table is computed and installed under controller supervison
  - API for table-based switch control (e.g. OpenFlow)
  - Protocol for communicating with controller
- SDN controller (network OS)
  - Maintain network state information e.g. state of network links, switches, services
  - Interacts with network control applications above via northbound API
  - Interacts with network switches below via southbound API
  - Implemented as distributed system for performance, scalability, fault-tolerance, and robustness
- Network-control applications
  - Implement control functions using lower-level services, API provided by SDN controller
  - Can be provided by third party, e.g. other than routing vendor, or DSN controller

## OpenFlow protocol

- Operates between controller and switch
- Use TCP to exchange messages (encryption is optional)
  - Controller-to-switch
  - Asynchronous (switch-to-controller)
  - Symmetric
- Distinct from OpenFlow API
