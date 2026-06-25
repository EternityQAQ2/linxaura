---
title: 大连理工大学-高级统计方法-R语言常见指令大全
tags:
  - DUT
  - 高级统计方法
createTime: 2024/05/14 22:38:53
permalink: /blog/ipcfkjmd/
---
# R语言常见指令大全
本文档涵盖了R语言中常见的代码。

#### 常规代码
```R
a<- c(1,2) # 把1，2 加入到a数组中。
confint(model, level = 0.95) # 95% 置信区间
summary(model) # 总结一个模型
abline(model,col = 'red') #画线
# 添加图例
legend("topleft", legend=c("最小二乘线", "总体回归线"), col=c("red", "blue"), lwd=2)
cor(as.data.frame(lapply(Weekly, as.numeric))) #查看变量之间的相关性
# 混淆矩阵
table(pred.OJ,test.set$Purchase)
```
#### 线性
```R
model <- lm(mpg ~ horsepower, data = Auto) #线性回归 
model2 = lm(y~x+0)#不含截距的简单线性回归
 
```
#### 线性多项式

```R
poly_features <- poly(x, degree = 3)
```

#### 逻辑斯蒂回归
```R
glm.fit=glm(Direction~Lag1+Lag2+Lag3+Lag4+Lag5+Volume,data=Weekly,family=binomial)
```
#### LDA
```R
lda.fit=lda(Direction~Lag2,data=Weekly,subset=train)
```

#### QDA
```R
qda.fit=qda(Direction~Lag2,data=Weekly,subset=train)
```

#### KNN
```R
knn.pred=knn(train.X, test.X, train.Y, k=1)
```

#### 函数编写
```R
Power3=function(x, a){
  return(x^a)
}
res=Power3(3, 8)
print(res)
```


#### 自助法
```R
# 数据集为Default，抽样函数为boot.fn，抽样次数为150
boot(Default, boot.fn, 150)
```
#### 交叉验证
这行代码调用 cv.glm() 函数来对模型进行 交叉验证，即将数据集 Data 划分为多个子集，并通过这些子集来评估模型的性能。   delta 是返回的结果，其中包含模型的 交叉验证误差（CV误差）。
交叉验证通过计算训练和验证过程中的误差来估计模型在新数据上的泛化能力。
cv.glm() 返回的 $delta 一般包含两个数值：第一个是交叉验证的 偏差，第二个是 标准误差。

```R
cv.glm(Data, glm.fit)$delta
# 树的交叉验证
cv.carseats = cv.tree(tree.carseats)
```
#### 最优子集法
```R
reg.fit = regsubsets(Y~.,data=df,nvmax=10)
reg.fit.fw = regsubsets(Y~.,data=df,nvmax=10,method='forward')  
# 选择向前选择
# 后向逐步法
reg.fit.bw = regsubsets(Y~.,data=df,nvmax=10,method='backward')
```

#### lasso
```R
# 训练集下的lasso模型
lasso.train = glmnet(x[train,], y[train], alpha=1)
#alpha=1：指定正则化类型为 Lasso 回归
```


#### Ridge 岭回归
```R
ridge.mod = glmnet(x[train,],y[train],alpha=0,lambda=grid)
# alpha=0 岭回归
```


#### PCR 主成分回归
```R
# 主成分回归模型
pcr.fit = pcr(Apps~., data=College, subset=train, scale=T, validation="CV")
```
#### PLS 偏最小二乘
```R
# 偏最小二乘回归
pls.fit = plsr(Apps~., data=College, subset=train, scale=T, validation="CV")
```



#### 三次模型
```R
# poly函数拟合nox~dis三次模型
glm.fit = glm(nox~poly(dis,3), data=Boston)
```


#### 回归样条
```R
# df=4 自由度为4的回归样条
spline.fit = lm(nox~bs(dis,df=4), data=Boston)
```

#### gam广义可加模型
```R
gam.m1 = gam(Outstate~Private+s(Room.Board,4)+s(PhD,4)+s(perc.alumni,4)+s(Expend,4)+s(Grad.Rate,4), data=college_train)
```

#### 决策树
```R
# Carseats为响应变量的回归决策树
tree.carseats = tree(Sales~.,data=train.set)
```

#### 装袋法
```R
# 装袋法模型
set.seed(123)
bagging_model <- bagging(Species ~ ., data = iris, nbagg = 50)
#或者采用p=m的随机森林
bag.carseats = randomForest(Sales~.,data=train.set,mtry=10,importance=T)
```
#### 随机森林
```R
# 随机森林模型
set.seed(123)
rf_model <- randomForest(Species ~ ., data = iris, ntree = 50, mtry = 2)
```

#### 剪枝
```R
prune.OJ = prune.misclass(tree.OJ,best=5)
# best = 5是剩下5个叶子节点
```

#### 提升法
```R
boost.Hitters = gbm(Salary~., data=train.set,distribution = "gaussian", n.trees = 1000, interaction.depth = 4,shrinkage = i)
# gbm() 是梯度提升树（Gradient Boosted Trees）的核心函数，用于构建集成模型，通过迭代的方式训练一系列弱学习器（通常是回归树），以最小化预测误差。
```


#### 支持向量机SVM
```R
tune.out=tune(svm,y~.,data = train.set,kernel='linear',
              ranges=list(cost=c(0.001,0.01,0.1,1,5,10,100)))
bestmod=tune.out$best.model
#  tune() 函数 功能：对支持向量机模型的超参数进行调优（Grid Search）。
# 拟合径向内核函数的svm
tune.out=tune(svm, y~., data=df, kernel='radial',
              ranges=list(cost=c(0.1,1,10,100,1000),gamma=c(0.5,1,2,3,4)))
```
 #### 主成分分析(PCA)
```R
pr.out2 = prcomp(simulated.data)
```

 #### K均值聚类法
```R
# K=3的均值聚类
kmeans.out = kmeans(simulated.data, 3, nstart = 60)
table(class, kmeans.out$cluster)
```


