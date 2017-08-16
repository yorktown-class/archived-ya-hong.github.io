---
layout: post
title: Codeforces Round 329 div.2 C. Beautiful Function
author: yanghong
date: 2017-3-10
tags: 数学 构造 Codeforces
header-img: images/cover/2.jpg
---

### 题目：http://codeforces.com/contest/593/problem/C

### 题意：
给出$n$个圆（半径都大于1），需要使$n$个点都在圆内。

用$abs()$和常数构造出两个函数（可用$+，-，*$  (注意每步运算都要加括号)）$f(t)$和$g(t)$，$f(i)$表示$i$点的横坐标，$g(i)$表示$i$点的纵坐标。

最后输出$f(t)$和$g(t)$。

<!--more-->

### 题解：
先要构造出一个基本的函数。

对于一个神奇的函数

$$1-abs(t-i)+abs(abs(t-i)-1)$$ （$i$为一常数）

只有当$t=i$时函数值为2，否则都为0。这样函数值就比较好控制，只要让每个$t$点的坐标在圆内，构造出每个函数，然后把所有函数都加起来就可以了。

由于半径一定大于1，每个点$t$构造一个 $  \lfloor \frac {xi} 2 \rfloor * (1-abs(t-i)+abs(abs(t-i)-1) )$  （$xi$表示圆$i$的横坐标（对于$g(t)$是纵坐标）），就能保证点$t$在圆内。

### 代码：http://codeforces.com/contest/593/submission/24804173