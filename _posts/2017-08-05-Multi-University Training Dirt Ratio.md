---
layout: post
title: Multi-University Training Dirt Ratio
subtitle: Multi-UniversityTrainingContest4 1004
date: 2017-08-05 11:18:56
header-img: images/cover/7.jpg
tags:  二分答案 数据结构
author: yanghong
---

# Task

In ACM/ICPC contest, the ''Dirt Ratio'' of a team is calculated in the following way. First let's ignore all the problems the team didn't pass, assume the team passed $X$ problems during the contest, and submitted $Y$ times for these problems, then the ''Dirt Ratio'' is measured as $\frac{X}{Y}$. If the ''Dirt Ratio'' of a team is too low, the team tends to cause more penalty, which is not a good performance.


![img](http://acm.hdu.edu.cn/data/images/C762-1004-1.jpg)
Little Q is a coach, he is now staring at the submission list of a team. You can assume all the problems occurred in the list was solved by the team during the contest. Little Q calculated the team's low ''Dirt Ratio'', felt very angry. He wants to have a talk with them. To make the problem more serious, he wants to choose a continuous subsequence of the list, and then calculate the ''Dirt Ratio'' just based on that subsequence.

Please write a program to find such subsequence having the lowest ''Dirt Ratio''.

# solution

虽然是一开始想的就是二分答案 ( 其实除了二分答案以外什么也没想到 ) , 但是想到了也是写不出来.

本来以为是和经典的问题一样的, 即求$\frac{sum(l,r)}{r-l+1}$ 的最大值. 如果是这样, 那么可以二分一个答案, 然后判断
$$
\frac{sum(l,r)}{r-l+1} \le res
$$
也就是: 
$$
sum(l,r) \le res \times r - res \times l + res
$$

$$
sum(1,r) - res \times r \le sum(1,l-1) - res \times (l -1)
$$

将$sum(1,x)-res \times x$ 视作一个整体, 就可以$O(n)$ 的判断了. 

原本以为这题大概也是这样的, 将式子列出来后才意识到分子是区间内不同颜色的个数, 那么就不能拆成两个前缀的和了. 然后大家就开始一起懵逼, 也没有想到再对式子重新进行化简了. 

按照题解的做法,就是将$\frac{size(l,r)}{r-l+1} \le res $ 变成了 $size(l,r) + res \times l \le res \times (r+1)$ . 如此虽然没有完全把变量分离 (其实$size(l,r)$ 也是分离不了的) , 但是我们可以通过枚举右端点,排除$r$ 的影响. 而排除了$r$ 的影响后, 那么问题就转化为了在一个定值$r$ 下$size(l,r) + res \times l$ 的最小值. 

剩下的部分就比较明显了, 可以用数据结构同时维护不同$r$ 下每一个$l$ 的$size(l,r)$ 和$size(l,r) + res \times l$ 的最小值. 最后就是用线段树维护了. 最小值很容易搞, $size(l,r)$ 就麻烦一点. 记录$col[x]$ 表示$x$ 位的值$pre[x]$ 表示$col[t]=col[x] , t<x$ 的最大$t$ . 从左到右枚举$r$  , 每有一个新的$r$ 加入时,只会对区间$[pre[r]+1,r]$ 的$size$ 值造成影响,使它们加$1$ ,而对于其他点的$size$ 值都无影响. 那么用线段树区间更新就可以了.

```cpp
#include <bits/stdc++.h>
using namespace std;

const int BASE=10000;

template <int M>
struct segTree {
	int mi[M<<2],add[M<<2];
	void clear() {
		memset(mi,0,sizeof(mi));
		memset(add,0,sizeof(add));
	}
	segTree() {
		clear();
	}
	void down(int p) {
		if (add[p]==0) return;
		mi[p<<1]+=add[p];
		mi[p<<1|1]+=add[p];
		add[p<<1]+=add[p];
		add[p<<1|1]+=add[p];
		add[p]=0;
	}
	void update(int L,int R,int v,int l=1,int r=M-1,int p=1) {
		if (L==l&&R==r) {
			add[p]+=v;
			mi[p]+=v;
			return;
		}
		down(p);
		int mid=(l+r)>>1;
		if (R<=mid) update(L,R,v,l,mid,p<<1);
		else if (L>mid) update(L,R,v,mid+1,r,p<<1|1);
		else update(L,mid,v,l,mid,p<<1),update(mid+1,R,v,mid+1,r,p<<1|1);
		mi[p]=min(mi[p<<1],mi[p<<1|1]);
	}
	int query(int L,int R,int l=1,int r=M-1,int p=1) {
		if (L==l&&R==r) return mi[p];
		down(p);
		int mid=(l+r)>>1;
		if (R<=mid) return query(L,R,l,mid,p<<1);
		else if (L>mid) return query(L,R,mid+1,r,p<<1|1);
		else return min(query(L,mid,l,mid,p<<1),query(mid+1,R,mid+1,r,p<<1|1));
	}
};

struct Main {
	Main() {
		memset(las,0,sizeof(las));
	}
	
	static const int M=60005;
	
	int n;
	int A[M],pre[M],las[M];
	segTree <M> tree;

	bool chk(int v) {
		tree.clear();
		for (int i=1;i<=n;++i) {
			tree.update(pre[i]+1,i,BASE);
			tree.update(i,i,v*i);
			if (tree.query(1,i)<=v*(i+1)) return true;
		}
		return false;
	}

	void main() {
		read();
		for (int i=1;i<=n;++i) {
			pre[i]=las[A[i]];
			las[A[i]]=i;
		}
		int l=0,r=BASE,res=0;
		while (l<=r) {
			int mid=(l+r)>>1;
			if (chk(mid)) r=mid-1,res=mid;
			else l=mid+1;
		}
		printf("%.4f\n",res*1.0/BASE);
	}
	void read() {
		scanf("%d",&n);
		for (int i=1;i<=n;++i) scanf("%d",&A[i]);
	}
};

int main() {
	int T;
	cin>>T;
	while (T--) {
		Main *now=new Main;
		now->main();
		delete now;
	}
	return 0;
}
```