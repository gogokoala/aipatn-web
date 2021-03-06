### 2017-11-02 ###
gogokoala:
1.测试修正sf1 api的若干问题
2.sf1 简单检索编码
3.sf1 高级检索增加日期选择组件，引入primeng库( https://www.primefaces.org/primeng/#/calendar )

puyd:
1.创建complex-search.service.ts
2.初步实现关键字条件选择和添加

### 2017-11-03 ###
puyd:
1.实现关键字段查询

steps:
1.完善api/sf1

### 2017-11-04 ###
steps:
1.sf1简单检索继续编码，增加sf1-list-resolver.service.ts

### 2017-11-05 ###
puyd:
1.各查询字段的第一条记录指定的操作符，专用于指定整个查询字段与其他字段的组合方式（以前固定为AND组合，现在可以使用OR）
2.实现日期范围查询条件
3.移动complex-search.service.ts到sf1目录下，重命名为sf1-search.service.ts

todo:
1.日期输入框的宽度，在不同的模式下，需要进行调整。

### 2017-11-06 ###
puyd:
1.ComplexSearch查询条件全局存储
2.实现buildKeySearch和buildCodeSearch
3.实现getKeyWords
4.实现数据库选择getDBValue

steps:
1. sf1-list-resolver.service.ts编码
2. sf1-list 页面数据显示
3. 讨论检索结果及二次检索的实现方法

### 2017-11-07 ###
steps:
1. 格式化sf1-search.service
2. 修正footer显示错误
3. 各页面增加user: UserService
4. 测试已有代码(进行中)
5. TODO: 高级检索面页，各条件中首条件均未显示NOT
6. 修正server/redisstore.ts使用阿里云Redis
7. 安装部署服务器
8. 解决API跨域访问CORS问题

puyd:
1. 修改查询条件的生成逻辑，放开首字段不能为NOT的限制，但是受API限制，以NOT开头的查询条件不能被执行
2. 取消原有的不同条件组之间的AND连接，取消条件组的优先级括号，修改为每个条件均按其首个有效条件（不为空）的操作符串联

### 2017-11-08 ###
steps:
1. 安装部署服务器
2. 配置服务在线升级pm2
3. 移除iconfont,统一使用font-awesome

### 2017-11-09 ###
steps:
1.配置客户端部署

### 2017-11-10 ###
puyd:
1. 实现图文模式和列表模式的切换

steps:
1. 安装艾特云服务器
2. 云服务器需要进行域名备案，否则访问受到阿里云限制，出现异常

### 2017-11-11 ###
puyd:
1. 实现二次查询
2. todo: 二次查询无结果时，会跳转到简单查询页面

steps:
1. 解决二次查询无结果的问题，增加t=?,强制刷新

### 2017-11-12 ###
puyd:
1. 初步实现分页功能，CSS需要统一设置

steps:
1.测试二次查询功能
2. todo: 二次查询的连接条件显示存在错误，增加条件后无显示

### 2017-11-13 ###
steps:
1. 调整api端响应结构，增加response.error属性{status:'XXX', message:''}
2. 增加sf1Service.redirectUrl，实现查询异常时的跳转重定向

puyd:
1. Exp实现Encode和Decode方法
2. 简化表达式的显示方式

### 2017-11-14 ###
steps:
1. 阿里云安装MSSQL2012
2. 安装Ater服务端。数据库待同步。
3. 部署客户端网站
4. 激活polyfills，使网站兼容IE11, 360浏览器
5. 调整高级检索css

puyd:
1. 修改二次检索表示式显示，可以删除二次检索的条件

### 2017-11-15 ###
steps:
1. 调整CSS布局，以兼容多种浏览器
2. 检索异常处理
3. 安装Alter服务器，恢复数据库 

### 2017-11-16 ###
puyd:
1. 调整Exp.Encoe方法，去掉常量内容

### 2017-11-17 ###
puyd:
1. 调整并完善分页功能

### 2017-11-18 ###
### 2017-11-19 ###
### 2017-11-20 ###
steps:
1. 服务端调整session实现，由客户端记录cookie:x-session-id
2. 服务端jwt调整
3. 服务端用户登录模块调整
4. 服务端sf1,ft1扩展开始

puyd:
1. 初步实现列表页面左侧的过滤统计
2. 显示查询失败时的错误信息
3. 实现高级检索页面的命中条数查询功能
todo: 测试中发现对“优先权日”字段的查询没有结果，不知道是API的问题，还是我们测试账号的限制，因此，对授权日的统计，全部为0

### 2017-11-21 ###
steps: 
1. 国知局并发有限制
2. 实现服务端访问并发限制

### 2017-11-22 ###
puyd:
1. 重写SearchExp类
2. 修改高级检索页面

### 2017-11-23 ###
puyd:
1. 修改列表页面，调整二次查询的输入方式，重新实现查询条件的删除操作

steps:
1. 实现ft1的PDF文档下载

### 2017-11-23 ###
steps:
1. 修改patent类，使用之可应用于数据库保存

### 2017-11-24 ###
steps:
1. 修改sf1,sf2，检索结果可以保存至数据库表patent
2. 调整sf1-list的显示效果

puyd:
1. 可使用过滤条件进行二次查询
2. 查询表达式中可以删除查询条件

### 2017-11-25 ###
### 2017-11-26 ###
### 2017-11-27 ###
steps:
1. 修正priority字段数据带逗号导致错误的BUG

### 2017-11-28 ###
steps:
1. 文本关键字高亮显示编码
2. sf1 list路由处理

### 2017-11-29 ###
### 2017-11-30 ###

