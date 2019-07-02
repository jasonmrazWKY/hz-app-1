<template>
	<view class="content">
		<view class="uni-list top">
			<view class="uni-list-cell" style="height: 80upx;">
				<view class="uni-list-cell-left">
					<view class="uni-label">货号:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" v-model="value1" placeholder="请输入货号"></input>
				</view>
				<view class="uni-list-cell-left">
					<view class="uni-label">工序:</view>
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text"  v-model="value2" placeholder="请输入工序"></input>
				</view>
				<view class="uni-list-cell-db">
				    <button size='mini' @tap="onpeLabourCost">查询</button>
				</view>
			</view>
		</view>
		<view class="warp" style='margin-bottom: 70px;'>
			<t-table >
		        <t-tr>
		            <t-th>货号</t-th>
		            <t-th>工序</t-th>
					<t-th>工价</t-th>
					<t-th >时间</t-th>
		        </t-tr>
		        <t-tr v-for="(item,index) in gjlisi" :key="item.index">
		            <t-td> {{item.huohao}}</t-td>
		            <t-td>{{item.worktype}}</t-td>
					<t-td class='ys'>{{item.price}}</t-td>
					<t-td class='je'>{{item.dates}}</t-td>				
		        </t-tr>
		    </t-table>
		</view>
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
		    tTd,
		},
		data() {
			return {
				gjlisi:[],
				value1:'',
				value2:'',
				dk:''
			}
		},
		onLoad() {
			this.dk = this.websiteUrl,
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
					console.log(res.data);
				}
			}),
			uni.request({
				url: `https://${this.dk}/getHuohaoPrice.aspx`,
				method: 'GET',
				data: {
					huohao:this.value1,
					worktype:this.value2
				},
				success: res => {
					this.gjlisi=res.data
					this.value1=''
					this.value2=''
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			onpeLabourCost(){
				uni.request({
					url: `https://${this.dk}/getHuohaoPrice.aspx`,
					method: 'GET',
					data: {
						huohao:this.value1,
						worktype:this.value2
					},
					success: res => {
						this.gjlisi=res.data
						this.value1=''
						this.value2=''
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.content {
		height: 92vh;
	}
	.uni-list.top{
		position: fixed;
		top: 0upx;
		height: 72upx;
		width: 100%;
		background: #FFFFFF;
		z-index: 20;
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
		top: -10upx;
		background: rgb(255, 172, 96);
		color: #FFFFFF;
		z-index: 99;
	}	
.warp{background: #FFFFFF;margin-top: 72upx;}
.t-table .t-tr:nth-child(2n){
	background: #FFFFFF;
}
.ys view{color: #F6871E !important;}

.uni-list-cell{
			position: relative;
		}
		.uni-list-cell-left {
		   font-size: 14px;
		   padding: 0 0 0 5upx;
		}
		.uni-input{
			padding: 0 !important;
			height: 66upx;
			line-height: 66upx;
		}
		.uni-label{
			width:90upx;
		}
		.uni-list-cell-db{
			 height: 66upx;
			line-height: 66upx;
			text-align: center;
		}
		 button{
			background: rgb(255, 172, 96);
			color: #FFFFFF;
		}	
</style>
