---
layout: post
title: Multi-University Training 2015 Tree
subtitle: 2015 Multi-University Training Contest 8
date: 2017-08-27
header-img: images/cover/3.jpg
tags:  树 数据结构 Multi-University
author: yanghong
---

# Task

Given a rooted tree (node 1 is the root) with n nodes. The ithnode has a positive value vi at beginning.
We define the universal set S includes all nodes.
There are two types of Memphis's operation.
First, Memphis may change the value of one node. It's the first type operation:

$$
0 ~u ~v ~(u \in S,0 \le v \le 10^9)
$$

What's more, Memphis wants to know what's the maxinum of $v_u \otimes v_t$ ($t \in path(u,root)$, $\otimes$ means xor) . It's the second type operation: 

$$
1~u (u \in S)
$$

# Solution

先考虑如何计算最大的异或值. 

这个可以用Trie树解决. 本来我以为Trie树就是用来处理字符串的问题的, 所以一开始根本没有想到它和Trie树有什么关系. 

考虑如果得到最大的异或值: 对于两个数$A,B$ 它们都是32位的int, 那么只要从高到低有一位的值不同,就能比较出大小(这一点和字符串是很像的), 那么对于异或也可以从高到低枚举, 该位上的二进制不同就直接选取. 

那么在Trie树上, 将每个数字按二进制从高位到低位的插入 (修改就是先删除再插入) . 询问时尽量向二进制不同的节点上走. 如此可以$O(length)$的求出最大异或值. 

然而还要保证两个节点在树上的关系. 由于一个节点只会对子树造成影响, 而子树在dfs序上是连续的, 那么一个树上的问题就可以转化为序列上的问题. 可以用线段树解决, 每个节点都开一棵Trie树, 经典的区间更新,单点查询.

而这样的时间和空间的复杂度都是$O(m\log (n) \times length)$, 空间就炸了.

然后有一个很神奇的离线. 由于这里的线段树节点是独立的, 没有收集信息的作用. 那么直接将询问先存在线段树的节点上, 最后用一颗Trie树就以完成所有询问.



```cpp
/*非多case版*/

#include <bits/stdc++.h>
using namespace std;

#define rep(i,s,t) for(int i=s,i##end=t;i<=i##end;++i)
#define per(i,s,t) for(int i=t,i##end=s;i>=i##end;--i)
#define repo(i,s,t) for(int i=s,i##end=t;i<i##end;++i)

void Max(int &x,int y) {
	if (x<y) x=y;
}
const int MAXN=1e5+5;

template <int MAXN> 
struct Trie {
	void clear() {
		
	}
	Trie() {
		tot=0;
		memset(pre,0,sizeof(pre));
		memset(cnt,0,sizeof(cnt));
	}
	static const int S=32;
	int pre[MAXN*S][2],cnt[MAXN*S],tot;
	void ins(int x) {
		int cur=0;
		per (i,0,S-1) {
			int c=x>>i&1;
			if (!pre[cur][c]) pre[cur][c]=++tot;
			cur=pre[cur][c];
			cnt[cur]++;
		}
	}
	void del(int x) {
		int cur=0;
		per (i,0,S-1) {
			int c=x>>i&1;
			cur=pre[cur][c];
			cnt[cur]--;
		}
	}
	int query(int x) {
		int cur=0,res=0;
		per (i,0,S-1) {
			int c=!(x>>i&1);
			if (pre[cur][c]&&cnt[pre[cur][c]]) {
				cur=pre[cur][c];
				res|=1<<i;
			}
			else cur=pre[cur][!c];
		}
		// cerr<<"--> "<<res<<endl;
		return res;
	}
};

Trie <MAXN*2> trie;

int res[MAXN];
struct oper {
	int typ,v,id;
};
struct node {
	vector <oper> que;
	void ins(int v,bool f) {
		que.push_back((oper){f,v});
	}
	void query(int id,int v) {
		que.push_back((oper){2,v,id});
	}
	void calc() {
		if (!que.size()) return;
		// trie.clear();
		repo (i,0,que.size()) {
			if (que[i].typ==0) trie.ins(que[i].v);
			else if (que[i].typ==1) trie.del(que[i].v);
			else Max(res[que[i].id],trie.query(que[i].v));
		}
		repo (i,0,que.size()) {
			if (que[i].typ==0) trie.del(que[i].v);
			else if (que[i].typ==1) trie.ins(que[i].v);
			// else Max(res[que[i].id],trie.query(que[i].v));
		}
	}
};

#define ls (p<<1)
#define rs (p<<1|1)
template <int MAXN> 
struct segTree {
	node tr[MAXN<<2];
	void ins(int l,int r,int v,bool f,int L=1,int R=MAXN-1,int p=1) {
		if (l==L&&r==R) return tr[p].ins(v,f);
		int mid=(L+R)>>1;
		if (r<=mid) ins(l,r,v,f,L,mid,ls);
		else if (l>mid) ins(l,r,v,f,mid+1,R,rs);
		else ins(l,mid,v,f,L,mid,ls),ins(mid+1,r,v,f,mid+1,R,rs);
	}
	void query(int id,int x,int v,int L=1,int R=MAXN-1,int p=1) {
		tr[p].query(id,v);
		if (L==R) return;
		int mid=(L+R)>>1;
		if (x<=mid) query(id,x,v,L,mid,ls);
		else query(id,x,v,mid+1,R,rs);
	}
	void solve() {
		repo (i,0,MAXN<<2) tr[i].calc();
	}
};
#undef ls
#undef rs


vector <int> g[MAXN];
int val[MAXN],dfnL[MAXN],dfnR[MAXN];
segTree <MAXN> tree;

void dfs(int x) {
	static int tot;
	if (x==1) tot=0;
	dfnL[x]=++tot;
	repo (i,0,g[x].size()) dfs(g[x][i]);
	dfnR[x]=tot;
}

int main() {
	int n,m;
	cin>>n>>m;
	rep (i,2,n) {
		int f;
		scanf("%d",&f);
		g[f].push_back(i);
	}
	dfs(1);
	rep (i,1,n) {
		scanf("%d",&val[i]);
		tree.ins(dfnL[i],dfnR[i],val[i],0);
	}
	int tot=0;
	rep (i,1,m) {
		int f,p,x;
		scanf("%d",&f);
		if (f==0) {
			scanf("%d%d",&p,&x);
			tree.ins(dfnL[p],dfnR[p],val[p],1);
			val[p]=x;
			tree.ins(dfnL[p],dfnR[p],val[p],0);
		}
		else {
			scanf("%d",&p);
			tree.query(++tot,dfnL[p],val[p]);
		}
	}
	tree.solve();
	rep (i,1,tot) printf("%d\n",res[i]);
	return 0;
}
```

