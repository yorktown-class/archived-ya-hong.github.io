---
layout: post
title: Codeforces Round 333 div.2 D. Lipshitz Sequence
date: 2017-3-10
tags:  Codeforces 贪心
header-img: images/cover/1.jpg
author: yanghong

---

### 题目：http://codeforces.com/contest/602/problem/D

### 题意：
给出n个数，和m个询问。每个询问包含两个数L和R。

定义区间的最大斜率为 $\max\lceil\frac{\vert h[i]-h[j] \vert} {j-i}\rceil\ \ \ \ \ (L<=i<j<=R)$ 。

对每个询问输出所有子区间的区间的最大斜率和。

<!--more-->

### 题解：
斜率的最大值一定是在相邻的两点处取得。设一个区间的最大斜率为 $\lceil \frac {val} {len} \rceil$ （$len \ge 2$) ，它可以分成$len$个两点组合。

$$val= \lfloor \frac{val}{len}  \rfloor  *len + (val \mod len)$$

把$val$平均分配到每一位中，其间两点组合的斜率的最大值最小，每位都至少是 $\lfloor \frac{val}{len}  \rfloor$，

若 $\lfloor \frac{val} {len} \rfloor < \lceil \frac{val} {len}  \rceil$ ，$val \mod len$ 大于0，那么其间两点组合的斜率最大值不会比它小。

否则  $\lfloor \frac{val} {len}  \rfloor = \lceil \frac{val} {len}  \rceil$

所以使其间两点组合最大值最小，值也不小于原本的斜率，所以斜率最大值一定在相邻两点处取得。



那么就简单很多了，对于每个斜率值先求出它在哪个区间是最大的，然后再在回答询问时直接计算贡献（值 乘上 出现次数）。

求区间可以用单调栈，分别求得左边和右边延伸的最远处。

（有很多细节，A不掉看代码就知道了）

### 代码：http://codeforces.com/contest/602/submission/24819908