<template>
	<view class="content">
		<view class="box" style="border-bottom: 1px solid #CCCCCC;">
			<view class="section section_gap" style="height: 72upx;border-bottom: 1px solid #CCCCCC;">
				<text>工号:</text>
				<input type="text" maxlength="11" v-model="value1" value="" placeholder="请输入工号" />
			</view>
			<view class="section section_gap" style="height: 72upx;">
				<text>员工:</text>
				<input type="text" v-model="value2" value="" placeholder="请输入员工" />
				<button  size='mini' @tap="onpeDetailed">查询</button>
			</view>
		</view>
		<view class="m-top"></view>
		<view class="warp">
			<view class="uni-padding-wrap uni-common-mt">
					<view class="text" v-for="(item1,index) in data" :key="index">
						<block>
						    <view class="uni-list-cell">
						        <view class="uni-triplex-row">
						            <view class="uni-triplex-left" style="width: 100%;">
						                <text class="uni-title uni-ellipsis">工号:{{item1.uid}}<text class="kg"></text>员工:{{item1.uname}}</text>
						                <text class="uni-text">部门:{{item1.dept}}<text class="kg"></text>工序:{{item1.worktype}}<text class="kg"></text>移动登入密码:{{item1.movepassword}}</text>			                    
										<text class="uni-text-small uni-ellipsis" style="color: #FFAC60;font-size: 32upx;">移动登入权限:{{item1.move_login}}<text class="kg"></text>移动管理员:{{item1.move_admin}}</text>
						            </view>
						        </view>
						    </view>
						</block>
					</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
		</view>
		<view class="m-bottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				size:'',
				data:[],
				max: 0,
				loadMoreText: "加载中...",
				showLoadMore: true,
				tableList:[],
				value1:'',
				value2:''
			}
		},
		onLoad() {
			this.dk = this.websiteUrl
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
					this.initDate()
				}
			})
		},
		onUnload() {
			this.max = 0,
			this.data = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
			console.log('onUnload事件');
		},
		onReachBottom() {
			console.log("onReachBottom");
			console.log('max：'+this.max );
			if (this.max >= this.size) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;    //设置下拉提示的标记
			setTimeout(() => {
				this.setDate();
			}, 500);
		}, 
		methods: {
			initDate(){
				uni.request({
					url: `https://${this.dk}/getEmployeeInfo.aspx`,
					method: 'GET',
					data: {
						uid:this.value1,
						uname:this.value2,
					},
					success: res => {
						if(res.data.length>8000){
							uni.showModal({
								title:'友情提示',
								content:'您的数据量过大，请到电脑端查询'
							})
						}
						this.tableList = res.data
						this.size = this.tableList.length
						let temp = res.data
						let ids = ''
						let uname = ''
						for (let i = 0;i <temp.length;i++) {						
							ids = ids + temp[i].UID
							uname = uname + temp[i].uname
						}
						this.value1 = ''
						this.value2 = ''
						//一下为下拉使用
						
						this.max = 0;
						this.data = [];
						let data = [];
						this.max += (this.size<=20?this.size:20);
						let temp1 = this.tableList.splice(0,20);
						for(var i = 1;i <= temp1.length;i++){
							data.push(temp1[i-1]);
						}
						this.data = this.data.concat(data);
						uni.stopPullDownRefresh();
					}
				});
			},
			setDate() {
				let data = [];
				this.max += (Math.floor(this.tableList.length/20)>0?20:this.tableList.length);
				let temp1 = this.tableList.splice(0,20);
				for(var i = 1;i <= temp1.length;i++){
					data.push(temp1[i-1]);
				}
				this.data = this.data.concat(data);
			},
			onpeDetailed(){
				this.initDate()
			}
		},
	}
</script>

<style>
.box{background: #FFFFFF;margin-bottom: 24upx;position: fixed;top: 0upx;width: 100%;z-index: 99;}
.section {position: relative;background: #FFFFFF; display: flex;margin-left: 30upx;height: 72upx;}
.box input {padding: 0 0 0 10upx;margin-top: 11upx; border: 1px solid #CCCCCC;border-radius: 20upx;margin-left: 81upx;}
.section text{position: absolute;top: 10upx;}
.section button{position: absolute;right: 40upx;top: 7upx;background: rgb(255, 172, 96);color: #FFFFFF;z-index: 99;}	
.uni-list-cell{position: relative;}
.warp{background: #FFFFFF;}
.kg{margin-left: 30upx;}
.m-top{height: 144upx;}
.text {
		background-color: #FFFFFF;
	}
	.uni-triplex-row{
		padding: 0;
	}
	.uni-common-mt{
		margin-top: 0;
	}
	.uni-padding-wrap {
		width: 100%;
		padding:0;
	}
.uni-list-cell::after {
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    left: 0;
    height: 4upx;
    content: '';
    -webkit-transform: scaleY(.5);
    -ms-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}
.uni-list-cell{
	padding-left: 30upx;
	/* padding: 10upx 0 10upx 30upx; */
}
</style>
