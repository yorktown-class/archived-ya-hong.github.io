---
layout: post
author: yanghong
title: Codeforces Round 320 div.2 F. LCS Again
date: 2017-3-10
tags:  Codeforces
header-img: images/cover/2.jpg
---


### 题目：http://codeforces.com/contest/579/problem/F

官方的题解是一个dp套dp，但是讨论版里有更好的。

<!--more-->

### 题解：
I think there's a simpler solution to 1D without DP (the hard part is verifying that it's valid, I suppose, but this follows from a small bit of case analysis).

We want the number of strings other than S which can result from removing one character and adding one. First, we block the string S into groups of consecutive equal characters. Removing a character from any part of one group is equivalent, so if there are k groups, we consider each of these k possibilities. Suppose we've taken from a group with size g and character c; you can add back any color in any place, except you can't add back c adjacent to any of the g - 1 remaining c's in the group (or you would get S back). Also, for each other group with size h and color d, we overcount the number of ways to add another d into this group by h, so the total number of valid distinct ways to add a character to S with one of the k groups diminished is nm - n (since n is the sum of the sizes of all of the groups).

So our total answer would be k(mn - n), except a few of the strings T are double counted. It turns out that the only way to double count T is if there is some substring ab...aba in S (alternating different letters of some length  ≥ 2) which becomes replaced by ba...bab (see if you can see the two ways to make this transformation). Thus the final answer is
$$k(mn-n)-Number\ of\ alternating\ substrings\ of\ length\ at\ least\ 2$$
which runs in O(n) pretty easily.

### 翻译：

对于一块相同的长度为g字符区域，可拿出一个字符c，然后以任意颜色塞回到任意位置，这样的LCS一定是$n-1$，有$n \cdot m$种情况。当然你不能把一个c以c塞回到g中，这样你就又得到了原来的字符串，这样的不合法情况有g（$g-1+1$）种。对于其他相同的长度为h的颜色为d字符区域，把c以d插入其中，有h+1个位置，但都是同一个串，所以重复了h次。那么总计不和法情况就有n种。那么这样的情况就有$n\cdot m-n$种。如果有k块颜色块，那么答案就是$k \cdot (nm-n)$种。

剩下还有一种重复情况。对于一个“ab...aba”,你可以很容易发现有两种方法让它变为“ba...bab”（把首个a变成b加到最后和把最后的b变成a加到开头），那么有1种重复。
像这种长度大于2的两个字母重复串，都有一次重复。

所以最终答案为:
$$k(mn-n)-Number\ of\ alternating\ substrings\ of\ length\ at\ least\ 2$$

which runs in O(n) pretty easily.（鄙视一波官方题解）