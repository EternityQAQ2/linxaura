---
title: 大连理工大学《软件工程》各种图总结
tags:
  - DUT
  - 软件工程
createTime: 2024/12/29 00:02:59
permalink: /blog/2q2u8ip0/
---
Author Linxi!!!!!!
date 20241229
https://github.com/EternityQAQ2/SE_DULT_IMG
### 用例图
第三章需求分析

用例归约：
1. 用例名称
2. 参与角色
3. 基本事件流
4. 备选事件流

画图：
椭圆代表用例，小人代表角色。
#### 包含关系
使用`<include>`连接用例和基本用例。如:用户维护系统和登录系统可以是包含关系。
不是对某个用例的分解。
#### 扩展关系
使用`<extend>`连接扩展用例和基本用例。扩展用例是基于用户的强烈意愿而添加的，可有可不有。
也有的扩展用例需要添加"注释"来描述什么情况下扩展用例。
#### 例题
给出以下需求描述的用例模型，并写出"租赁电影光碟"的用例规约：
 一个音像商店准备开发软件系统，用于向客户销售或者租借电影光碟。
 音像商店向多家订购商订购光碟，然后分类存储在系统里，定了上千张光碟；还可以根据客户的请求向订购商订购光碟。
 所有的电影光碟用条码来管理，条码的号码是光碟的唯一标识。
 音像店可以向客户销售电影光碟，也可租赁。使用条码扫描来支持销售或者租赁。
 音像商店建立会员制，会员客户购买电影光碟可以享受预定的折扣。会员卡也使用条码。
 会员可以通过网络预订电影光碟，并在指定的日期来取。
 会员可以利用灵活的搜索机制来找到喜欢的电影，如果没有，可以提出预订。

使用UML给出上述描述的用例图。要求绘制规范，尤其注意角色—用例、用例—用例之间的关系。

![alt text](/assets/sepic/13ae4e5e7d5993cf393908e6ff9d8e9b.png)

#### 用例归约图

![alt text](/assets/sepic/image.png)

### 活动图 
类似于程序流程图。
由开始、结束、活动、分支节点、参与角色和对象组成。
因为角色图画的太麻烦，所以出现了泳道图。
#### 图形

![alt text](/assets/sepic/image-2.png)

#### 泳道图图形

![alt text](/assets/sepic/image-3.png)


### 数据流图
组成部分：起终点，存储(矩形框右边要开着)，数据处理(可以画圆代替)，数据流。
数据流图分为多等级。
0级是以系统描述，是最粗略的级别。
1级是对系统分成了单独的逻辑单元。
2级是对每个逻辑单元的逻辑再进行拆分。

![Ciallo](/assets/sepic/image-4.png)

![alt text](/assets/sepic/image-5.png)


#### 例题
>根据如下描述的银行储蓄系统，（1）完成系统的数据流图（至少包含0和1图）银行储蓄系统的工作过程如下：储户填写的存款单或者取款单由业务员输入系统，如果是存款，则系统记录存款人姓名、省份证号、地址、手机号、存款类型、存款日期、利率及密码（可选）等信息，并印出存单给客户；如果是取款，而且存款时留有密码，则系统首先核对储户密码，若密码正确或者存款时未留密码，则系统计算利息，并印出利息清单给储户。

![alt text](/assets/sepic/image-6.png)

### 类图 
类分为实体类，管理类和边界类。
描述类之间关系的图。
#### 类的关系
##### 泛化关系
泛化是继承关系，使用空心三角形表示。

![alt text](/assets/sepic/image-7.png)

##### 实现关系
实现某个接口，即是实现关系。

![alt text](/assets/sepic/image-8.png)

##### 依赖关系

![alt text](/assets/sepic/image-9.png)

依赖关系：指的是类与类之间的联接。依赖关系表示一个类依赖于另一个类的定义。一般而言，依赖关系在Java语言中体现为局域变量、方法的形参、方法返回值，或者对静态方法的调用。

