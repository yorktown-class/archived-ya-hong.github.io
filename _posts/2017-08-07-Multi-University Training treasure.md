---
layout: post
title: Multi-University Training treasure
subtitle: Multi-University 2016 Training 4
date: 2017-08-07 11:08:54
header-img: images/cover/3.jpg
tags: 树 扫描线 数据结构 Multi-University
author: yanghong
---

这题还是比较恶心的. 

假设钥匙所在的点为$k$ , 宝箱所在的点在$t$ . 

先考虑一般的情况, 就是从$k$ 的子树到达$t$ 的子树就能得到这个宝藏. 用dfs序表示一个点, 所以就是从$[L[k],R[k]]$ 到达$L[t],R[t]$ . 那么这样的所有路径可以表示成在二维平面上的矩形, 矩形上的所有点的权值都加上$val[t]$ . 然后用扫描线加线段树求出权值最大的点的权值就可以得到对应的权值最大的路径的权值. 

但是还有三种特殊情况. 

1. $k \not = t , t \in subtree(k)$

   找到$k$ 的某一直接儿子$v$ 使得 $t \in subtree(v)$ . 那么只要从某一起始点$s \not \in subtree(v)$ 开始到达$subtree(t)$ 就可以得到这个宝藏. 那么此时对应的区间为$[1,L[v]-1] , [R[v]+1,n]$ 到 $[L[t],R[t]]$ . 此时为两个矩形. 

   而得到这个$v$ 点需要用倍增从$t$ 点跳到$k$ 的下方得到, 如果是直接枚举$k$ 的所有直接儿子复杂度可以达到$O(n \times m)$ . 

2. $k \not = t , k \in subtree(t)$

   类似与上面的做法, 还是两个矩形. 

3. $k=t$

   这种情况是最恶心的. 可以先假设所有路径都能得到这个宝藏, 即$[1,n] \to [1,n]$ 的矩形. 然后减去不可到达的情况. 把$k$ 点作为根, 它的所有子树内部的路径都是不行的. 那么枚举$k$ 的每个直接儿子$s$ .减去矩阵$[L[s],R[s]] \to [L[s],R[s]]$ . 但是$k$ 并不一定是树的根, 所以还要考虑它的特殊子树$fa[k]$ , 这时又分作四种情况 

   $[1,L[k]-1] \to [1,L[k]-1]$ ,

   $[1,L[k]-1] \to [R[k]+1,n]$ , 

   $[R[k]+1,n] \to [1,L[k]-1]$ , 

   $[R[k]+1,n] \to [R[k]+1,n]$ .

   可以发现这样的情况下矩阵是很多的. 每次都是边数加4. 假设$k=t$ 的宝藏每个点都有且只有一个, 那么每条边贡献的矩阵数都是2,每个点贡献数都是4, 大约有$6 \times n$ 个矩阵. 但是一个点上的$k=t$ 的情况不一定只有一种, 如果仍然按照一般的做法, 矩阵数可以达到$O(n \times m)$ 级别. 可以把一个点上的$k=t$ 情况的宝藏权值累加, 相当于变成了一个宝藏, 然后一起处理, 矩阵数仍然是$O(n)$ 级别.

