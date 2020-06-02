---
layout: post
title: Codeforces Round 329 div.2 E. Strange Calculation and Cats
date: 2017-3-10
tags: Codeforces dp 矩阵
header-img: images/cover/4.jpg
author: yanghong
---

### 题目：http://codeforces.com/contest/593/problem/E

### 题解：
先考虑t较小时的情况。肯定是dp的做法。每个值都是由上一个dp值转移，如果两点相连就可以转移。
当$1<x<n$且$1<y<m$时：
$$dp[now][x][y]=dp[now][x-1][y]+dp[now][x+1][y]+dp[now][x][y-1]+dp[now][x][y+1]$$

<!--more-->

如果用矩阵写的话，再记录一个path矩阵表示一个点到另一个点的方案总数。<br>
就可以这样转移：
$$dp[now]=path \cdot dp[now-1]$$
$$dp[now]=path^t \cdot dp[now-t]$$

想到这一步就可以了，用快速幂整一下就完了。

### 代码：http://codeforces.com/contest/593/submission/24814106