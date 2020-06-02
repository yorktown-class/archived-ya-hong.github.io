---
layout: post
author: yanghong
title: Codeforces Round 313 div.2 D. Equivalent Strings
date: 2017-3-10
tags: Codeforces
header-img: images/cover/4.jpg
---

### 题目：http://codeforces.com/contest/560/problem/D

<!--more-->

### 题解：
可以发现，<br>
如果：
$$A = C$$
$$B = C$$
那么：
$$A=B$$

所以可以把 A 和 B 转换为另一个串 C1，C2。
那么只需判断C1是否等价于C2就可以了。

那么要转化成什么呢。
可以转换为一个等价的字典序最小（或最大）的串。
那么就可以解决了。

代码见：http://codeforces.com/contest/560/submission/24589588

但是，还开发出了很多奇怪的解法:

直接爆搜本来是要T的，但是可以改变一下改变一下搜索的顺序（“”正难则反”……），虽然是没有任何道理的改动，但是由于数据水，这样就过了。

如果上面的太扯了，还有另一种不是很扯的扯淡方法。由于两个串等价的话，那么它们的元素肯定是相同的。那么如果发现某一个字母个数不同，就直接返回`false`，也能A。