##### 关联关系

![alt text](/assets/sepic/image-10.png)

关联关系：指的是类与类之间的联接，它使一个类知道另一个类的属性和方法（实例变量体现）。A类依赖于B对象,**并且把B作为A的一个成员变量**, 则A和B存在关联关系.

如果类A中包含B的类型,则A指向B
```java
public Class A{
    private B b;
    A(){};
}
Class B{
    int c;
    B(){};
}
```
**关联关系的基数**

![alt text](/assets/sepic/image-11.png)

##### 聚合关系
聚合关系是一种特殊的关联关系。两个类之间表示的是整体与部分的关系。但和组合关系不同，组合关系是同生命周期，聚合关系则是互相有互相的生命周期。

![alt text](/assets/sepic/image-12.png)

以Cars和wheel为例，和关联关系不同，它是部分指向整体，即Wheel指向Cars。
##### 组合关系 
组合关系是关联关系的一种特例。它要求普通的聚合关系中代表整体的对象负责代表部分对象的生命周期，组合关系是不能共享的。代表整体的对象需要负责保持部分对象和存活，在一些情况下将负责代表部分的对象湮灭掉。代表整体的对象可以将代表部分的对象传递给另一个对象，由后者负责此对象的生命周期。

![alt text](/assets/sepic/image-13.png)

#### 例题
> 针对下述描述建立类模型，画出该系统的分析类图：
某软件公司下属的部门分为开发部门和管理部门两类，每个部门由唯一的部门名字确定。每个开发部门可开发多个软件项目，每个管理部门承担公司的若干项日常管理工作。公司的员工分为经理、工作人员和开发者三类。开发部门包括经理和开发者，管理部门包括经理和工作人员。开发项目时，每个项目只能由一位经理主持，但一位经理可主持多个开发项目；每个开发者可参加多个开发项目，每个开发项目也需要多个开发者参与。

![alt text](/assets/sepic/image-14.png)

### 顺序图
类图是描述整体的框架，顺序图是描述程序对象之间的关系。

顺序图中的元素包括对象、生命线、控制焦点、消息。消息表示了对象间的通讯，生命线表示了对象的生存期, 控制焦点表示对象正在执行一些活动。
**对象**：顺序图中对象的符号和对象图中对象所用的符号一样。将对象置于顺序图的顶部意味着在交互开始的时候对象就已经存在了，如果对象的位置不在顶部，那么表示对象是在交互的过程中被创建的。
**生命线**：生命线是一条垂直的虚线，表示顺序图中的对象在一段时间内的存在。每个对象的底部中心的位置都带有生命线。生命线是一个时间线，所用的时间取决于交互持续的时间。
**控制焦点**：在对象的生命线上，包含一个矩形，表示对象处于激活状态，处于激活状态的对象正在执行某个任务。对象在完成自己的工作后，被去激活，对象就处于空闲状态。
**消息**：消息是从一个对象到另一个或者几个其他对象的信息传递，简单地说，消息就是对象与对象、或者对象与参与者之间的某种通信方式。消息可以是一个信号或一次操作调用，收到消息即为事件。可以有两种消息，一种是从发送者向接收者发送信号，另一种是由调用者调用接收者的操作。对象之间的协作通过相互发送消息实现。


![alt text](/assets/sepic/image-16.png)

![alt text](/assets/sepic/image-17.png)

### 通信图
顺序图强调顺序，通信图强调类之间的关系。

![alt text](/assets/sepic/image-18.png)

### 程序流程图
图来源：第七章类的详细设计
**结构化**
程序的代码块仅通过顺序、选择、循环三种控制结构进行连接，每个代码块只有一个入口和一个出口。

![alt text](/assets/sepic/image-20.png)

### 盒图
*一种符合结构化的程序设计原则图形描述工具

![alt text](/assets/sepic/image-21.png)

### PAD问题分析图
使用二维树形结构的图来表示程序控制流。

