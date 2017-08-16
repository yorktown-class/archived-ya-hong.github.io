---
layout: post
author: yanghong
title: Codeforces Round 318 div.2 E. Bear and Drawing
date: 2017-3-10
tags: Codeforces
header-img: images/cover/3.jpg
---

### 题目：http://codeforces.com/contest/574/problem/E
### 题意：

给出一颗树。（输入n和n-1条边）

求是否能在宽度为2的无限长纸带上画出树。

例如：

![](/images/Codeforces Round 318 div.2 E PE2.png)

（节点要画在点上，树边不能相交）

<!--more-->

### 题解：

对于一个树根，它能有无限个儿子。

而它的儿子中，右边区间和右边区间各有一个能有无限个儿子。

这个就是最优情况了。按照这种方法，就能够构造出最优解。



把情况简化一下，就是这样：

![](/images/Codeforces Round 318 div.2 E PE1.png)

上面一条黑色的链就是能够无限生儿子的点。这条链只能有一条。

蓝色为黑点生出的儿子，可以有无限个。

绿色的链为蓝色的点的儿子，一个蓝点可以有两条绿链。



如果能判断哪些一定是黑点，就可以判段是否可行了。（一个黑点最多连接两个黑点）

从绿点开始考虑。度为1的点可以是绿点。

然后向上找，那么度为2的点也可以是绿点。

然后找蓝点。链接去除少于等于两条的绿链且然后剩下只连接一个爸爸的点可以是蓝点。

那么剩下都是黑点，且不会少判必须的黑点（上面的图的一些黑点可以不用）

然后，由一个黑点最多连两个黑点，根据这个就可以最后的判断了。

（还有一些小细节，可以模拟一些数据）

### 代码：http://codeforces.com/contest/574/submission/24667406