---
layout: post
title: Multi-University Training Colorful Tree
subtitle: Multi-UniversityTrainingContest1 1003
date: 2017-07-28 10:43:29
header-img: images/cover/7.jpg
tags:  树 数据结构
author: yanghong
---

## 题目描述

给定一颗树,节点$i$ 上有颜色$c_i$ 。定义一条路径$(i,j)$ 的值为$i$ 到 $j$ 的颜色种数。统计所有$\frac{n \times (n-1)}{2}$ 条路径的值。



There is a tree with n nodes, each of which has a type of color represented by an integer, where the color of node $i$ is $c_i$.

The path between each two different nodes is unique, of which we define the value as the number of different colors appearing in it.

Calculate the sum of values of all paths on the tree that has $\frac{n \times (n−1)}{2}$ paths in total.



## 题解

这题我不是题解做法，想法好像正好和正解相反。所以麻烦了很多,而且复杂度也高，但是比较容易想到。

---

一开始是想要统计每一种颜色的贡献。

对于一个点，它的贡献就是经过它的路径。这个可以通过它的所有子树的大小来计算。

```cpp
for (int i=1;i<=n;++i) {
    int sz=1;
    for (int j=0;j<g[i].size();++j) {
        res+=sz*size[g[i][j]];
        sz+=size[g[i][j]];
    }
}
```



但是有一个很麻烦的地方：一个条路径经过同一种颜色两次只当作一次计算。然后大概可以这样解决：

![](/images/Multi-University Training Colorful Tree pic1.png)

这样就可以避免重复。



如果直接这么写，对于一种颜色是好处理的。但是不同颜色不能一起计算（必须要把树还原回去）。那么处理同一种颜色的复杂度就要尽量低，而且只能跟这种颜色的数量有关。

然后想到了一种比较好的方式把点删去。我们还是一起处理同一种颜色，但是对于相同的颜色，可以按后续遍历的顺序来处理。那么这时将一个点删去时，就可以直接删去整个子树（因为子树里已经没有这种颜色的节点了）。

现在有了一种正确的方法来统计答案，剩下就是要能快速求出一个节点的子树大小。可以利用dfs序和线段树来解决。删除子树时，可以在线段树上将对应区间赋值为0；询问子树大小时，可以在线段树上查询对应区间。

```cpp
#include <bits/stdc++.h>
using namespace std;

#define M (200005)

void Rd(int &x) {
	x=0;
	char c;
	while (c=getchar(),!isdigit(c));
	do x=(x<<1)+(x<<3)+(c^48);
	while (c=getchar(),isdigit(c));
}

int val[(M+5)<<2];
int add[(M+5)<<2];
void down(int p,int l,int r) {
	if (!add[p]) return;
	int mid=(l+r)>>1;
	val[p<<1]=add[p]*(mid-l+1);
	add[p<<1]=add[p];
	val[p<<1|1]=add[p]*(r-mid);
	add[p<<1|1]=add[p];
	add[p]=0;
}
void insert(int l,int r,int v,int L=1,int R=M,int p=1) {
	if (l==L&&r==R) {
		add[p]=v;
		val[p]=v*(r-l+1);
		return;
	}
	down(p,L,R);
	int mid=(L+R)>>1;
	if (r<=mid) insert(l,r,v,L,mid,p<<1);
	else if (l>mid)  insert(l,r,v,mid+1,R,p<<1|1);
	else insert(l,mid,v,L,mid,p<<1),insert(mid+1,r,v,mid+1,R,p<<1|1);
	val[p]=val[p<<1]+val[p<<1|1];
}
int query(int l,int r,int L=1,int R=M,int p=1) {
	if (l==L&&r==R) return val[p];
	down(p,L,R);
	int mid=(L+R)>>1;
	if (r<=mid) return query(l,r,L,mid,p<<1);
	else if (l>mid)  return query(l,r,mid+1,R,p<<1|1);
	else return query(l,mid,L,mid,p<<1)+query(mid+1,r,mid+1,R,p<<1|1);
}

struct Q {
	int x,col,ID;
	bool operator < (const Q &t) const {
		if (col!=t.col) return col<t.col;
		return ID<t.ID;
	}
};

struct node {
	int to;
	int nxt;
};
int head[M];
node edge[M*2];
int Tot;

void Add(int x,int y){
	edge[Tot].to=y,edge[Tot].nxt=head[x];head[x]=Tot++;
}

int n;
int col[M];

int fa[M];
int L[M],R[M],ID[M],tot;
Q A[M];
long long res;

void clear() {
	memset(head,-1,sizeof(head));
	Tot=0;
	memset(val,0,sizeof(val));
	memset(add,0,sizeof(add));
	tot=1;
	res=0;
}


void dfs(int x,int f) {
	fa[x]=f;
	L[x]=tot;
	for (int i=head[x];i!=-1;i=edge[i].nxt) {
		if (edge[i].to!=f) dfs(edge[i].to,x);
	}
	ID[x]=R[x]=tot++;
	insert(ID[x],ID[x],1);
	A[x]=(Q){x,col[x],ID[x]};
}

void read() {
	for (int i=1;i<=n;++i) Rd(col[i]);
	for (int i=1;i<n;++i) {
		int x,y;
		Rd(x);Rd(y);
		Add(x,y);
		Add(y,x);
	}
}

void init() {
	read();
	dfs(1,1);
	sort(A+1,A+1+n);
}

void solve(int cas) {
	init();
	for (int c=1,i=1;c<=n;++c) {
		int T=i;
		for (;A[i].col==c&&i<=n;++i) {
			int x=A[i].x,sz=1;
			int outsz=query(L[1],R[1])-query(L[x],R[x]);
			res+=1ll*outsz*sz;
			sz+=outsz;
			for (int i=head[x];i!=-1;i=edge[i].nxt) {
				int t=edge[i].to;
				if (t==fa[x]) continue;
				int size=query(L[t],R[t]);
				res+=1ll*size*sz;
				sz+=size;
			} insert(L[x],R[x],0);
		}
		for (;A[T].col==c&&T<=n;++T) insert(L[A[T].x],R[A[T].x],1);
	}
	printf("Case #%d: %lld\n",cas,res);
}

int main() {
	int ID=1;
	while (scanf("%d",&n)!=EOF) {
		clear();
		solve(ID++);
	}
	return 0;
}
```

