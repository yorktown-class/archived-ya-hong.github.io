---
layout: post
title: mathjax的奇怪feature
subtitle: 
date: 2020-2-21
author: yanghong
header-img: images/cover/13.jpg
tags: 日记 
---

昨天发现mathjax的渲染绝对值`|` 的时候出现了问题，可能又是和marked冲突了。今天研究了一下不会出问题的情况：

1. 多行的数学公式不会出问题：

	```
	$$
	|c| > \max{|a|, |b|}
	$$
	```

	$$
	|c| > \max{|a|, |b|}
	$$

2. 行内的数学公式中只有一对绝对值符号且中间没有特殊符号且不能再奇怪的列表之类的环境里面：

	`$|a|$` 
	
	 $|a|$
	`$|a||b|$`  
	$|a||b|$
	`|\max{a, b}|`
	$|\max{a, b}|$

再列表外面时：

`$|abc|$` : $|abc|$

所以打行内公式时就用`\vert` 或是 `\|` 代替吧。

