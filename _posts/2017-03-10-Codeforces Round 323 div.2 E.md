---
layout: post
author: yanghong
title: Codeforces Round 323 div.2 E. Superior Periodic Subarrays
date: 2017-3-10
tags:  Codeforces 数学
header-img: images/cover/1.jpg
---
### 题目：http://codeforces.com/contest/583/problem/E

又是一道数学题。。。。。

<!--more-->

### 题解：

先考虑一个数会和哪几个数比较。

![](\images\Codeforces Round 323 div.2 E EP1.png)

发现需要满足：
$$ (id1-l) \mod s +s \cdot x = (id2-l) \mod n + n \cdot y $$
相当于：
$$ sx+ny = id1-id2 $$
那么$(id1-id2) \mod \gcd(s,n) = 0$时两数就会比较。

接下来一步可以枚举 $d=\gcd(s,n)​$（它最多有$\sqrt n​$ 个）。然后，隔$d​$个数的比较，这里就是前面所说的会比较的数。那么，选择出来作为Superior Periodic Subarrays的数一定要是其中最大的。处理完后就能得到一个再$d=\gcd(s,n)​$下可以选择的数的列表（可以选取为`true`，不可取为`false`）。然后可以很容易得到以$i​$结尾的最长可取串（dp可以很容易的解决）。然后，对于一个以$i​$结尾的最长长度为$len​$的可取串种，我们就只需要计算出合法开头有几个(即$l​$）就可以计算最终答案了。而这个也比较简单，记录$cnt​$数组，$cnt[len]​$表示0到len有多少个数与$n​$的$\gcd​$为$d​$（合法$s​$的个数）。那么长度为$len​$的可取串对答案的贡献为$cnt[len]​$（其中合法$l​$的数目就是合法$s​$的数目），把贡献累加就可以了。而这其中的操作都只需要一遍扫描即可，所以最终复杂度为$n \sqrt n​$

需要注意的是，每次直接求$\gcd$会TLE,所以可以先预处理出所有$\gcd$，或者是什么其他的处理方式。

### 代码:http://codeforces.com/contest/583/submission/24718087