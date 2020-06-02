---
layout: post
author: yanghong
title: Codeforces Round 320 div.2 E. Weakness and Poorness
date: 2017-3-10
tags:  二分答案 贪心 Codeforces
header-img: images/cover/3.jpg
---

### 题目：http://codeforces.com/contest/579/problem/E

### 题意：

给出一串数。

你可以将每个数减去x，

使得 数值和的绝对值最大的区间 值最小。

求这个值。

<!--more-->

### 题解：

对于x，答案的值是先递减，后递增的。

那么可以三分答案求最小值。

所以问题就转化为，对与一个x如何求答案。

先考虑不先绝对值的情况。那么可以直接贪心的求解（这个还是很容易的，就不细讲）。

然后加了绝对值也很差不多，其实就是每个值取相反数，然后再来一边（由于求的值最大值，所以直接这样就可以了）。