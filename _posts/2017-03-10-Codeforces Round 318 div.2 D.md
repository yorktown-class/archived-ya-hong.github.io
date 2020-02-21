---
layout: post
author: yanghong
title: Codeforces Round 318 div.2 D. Bear and Blocks
date: 2017-3-10
tags:  Codeforces
header-img: images/cover/2.jpg
---

### 题目：http://codeforces.com/contest/574/problem/D



### 题解
变化实质就是先一直等（因为这时候变化也没什么用）,再一步变成跟旁边一样矮，然后一个一个的减小高度。

<!--more-->

然后看如何计算。<br>
对于一个： **XabcY**<br>
（假设高度递减）
如果x要变得跟y一样高,那么就有以下几步：
1. c 变得跟y一样高。
2. b 变得跟y一样高。
3. a 变得跟y一样高。
4. X 变得跟y一样高。
   然后X经过y步就变成了0.

所以对于一个 x ,它变成 0 的时间为：
$$
MinX= \min _{i=0}^{n+1} abs(i-x)+h[i]
$$

而它可以写成：
$$
MinX=min( 
\min_{i=0}^{X} X+(h[i]-i),
\min_{i=X+1}^n n+1-X+(h[i]-(n+1-i))
)
$$
这个显然只要正反扫描两边就可求出。

然后：
$$
res=\min_{i=1}^n MinI
$$

就完成了。

### 代码：http://codeforces.com/contest/574/submission/24628101



