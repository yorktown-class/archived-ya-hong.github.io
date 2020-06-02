---
layout: post
author: yanghong
title: Codeforces Round 325 div.2 E. Alice, Bob, Oranges and Apples
date: 2017-3-10
tags:  Codeforces 数学
header-img: images/cover/0.jpg
---

### 题目：http://codeforces.com/contest/586/problem/E


### 题解：

先模拟转移的规律。然后发现它跟 Stern–Brocot tree 有点关系（ 当然你要先知道有 Stern–Brocot tree …… ）
![](\images\Codeforces Round 325 div.2 E Ep1.png)

<!--more-->

一开始，Alice就是$\frac10$，Bob就是$\frac01$。转移的过程就是找到答案的过程（$\frac xy$)。

例如对于`1 4`，那么就是找到$\frac14$。

1. Bob为$\frac01$，Alice为$\frac10$，在根节点上搜索。
2. 向左移动，Bob为$\frac01$，Alice为$\frac11$，位于$\frac12$
3. 向左移动，Bob为$\frac01$，Alice为$\frac12$，位于$\frac13$
4. 向左移动，找到$\frac14$

向左就是Bob向Alice转移，向右就是Alice向Bob转移。

那么如何找到答案。

首先答案肯定是个最简分数，否则不会出现在树上。<br>
然后：
1. 对于根节点如果分子比分母大，那么就在左区间，否则在右区间。
2. 如果$x>y$，那么走完一步就等同于在根节点找$x-y$
3. 如果$x<y$，那么走完一步就等同于在根节点找$y-x$

而整个步骤就像是gcd的过程。它也可以用类似的方法求解。
复杂度$O(\log n)$

### 代码：http://codeforces.com/contest/586/submission/24737673