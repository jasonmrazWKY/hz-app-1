<template>
	<view class="content">
		<view class="box">
			<view  class="list" >
				<text>床号</text>{{chuanghao}}
			</view>
			<view  class="list" >
				<text>货号</text>{{huohao}}
			</view>
			<view  class="list" >
				<text>工序</text>{{worktype}}
			</view>
			<view  class="list" >
				<text>数量</text>{{sl}}
			</view>
			<view  class="list" >
				<text>工价</text>{{price}}
			</view>
			<view  class="list" >
				<text>金额</text>{{je}}
			</view>
			<view  class="list" >
				<text>条码值</text>{{info}}
			</view>
		</view>
		<button class="btn" type="primary"  @tap="SweepCode">继续扫码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chuanghao:'',
				color:'',
				huohao:'',
				worktype:'',
				sl:'',
				price:'',
				je:'',
				info:''
			}
		},
		onLoad:function(opion){
			this.chuanghao = opion.chuanghao
			this.color = opion.color
			this.huohao = opion.huohao
			this.worktype = opion.worktype
			this.sl = opion.sl
			this.price = opion.price
			this.je = opion.je
			this.info = opion.id
			console.log(opion.b)
		},
		methods: {
			SweepCode(){
				uni.scanCode({
					success:function(res){
						uni.navigateTo({
							url: '/pages/SweepCode/SweepCode?a='+res.result,
						});
					}
				})
			}
		},
	}
</script>

<style>
.box{
	background: #FFFFFF;
	padding: 0 40upx;
	margin-bottom: 60upx;
}
.list{
	height: 80upx;
	border-bottom: 1px solid #CCCCCC;
	line-height: 88upx;
	color: #CCCCCC;
}
/* .list:nth-of-type(2){
	border-bottom: none;
} */
.list:nth-last-of-type(1){
	border-bottom: none;
}
.list text{
	display: inline-block;
	width: 160upx;
	color: #000000;
	/* padding-right: 60upx; */
}
.btn{
	width: 90%;
	background-color: rgb(255, 172, 96);
}
</style>
