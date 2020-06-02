---
layout: post
author: yanghong
title: Codeforces Round 320 div.2 D. "Or" Game
date: 2017-3-10
tags:  Codeforces 贪心
header-img: images/cover/4.jpg
---

### 题目：http://codeforces.com/contest/579/problem/D

### 题意：

给出n，k，x。

再给出n个数Ai。

可以进行k次操作，每次使一个数乘以x。

最后使 A1|A2|A3|……|An 最大。

输出最大值。

<!--more-->

### 题解：

这题的想法很奇怪。

一个数可以被分成一个二进制数，然后每个二进制数或以下就可以了。

然后是如何分配k次操作的问题了。

可以得出一个结论，二进制的位数多的肯定比位数小的大（如10位数一定比9位数大）

而每次最小乘上的数为2，那么至少可以让一个二进制数的位数加1 。

那么肯定是把k次操作都用在位数最大的几个数中的一个，就是k次操作都应该用在同一个数上。

这么一来就很简单了，每个数试一遍，取个最大值就好了。

