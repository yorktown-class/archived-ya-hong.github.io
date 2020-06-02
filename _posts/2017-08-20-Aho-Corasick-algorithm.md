---
layout: post
title: AC自动机
subtitle: Aho-Corasick algorithm
date: 2017-08-20
header-img: images/cover/0.jpg
tags:  AC自动机 字符串
author: yanghong
---

**AC自动机** 是玄学的字符串匹配算法. 由于太玄学, 之前学了一遍写了一道题后就再也没有用过, 果断忘光了. 后来又有一道题要用到AC自动机, 于是又从头学了一遍. 

---

# 建Trie树和失配指针

这部分还是比较简单的. 

## Trie树

建Trie树没个几行:

```cpp
void insert(const char *s) {
	int l=strlen(s);
	int cur=0;//根节点
	repo (i,0,l) {
		int c=s[i]-'a';
		if (!trie[cur][c]) trie[cur][c]=++tot;
		cur=trie[cur][c];
	}
}
```

## fail指针

先将字符串转移到Trie树上, 然后就是建fail数组, 即失配指针. 此处和KMP相似, KMP通过失配指针将匹配子串的复杂度为$O(length)$ , 而AC自动机也是一样. 某一点$x$ 的fail指针指向的节点代表的字符串 (从根到此节点的字符串) ,  即为该节点$x$ 代表的字符串的最长后缀. 

那么如何求出fail数组? 可以通过BFS的形式. 

根节点所连接的一圈点的fail指针指向的一定都是根. 然后通过BFS逐层求出fail数组:  一个节点$x$ 的$c$ 号儿子$t$ 的fail指针指向的一定是$x$ 的fail指针指向节点$y$ 的对应子节点$trie[y][c]$ (如此就能保证是最长后缀) . 不过又一种特殊情况, 若$y$ 的$c$ 号子节点为空, 就需要再次跳fail指针再找一个对应子节点, 直到不为空, 如此复杂度就无法保证. 

要考虑进这种情况, 只需对原来的Trie树进行一些修改: 若一个节点的子节点为空, 就将其补上, 直接将连向子节点的边连向$fail[x]$  (就是前面说的$y$ ) 的对应子节点$trie[y][c]$ . 就能解决这种情况. 

所以大概的流程就是这样:

1. 将与根节点相连的点的fail指针都指向根, 空点则连回根 (所以将根节点设为0可以方便很多) .

2. BFS逐层遍历.

3. 对于某点$x$ , 计算所有儿子的fail指针 $fail[trie[x][c]]=trie[fail[x]][c]$ 

   若某子节点为空, 则将其补全 $trie[x][c]=trie[fail[x]][c]$ 

```cpp
void build() {
	static int que[MAXN*26];
	int l,r;
	l=r=0;
	for (int i=0;i<26;++i) if (trie[0][i]) {
		que[r++]=trie[0][i];
		g[0].push_back(trie[0][i]);
	}
	while (l!=r) {
		int x=que[l++];
		for (int i=0;i<26;++i) {
			int t=trie[x][i];
			if (t) {
				fail[t]=trie[fail[x]][i];
				que[r++]=t;
				g[fail[t]].push_back(t);
			}
			else trie[x][i]=trie[fail[x]][i];
		}
	}
}
```

这样就建出了AC自动机. 

## 时间复杂度和空间复杂度

时间: AC自动机和KMP类似, 跳fail指针和KMP是相同的, 所以是时间复杂度为 $O(n)$

空间: 就是Trie树的空间, $O(n\times v)$ (通常$v=26$)

## 模板

```cpp
template <int MAXN>
struct AC {
	AC() {
		tot=0;
	}
	void clear() {
		tot=0;
		memset(trie,0,sizeof(trie));
		memset(fail,0,sizeof(fail));
	}
	int trie[MAXN][26];
	int fail[MAXN];
	int tot;
	vector <int> g[MAXN];
	void insert(const char *s) {
		int l=strlen(s);
		int cur=0;
		for (int i=0;i<l;++i) {
			int c=s[i]-'a';
			if (!trie[cur][c]) trie[cur][c]=++tot;
			cur=trie[cur][c];
		}
	}
	void build() {
		static int que[MAXN*26];
		int l,r;
		l=r=0;
		for (int i=0;i<26;++i) if (trie[0][i]) {
			que[r++]=trie[0][i];
			g[0].push_back(trie[0][i]);
		}
		while (l!=r) {
			int x=que[l++];
			for (int i=0;i<26;++i) {
				int t=trie[x][i];
				if (t) {
					fail[t]=trie[fail[x]][i];
					que[r++]=t;
					g[fail[t]].push_back(t);
				}
				else trie[x][i]=trie[fail[x]][i];
			}
		}
	}
} ;
```

---

# Fail树

前面已经建出了AC自动机, 但是我们还是只能匹配字符串. fail树才是真正玄学的地方. 

将所有fail指针反转, 就可以建出一颗fail树. 由于只有$n-1$ 个点有fail 指针 (根节点没有) , 且不可能形成环, 所以肯定是树.  

fail树上的每个节点原本都是Trie树上的, 所以, 它们都可以表示某一个字符串的前缀. 

fail树上的每个节点的父亲节点, 都是该节点的最长后缀. 那么fail树上的每一个点又可以表示某一个字符串的前缀的后缀, 也就是一个子串. 当然这些子串都必须是另一些字符串前缀. 

所以fail树能干的事情就很多了, 往往将字符串的问题转化为了树上的问题, 就和原来的字符串没有什么关系了:-)  . 而这个关键的转化往往看了题解才想到......

---

所以, AC自动机还是比较好写的, 但是会写也没个卵用.




