/**
 * 融云IM接口整理
 * created by lacy 2019/11/5
 */
const AppKey = 'mgb7ka1nmdbfg' // appkey这个key可以直接用
// token lacy123456
const token =
    'kXFyaz0zhRysSYBqJm/EuqcXTpysFYKD/EuwSe/Fph0GuTRIhqpNHZqHmDRrJR0SmD2lHMyvAxxY9nxbFL2BGVRWrE9YZLDo'
const RongIM = {
    curUserId: '',
    isConnect: false,
    init: function (onSuccessCB, onMessageCB) {
        const RongIMLib = window.RongIMLib // RongIMLib是被挂载在window上的
        const RongIMClient = RongIMLib.RongIMClient
        // 这是初始化，需要填参数就是你的APPKEY。
        RongIMClient.init(AppKey)
        const that = this
        RongIMClient.connect(token, {
            onSuccess: function (userId) {
                if (onSuccessCB) {
                    onSuccessCB()
                }
                // userId是申请token时的填写的id，到时候可以封装在下面的extra中传过去
                console.log('Login successfully.' + userId)
                that.curUserId = userId
                that.isConnect = true
            },
            onTokenIncorrect: function () {
                console.log('token无效')
                that.isConnect = false
            },
            onError: function (errorCode) {
                var info = ''
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时'
                        break
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误'
                        break
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本'
                        break
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确'
                        break
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用'
                        break
                }
                console.log(info)
            }
        })
        // 设置链接状态监听器 这个是一定要写的否则会报错
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    // 链接成功
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功')
                        break
                    // 正在链接
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接')
                        break
                    // 重新链接
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接')
                        break
                    // 其他设备登陆
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登陆')
                        break
                    // 网络不可用
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用')
                        break
                }
            }
        })
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                // 执行接受到消息的回调
                console.log('receive a new message')
                onMessageCB(message)
                switch (message.messageType) {
                    case RongIMClient.MessageType.TextMessage:
                        console.log('收到一个文本消息：' + message.content.content)
                        break
                    case RongIMClient.MessageType.ImageMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.LocationMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.RichContentMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break
                    default:
                    // 自定义消息
                    // do something...
                }
            }
        })
    },
    /**
     * @params { messageBody } :
     * {
     *      msg: 具体发送的消息。这里发送什么消息就定义什么消息体。
     *      conversationtype： 发送消息的类型，比如私聊，群组。。。
     *      targetId： 对象id，可以是人的id或者群组的id
     * }
     */
    sendMessage: (messageBody) => {
        const RongIMLib = window.RongIMLib
        const RongIMClient = RongIMLib.RongIMClient
        // 定义消息类型,文字消息使用 RongIMLib.TextMessage
        let msg, conversationtype, targetId
        if (messageBody) {
            msg = messageBody.msg
            conversationtype = messageBody.conversationtype
            targetId = messageBody.targetId
        } else {
            // 测试的数据
            msg = new RongIMLib.TextMessage({
                content: 'hello',
                extra: '附加要传递的值'
            })
            conversationtype = RongIMLib.ConversationType.PRIVATE // 私聊
            targetId = 'lacy123456' // 目标 Id
        }
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
            // 发送消息成功
            onSuccess: function (message) {
                // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                console.log('Send successfully')
            },
            onError: function (errorCode, message) {
                var info = ''
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时'
                        break
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误'
                        break
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息'
                        break
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中'
                        break
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中'
                        break
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中'
                        break
                    default:
                        info = 'x'
                        break
                }
                console.log('发送失败:' + info)
            }
        })
    }
}

export default RongIM
