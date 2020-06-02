---
layout: post
title: Wannafly挑战赛5 C
subtitle: 标准差
date: 2017-12-9
header-img: images/cover/5.jpg
tags: 数学 dp
author: yanghong
---


## Task

对于一张$n$个点$m$条边的有向图，边上有边权$w_e$，你需要找到一条1到n的路径使得经过的边的标准差最小。

$x_1,x_2,\dots,x_k$的标准差计算方法如下：

> 设![img](https://uploadfiles.nowcoder.com/files/20171207/301599_1512625425977_equation?tex=%5Coverline%7Bx%7D%3D%5Cfrac%201%20k%5Csum%20x_i)。
>
>则标准差![img](https://uploadfiles.nowcoder.com/files/20171207/301599_1512625436892_equation?tex=S%3D%5Csqrt%7B%5Cfrac%201%20k%5Csum%20(x_i-%5Coverline%7Bx%7D)%5E2%7D)。

note：这条路径不一定要是简单路径。

---



比赛的时候感觉这题应该很复杂的, 后来看别人的代码发现居然很简单....

首先肯定要将$$S=\sqrt{ \frac{1}{k} \sum(x_i- \overline x)^2 }$$ , 这样复制的表达式化简.
$$
\begin{align*}
S^2 &= \frac{1}{k} \sum(x_i- \overline x)^2 \\
&= \frac{1}{k} \sum(x_i- \overline x)^2\\
&= \frac{1}{k} \sum{ (x_i^2 - 2 x_i \overline x + \overline x) }\\
&= \frac{1}{k} ( \sum{x_i^2} - 2 \overline x \sum x_i + k \overline x ^2 ) \\
&= \frac{1}{k} (  \sum{x_i^2} - \overline x \sum x_i )\\
&=\frac{ \sum x_i^2 }{k} - \overline x ^2 \\
\end{align*}
$$
只要得到$$\sum x_i^2 , \sum x_i , k$$  , 就可以得到$S^2$ 了. 

然后是如何达到最小方差的问题了. 一开始可能觉得会很复杂(可以绕来绕去) , 然而是很简单的. 假设现在有一条简单路径$P$ 从$1$ 到$n$ 和一个经过该路径的环$C$. 假如$S(P) \le S(C)$, 那么直接走简单路径方差就是最小的, 否则$S(P)>S(C)$ , 那么就一直在环上跑, 跑无穷大次$P$ 对方差的贡献就趋近于$0$ , 方差就是$S(C)$ . 

若有很多环也一样, 必然是沿方差最小环无限绕啊绕. 那么问题就简化了很多了, 答案要么是从$1$ 到 $n$ 的某条简单路径的方差, 要么是某个环的方差. 

定义$dp[x][c][w]$ 表示从某起点$s$ 到$x$ 经过$c$ 条边且经过边的权值和为$w$ 的最小$\sum x_i^2$ . 根据这个dp值可以算出从$s$ 到$t$ 的最小方差: $$\frac{dp}{c} -(\frac{w}{c})^2$$  . 结合这个和前面找最小方差的方法就可了. 

感觉这题难的就是想不到取极限. 


```cpp
#include <bits/stdc++.h>
using namespace std;

#define rep(i,s,t) for(int i=s,i##end=t;i<=i##end;++i)
#define per(i,s,t) for(int i=t,i##end=s;i>=i##end;--i)
#define repo(i,s,t) for(int i=s,i##end=t;i<i##end;++i)
#define debug(x) cerr<<#x<<" : "<<x<<" "<<__FUNCTION__<<__LINE__<<endl

const int MAXN=35,MAXNW=3005;
const int INF=1e9;

struct node {
	int t,v;
};

int n,m;
int dp[MAXN][MAXN][MAXNW];//n,k,s
vector <node> g[MAXN],rg[MAXN];
bool mark1[MAXN],mark2[MAXN];
double res=1.0/0.0;
int sumw=3000;

void dfs(int x,vector <node> *g,bool *mark) {
	if (mark[x]) return;
	mark[x]=true;
	repo (i,0,g[x].size()) dfs(g[x][i].t,g,mark);
}

void work(int s,int t) {
	repo (i,0,MAXN) repo (j,0,MAXN) repo (k,0,MAXNW) dp[i][j][k]=INF;
	dp[0][s][0]=0;
	
	rep (c,0,n) rep (x,1,n) rep (w,0,sumw) {
		int pre=dp[c][x][w];
		if (pre==INF) continue;
		if (c&&x==t) {
			int w2=pre;
			double p1=(double)w2/c;
			double p2=(double)w/c;
			res=min(res, p1-p2*p2);
		}
		repo (i,0,g[x].size()) {
			int t=g[x][i].t,v=g[x][i].v;
			dp[c+1][t][w+v]=min(dp[c+1][t][w+v],pre+v*v);
		}
	}
}

int main() {
	cin>>n>>m;
	rep (i,1,m) {
		int x,y,v;
		scanf("%d%d%d",&x,&y,&v);
		g[x].push_back((node){y,v});
		rg[y].push_back((node){x,v});
	}
	
	dfs(1,g,mark1);
	dfs(n,rg,mark2);
	
	work(1,n);
	rep (i,1,n) if (mark1[i]&&mark2[i]) work(i,i);
	
	printf("%.7f",sqrt(res));
	return 0;
}
```