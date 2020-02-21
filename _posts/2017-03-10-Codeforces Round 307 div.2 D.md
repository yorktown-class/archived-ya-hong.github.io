---
layout: post
author: yanghong
title: Codeforces Round 307 div.2 D. GukiZ and Binary Operations
date: 2017-3-10
tags:  Codeforces dp 矩阵
header-img: images/cover/12.jpg
---


### 题目 ：http://codeforces.com/contest/551/problem/D



### 题解

这题还是很难的。本来就比较难想，还要用一个矩阵乘法。

先讲一下想法。
一个一个二进制位考虑，分两种情况讨论：



<!--more-->



2. 1. <strong>该位上是0。</strong> <br>那么相邻两数不能全为1<br>定义$f[x]$为到x相邻两数不能全为1的所有情况。<br>那么显然 $f[x]=f[x-1]+f[x-2]$，<br>转移方式和斐波那契数一样（$f[x]=Fibonacci[x+1]$）。
3. <strong>该位上是1。</strong> 那么就是上面的补集，那么$2^n-f[n]$就好了。

不过这样还是没有什么卵用的，f数组计算复杂度就是$O(n)$了。

那么就是要靠矩阵乘法,复杂度就变为$O(logn)$了。<br>
矩阵乘法可以看[这里](http://blog.csdn.net/ccf15068475758/article/details/52846726)CCF的博客