![alt text](/assets/sepic/image-22.png)


### 判定树和判定表
当情况很多很复杂时，使用判定表不错。
#### 判定表
判定表有4个部分构成，分别是**条件列表、条件组合、动作列表及动作入口**。
每个条件对应一个变量、关系或者预测，如上例中的机器功率、运行时长、维修记录；
条件组合是各种条件可能取值的所有组合，如果每个条件有真假两种取值，则n个条件的取值组合数量为2^n^个；
动作指要执行的过程或操作列表，如上例中的送外修或者送本厂维修中心；
动作入口指某个条件组合下与动作的对应，与条件组合一起构成了判定表的一列，也叫做规则。

![alt text](/assets/sepic/image-23.png)

#### 判定表化简
使用'-'表示不关心它的结果。

![alt text](/assets/sepic/image-34.png)

PS:化简完的每个**规则**的并集需要和化简前**规则**的并集相同。即划分为等价类。
#### 决策树
自上而下分析。
其中的每个内部结点（ internal node）代表对某个属性的一次测试，每条边代表一个测试结果，叶结点（ leaf）代表某个类（ class）或者类的分布（ class distribution），

![alt text](/assets/sepic/image-26.png)


### 状态图
第七章
唯一开始态，可以有多个结束态
每个状态描述可以包含以下内容：
1. 名字
2. Entry 进入该状态执行的操作
3. Do 在该状态做的事
4. Exit 离开该状态进行的操作

* 状态图通过状态转换进行过度。需要对每一次转换进行命名。

![alt text](/assets/sepic/image-28.png)

状态图

![alt text](/assets/sepic/image-27.png)

![alt text](/assets/sepic/image-35.png)
### 程序控制流图
用来计算环形复杂度的图。
方法：
1. 画图。
2. 初始代码为1,原子命题(a<10)加1,swith每个case加1不算default。


![alt text](/assets/sepic/f36220d90fba1635cd00a61af560979f_720.jpg)

![alt text](/assets/sepic/df1585580d9e45e41ae309b9e50da26a_720.jpg)


### 白盒测试覆盖图
软件测试
类似于程序流程图，但以圆圈代替。

![alt text](/assets/sepic/image-29.png)

覆盖图分为：
1. 语句覆盖 
控制流中经过的节点数/所有节点数。
目标是经过所有的点。

![alt text](/assets/sepic/image-29.png)

2. 分支覆盖 
控制流中经过的边/所有边数。
目标是经过所有的边。

![alt text](/assets/sepic/image-30.png)

3. 条件覆盖(单)
$$
条件覆盖 = \frac{取值为真的原子命题+取值为假的原子命题}{2*原子命题数量}
$$

![alt text](/assets/sepic/image-31.png)

4. 多条件覆盖(while(i>10&&allow[i]=='0')算作一行条件)
$$
条件覆盖 = \frac{取值为真的原子命题+取值为假的原子命题}{2*原子命题数量}
$$

![alt text](/assets/sepic/image-32.png)

5. 路径覆盖
目标是覆盖所有的路径。

MCCabe计算方法：
1. 边-点+2
2. 初始程序为1，遇到原子命题(while(i==1)这种的)+1，switch每一个case算一个。


### 任务安排和工程网络图

![alt text](/assets/sepic/image-33.png)

![alt text](/assets/sepic/39cb637ff9b7d8322e41d805156d5d87_720-1.png)






设计模式按照其要解决的问题被分为3类：

## 创建型（creational）

顾名思义，主要解决如何灵活创建对象或者类的问题，共**5**个。
1. 工厂方法模式（Factory Method）

