<template>
	<div>
		<button @click="handleClick">发送消息</button>
		<button @click="handleService">自定义客服按钮</button>
		<div class="service-box">
			<p>这里的消息可以通过融云控制台发送</p>
			<p>{{ curMessage }}</p>
		</div>
		<div id="custom-serve" />
	</div>
</template>

<script>
import RongIM from '../sdk/RongIM'
import '../lib/cs.min.css'
import RongIMLib from '../lib/RongIMLib-2.5.1'
import RCS from '../lib/cs.min.js'

export default {
	data() {
		return {
			curMessage: '',
			appKey: 'mgb7ka1nmdbfg',
			token:
				'kXFyaz0zhRysSYBqJm/EuqcXTpysFYKD/EuwSe/Fph0GuTRIhqpNHZqHmDRrJR0SmD2lHMyvAxxY9nxbFL2BGVRWrE9YZLDo',
			userIcon: 'http://7xo1cb.com1.z0.glb.clouddn.com/rongcloudkefu2.png',
			csIcon:
				'http://fsprodrcx.cn.ronghub.com/UQRxDVEHcD6_gHENUQRxDUs9XOZRBH25PGECfjBjFA/base64.png'
		}
	},
	mounted() {
		// RongIM.init(this.receiveMessage)
		console.log(RongIMLib)
		// this.init()
	},
	methods: {
		handleClick() {
			RongIM.sendMessage()
		},
		handleService() {
			// 先要获取token 如果不用它的button的话 那么就需要自己连接客服 startCustomerServer客服初始化接口 createConversation 创建客服
			this.init()
		},
		receiveMessage(message) {
			this.curMessage = message
			console.log(message)
		},
		handleConnecting() {
			console.log('连接中...')
		},
		handleConnected() {
			console.log('连接成功')
		},
		handleDisconnected () {
			alert('连接断开')
		},
		init() {
			const that = this
			RCS.init({
				appKey: that.appKey,
				token: that.token,
				target: document.getElementById('custom-serve'),
				customerServiceId: 'service',
				upload: {
					fileServer: 'http://upload.qiniu.com', // 文件服务器地址
					isPrivate: false // 是否是私有云
				},
				userIcon: that.userIcon, // 用户默认头像，在用户没有头像的时候显示
				csIcon: that.csIcon, // 客服默认头像，在客服没有头像的时候显示,建议线上地址
				// 是否需要按钮主动发起，设为false的时候，init()方法直接唤起聊天窗口,需客户自己编写按钮，点击之后调用init(),
				// templates中的button模板不可用;设为true的时候，init()首先唤起客服咨询按钮，点击之后才连接客服，唤起聊天窗口，
				// 在进入页面之后就需调用init()方法。此参数是为了方便客户在点击客服按钮后自行获取token，在获取到token之后，执行init()即可。
				showButton: true,
				connectingCallback: that.handleConnecting, // 连接中的执行的方法，例如显示加载页面,可不传
				connectedCallback: that.handleConnected, // 连接成功之后的方法，例如关闭加载页面,可不传
				disconnectedCallback: that.handleDisconnected, // 断开连接之后的操作,可不传
				extraInfo: {
					// 当前登陆用户信息
					userInfo: {
						name: '游客',
						grade: 'VIP'
					},
					// 产品信息
					requestInfo: {
						productId: '123',
						referrer: '10001',
						define: '' // 自定义信息
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.service-box {
	width: 400px;
	height: 200px;
	border: 1px solid black;
}
</style>
