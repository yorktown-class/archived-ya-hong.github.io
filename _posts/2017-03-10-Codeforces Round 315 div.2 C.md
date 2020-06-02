---
layout: post
author: yanghong
title: Codeforces Round 315 div.2 C. Primes or Palindromes?
date: 2017-3-10
tags:  Codeforces 数学
header-img: images/cover/0.jpg
---

### 题目：http://codeforces.com/contest/569/problem/C

由于回文数很多，而素数很少。<br>
可以知道当n大于一定值的时候，肯定不成立。

<!--more-->


对于一个长度为x的数n，
$$ rub(n) \approx 10^{ \lceil \frac {x-1} 2 \rceil }  $$
$$ rub(n) \approx \sqrt n $$
显然：
$$ \pi(n) < \sqrt n  $$

当 $sub(n) > 42*\pi(n)$ 时，n再增大就没有意义了。

所以答案不会很大，<br>
有了这个结论，<br>
那么直接暴力判断就可以了。