[秒懂设计模式之工厂方法模式（Factory Method Pattern）]( https://blog.shusheng007.top/archives/factory-method-pattern)

2.  抽象工厂模式（Abstract Factory）

[秒懂设计模式之抽象工厂模式（Abstract Factory Pattern）]( https://blog.shusheng007.top/archives/abstract-factory-pattern)


3. 构建者模式（Builder）

[秒懂设计模式之建造者模式（Builder pattern）](https://blog.shusheng007.top/archives/builder-pattern)

4. 单例模式（Singleton）

[秒懂设计模式之单例模式（Singleton Pattern）]( https://blog.shusheng007.top/archives/singleton-pattern)

5.  原型模式（Prototype）

[秒懂设计模式之原型模式（Prototype Pattern)](https://blog.shusheng007.top/archives/prototype-pattern)


另外还有一个简单工厂模式，其虽然不在GOF23种设计模式之中，但是应用也很广泛：

[秒懂设计模式之简单工厂模式（Simple Factory Pattern）](https://blog.shusheng007.top/archives/simple-factory-pattern)



## 结构型（structural）

结构型设计模式主要用于将类或对象进行组合从而构建灵活而高效的结构，共**7**个。

1. 适配器模式（Adapter）

[秒懂设计模式之适配器模式（Adapter Pattern）](https://blog.shusheng007.top/archives/adapter-pattern)

2. 桥接模式（Bridge）

[秒懂设计模式之桥接模式（Bridge Pattern）](https://blog.shusheng007.top/archives/bridge-pattern)

3. 组合模式（Composite）

[秒懂设计模式之组合模式（Composite Pattern）](https://blog.shusheng007.top/archives/composite-pattern)

4. 装饰者模式（Decorator）

[秒懂设计模式之装饰者模式（Decorator Pattern）](https://blog.shusheng007.top/archives/decorator-pattern)

5. 外观模式（Facade）

[秒懂设计模式之外观模式（Facade Pattern）](https://blog.shusheng007.top/archives/facade-pattern)

6. 享元模式（Flyweight）

[秒懂设计模式之享元模式（Flyweight Pattern）](https://blog.shusheng007.top/archives/flyweight-pattern)

7. 代理模式（Proxy）

[秒懂Java代理与动态代理模式（Proxy Pattern）](https://blog.shusheng007.top/archives/proxy-pattern)

## 行为型（behavioral）

行为型设计模式主要解决类或者对象之间互相通信的问题，共**11**个

1. 责任链模式（Chain of responsibility）

[秒懂设计模式之责任链模式（Chain of responsibility）](https://blog.shusheng007.top/archives/chain-of-responsibility-pattern)

2. 命令模式（Command）

[秒懂设计模式之命令模式（Command Pattern）](https://blog.shusheng007.top/archives/command-pattern)

3. 解释器模式（Interpreter）

敬请期待

4. 迭代器模式（Iterator）

[秒懂设计模式之迭代器模式（Iterator Pattern）](https://blog.shusheng007.top/archives/iterator-pattern)

5. 中介者模式（Mediator）

敬请期待

6. 备忘录模式（Memento）

[秒懂设计模式之备忘录模式（Memento Pattern）](https://blog.shusheng007.top/archives/memento-pattern)

7. 观察者模式（Observer）

[秒懂设计模式之观察者模式（Observer Pattern）](https://blog.shusheng007.top/archives/observer-pattern)

8. 策略模式（Strategy）

[秒懂设计模式之策略模式（Strategy Pattern）](https://blog.shusheng007.top/archives/strategy-pattern)

9. 状态模式（State）

[秒懂设计模式之状态模式（State Pattern）](https://blog.shusheng007.top/archives/state-pattern)

10. 模板方法模式（Template method）

[秒懂设计模式之模板方法模式（Template Method Pattern）](https://blog.shusheng007.top/archives/template-method-pattern)

11. 访问者模式（Visitor）

[秒懂设计模式之访问者模式（Visitor Pattern）](https://blog.shusheng007.top/archives/visitor-pattern)


1. 抽象工厂
2. 适配器
3. 单例模型
4. 桥模式
5. 装饰模式
6. 观察者
7. 策略模式
8. 状态模式
9. 门面模式
10. 代理模式
11. 合成模式