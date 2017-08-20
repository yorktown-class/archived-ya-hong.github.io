---
layout: post
title: 高斯消元法
subtitle: Gaussian Elimination
date: 2017-07-06 20:18:22
header-img: images/Gaussian Elimination.jpg
tags:  高斯消元法 数学
author: yanghong
---

**高斯消元法**（**Gaussian Elimination**），可用来为线性方程组求解（或是模线性方程组），等等（其他的我都不会了，还可以求线性基，可逆方阵的逆矩阵，矩阵的秩）。当用于一个矩阵时，高斯消元法会产生出一个“行梯阵式”。

---

# 基本的高斯消元算法

高斯消元法将$n$ 条$n$ 元一次方程转化为$(n+1) \times n$ 的矩阵。然后消元得到每个未知数的解。其实和普通的解方程没什么区别，只是提供了一个通用的套路。

例如：



$$
k_{1,1} \times x_{1} + k_{1,2} \times x_{2}  \dots  k_{1,n} \times x_{n} = a_1\\
k_{2,1} \times x_{1} + k_{2,2} \times x_{2}  \dots  k_{2,n} \times x_{n} = a_2\\
\vdots \\
k_{n,1} \times x_{1} + k_{n,2} \times x_{2}  \dots  k_{n,n} \times x_{n} = a_n
$$

的$n$ 条$n$ 元一次方程可以转化为这样的矩阵：

$$
\begin{bmatrix}
k_{1,1} & k_{1,2} & \cdots &  k_{1,n} & a_1 \\
k_{2,1} & k_{2,2} & \cdots & k_{2,n}  & a_2\\
\vdots  & \vdots & \ddots  & \vdots & \vdots \\
k_{n,1} & k_{n,2} & \cdots & k_{n,n}  & a_n
\end{bmatrix}
$$

然后是有两种做法：

1. **高斯消元法**。高斯消元法将矩阵转化为行梯阵式：

   $$
   \begin{bmatrix}
   k_{1,1}\prime  & k_{1,2}\prime  & k_{1,3} \prime &  \cdots &  k_{1,n} \prime  & a_1\prime  \\
   0 & k_{2,2} \prime  & k_{2,3} \prime & \cdots & k_{2,n} \prime  & a_2 \prime \\
   0 & 0 & k_{3,3} \prime & \cdots & k_{3,n} \prime & a_3 \prime \\
   \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
   0 & 0 & 0 & \cdots & k_{n,n} \prime  & a_n \prime  \\
   \end{bmatrix}
   $$

   
   即每行($i$) 的$1$ 到$i-1$ 项的系数都被消为0。

   那么可以直接解出$x_n$ 。然后可以继续消元，消去所有$k_{i,n}$ 。那么又可以向左上求出$x_{n-1}$ 。以此类推，可以得到所有的$x_i$ 。


2. 还有一种，**高斯-若尔当消元法**。高斯-若尔当消元法的到的不是行梯阵式，而是每个行$i$ 的$k_{i,i}$ 对应一个$a_i$ （就是只剩下了一条斜对角线）。可以直接得到答案。（但是主要用的好像都是第一种，所以这里也只讲第一种）


然后我们就可以施展神奇的小学解方程技术了。



为了得到像上面的行梯阵式，需要从$1$ 到$n$ 每次将$i+1$ 到$n$ 行($l$) 的$k_{l,i}$ 消去。

得到行梯阵式这个三角型后，就可以从下向上的解出方程了。

**代码** ：

```cpp
int n;
double mat[M][M];
double res[M];
void Gauss() {
	for (int t=1;t<=n;++t) {
		int mx=t;
		for (int i=t+1;i<=n;++i) {
			if (fabs(mat[i][t])>fabs(mat[mx][t])) mx=i;//选择一行(取最大是为了减小误差)
		}
		for (int i=t;i<=n+1;++i) swap(mat[t][i],mat[mx][i]);//交换到第一行
		for (int i=t+1;i<=n;++i) {
			double k=mat[i][t]/mat[t][t];//系数
			for (int j=t;j<=n+1;j++) mat[i][j]-=mat[t][j]*k;//消元
		}
	}
	for (int t=n;t>=1;--t) {
		res[t]=mat[t][n+1]/mat[t][t];//计算答案
		for (int i=t-1;i>=1;--i) {
			double k=mat[i][t]/mat[t][t];
			for (int j=i;j<=n+1;++j) mat[i][j]-=mat[t][j]*k;//再次消元
		}
	}
}
```

## 细节

1. ### 误差

   由于某些玄学原因，要选择$k_{i,j}$ 最大的行来进行消元（就是上面代码的$mx$行），可以减小误差。

2. ### 含有无用的方程

   即有一些方程其实是相同的。

   这样其实并不需要处理。相同方程中的一条会完全将另一条的方程的系数消为0，那么在构造行梯阵式后，它就会到矩阵的最下面，不会造成影响。

3. ### 包含了无用的未知数

   就是有一些未知数是不用解也无法解的，但是你又没有办法把他们挑出来（直接判断哪些无解比较困难）。

   举个例子：有$n$ 条方程，$m$ 个未知数，且$m>n$ ，求可能的一种方案。

   由于$m>n$ 所以高斯消元的时候可能无法消完。那么直接将它们设为$0$ （或其他无影响的数字）并记录下这条方程对应解出的未知数，就可以了。

   **代码**：

   （这个代码可以通用于前面的所有情况）

   ```cpp
   void Gauss() {
   	memset(mark,-1,sizeof(mark));//记录对应的未知数
   	int l=0;
   	for (int t=1;t<=m;++t) {
   		int k=-1;
   		for (int i=l+1;i<=n;++i) {
   			if (fabs(mat[i][t])>=EPS&&(mx==-1||fabs(mat[i][t])>fabs(mat[mx][t]))) k=i;
   		} 
   		if (k==-1) continue;//如果没有，就继续
   		l++;
   		for (int i=0;i<=m;++i) swap(mat[l][i],mat[k][i]);
   		mark[l]=t;
   		for (int i=l+1;i<=n;++i) {
   			double k=mat[i][t]/mat[l][t];
   			for (int j=1;j<=m+1;++j) {
   				mat[i][j]-=mat[l][j]*k;
   			}
   		}
   	}
   	for (;l>=1;--l) {
   		if (mark[l]==-1) continue;
   		int t=mark[l];
   		res[t]=mat[l][m+1]/mat[l][t];
   		for (int i=l-1;i>=1;--i) {
   			double k=mat[i][t]/mat[l][t];
   			for (int j=1;j<=m+1;++j) mat[i][j]-=mat[l][j]*k;
   		}
   	}
   }
   ```

其实高斯消元还是比较简单的，如果有一些地方想不清楚了，就可以想一下自己是怎么解方程的。

---

# 求模线性方程组

求模线性方程组其实和求线性方程组差不多。只是把线性方程组中的除法改成乘上逆元。虽然有其他不用求逆元的方法，但是都需要模数是质数（不是很确定，应该是的）。
