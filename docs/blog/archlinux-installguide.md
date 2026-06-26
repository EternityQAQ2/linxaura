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

完成以上所有操作后，保存bios设置（一般`F10`）并继续。

## Arch linux 安装
Arch linux安装分为两种方法：一是`arch install`指令安装，二是手动安装。建议手动安装。

进入`live`环境后（一般把安装系统的环境叫作`live`环境），选择`arch-linux`的iso，选择`boot in normal mode`，选择`arch linux install medium(x86_64,UEFI)`，等待一段时间，进入`live`环境。

### archinstall
在运行安装程序前，建议先执行 `lsblk -pf` 和 `lsblk` 查看当前计算机的磁盘及分区布局，确认目标安装磁盘，避免误操作。
#### 物理磁盘和设备名对应关系
- 不同物理硬盘会对应不同的设备名称，例如：
  - `/dev/nvme0n1`、`/dev/nvme1n1`：NVMe 固态硬盘
  - `/dev/sda`、`/dev/sdb`：SATA 硬盘或 USB 存储设备
- 同一块硬盘下的分区会以数字结尾，例如：
  - `/dev/nvme0n1p1`：`nvme0n1` 硬盘的第 1 个分区
  - `/dev/sda2`：`sda` 硬盘的第 2 个分区

#### 判断已有分区

常见 Windows 分区识别方式：

- `FSTYPE=vfat`、`FSVER=FAT32`、`LABEL=SYSTEM` 的分区通常为 Windows EFI 系统引导分区。该分区用于存储 Windows Boot Manager 引导文件，删除或格式化可能导致 Windows 无法启动。
- `LABEL` 为 Windows 磁盘名称（例如 `OS`、`Windows` 等）的 `ntfs` 分区为 Windows 数据分区，请勿删除。

- `LABEL=RESTORE` 或类似名称的分区通常为厂商恢复分区，用于系统恢复，请勿删除。

小结：

除非明确了解每个分区的用途，否则不要修改或删除已有分区。
安装 Arch Linux 时，应优先使用 Windows 压缩卷后产生的未分配空间创建新的 Linux 分区。

如果希望进一步了解计算机磁盘的分区布局，可以使用：

```bash
fdisk -l
```
该命令会显示磁盘中的分区起止位置、容量以及分区类型。例如：
```sh
Device             Size    Type
/dev/nvme0n1p1     260M    EFI System
/dev/nvme0n1p2      16M    Microsoft reserved
/dev/nvme0n1p3    262.9G   Microsoft basic data
/dev/nvme0n1p4     940M    Windows recovery environment
/dev/nvme0n1p5    110.9G   Microsoft basic data
/dev/nvme0n1p6      22G    EFI System
/dev/nvme0n1p7     200M    Windows recovery environment
/dev/nvme0n1p8      95M    EFI System
/dev/nvme0n1p9     79.7G   Linux root (x86-64)
```
其中：
* `EFI System`：EFI 引导分区，用于存放操作系统启动文件。

* `Microsoft reserved`：Windows GPT 磁盘中的保留分区。

* `Microsoft basic data`：Windows 常规数据分区（通常为 NTFS）。

* `Windows recovery environment`：Windows 恢复环境分区。

* `Linux root`：Linux 根分区。

注意：不同计算机的分区数量、大小和名称可能不同，请以实际输出为准。

---
#### archinstall 步骤
新版本`archinstall`提供了连接网络的功能。如果无法连接网络，请在`live`环境下，参考以下代码连接网络。
```sh
iwctl

```
进入`iwd`环境。[3]
```sh
device list 
station wlan0 scan #w\an0为上一步得到的设备名，一般是wlan0
station wlan0 get-networks
station wlan0 connect “{wifi名称}” #比如我的wifi名称是hit 那便是station wlan0 connect “hit”
```

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/image010.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">arch install界面</div>
</center>


