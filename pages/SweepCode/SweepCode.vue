<template>
	 <view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">结果:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  disabled ='true' v-model="msg" style="color: #FFAC60 ;font-size: 14px;font-weight: 600;"></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">数量:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  disabled ='true' v-model="sl"  style="color: red;font-size: 24px;font-weight: 600;"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">编号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  disabled ='true' v-model="userid"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">床/缸号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="chuanghao"></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">货号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="huohao"></input>
				</view>
			</view>
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">颜色:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="color"></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">尺码:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" disabled ='true'  v-model="chima"></input>
				</view>
			</view>
		</view>
		
		<view class="warp" style='margin-bottom: 70px;'>
			<t-table>
		        <t-tr>
		            <t-th>工序</t-th>
		            <t-th>员工</t-th>
		            <t-th>时间</t-th>
		        </t-tr>
		        <t-tr v-for="(item,index) in list" :key="item.index">
		            <t-td>{{item.worktype}}</t-td>
		            <t-td>{{item.uname}}</t-td>
		            <t-td v-if="item.inputtime != null">
					   {{item.inputtime}}
					</t-td>
					<t-td v-else>
					   {{''}}
					</t-td>
		        </t-tr>
		    </t-table>
		</view>
		
		<button class="btn" @tap="onpeBtn" type="primary">扫码</button>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	export default {
		components: {
		    tTable,
		    tTh,
		    tTr,
		    tTd
		},
		data() {
			return {
				msg:'',
				uid:"",
				curr_worktype_name:'',
				curr_worktype_bh:'',
				chuanghao:'',
				huohao:'',
				worktype:"",
				sl:'',
				price:'',
				je:'',
				info:'',
				list:[],
				userid:'',
				color:'',
				chima:'',
				ganghao:'',
				dk:'',
				move_scan:''
			}
		},
		onBackPress(options) {  
			if (options.from === 'navigateBack') {
				uni.switchTab({
					url: '/pages/index/index'
				});
				return true; 
            }  
            return false;  
        }, 
		onLoad(r) {
			this.userid = r.result;
			////console.log(r);
			this.dk = this.websiteUrl,
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
				}
			})
			uni.getStorage({
				key:'loginData',success: res =>{
					this.uid = res.data.uid,
					this.curr_worktype_bh = res.data.curr_worktype_bh
					this.move_scan = res.data.move_scan;
				}			
			})
			
			//扫码之后立即请求数据
			uni.request({ 
				url:`https://${this.dk}/downloadDeviceCMDs.aspx`,
				method:'GET',
				data:{
					uid: this.uid,
					worktype: this.curr_worktype_bh,
					Info: this.userid,
					Inputsl:0
				},
				complete: res => {
					if(res.statusCode == 200){
						this.huohao = res.data.huohao;
						this.color = res.data.color;
						this.chima = res.data.chima;
						this.chuanghao = res.data.chuanghao;
						this.sl = res.data.sl;
						this.msg = res.data.tsxx;
						
						uni.request({
							url: `https://${this.dk}/getSearchWorktype.aspx`,
							method: 'GET',
							data: {
								userid:this.userid
							},
							success: res => {
								if(res.statusCode == 200){
									//console.log(JSON.stringify(res));
									this.list = res.data;
								}
							}
						})
						
					}else{
						this.list = [];
						this.huohao = '';
						this.color = '';
						this.chima = '';
						this.ganghao = '';
						uni.showToast({
							 position:'top',
							 title:'请扫描正确的条码',
							 icon :'none',
							 duration: 3000
						})
					}
				}
			})
		},
		methods: {
			onpeBtn(){
				uni.scanCode({
					onlyFromCamera: true,
					scanType:['qrCode','barCode'],   //这里有个坑，不写的话扫描速度有点慢
					success: res => {
						this.userid = res.result;
						//第一部分数据
						uni.request({
							url:`https://${this.dk}/downloadDeviceCMDs.aspx`,
							method:'GET',
							data:{
								uid: this.uid,
								worktype: this.curr_worktype_bh,
								Info: res.result,
								Inputsl:0
							},
							complete: res => {	
								if(res.statusCode == 200){
									this.huohao = '';
									this.color = '';
									this.chima = '';
									this.ganghao = '';
								    this.huohao = res.data.huohao;
									this.color =  res.data.color;
									this.chima = res.data.chima;
									this.chuanghao = res.data.chuanghao;
									
									this.msg = res.data.tsxx,
									
									uni.request({
										url: `https://${this.dk}/getSearchWorktype.aspx`,
										method: 'GET',
										data: {
											userid:this.userid
										},
										success: res => {
											if(res.statusCode == 200){
												//console.log(JSON.stringify(res));
												this.list = res.data;
											}
										}
									})
									
								}else{
									this.list = [];
									this.huohao = '';
									this.color = '';
									this.chima = '';
									this.ganghao = '';
									uni.showToast({
										 position:'top',
										 title:'请扫描正确的条码',
										 icon :'none',
										 duration: 2000
									})
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
    .content {
		height: 92vh;
	}
	.box{
		background: #FFFFFF;
		padding: 0 40upx;
		padding-top: 2vh;
		margin-bottom: 24upx;
	}
	.section {
		margin-bottom: 24upx;
		position: relative;
		background: #FFFFFF; 
	}

	.content input {		
		height: 66upx;
		padding-left:100upx ;
	}
	.section text{
		position: absolute;
		top: 10upx;
	}
	.section button{
		position: absolute;
		right: 0;
		top: 0upx;
		background: rgb(255, 172, 96);
		color: #FFFFFF;
		z-index: 99;
	}	
	.warp{background: #FFFFFF;}
	.warp{background: #FFFFFF;margin-top: 40upx;}
	.t-table .t-tr:nth-child(2n){
		background: #FFFFFF;
	}
	.t-table .t-tr:nth-child(2n){
		background: #FFFFFF;
	}
	.btn{
		width: 90%;position: fixed;bottom: 24upx;left: 5%;background: rgb(255, 172, 96) !important;
		}
	.uni-list-cell{
		position: relative;
	}
	.uni-list-cell-left {
	   font-size: 14px;
	   padding: 0 0 0 30upx;
	}
	.uni-list-cell-db button{
		position: absolute;
		right: 20upx;
		top: 10upx;
		background: rgb(255, 172, 96);
		color: #FFFFFF;
		z-index: 99;
	}
	.uni-input{
		padding: 0 !important;
		height: 66upx;
		line-height: 66upx;
	}
	.uni-label{
		width:140upx;
	}
</style>


