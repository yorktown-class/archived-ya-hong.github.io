---
layout: post
title: Multi-University Training Rating
subtitle: Multi-University 2014 Training
date: 2017-10-15
header-img: images/cover/2.jpg
tags: dp Multi-University
author: yanghong
---

# Rating

A little girl loves programming competition very much. Recently, she has found a new kind of programming competition named "TopTopTopCoder". Every user who has registered in "TopTopTopCoder" system will have a rating, and the initial value of rating equals to zero. After the user participates in the contest held by "TopTopTopCoder", her/his rating will be updated depending on her/his rank. Supposing that her/his current rating is X, if her/his rank is between on 1-200 after contest, her/his rating will be min(X+50,1000). Her/His rating will be max(X-100,0) otherwise. To reach 1000 points as soon as possible, this little girl registered two accounts. She uses the account with less rating in each contest. The possibility of her rank between on 1 - 200 is P for every contest. Can you tell her how many contests she needs to participate in to make one of her account ratings reach 1000 points?

---



## 简单的转移

$dp[x]$ 记录当前rating为$x$, 达到$1000$ 的期望场数, 所以可以根据题意写出:

$$
dp_x=1 + (1-p) \times dp_{x-100}+ p \times dp_{x+50}
$$

(特殊的考虑$x-100 < 0$ 和 $x+50>1000$ 的情况) . 两个账号则把状态开到两维. 

可以把最高rating和每场变化的rank值都除以50, 就变成$dp_x=1 + (1-p) \times dp_{x-2}+p \times dp_{x+1}$ , 最终达到20. 

而这个dp是有环的, 所以只能用高斯消元法解. 由于$n\le 20$ (除以$50$ 后) , 两维就是$400$ 个状态, 所以$n^3$ 也没有什么问题. 

---



## 鬼畜$\mathcal{O} (n)$ 做法

同样先考虑一个账号的做法. 

先特殊考虑$dp_0,dp_1,dp_2​$ . (状态的的定义仍与上相同) 

令 $q=1-p$ . 

$$
\begin{align*}
dp_0 &= 1 + p \times dp_1 +  q \times dp_0\\
dp_0 &= \frac{1}{1-q} + dp_1\\
dp_0 &= \frac{1}{p} + dp_1\\
\end{align*}
$$

设$t_k$ 为由分数$0$ 到达k所需的场数, 等于$dp_0-dp_k$ .

所以$$t_1 = \frac{1}{q}$$ . 

相应可以得到$t_2$

$$
\begin{align*}
dp_1 &= 1 + dp_0 \times q + dp_2 \times p \\
dp_0 - \frac{1}{p} &= 1 + dp_0 \times q + dp_2 \times p\\
dp_0(1-q) &= dp_2 \times p  + \frac{1}{p} + 1 \\
dp_0 &= dp_2 + \frac{1}{p^2} + \frac{1}{p}\\
\\
t_2 &= \frac{1}{p} + \frac{1}{p^2}
\end{align*}
$$

对于特殊情况$k=0,1,2$ 已经得到$$t_0 =0 , t_1= \frac{1}{p}, t-2= \frac{1}{p} + \frac{1}{p^2}$$ .   

然后可以根据通式$dp_i = p\times dp_{i+1} + q \times dp_{i-2}$ 的到$t_i$ 的递推式. 

$$
\begin{align*}
dp_i &= 1+ p \times dp_{i+1} + q \times dp_{i-2}\\
dp_0 -t_i &=1+  p \times dp_{i+1} + q\times (dp_0 -t_{i-2})\\
dp_0 &= \frac{1}{p} + dp_{i+1} + \frac{t_i}{p} - \frac{q}{p} t_{i-2}\\
dp_0 &= dp_{i+1} + \frac{1}{p} + \frac{t_i}{p} - \frac{1-p}{p} t_{i-2}\\
t_{i+1} &= \frac{1}{p} + \frac{t_i}{p} - \frac{1-p}{p} t_{i-2}\\
\end{align*}
$$

那么可以递推得到每一个$t_i$ , 一个账号情况下最终答案就是$t_{20}$ . 

然后考虑两个账号的情况. 一开始是由分数$(0,0)$ 开始, 假设先动一账号, 那么肯定先要到达 $(1,0)$ ,  然后一定是二账号不断比赛直至达到$(1,1)$ . $(1,1)$ 又是两个账号分数相同的情况,再假设先动一账号, 那么必须达到$(2,1)$ 才会停止动一账号, 然后用二账号达到$(2,2)$ , 如此循环直至$(20,19)$ 达到20分. 

由于始终是独立的两部分, 那么最后答案就是$t_{20} + t_{19}$ ,  代码奇短.