---
layout: post
title: BestCoder Round 93 总结
date: 2017-3-10
tags: BestCoder 总结
header-img: images/cover/0.jpg
author: yanghong
---



# 题目：http://bestcoder.hdu.edu.cn/contests/contest_show.php?cid=750

第一题是道水题，结果没有看清题目直接先WA一发。

第二题花了十几分钟就想出个大概了，结果因为奇怪的错误就挂了。对拍了十几分钟就是没有找出错误。比赛结束后终于发现是数组越界了（但是居然没有RE）。



<!--more-->



# Task 2

题解是一个贪心，~~但是我有一个神奇的dp写法~~

为了避免出现前导0，所以可以先枚举答案的第一位数字在哪里，那么这个数字之前的所有数字都要删除。由于前面的所有数字都删除了，那么我们就可以知道后面还要删除的数字的和（sum）和后面要删除几个数字（cnt）。

令 $dp[k][x]$ 为删除k个数，其和为x，被删除的最前面的数字的位置。

如果$dp[cnt][sum]$，就是被删除的最前面的数字的位置，不被包含在已经全部被删掉的开头的那个区间里，并且不会把枚举出的第一位数字删除，那么就是合法的，我们就可以得到一个合法答案。

```cpp
#include <bits/stdc++.h>
using namespace std;

const int M=100005;

int n,k;
char s[M];
int num[M],pre[M][3];
int dp[M][3];

void solve() {
	memset(dp,0,sizeof(dp));
	
	cin>>n>>k;
	scanf("%s",s+1);
	int sum=0;
	for (int i=1;i<=n;++i) num[i]=(s[i]-'0')%3,sum=(sum+num[i])%3;
	
	if (k==n-1) {
		for (int i=1;i<=n;++i) {
			if (num[i]==0) {
				puts("yes");
				return;
			}
		}
	}
	
	pre[1][0]=pre[1][1]=pre[1][2]=0;
	for (int i=2;i<=n+1;i++) {
		for (int j=0;j<3;++j) {
			pre[i][j]=pre[i-1][j];
			if (num[i-1]==j) pre[i][j]=i-1;
		}
	}
	
	dp[0][0]=n+1;
	dp[0][1]=dp[0][2]=0;
	for (int i=0;i<k;++i) {
		for (int x=0;x<3;++x) {
			for (int y=0;y<3;++y) {
				int c=(y+3-x)%3;
				int v=dp[i][x];
				dp[i+1][y]=max(dp[i+1][y],pre[v][c]);
			}
		}
	}
	for (int i=0,c=0;i<n;++i) {
		c=(c+num[i])%3;
		while (s[i+1]=='0') i++;
		if (k>=i&&dp[k-i][(sum+3-c)%3]>i+1) {
			puts("yes");
			return;
		}
	}
	puts("no");
}

int main() {
	int T;
	cin>>T;
	while (T--) solve();
}
```

~~应该还是比贪心好理解的~~