---
title: archlinux双系统安装教程
tags:
  - arch linux
createTime: 2026/06/24 19:25:23
permalink: /blog/7o0l5na8/
---
详细视频教程参考：[从LinuxMint入门到ArchLinux安装详解](https://www.bilibili.com/video/BV19DBqB4EY4/)
## 什么是Arch linux
Arch Linux 是一个 Linux 发行版。目前主流的 Linux 发行版包括 Ubuntu、Fedora、Linux Mint、CachyOS 等，它们分属不同的发行版系。主流的有三大系：Debian 系、RPM 系以及 Arch Linux 系。例如，广为人知的 Ubuntu 就属于 Debian 系。

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image-0.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">linux发行版列表[1]</div>
</center>


不同发行版系各有侧重。Debian 系通常版本稳定，适合长期部署服务，比较受企业青睐；Red Hat 系则多面向企业，除社区版的 Fedora 外，其他版本还能提供额外的企业级保障服务；Kali 则是面向网络安全的特化版本；而 Arch Linux 则以滚动更新为核心特色。
## 为什么选择arch linux？
首先，Arch Linux 采用滚动更新机制，意味着你能及时获取到最新的软件包。其次，它拥有完善的 [Wiki论坛](https://archlinux.org/) 遇到问题便于检索和解决；即便文档未能覆盖，也可以在论坛发帖求助。最后，Arch Linux 支持用户对系统进行完全自定义，具有极高的可玩性和上限。
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image--1.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">我的arch linux</div>
</center>

## Arch linux安装前的准备

### 1 准备系统启动盘
建议使用[ventoy](https://www.ventoy.net/en/index.html)制作系统启动盘。
1. 准备一个不用的大于4GB存储的u盘(**制作系统盘会格式化u盘**)，打开官网下载软件压缩包。
2. 解压后，双击`Ventoy2Disk.exe`，按照指示直接安装即可（默认exFAT+MBR）
3. 从[Arch linux官网](https://archlinux.org/download/)选择中国的镜像网站下载（比如[阿里云arch linux镜像网站](https://mirrors.aliyun.com/archlinux/iso/2026.06.01/)）。
4. 把镜像拖入`ventoy`的U盘。

### 2 Windows的操作

#### 多系统时间冲突
如果设备上安装了多个操作系统，它们会从同一个硬件时钟生成自己的当前时间。默认情况下，windows使用`localtime`，linux使用`UTC`时间。在 Arch + Windows 双系统时，建议配置 Windows 使用 `UTC` 时间，而不是让 Linux 使用 `localtime`。Windows 下**管理员身份打开 PowerShell** 运行[4]：
```powershell
reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f
```
#### 关闭快速启动[5]
windows搜索栏 `电源` --> `选择电源计划` --> 窗口左侧列表`选择电源按钮的功能` --> `更改当前不可用的设置` --> 确认关闭了 `快速启动`

不过我的系统并没有这个选项。如果有，请关闭。

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">确认关闭启用快速启动</div>
</center>


#### 关闭BitLocker
对于大多数普通用户没啥卵用的功能。无论是否安装双系统都建议关闭。

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image-20260624180138675.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">右键windows摁键-磁盘管理，如果带有(BitLocker加密)则需要解锁</div>
</center>

win11`设置`-->`隐私与安全性`-->`设备加密`-->关闭`设备加密`即可。

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image-20260624180554494.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">解锁路径</div>
</center>

PS: 好像安装了双系统，使用`grub`后，就不会在上述位置显示`设备加密`的选项了。

#### 压缩磁盘

右键win11标志，打开磁盘管理，选中想要压缩的卷，右键-压缩卷，压缩想要分配给arch linux的磁盘大小。

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image-20260624181336101.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">磁盘管理位置</div>
</center>

建议分配至少80GB以上，才能~~玩得开心~~足够日常使用。
如果只打算体验双系统，分配40GB即可。

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image-20260624182130486.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">压缩磁盘大小</div>
</center>


### 3 进入BIOS
关机重启，在开机时连续按 进入 BIOS 的按键（常见为 `F2`、`Del`、`F7`、`Esc`，具体因主板品牌而异），进入 BIOS 设置界面。（我是天选，天选是`F2`）

#### 关闭安全启动（Secure Boot）
不同电脑所在的位置不一样，一般在`security`、`boot`的菜单里。
#### 调整启动顺序
将u盘启动调整到windows boot manager前面。

完成以上所有操作后，保存bios设置并继续。

## Arch linux 安装

## 参考文献
1. [Deepin 论坛 - Arch Linux 安装讨论](https://bbs.deepin.org/en/post/209759)
2. [Arch Linux 官方安装指南](https://wiki.archlinux.org/title/Installation_guide)
3. [Shorin ArchLinux Guide](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki)
4. [Arch Linux 中文 Wiki - 系统时间](https://wiki.archlinuxcn.org/wiki/%E7%B3%BB%E7%BB%9F%E6%97%B6%E9%97%B4)
5. [安装任意Linux系统的前期准备工作](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki/%E5%AE%89%E8%A3%85%E4%BB%BB%E6%84%8FLinux%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%89%8D%E6%9C%9F%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)