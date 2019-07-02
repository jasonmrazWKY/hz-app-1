<template>
	<view class="content">
		<view class="box">
			<image :src="img" mode="widthFix"></image>
			<view class="">{{title}}</view>
		</view>
		<uni-list>
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon1"  style='font-size: 20upx;' title="个人资料" />
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon2" title="修改密码" @tap='onpeChangePassword' />
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon3" title="退出登录" @tap="onpeRegister"/>
			<uni-list-item :show-extra-icon="true" :extra-icon="extraIcon3" title="当前版本" @tap="btnVersion"/>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {			
			return {
				title:'',
				img: "../../static/img/1201.png",
				extraIcon1: {
					color: '#FFAC60',
					size: '22',
					type: 'contact-filled'
				},
				extraIcon2: {
					color: '#FFAC60',
					size: '22',
					type: 'gear-filled'
				},
				extraIcon3: {
					color: '#FFAC60',
					size: '22',
					type: 'circle-filled'
				}
			}
		},
		onLoad() {
			uni.getStorage({
				key:'loginData',success: res =>{
					this.title = res.data.uname
					this.uid = res.data.uid
					this.curr_worktype_bh = res.data.curr_worktype_bh
					this.curr_worktype_name = res.data.curr_worktype_name				
				}			
			})
		},
		methods: {
			onpeRegister(){
					uni.showModal({
						title: '提示',
						content: '是否注销用户',
						success: function (res) {
							if (res.confirm) {
								uni.removeStorage({
									key: 'loginData',success: function (res) {
										uni.redirectTo({
											url:'../login/login'
										})
									}
								});
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});			
			},
			onpeChangePassword(){
				uni.navigateTo({
					url:'../admin/ChangePassword/ChangePassword'
				})
			},
			btnVersion(){
				 // #ifdef APP-PLUS
				  plus.runtime.getProperty(plus.runtime.appid,function(inf){  
				  	//wgtVer=inf.version;  
				  	console.log("当前应用版本："+inf.version); 
					uni.showModal({
						title: '',
						content:'当前版本：'+inf.version
					})
				  });
				// #endif
			}
		}
	}
</script>

<style>
.box{
	color: #FFFFFF;
	height: 180upx;
	width: 100%;
	background: rgb(255, 172, 96);
	display: flex;
	flex-direction:column;
	align-items: center;
	margin-bottom: 40upx;
}
.box image{
	width: 120upx;
	height: 120upx;
}
</style>
