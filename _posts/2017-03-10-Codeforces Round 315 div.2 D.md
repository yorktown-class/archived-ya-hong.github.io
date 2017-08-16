---
layout: post
author: yanghong
title: Codeforces Round 315 div.2 D. Symmetric and Transitive
date: 2017-3-10
tags:  Codeforces dp
header-img: images/cover/1.jpg
---

### 题目:http://codeforces.com/contest/569/problem/D

### 题解：
这个题题目就好难懂。。。

由于满足传递性:<br>
那么可以用图来表示关系,<br>
那么题目就转化为求一个图内有多少个点不能到达自己（通过边）

<!--more-->

由于满足对称性：<br>
1. 那么一个连通块内的点都能互相到达，<br>
   所以必须要某些点孤立出来，保证不满足自反性。
2. 且一个联通块就代表一种关系集合（虽然连边方式有很多种,但是通过对称性和传递性把边补完则边集合相同，所以关系集合也相同）。

所以剩下的问题就转化为求不同联通块划分方法,就是求n个元素不同分组方法。

定义$dp[x]$为x个元素的不同分组方法。

设现在有n个数。<br>
当加入一个数的时候，<br>
若此数独立一个集合，那么就有 $dp[n]$ 种方案。<br>
若此数和另一个数结合成一个集合，就有 $C[n][n-1] \cdot dp[n-1]$ 种方案。<br>
若此数和另x个数结合成一个集合，就有 $C[n][n-x] \cdot dp[n-x]$ 种方案。<br>
那么，可以得出dp[n+1]的递推式：
$$dp[n+1]=\sum_{i=0}^{n-1} C[n][n-i] \cdot dp[n-i]$$

而这个就是贝尔数。

（参考：[https://zh.wikipedia.org/wiki/%E8%B4%9D%E5%B0%94%E6%95%B0]([https://zh.wikipedia.org/wiki/%E8%B4%9D%E5%B0%94%E6%95%B0) ， [http://baike.baidu.com/view/4084060.htm](http://baike.baidu.com/view/4084060.htm) ）

那么剩下就是枚举有几个点孤立就可了。
$$res=\sum_{i=1}^n C[n][n-i] \cdot dp[n-i]$$
就可以解决了。


