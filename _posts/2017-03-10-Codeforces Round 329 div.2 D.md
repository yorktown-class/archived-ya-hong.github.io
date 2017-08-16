---
layout: post
title: Codeforces Round 329 div.2 D. Happy Tree Party
date: 2017-3-10
tags: Codeforces 树 树链剖分
header-img: images/cover/3.jpg
author: yanghong
---

### 题目：http://codeforces.com/contest/593/problem/D

### 题解：

由于条件没看清，没看到边权不会变大，（这样并查集就可以用了）
就直接敲了一个树链剖分加线段树。-_-

就是普通的树链剖分加线段树……

<!--more-->

唯一特别的是，乘法运算时要注意一下：当乘积超过$10^{18}$时，具体值就没有意义了，除任何数结果都是0，那么答案记为-1。<br>
对于$A \cdot B$分两种种情况讨论:
1. $A=-1$ 或 $B=-1$。这时答案为-1
2. $A \cdot B \ge 10^{18}$ 答案也是-1，判断标准是 $10^{18}/A/B$（整除)，是否为0  （由于$A/B/C=A/(B*C))$
3. 就是$A \cdot B$了。

然后建好线段树就好了。求出所有边权乘积，然后除以它就可以了。

但是在整除的情况下$A/B/C$是否等于$A/(B \cdot C)$呢？其实是相等的。<br>
设 
$$ A_1/B/C=A_2/(B  \cdot  C)=k $$
<br>
$$(A_1/B)_{max}=(k+1) \cdot C-1$$
$$A_{1max}=((k+1)  \cdot  C-1+1) \cdot B-1=k\cdot B \cdot C+B \cdot C-1$$
$$A_{1min}=k \cdot B \cdot C$$
<br>
$$ A_{2max}=(k+1)(B \cdot C)-1=k \cdot B \cdot C+B \cdot C-1 $$
$$A_{2min}=k \cdot B \cdot C$$
<br>
任意答案对应$A_1$和$A_2$的取值范围相同，所以$A_1=A_2$时，答案相同。

那么答案就可以直接计算了。

### 代码：http://codeforces.com/contest/593/submission/24801999