---

题解的方法还是容易理解，但是一开始不会实现。

```cpp
#include <bits/stdc++.h>
using namespace std;

const int M=200005;

inline char getc() {
	static char buf[500000],*p1=buf,*p2=buf;
	if (p1==p2) p1=buf,p2=p1+fread(buf,1,500000,stdin);
	if (p1==p2) return EOF;
	else return *p1++;
}
inline char Rd(int &x){
	x=0;
	char c;
	while (c=getc(),!isdigit(c)&&c!=EOF);
	if (c==EOF) return EOF;
	do x=(x<<1)+(x<<3)+(c^48);
	while (c=getc(),isdigit(c));
	return 0;
}

template <class T>
void putc(const T &x) {
	if (x==0) return;
	putc(x/10);
	putchar((x-x/10*10)^48);
}
template <class T>
void print(const T &x) {
	if (!x) putchar('0');
	else putc(x);
}


int n;
int col[M];

struct node {
	int t,nxt;
};
int head[M<<1];
node edge[M<<1];
int tot=0;
void Add(int x,int y) {
	edge[tot]=(node){y,head[x]};
	head[x]=tot++;
}


int cnt,dlt[M],pre[M];
long long res;

void dfs(int x,int fa) {
	pre[x]=cnt-dlt[col[x]];
	cnt++;
	for (int i=head[x];~i;i=edge[i].nxt) {
		int t=edge[i].t;
		if (t==fa) continue;
		dlt[col[x]]=cnt;
		dfs(t,x);
		int v=cnt-dlt[col[x]];
		res-=((v-1ll)*v)>>1;
	}
	dlt[col[x]]=cnt-pre[x];
}

int main() {
	int ID=0;
	while (Rd(n)!=EOF) {
		memset(head,-1,sizeof(head));
		tot=0;

		cnt=0;
		memset(dlt,0,sizeof(dlt));
		res=((n-1ll)*n*n)>>1;

		for (int i=1;i<=n;++i) Rd(col[i]);
		for (int i=1;i<n;++i) {
			int x,y;
			Rd(x);Rd(y);
			Add(x,y);
			Add(y,x);
		}
		dfs(1,1);
		for (int i=1;i<=n;++i) {
			int v=cnt-dlt[i];
			res-=(v-1ll)*v>>1;
		}
		printf("Case #%d: %lld\n",++ID,res);
	}
}
```
