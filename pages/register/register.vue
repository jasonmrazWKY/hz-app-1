<template>
	<view class="content">
		<form @submit="formSubmit" class="list">
			<view class="section section_gap">
				<!-- <uni-view class="uni-icon uni-icon-gear-filled" style="color: rgb(143, 143, 148); font-size: 26px;"></uni-view> -->
				<input type="text"  v-model="fwqip" value="" placeholder="请输入服务器IP或公司名称 (列如:198.168.0.2)" />
			</view>
			<view class="btn-area">
				<button class="btn"  @tap="onpeBtn">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				fwqip:'',
			}
		},
		onLoad() {
			this.fwqip = this.websiteUrl
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.fwqip = res.data				
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			onpeBtn(){
				uni.setStorage({
					key:'fwqsj',
					data:this.fwqip
				})
				uni.redirectTo({
					url:'../login/login'
				})
				
				uni.setStorageSync('webURL',this.fwqip);
			}
		}
	}
</script>

<style>
	.content {
		height: 92vh;
		background: #FFFFFF;
		padding: 0 40upx;
		padding-top: 2vh;
	}

	.section {
		margin-bottom: 24upx;
		position: relative;
	}

	.content input {
		border-bottom: 1px solid #CCCCCC;
		height: 66upx;
		padding-left:70upx ;
	}
	.uni-icon{
		position: absolute;
		top: 10upx;
		left: 0;
	}

	.btn {
		background: #ffac60;
		color: #FFFFFF;
	}
</style>
