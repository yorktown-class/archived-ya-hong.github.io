---
layout: post
author: yanghong
title: Codeforces Round 313 div.2 E. Gerald and Giant Chess
date: 2017-3-10
tags:  Codeforces dp 数学
header-img: images/cover/4.jpg
---

### 题目：http://codeforces.com/contest/560/problem/E

<br>

### 题解：
肯定是组合。<br>
如果只考虑一个黑点，那么`总方案数减去起始位置到黑点的方案数` `乘上` `从黑点到终点的方案数` 就是不能走的方案数。<br>
那么总方案数减去它就好了。

<!--more-->

考虑有多个点的情况。

如果就是按照上面的减下去，显然会有重复的。一条经过两个黑点的路径会被减去两次。<br>
那么就是要去寻找方法去重了。

那么只要规定一个可以计算又可以不走到重复点的“走法”就好了。

可以这么规定：<br>
对于一个黑点的所有路径，就是不经过儿子黑点（x，y都比它的x，y小的黑点）,然后到达终点的路径总数。（这个还是好想的，正确性也是显然的）<br>
结果发现这个过程和最上面一个黑点的情况是一样的，那么就是把每个黑点都当成一次终点分别计算一次就好了。（其实递归的想法，可以更简单的得到这个结论，只不过我是这么想下来的）

最后想明白还是很简单的。<br>

### 代码也很简单：http://codeforces.com/contest/560/submission/24591210
