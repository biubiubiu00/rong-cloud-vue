# rong-clound-im-vue 这是一个接入融云的demo

#### 项目作用
+ 此项目封装了简单的IM通讯的接口(RongIM，包括初始化，收发消息)
+ /lib下面cs相关的都是客服相关的，images是css样式涉及到的图片
+ 在HelloWorld里面引入了cs.min.js可以看到融云客服当前的样式

#### 接入客服的流程
1. 按照ui的需求在websdk-demo里修改客服的样式
2. 打包导出客服相关的代码
3. 按照helloWold里面的代码引入顺序引入，通过init设置配置就可以直接使用了

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### 看到这里的时候你应该知道
+ 融云 github[https://github.com/rongcloud](https://github.com/rongcloud)
+ 融云 websdk-demo(这里包括了所有web相关的demo，我用的是下面cs/jx里面的部分)[https://github.com/rongcloud/websdk-demo](https://github.com/rongcloud/websdk-demo)
+ 融云 im-widget(这是一套angular插件，可以看看im的效果)[https://github.com/rongcloud/rongcloud-web-im-widget](https://github.com/rongcloud/rongcloud-web-im-widget)
+ 融云Web SDK [https://www.rongcloud.cn/docs/web.html](https://www.rongcloud.cn/docs/web.html)
+ 融云 客服开发文档[https://www.rongcloud.cn/docs/customer_service.html](https://www.rongcloud.cn/docs/customer_service.html)
+ 融云佳信客服介绍[https://support.rongcloud.cn/ks/NzAz](https://support.rongcloud.cn/ks/NzAz)
+ 融云控制台(作用是获取Token，模拟所以的容易Api接口)[https://developer.rongcloud.cn/overview/indexnew/EGEkzwGPB2do9mcCa6m65Q]()
+ 融云客服工作台(配置配置客服相关的东西)[https://dev2.kefucloud.net/#](https://dev2.kefucloud.net/#)
