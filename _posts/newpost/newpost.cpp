#include <bits/stdc++.h>

using namespace std;

#define rep(i, s, t) for(int i = s, i##end = t; i <= i##end; ++i)
#define repo(i, s, t) for(int i = s, i##end = t; i < i##end; ++i)
#define per(i, s, t) for(int i = t, i##end = s; i >= i##end; --i)
#define debug(x) cerr << #x << " : " << x << " " << __FUNCTION__ << __LINE__ << endl;

const int img = 9;

int main() {
	srand(time(NULL));
	string title, subtit, tag;

	cout << "title:" << endl;
	cin >> title;
	cout << "subtitle:" << endl;
	cin >> subtit;//subtitle or  -1
	int num = rand() % img;

	time_t now = time(0);
	tm *tim = localtime(&now);
	int y, m, d;
	y = 1900 + tim -> tm_year;
	m = 1 + tim -> tm_mon;
	d = tim -> tm_mday;
	
	string fnm;
	ostringstream tpturn;
	tpturn << "..\\" << y << "-" << m << "-" << d << "-" << title << ".md";
	cerr << tpturn.str().c_str() << endl;

	freopen(tpturn.str().c_str(), "w", stdout);

	cout << "---\nlayout: post\ntitle: " << title << endl;
	if (subtit != "-1") cout << "subtitle: " << subtit << endl;
	cout << "date: " << y << "-" << m << "-" << d << endl;
	cout << "author: yanghong" << endl;
	cout << "header-img: images/cover/" << num << ".jpg" << endl;
	
	cerr << "tags: ";
	cout << "tags: ";
	while (cin >> tag) {
		cout << tag << " ";
	}
	cout << "\n---\n";
	return 0;
}
