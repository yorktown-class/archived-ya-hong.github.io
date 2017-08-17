---
layout: post
author: yanghong
title: Multi-University Training String
subtitle: Multi-UniversityTrainingContest6 1001 
date: 2017-08-17
tags: Multi-University 字符串
header-img: images/cover/7.jpg
---

# Task

Bob has a dictionary with N words in it.
Now there is a list of words in which the middle part of the word has continuous letters disappeared. The middle part does not include the first and last character.
We only know the prefix and suffix of each word, and the number of characters missing is uncertain, it could be 0. But the prefix and suffix of each word can not overlap.
For each word in the list, Bob wants to determine which word is in the dictionary by prefix and suffix.
There are probably many answers. You just have to figure out how many words may be the answer.

# Solution

先当于求包含询问的前缀和后缀的字符串个数, 且前缀后缀不能相交. 

题解将其转化为了一个矩形覆盖问题, 最后额外处理前后缀相交的情况. ~~而我有一种代码非常短的做法~~ .

同样最后考虑前后缀相交的情况, 那么先处理包含前后缀的字符串数. 

前后缀先当于两个限制. 可以先按前缀排序, 再按倒序插入trie树中. 那么对于trie树上的任意节点, 它表示了后缀为该点到根的串的所有字符串. 再在每个节点上开一个vector, 保存经过它的字符串的编号. 那么每个节点的vector都储存了某一相同后缀下按照前缀排序后的字符串编号.  那么对于每一个询问, 按照后缀找到对应的trie树节点, 然后按照前缀二分就可以找到包含前后缀的字符串数. 

对于前后缀相交的情况, 就可以枚举相交长度, 就可以得到所有的不合法串. 

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN=100005;
const int MAXL=500005;
const int MOD=1e9+7;
const int BASE=233;

struct trie {
	struct node {
		vector <int> p;
		int s[26];
		node() {
			memset(s,0,sizeof(s));
		}
	} tr[MAXL];
	int tot;
	trie() {
		tot=1;
	}
	void insert(int id,const string &s,int l=0,int p=1) {
		if (l==s.size()) return;
		int c=s[s.size()-l-1]-'a',&t=tr[p].s[c];
		if (!t)  t=++tot;
		tr[t].p.push_back(id);
		insert(id,s,l+1,t);
	}
	int query(const string &s,int L,int R,int l=0,int p=1) {
		if (l==s.size()) {
			vector <int> &v=tr[p].p;
			int lp=lower_bound(v.begin(),v.end(),L)-v.begin();
			int rp=upper_bound(v.begin(),v.end(),R)-v.begin()-1;
			return rp-lp+1;
		}
		int c=s[s.size()-l-1]-'a',t=tr[p].s[c];
		if (!t) return 0;
		else return query(s,L,R,l+1,t);
	}
};


struct Main {
	Main() {
		hPow[0]=1;
		for (int i=1;i<MAXL;++i) hPow[i]=1ll*hPow[i-1]*BASE%MOD;	
	}
	int hPow[MAXL];
	string str[MAXN];
	map <int,int> cnth;
	trie tr;
	int n,q;
	int Hash(const string s) {
		int hs=0;
		for (int i=0;i<s.size();++i) hs=(1ll*hs*BASE+s[i])%MOD;
		return hs;
	}
	void main() {
		scanf("%d%d",&n,&q);
		for (int i=1;i<=n;++i) {
			cin>>str[i];
			cnth[Hash(str[i])]++;
		}
		sort(str+1,str+1+n);
		for (int i=1;i<=n;++i) tr.insert(i,str[i]);
		for (int i=1;i<=q;++i) {
			static string f,b,fup;
			cin>>f>>b;
			int L=lower_bound(str+1,str+1+n,f)-str;
			fup=f+(char)('z'+1);
			int R=lower_bound(str+1,str+1+n,fup)-str-1;
			int res=tr.query(b,L,R);

			int slen=0;
			while (slen<f.size()&&slen<b.size()&&f[f.size()-slen-1]==b[slen]) slen++;
			if (!slen) {
				printf("%d\n",res);
				continue;
			}
			int hf=0,hb=Hash(b);
			for (int i=0;i<f.size()-slen;++i) hf=(1ll*hf*BASE+f[i])%MOD;
			for (int i=f.size()-slen;;++i) {
				int h=(1ll*hf*hPow[b.size()]+hb)%MOD;
				if (cnth.count(h)) res-=cnth[h];
				if (i==f.size()-1) break;
				hf=(1ll*hf*BASE+f[i])%MOD;
			}
			printf("%d\n",res);
		}
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
}
```

