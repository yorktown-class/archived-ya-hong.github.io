---
layout: post
author: yanghong
title: Codeforces Round 325 div.2 D. Lizard Era  Beginning
date: 2017-3-10
tags:  Codeforces 折半枚举
header-img: images/cover/1.jpg
---
### 题目：http://codeforces.com/contest/586/problem/F

### 题意：

有三个人（L,M,W），他们要去做任务。

输入$n$个任务，每个包含三个数（分别表示三个人做任务的增加的数值），每个任务派两个人去。最后始每个人的数值相同且最大，求一种分配方案（如不能则输出"Impossible"）。

<!--more-->

### 题解：

这个$n$只有25，应该就是爆搜了，但是直接暴力的复杂度是$ O(3^n)$ ，不过可以折半枚举（应该是叫这个名字吧）。先处理处一半的结果，这样是$3^{ \frac n 2}$的。然后再计算另一半，并且在已经处理了的那部分种二分答案，这样就是$3^{ \frac n 2} \log 3^{ \frac n 2}$的复杂度了。

然后要判断两个（A，B，C）相加是否每个数都相等。由于只能查找的相同的元素，可以记录前者的（B-A，C-A），后者的（A-B，A-C），如果相同说明相加后每个数相等。再维护每个（B-A，C-A）（或者（A-B，A-C） ）的A都是最大值，就能再维护答案为最大值。

### 代码：http://codeforces.com/contest/586/submission/24796548