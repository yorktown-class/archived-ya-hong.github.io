---
layout: post
title: vps 搭建 v2ray 和 aria2
subtitle: 
date: 2020-2-16
author: yanghong
header-img: images/cover/6.jpg
tags: v2ray aria2 
---

**安装脚本**

```
bash <(curl -s -L https://git.io/v2ray.sh)
```

**安装加速**

```
wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh"
chmod +x tcp.sh
./tcp.sh

```

**aria2**

```
wget -N git.io/aria2.sh && chmod +x aria2.sh && ./aria2.sh
```


