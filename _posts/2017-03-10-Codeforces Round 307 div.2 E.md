---
layout: post
author: yanghong
title: Codeforces Round 307 div.2 E. GukiZ and GukiZiana
date: 2017-3-10
tags: Codeforces 分块
header-img: images/cover/3.jpg
---

### 题目 ：http://codeforces.com/contest/551/problem/E

### 题目描述：

输入n，q；
（$1 \le n \le 5 \cdot 10^5$  ,   $1 \le q \le 5 \cdot 10^4$  ）

输入数组A（n个元素，$1 \le A[i] \le 10^9​$）

输入q个操作。

1，L，R，x 给区间 [L,R] 加上 x （$0 \le A[i] \le 10^9$）。

2，v  输出最大 $i-j$ （$A[i]=A[j]=v$）

<!--more-->

### 题解：
一看给了10秒，就知道是一道很恶心的题目。

这题是要用分块来做。对两个操作分别暴力。

1. L到R加 x。<br>这个分块可以很容易解决。

2. 对 v 查询 <br> 那么就是对每一个块内找v的最小和最大id。

但是第二个操作明显太慢了。
不过如果块内是有序的，那么可以直接对每一个块内二分查找就好了（lower_bound 和 upper_bound-1）。

那么每个块内先排序。
可以每次1操作时对两边的块暴力完后，就把两边的块重新排序，这样就好了。