请参考以下设置：
- `Mirrors and repositories` --> `select regions` --> 设置 `China`（`/`可以搜索）
- `Mirrors and repositories` --> `optional repositories` -->勾选 `multilib`32位源。
- `Dist configuration` --> `partioning` --> `Manual partioning` 进行分区。这里需要格外小心，否则容易把**windows系统格式化**。请选择想要分配的磁盘，执行以下操作：
    1. 分配100MB(有些系统推荐500MB)，文件系统(filesystem)选择`fat32`,挂载点(mountpoint)选择`/efi`。回车，`mark as bootable`。再回车,`mark as ESP`。
    2. 将剩下的空余空间分配，文献系统(filesystem)选择`btrfs`,回车，`mark as compressed`,回车。
        1. `set subvolumes` --> `add subvolume` --> 设置名称 `@` --> mountpoint设置`/`。
        2. 再次选中当前分区，回车，`set subvolumes` --> `add subvolume` -->设置名称`@home`--> mountpoint设置`/home`。
    <center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/imagelinx.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">这里是创建子卷之前的截图[6]，子卷创建好后，第二行的mountpoint会显示两个子卷</div>
    </center>
- `Bootloader`  --> `Bootloader` --> 改为`Grub`。
- `Hostname` --> 设个喜欢的主机名，不要太长，命名格式参考：arch+英文名称，如archlinx。
- `Authenticacion` -->`root password` -->设置密码（建议纯数字，不要有大小写，否则很容易输错）
- `Authenticacion` --> `User account` --> `add a user` --> 输入一个英文用户名，区别于root，比如linx。 密码可以和root一样，也是建议纯数字。--> 把普通用户加入到超级管理员（should "linx" be a superuser(root)?yes.）-->  确认并退出。（这个超级管理员不是root，是加入`wheel`组并拥有`sudo`权限）
- `applications` --> `bluetooth` -->yes.
- `applications` --> `audio` -->`pipewire`.
- `network configuration` --> `use network manager(default backend)`
- `additional packages` --> 使用`/`搜索以下包安装：
    1. os-prober
    2. efibootmgr 
    3. exfatprogs
    4. fuse3
- `timezone`  --> 使用`/`搜索shanghai，添加`Asia/shanghai`时区。
最后，摁`install`，等待，安装完成后重启。 

安装后，访问`sudo vim /etc/default/grub`,`G`到文件最底下，取消注释`GRUB_DISABLE_OS_PROBER=false`,以开启`os-prober`的双系统检测功能。
#### archinstall的话：
不推荐理由有几点：

一是它还有些bug，比如分区已经格式化后，`arch install`仍需重新格式化、以及我曾经遇到`grub`无法识别系统的问题。（最后发现`grub`的配置有点问题，以及缺少`os-prober`和`exfat-utils`两个包）

二是对于小白来说，你很难理解`arch install`到底干了什么。它如何安装的grub?如何安装的包？ 手动安装`arch linux`本身就是学习的一部分。

