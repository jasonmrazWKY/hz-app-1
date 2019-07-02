<script>
	
	export default {
		data(){
			return {}
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
					if (wx.canIUse('getUpdateManager')) {
						  const updateManager = wx.getUpdateManager()
						  updateManager.onCheckForUpdate(function (res) {
							console.log('onCheckForUpdate====', res)
							// 请求完新版本信息的回调
							if (res.hasUpdate) {
							  console.log('res.hasUpdate====')
							  updateManager.onUpdateReady(function () {
								wx.showModal({
								  title: '更新提示',
								  content: '新版本已经准备好，是否重启应用？',
								  success: function (res) {
									console.log('success====', res)
									// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
									if (res.confirm) {
									  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									  updateManager.applyUpdate()
									}
								  }
								})
							  })
							  updateManager.onUpdateFailed(function () {
								// 新的版本下载失败
								wx.showModal({
								  title: '已经有新版本了哟~',
								  content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
								})
							  })
							}
						  })
					}
			// #endif     
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	.warp,.box,.section,.uni-list.top,.dw{background: #FFFFFF;}
	body,.m-bottom,.m-top,.m-top1{width: 100%;background: #f5f5f5;}
	.m-bottom{height: 100upx;}
	.m-top{height: 86upx;}
	.m-top1{height: 72upx;}
	.kg{margin-left: 40upx;}
	.sl,.sl view{color: #F6871E !important;font-weight: 600;font-size: 28upx;}
</style>