```cpp
#include <cstdio>
#include <cstring>
#include <cstdlib>
#include <ctime>
#include <cassert>
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;


inline void getc(char &c) {
	static char buf[50000],*p1=buf,*p2=buf;
	if (p1==p2) p2=(p1=buf)+fread(buf,1,50000,stdin);
	if (p1==p2) c=EOF;
	else c=*p1++;
}
inline void Rd(int &x) {
	x=0;
	char c;
	bool f=false;
	while (getc(c),!isdigit(c)&&c!='-');
	if (c=='-') f=true,getc(c);
	do x=(x<<1)+(x<<3)+(c^48);
	while (getc(c),isdigit(c));
	if (f) x=-x;
}

template <class T>
struct vec {
	T *A;
	int sz,tot;
	vec() {
		A=(T*)malloc(sizeof(T));
		sz=1;
		tot=0;
	}
	~vec() {
		free(A);
	}
	void newsize(int nsz) {
		T *now=(T*)malloc(sizeof(T)*nsz);
		memcpy(now,A,sizeof(T)*tot);
		free(A);
		A=now;
		sz=nsz;
	}
	void push_back(T &x) {
		if (sz==tot) newsize(sz<<1);
		A[tot++]=x;
	}
	int size() const {
		return tot;
	}
	T& operator [] (const int &p) {
		return A[p];
	}
};

template <int M>
struct segTree {
	#define ls (p<<1)
	#define rs (p<<1|1)
	int mx[M<<2],add[M<<2];
	segTree() {
		memset(mx,0,sizeof(mx));
		memset(add,0,sizeof(add));
	}
	inline void up(const int &p) {
		mx[p]=max(mx[ls],mx[rs]);
	}
	inline void down(const int &p) {
		if (!add[p]) return;
		mx[ls]+=add[p];
		add[ls]+=add[p];
		mx[rs]+=add[p];
		add[rs]+=add[p];
		add[p]=0;
	}
	void update(const int &L,const int &R,const int &v,const int &l=1,const int &r=M-1,const int &p=1) {
		if (L==l&&R==r) {
			mx[p]+=v;
			add[p]+=v;
			return;
		}
		down(p);
		int mid=(l+r)>>1;
		if (R<=mid) update(L,R,v,l,mid,ls);
		else if (L>mid) update(L,R,v,mid+1,r,rs);
		else update(L,mid,v,l,mid,ls),update(mid+1,R,v,mid+1,r,rs);
		up(p);
	}
	int query(const int &L,const int &R,const int &l=1,const int &r=M-1,const int &p=1) {
		if (L==l&&R==r) return mx[p];
		down(p);
		int mid=(l+r)>>1;
		if (R<=mid) return query(L,R,l,mid,ls);
		else if (L>mid) return query(L,R,mid+1,r,rs);
		else return max(query(L,mid,l,mid,ls),query(mid+1,R,mid+1,r,rs));
	}
	#undef ls
	#undef rs
};

struct Mat {
	int x1,x2,y1,y2;
	int v;
};
struct Lne {
	int p,x,y;
	int v;
	bool operator < (const Lne &t) const {
		return p<t.p;
	}
};

const int MAXN=1e5+5;

int n,m;
vec <int> g[MAXN];
vec <int> ky[MAXN],tr[MAXN];
int val[MAXN];

struct AC {
	AC() {
		res=0;
		mtot=ltot=0;
	}
	static const int S=20;
	int res;
	int kyp[MAXN],trp[MAXN];
	Mat mat[MAXN*8];
	Lne line[MAXN*16];
	int mtot,ltot;
	segTree <MAXN> tree;
	int L[MAXN],R[MAXN],dep[MAXN],fa[S][MAXN];
	
	void dfsInit(int x,int f) {
		static int dfn;
		if (x==f) dfn=0;

		dep[x]=dep[f]+1;
		L[x]=++dfn;
		fa[0][x]=f;
		for (int i=1;i<S;++i) fa[i][x]=fa[i-1][fa[i-1][x]];
		for (int i=0;i<g[x].size();++i) {
			if (g[x][i]!=f) dfsInit(g[x][i],x);
		}
		R[x]=dfn;
	}
	int jump(int x,int y) {
		int d=dep[y];
		if (dep[y]-dep[x]==1) return x;
		for (int i=S-1;i>=0;--i) {
			if (dep[fa[i][x]]>d) x=fa[i][x];
		}
		return x;
	}
	void posInit() {
		for (int i=1;i<=n;++i) {
			for (int j=0;j<ky[i].size();++j) {
				kyp[ky[i][j]]=i;
			}
			for (int j=0;j<tr[i].size();++j) {
				trp[tr[i][j]]=i;
			}
		}
	}
	inline bool judge(const int &x,const int &y) {
		return L[x]<=L[y]&&L[y]<=R[x];
	}
	void init() {
		posInit();
		dfsInit(1,1);
		for (int x=1;x<=n;++x) {
			int eqv=0;
			for (int i=0;i<ky[x].size();++i) {
				int id=ky[x][i];
				int k=x,t=trp[id];
				int v=val[id];
				if (k==t) eqv+=v;
				else if (judge(k,t)) {
					int p=jump(t,k);
					mat[++mtot]=(Mat){L[1],L[p]-1,L[t],R[t],v};
					mat[++mtot]=(Mat){R[p]+1,R[1],L[t],R[t],v};
				}
				else if (judge(t,k)) {
					int p=jump(k,t);
					mat[++mtot]=(Mat){L[k],R[k],L[1],L[p]-1,v};
					mat[++mtot]=(Mat){L[k],R[k],R[p]+1,R[1],v};
				}
				else {
					mat[++mtot]=(Mat){L[k],R[k],L[t],R[t],v};
				}
			}
			if (eqv) {
				mat[++mtot]=(Mat){L[1],R[1],L[1],R[1],eqv};
				for (int i=0;i<g[x].size();++i) {
					int s=g[x][i];
					if (dep[s]<dep[x]) continue;
					mat[++mtot]=(Mat){L[s],R[s],L[s],R[s],-eqv};
				}
				mat[++mtot]=(Mat){L[1],L[x]-1,L[1],L[x]-1,-eqv};
				mat[++mtot]=(Mat){L[1],L[x]-1,R[x]+1,R[1],-eqv};
				mat[++mtot]=(Mat){R[x]+1,R[1],L[1],L[x]-1,-eqv};
				mat[++mtot]=(Mat){R[x]+1,R[1],R[x]+1,R[1],-eqv};
			}
		}
		for (int i=1;i<=mtot;++i) {
			if (mat[i].x1>mat[i].x2||mat[i].y1>mat[i].y2) continue;
			line[++ltot]=(Lne){mat[i].x1,mat[i].y1,mat[i].y2,mat[i].v};
			line[++ltot]=(Lne){mat[i].x2+1,mat[i].y1,mat[i].y2,-mat[i].v};
		}
		sort(line+1,line+ltot+1);
	}
	void main() {
		init();
		for (int t=1,i=1;t<=n;++t) {
			while (line[i].p==t&&i<=ltot) {
				tree.update(line[i].x,line[i].y,line[i].v);
				i++;
			}
			res=max(res,tree.query(1,MAXN-1));
		}
		printf("%d\n",res);
	}

};

int main() {
	Rd(n);Rd(m);

	for (int i=1;i<n;++i) {
		int x,y;
		Rd(x);Rd(y);
		g[x].push_back(y);
		g[y].push_back(x);
	}

	for (int i=1;i<=m;++i) {
		int k,t;
		Rd(k);Rd(t);Rd(val[i]);
		ky[k].push_back(i);
		tr[t].push_back(i);
	}

	AC *now=new AC;
	now->main();
	delete now;
}
```