三是我感觉中文关于`archinstall`的视频教程和文字教程没有手动安装全。他们更多地是介绍`archinstall`的流程，但没有介绍`archinstall`后可能会出现的问题。比如上文的`grub`无法识别的问题，就缺少中文教程。而手动安装的教程，如[林长枫Shorin709
](https://space.bilibili.com/9202840)大佬的教程，会更详细地介绍可能遇到的问题以及解决方法。

四是`archinstall`的版本迭代快，教程容易出现未及时更新的问题。

### 手动安装Arch Linux[2]
回到刚进入`live`环境的情况。
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/imagechroot.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">live环境[7]</div>
</center>

#### 一 联网
```sh
iwctl

```
进入`iwd`环境。[3]
```sh
device list 
station wlan0 scan #w\an0为上一步得到的设备名，一般是wlan0
station wlan0 get-networks
station wlan0 connect “{wifi名称}” #比如我的wifi名称是hit 那便是station wlan0 connect “hit”
```
`ctrl+c`或者`exit`退出。

#### 二 时间准确
使用 `timedatectl` 确保系统时间同步，看是否开启NTP（网络时间协议）。如果没开请用`timedatectl set-ntp true`开启。

#### 三 Reflector 自动设置镜像源[3]
```sh
reflector -p https -a 12 -c cn --v --sort rate --save /etc/pacman.d/mirrorlist
pacman -Sy
```

#### 四 硬盘分区
`lsblk -pf`或者`fdisk -l`查看分区情况。主要是识别windows分区，和准备分配给`arch linux`的系统分区。一般已经有分区的，不会是目标分区(除非是多次重装双系统的linux分区)
```sh
Device             Size    Type
/dev/nvme0n1p1     260M    EFI System
/dev/nvme0n1p2      16M    Microsoft reserved
/dev/nvme0n1p3    262.9G   Microsoft basic data
/dev/nvme0n1p4     940M    Windows recovery environment
/dev/nvme0n1p5    110.9G   Microsoft basic data
/dev/nvme0n1p6      22G    EFI System
/dev/nvme0n1p7     200M    Windows recovery environment
/dev/nvme0n1p8      95M    EFI System
/dev/nvme0n1p9     79.7G   Linux root (x86-64)  #我已经建立linux分区
```
如果是windows刚压缩完空余(free)空间，应该是看不到分区信息。举个栗子：我在windows刚压缩完`/dev/nvme0n1`磁盘。此时的列表对比前文的，缺少`/dev/nvme0n1p8`和`/dev/nvme0n1p9`。在Windows压缩时也会显示磁盘id和windows分盘信息，通过`fdisk -l`和`lsblk -pf`可以很方便判断出分配给linux的磁盘空间。

判断完分区型号后，请使用`cfdisk {硬盘盘符}`来挂载磁盘和分配linux空间。

比如，`cfdisk /dev/nvme0n1`。
<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="/assets/archlinux-installguide/imagecfdisk.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">cfdisk环境[6]</div>
</center>

如果弹出 select label type，请选择gpt。
分区参考如下：

| 挂载点 | 分区类型 | 注释 | 建议大小 |
|--------|----------|------|----------|
| `/efi` | EFI System | EFI 系统分区 | 100MB(空间大的分配512MB) |
| `/` | Linux root (x86-64) | 根目录 | 设备剩余空间，大于 40 GB（官方要求至少大于 23 GB） |


详细指导：
1. cfdisk 要分配的磁盘。
2. `new`-->`partition size = 100MB` -->选中创建的分区-->`type`-->改为`EFI system`。
3. `new`-->`partition size = 剩下的所有空间` -->类型保持`linux filesystem`。

问题：
1. 为什么需要创建新的efi分区？
答：因为如果把linux的efi引导和windows放一起，windows更新时可能会导致linux的efi引导失效（经过检验，哪怕不在一个efi分区，windows仍会影响grub对linux系统的识别）。
2. 为什么不创建swap分区（虚拟内存）？ 答：会用zram。

#### 五 格式化分区（并给分区创建文件系统）
创建分区后，必须使用合适的文件系统对每个新创建的分区进行格式化。
linux文件系统一般用`ext4`或者`btrfs`。`btrfs`是一种支持快照的新型文件系统。它最大的特点就是保存系统快照（类似于存档），当系统崩溃时可以方便“回档”。建议使用`btrfs`文件系统。
```sh
lsblk -pf #查看分区情况
mkfs.fat -F 32 /dev/efi_system_partition #（EFI 系统分区，前文所创建）
# 假设前文创建的分区是/dev/nvme0n1p8,则是：mkfs.fat -F 32 dev/nvme0n1p8
#不要写错了，否则后果自负。
mkfs.btrfs /dev/root_partition #（根分区）
#假设前文创建的分区是/dev/nvme0n1p9,则是：mkfs.btrfs /dev/nvme0n1p9
#不要写错了，否则后果自负。
```

#### 六 临时挂载分区
将根磁盘卷挂载到 /mnt
```sh
 mount /dev/root_partition /mnt  # 根分区名称 将root_partition替换为根分区名称
 # 比如： mount /dev/nvme0n1p9
```
创建两个子卷：`@` 用于根目录（`/`），`@home` 用于用户主目录（`/home`）。将二者分离，是因为 Linux 中所有用户配置和个人数据都存放在 `/home` 下，独立子卷后可以对系统和用户数据分别进行快照与回滚，互不影响。
```sh
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
btrfs subvolume list /mnt #确认子卷
umount /mnt #取消挂载
```
#### 七 正式挂载 安装系统
挂载 Btrfs 子卷：

```bash
# 挂载根子卷 @ 到 /mnt
mount -t btrfs -o subvol=/@,compress=zstd /dev/root_partition /mnt
# 将 root_partition 替换为实际分区名，如 /dev/nvme0n1p9

# 挂载 home 子卷 @home 到 /mnt/home
mount --mkdir -t btrfs -o subvol=/@home,compress=zstd /dev/root_partition /mnt/home
# 将 root_partition 替换为实际分区名，如 /dev/nvme0n1p9
```
`@` 和 `@home` 均位于同一 Btrfs 分区，通过子卷隔离根目录与用户数据，便于独立管理快照。`-o compress=zstd` 启用 zstd 透明压缩以节省空间。

挂载EFI 分区（ESP）
```bash
mount --mkdir efi_system_partition /mnt/efi
# 将 efi_system_partition替换为实际分区名，如 /dev/nvme0n1p8
df -h 
#查看挂载情况
```
安装系统[3]
```bash
# amd-ucode 是微码，用来修复和优化 CPU，Intel 用户安装 intel-ucode
pacstrap -K /mnt base base-devel linux linux-firmware btrfs-progs networkmanager vim sudo amd-ucode nano
# -K 初始化密钥
# base 基本包
# base-devel是编译其他软件的时候用的
# linux是内核，可以更换
# linux-firmware是固件
# btrfs-progs是 Btrfs 文件系统的管理工具
# networkmanager 是联网用的，是各个桌面环境标配的联网工具
# vim 是文本编辑器，也可以换成别的，比如 nano、neovim
# sudo 和权限管理有关
# nano 如果不会vim用nano。nano 的基础操作只需要记住 Ctrl+F 搜索、Ctrl+S 保存和 Ctrl+X 退出即可。

```
#### 八 生成 fstab 文件
系统启动时，会根据 `/etc/fstab` 中的配置自动挂载各分区到对应目录，无需手动执行此前的 `mount` 命令。
```bash
genfstab -U /mnt > /mnt/etc/fstab
```

#### 九 chroot 到新安装的系统
接下来的步骤需要像启动到新安装的系统一样直接与其环境、工具和配置进行交互，请 chroot 到新安装的系统：
```bash
arch-chroot /mnt
```
#### 十 设置时间和时区
```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc #设置硬件时间
```
#### 十一 区域和本地化设置
程序和库如果需要本地化文本，都依赖区域设置。
```bash
vim /etc/locale.gen #我用vim 所以教程以vim为主
```
按 `/` 进入搜索模式，输入 `en_US.UTF-8` 后回车定位到该行，按 `i` 进入插入模式，删除行首的 `#` 取消注释。再次按 `/` 进入搜索模式，输入 `zh_CN.UTF-8` 后回车定位到该行，按 `i` 进入插入模式，删除行首的 `#` 取消注释按 `Esc` 退出插入模式，输入 `:wq` 保存并退出。
```bash
locale-gen #生成 locale 信息
```
编辑设定 LANG 变量
```bash
vim /etc/locale.conf
```
`i` 键进入编辑模式；写入 `LANG=en_US.UTF-8` 设置系统语言为英文。

注：locale设置成中文，可能会导致 tty 上中文显示为方块（因为 TTY 下没有 CJK 字体）。
#### 十二 网络配置
设个喜欢的主机名，不要太长，命名格式参考：arch+英文名称，如archlinx。
```bash
vim /etc/hostname
```
`i`进入编辑模式，输入主机名称，`esc`退出插入模式,，输入 `:wq` 保存并退出。接下来不再介绍vim的基础操作。

#### 十三 设置 root 密码
```bash
passwd
```
安全建议： 生产环境应使用强密码（含大小写、数字、符号）。但个人桌面场景下，终端密码输入框大小写切换可能因响应过快而误触。若安装的是双系统且追求便利，可暂设纯数字密码，后续再改为高强度密码。

#### 十四 安装引导程序
以下以 UEFI 引导方式安装 GRUB。若你的设备使用 BIOS 引导，请参考 ArchWiki 的 GRUB 页面。
```bash
pacman -S grub efibootmgr os-prober exfat-utils 
#efibootmgr 管理 UEFI 启动项；
#os-prober 和 exfat-utils 用来搜索 Win11
grub-install --target=x86_64-efi --efi-directory=/efi --boot-directory=/efi --bootloader-id=elan
#安装grub
#--efi-directory 指定 ESP 位置；
#--boot-directory 指定 GRUB 的安装目录；
#--bootloader-id 任意取一个启动项名字；
```
编辑 GRUB 的源文件
```bash
vim /etc/default/grub
```
1. `GRUB_DEFAULT=0` 改成 `=saved`，再取消 `GRUB_SAVEDEFAULT=true` 的注释。
2. 取消最后一行 `GRUB_DISABLE_OS_PROBER=false` 的注释。(以来检测windows操作系统)
在 GRUB 的默认安装位置创建链接
```bash
ln -sf /efi/grub /boot/grub
```
大多数程序会默认检测 /boot/grub 作为 GRUB 的安装位置，但是我们的 GRUB 在 /efi/grub，所以创建一个链接方便使用。

生成 GRUB 的配置文件
```bash
grub-mkconfig -o /boot/grub/grub.cfg
```
如果一切顺利，命令输出的最后几行会显示检测到的 Linux 内核和 Windows EFI 引导项的位置。

示例输出：
```bash
Found linux image: /boot/vmlinuz-linux-lts #某次安装我用的长期支持版本内核（lts）。
Found initrd image: /boot/amd-ucode.img /boot/initramfs-linux-lts.img
Found Windows Boot Manager on /dev/nvme0n1p10@/efi/Microsoft/Boot/bootmgfw.efi
```

如果这一步没有输出上述内容，**请勿重启电脑**。请按以下步骤排查：

1. **重新核对系统安装流程**，检查是否有遗漏或配置错误；
2. **查阅 [Arch Linux 安装指南](https://wiki.archlinux.org/title/Installation_guide)**，对照官方文档逐项确认；
3. **向 AI 求助**，描述具体现象和已执行的步骤，协助定位问题。

#### 十五 zram配置
```bash
pacman -S zram-generator
vim /etc/systemd/zram-generator.conf
```
配置如下：
```bash
[zram0]
zram-size = ram
compression-algorithm = zstd
```
禁用 zswap
zswap 是 Swap 的缓存。需要交换的数据在存入交换空间之前会先被 zswap 压缩后暂时放进内存里。和 ZRAM 功能重复且引入了复杂性，故禁用。[3]
```bash
vim /etc/default/grub
```
在 GRUB_CMDLINE_LINUX_DEFAULT="" 里写入 `zswap.enabled=0`。
重新生成 GRUB 的配置文件
```bash
grub-mkconfig -o /boot/grub/grub.cfg
```
#### 十六 启动网络服务
```bash
systemctl enable NetworkManager
```

#### 十七 退出chroot 重启电脑
请确保`grub-mkconfig`输出了内核信息和windows efi信息。
```bash
exit
reboot
```
#### 十八 系统测试
默认情况下，重启电脑后会进入配置好的`grub`界面，而不是`u盘live`环境。否则，进入`bios`调整下顺序即可。
登录root账户。
连网：
```bash
nmtui
```
1. 选择 activate a connection
2. 选择自己的 wifi 进行连接
3. esc 退出

连网成功后，系统安装成功。
最后安装点好玩的:
```bash
pacman -Sy
pacman -S fastfetch
```

更详细的wiki请参考:[Arch Linux wiki](https://archlinux.org/)
以后会写我的系统如何配置。


---
## 参考文献
1. [Deepin 论坛 - Arch Linux 安装讨论](https://bbs.deepin.org/en/post/209759)
2. [Arch Linux 官方安装指南](https://wiki.archlinux.org/title/Installation_guide)
3. [Shorin ArchLinux Guide](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki)
4. [Arch Linux 中文 Wiki - 系统时间](https://wiki.archlinuxcn.org/wiki/%E7%B3%BB%E7%BB%9F%E6%97%B6%E9%97%B4)
5. [安装任意Linux系统的前期准备工作](https://github.com/SHORiN-KiWATA/Shorin-ArchLinux-Guide/wiki/%E5%AE%89%E8%A3%85%E4%BB%BB%E6%84%8FLinux%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%89%8D%E6%9C%9F%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)
6. [从LinuxMint入门到ArchLinux安装详解](https://www.bilibili.com/video/BV19DBqB4EY4/)
7. [跟着我，一起通关 archinstall 的安装](https://www.bilibili.com/video/BV1RkwLzdEfb)