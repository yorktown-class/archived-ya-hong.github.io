---
layout: post
author: yanghong
title: Codeforces Round 307 div.2 C. GukiZ hates Boxes
date: 2017-3-10
tags: Codeforces 二分答案

header-img: images/cover/1.jpg
---


### 题目 ：http://codeforces.com/contest/551/problem/C



### 题意：
地上有一排箱子（n个），一个位置有a个箱子，有一群gay佬要把它们搬走（m只）。



gay佬们同时行动，一开始在0位置，每秒可以搬走一个箱子，或向右移动一格。

问几秒可以搬完。

$1 \le n,m \le 10^5$

$a \le 10^9$

<!--more-->

<br>

### 题解：

二分一下答案。

显然要尽量少移动，那么可以一个一个人来，每个x秒。

搬完一个位置再向右移动。

那么就可以用$(n+m)log(a*n)$ 的复杂度解出来了。

但是还是有很多细节，具体可见代码--->  [Code](http://codeforces.com/contest/551/submission/24488257)