<template>
	<view class="content">
		<text class="text">ML4561213</text>
		<view class="uni-flex uni-row" v-for="(item,index) in list1" :key='index'>
			<view class="uni-flex-item" >
				<view class="">{{item.name}} <text :style="{color:item.activeColor1}">{{item.nub}}</text></view>
			</view>
			<view class="uni-flex-item">
				<view class="">{{item.name1}}<text :style="{color:item.activeColor}">{{item.nub1}}</text></view>
			</view>
		</view>
		<button type="primary" style="width: 90%;margin-top: 24upx;background: rgb(255, 172, 96);" >确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1:[
					{name:'序号',nub:"101",name1:'货号',nub1:'101'},
					{name:'工序',nub:"8",name1:'包数',nub1:'8'},
					{name:'数量',nub:"15",name1:'金额',nub1:'60:00',activeColor:'red'},
					{name:'工价',nub:"52:00",activeColor1:'rgb(250,137,35)'}
				],
			}
		},
		methods: {
		   
		}
	}
</script>

<style>
.content .text{display: block;background: #FFFFFF;padding-left: 40upx;border-bottom: 1px solid #CCCCCC;height: 66upx;line-height: 66upx;}
.uni-flex{background: #FFFFFF;display: flex;justify-content: space-between;}
.uni-flex-item view{line-height: 80upx;text-indent: 40upx;}
.uni-flex-item view text{margin-left: 40upx;color: #CCCCCC;}
.mx{padding: 0 40upx;height: 72upx;background: #FFFFFF;position: relative;line-height: 72upx;}
.mx::after{position: absolute;content: '';width: 90%;height: 1px;background: #CCCCCC;left: 5%;bottom: 0;}
.mx .mini-btn{float: right;margin-top: 10upx;}
.input-name,.input-password {height: 80upx;width: 100%;display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative; padding-left: 30upx;box-sizing: border-box;}
.input-name::after {content: " ";position: absolute;left: 30upx;bottom: 0;right: 0;height: 1px;border-top: 1px solid #e5e5e5;transform-origin: 0 0;transform: scaleY(.5);}
.input-name view,.input-password view {width: 120upx;height: 50upx;line-height: 50upx;font-size: 28upx;color: #333333;}
.input-name input,.input-password input {flex: 1;height: 50upx;line-height: 50upx;}
.mini-btn{background: rgb(250, 137, 35);color: #FFFFFF;}
</style>
