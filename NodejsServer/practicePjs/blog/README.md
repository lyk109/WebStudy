## 使用到的node模块

**1. express：** 第三方模块，网站服务器整体框架基础

**2. fs：** 内置模块，用于读取模板页面

**3. path：** 内置模块，用于拼接读取文件时`__dirname`与相对路径，避免手动拼接出现错误

**4. body-parser:** 第三方模块，结合express，用于处理POST请求内容

**5. express-session：** 第三方模块，结合express，用于存储浏览器登录状态

**6. blueimp-md5:** 第三方模块，用于加密用户密码信息，防止数据库泄漏造成用户密码泄露

**7. express-art-template:** 第三方模块，模板渲染引擎，用于服务端动态渲染发送给用户的页面

**8. mongoose:** 第三方模块，用于操作MongoDB数据库

## 数据库结构

**用户(users)**:  用户昵称(nickname)，密码(password)，邮箱(email)，头像(avatar)，状态(status)，性别(gender)，自我介绍(bio)，生日(birthday)，创建时间(createTime).

## 网站整体架构

页面设计+服务器配置+路由设计+数据库模板设计

### 页面设计

首页

登录页

注册页

文章或讨论内容页