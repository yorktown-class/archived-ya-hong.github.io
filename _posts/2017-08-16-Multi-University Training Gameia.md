---
layout: post
author: yanghong
title: Multi-University Training Gameia
subtitle: Multi-UniversityTrainingContest6 1010
date: 2017-08-16
tags: Multi-University
header-img: images/cover/8.jpg
---

# Task

Alice and Bob are playing a game called 'Gameia ? Gameia !'. The game goes like this :

0. There is a tree with all node unpainted initial.

1. Because Bob is the VIP player, so Bob has K chances to make a small change on the tree any time during the game if he wants, whether before or after Alice's action. These chances can be used together or separate, changes will happen in a flash. each change is defined as cut an edge on the tree. 

2. Then the game starts, Alice and Bob take turns to paint an unpainted node, Alice go first, and then Bob.

3. In Alice's move, she can paint an unpainted node into white color.

4. In Bob's move, he can paint an unpainted node into black color, and what's more, all the other nodes which connects with the node directly will be painted or repainted into black color too, even if they are white color before.

5. When anybody can't make a move, the game stop, with all nodes painted of course. If they can find a node with white color, Alice win the game, otherwise Bob.

Given the tree initial, who will win the game if both players play optimally?

**Limits**: 

$T \le 100$

$1 \le N \le 500$

$0 \le K \le 500$

$1 \le Pi \le i$

# Solution

一开始看到这道题毫无头绪. 没什么想法的时候就想了一下数据为一条链的情况, 结果有了一个很神奇的结论: 假设Bob不能切, Alice 只会在$n=2$ 的链上才会输. 

证明一下:

1. $n=1$ Alice胜.

2. $n=2$ Alice必败.

3. $n=2k+1~(k \in Z)$ 

   Alice 每次取链的第二个节点, Bob只能取链的第一个节点, 那么链的一端的两个点被染色, 链的长度$-2$ . 最终一定会出现$n=1$ 的情况, Alice必胜. 

4. $n=2k~ (k \in Z) , n \not = 2$

   Alice 每次取链的第一个节点, Bob只能取链的第二个节点, 那么链的一端的三个点被染色, 链的长度$-3$ . 情况4变为情况2, Alice必胜. 

推出这个结论. 就离正解近了一大步了. 由于Alice足够聪明, 所以Bob任何时候切都是一样的, 所以只要判定Bob能否把链切成两两的点对就可以知道答案了.

但是我们仍然不知道树上的规律. 比赛的时候大概列了几组数据, 发现如何把树上的链去除都是由Alice说了算的, 所以我们就直接把链的规律套到树上然后就A了.

然后上生物课的时候我又想了一下, 大概证出来了.

1. 先假设这一种特殊情况: 某点$x$ 有两个相连的度为1的点.

   那么Alice只要取走$x$ , 就出现了两个孤点, Alice就胜了. 且任何一个回合开始时出现这样的情况 (染色的点就直接从树中删除) Alice都必胜.

2. 任何一个回合开始都没有1的情况

   对于任何一个度为1的点$v$ (和它相连的是$u$)  , 由于没有1情况的出现, Alice选择染$v$ 则Bob只能染$u$ 而去除$3$ 个节点, Alice选择染$u$ 则Bob只能染$v$ 而去除$2$ 个节点 . 那么就和链完全一样了. 

```cpp
#include <bits/stdc++.h>
using namespace std;

#define BOB {puts("Bob");return;}
#define ALICE {puts("Alice");return;}

struct Main {
	Main() {
		memset(cnt,0,sizeof(cnt));
	}
	static const int MAXN=505;
	int n,k;
	int fa[MAXN];
	vector <int> g[MAXN];
	int cnt[MAXN];
	int rec(int x) {
		int cnt=0;
		for (int i=0;i<g[x].size();++i) {
			int k=rec(g[x][i]);
			if (k==-1) return -1;
			else if (k==1) cnt++;
		}
		if (cnt==0) return 1;
		else if (cnt==1) return 0;
		else return -1; 
	}
	void main() {
		scanf("%d%d",&n,&k);
		for (int i=2;i<=n;++i) {
			scanf("%d",&fa[i]);
			g[fa[i]].push_back(i);
		}
		if (n&1) ALICE;
		if (rec(1)) ALICE;
		int ned=(n-1)-n/2;
		if (k>=ned) {
			BOB;
		}
		else ALICE;
	}
};

int main() {
	int T;
	cin>>T;
	while (T--) {
		Main *now=new Main;
		now->main();
		delete now;
	}
}
```