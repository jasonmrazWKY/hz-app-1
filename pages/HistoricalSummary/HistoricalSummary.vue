<template>
	<view class="content">
		<view class="box" style="margin-bottom: 0;">
			<view class="rui-flex">
				<ruiDatePicker
					fields="day"
					start="2019-01-01"
					end="2020-12-31"
					:value="value1"
					@change="bindChange1"
				></ruiDatePicker>
			</view>
			<view class="rui-flex">
				<text style="color: #CCCCCC;">到</text>
				<ruiDatePicker
					fields="day"
					start="2019-01-01"
					end="2020-12-01"
					:value="value2"
					@change="bindChange2"
				></ruiDatePicker>
			</view>
			<button size='mini' style="right: 160upx;" @tap="onpeDetailed">查询</button>
			<button size='mini'  @tap="onpeDetailedMore">更多</button>
		</view>
		<view class="m-top1"></view>
		<view class="warp">
			<t-table style='position: fixed;width: 100%;background: #FFFFFF;height: 88upx;' >
		        <t-tr >
		                <t-th>货号</t-th>
		                <t-th>工序</t-th>
						<t-th>包数</t-th>
		                <t-th>数量</t-th>
						<t-th>金额</t-th>
		        </t-tr>
		    </t-table>		
			<t-table class='dw' style='width: 100%;z-index: 10;'>
				<t-tr>
					<t-td>合计：</t-td>
					<t-td class="sl">{{sl2}}包</t-td>
					<t-td class="sl">{{sl1}}</t-td>
					<t-td class="sl">¥{{zs}}</t-td>				
				</t-tr>
			</t-table>
		</view>
		<view class="box1" style="float:left;width:100%;margin-top:86upx;">
			<t-table >
				<t-tr v-for="(item,index) in tableList" :key="item.index">
				    <t-td>{{item.huohao==null?'':item.huohao}}</t-td>
		            <t-td>{{item.worktype==null?'':item.worktype}}</t-td>
				    <t-td>{{item.bs}}</t-td>
		            <t-td>{{item.sl}}</t-td>
				    <t-td style='color: red;'>{{item.je==null?'':item.je}}</t-td>
				</t-tr>
			</t-table>
			<view class="m-bottom"></view>
		</view>
	</view>
</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
	import tTable from '@/components/t-table/t-table.vue'
	import tTh from '@/components/t-table/t-th.vue'
	import tTr from '@/components/t-table/t-tr.vue'
	import tTd from '@/components/t-table/t-td.vue'
	
	var d = getNowFormatDate();
	function getNowFormatDate() {
		var array = new Array();
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var firstDayOfYear = date.getFullYear() + seperator1 + month + seperator1 + '01';
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;      //当前时间  yyyy-MM-dd
		array.push(firstDayOfYear);
	    array.push(currentdate);
		return array;
	}
	
	export default {
		components: {
			ruiDatePicker,
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				uid:'',
				tableList:[],
				value1:d[0],
				value2:d[1],
				huohao:'',
				worktype:'',
				color:'',
				chuanghao:'',
				chima:'',
				userid:'',  //编号
				sl1: '',
				sl2: '',
				zs: '',
				dk: '',
				
			}
		},
		onBackPress(options) {
			//console.log("###"+JSON.stringify(options));
			if (options.from === 'backbutton') {
				uni.switchTab({
					url: '/pages/index/index'
				});
				return true;
			}
			return false;
		},
		onLoad(r) {
			console.log("diyici:"+JSON.stringify(r)); 
			let temp = JSON.stringify(r);
			if(temp.indexOf('.html') < 0 && JSON.stringify(r) !='{}'){  
					this.huohao = r.huohao;
					this.chuanghao = r.chuanghao;
					this.color = r.color
					this.chima = r.chima
					this.userid = r.userid
					this.worktype = r.worktype
			}
			this.dk = this.websiteUrl
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
				}
			}),
			uni.getStorage({
				key:'loginData',success: res =>{				
					this.uid = res.data.uid
					uni.request({
						url:`https://${this.dk}/gongziHz.aspx`,
						method: 'GET',
						data: {
							dates:this.value1,
							datee:this.value2,
							huohao:this.huohao,
							chuanghao:this.chuanghao,
							color:this.color,
							chima:this.chima,
							userid:this.userid,
							uid:this.uid,
							worktype:this.worktype
						},
						success: res => {
							console.log(res);
							this.tableList = res.data
							let temp = res.data;
							let sum =0
							let sl1 =0;
							let sl2 = 0;
							for (let i = 0;i <temp.length;i++) {
								//console.log(temp[i].je);
								sum = sum+(temp[i].je?temp[i].je:0)
								sl1 = sl1+temp[i].sl
								sl2 = sl2 + temp[i].bs
							}
							this.zs = sum.toFixed(2);
							this.sl1 = sl1
							this.sl2 = sl2
						}
					})
				}			
			})
		},
		methods: {
			bindChange1(value){
				this.value1 = value;
			},
			bindChange2(value){
				this.value2 = value;
			},
			onpeDetailedMore(){
				//console.log(123);
				uni.navigateTo({
					url:'../info/info1?flag=4'
				})
			},
			onpeDetailed(){
				uni.request({
					url:`https://${this.dk}/gongziHz.aspx`,
					method: 'GET',
					data: {
						uid:this.uid,
						dates:this.value1,
						datee:this.value2,
						huohao:this.huohao,
						worktype:this.worktype	
					},
					success: res => {
						this.tableList = res.data
						let temp = res.data;
						let sum =0
						let sl1 =0;
						let sl2 = 0;
						for (let i = 0;i <temp.length;i++) {
							//console.log(temp[i].je);
							sum = sum+(temp[i].je?temp[i].je:0)
							sl1 = sl1+temp[i].sl
							sl2 = sl2 + temp[i].bs
						}
						this.zs = sum.toFixed(2);
						this.sl1 = sl1
						this.sl2 = sl2
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		
	}
</script>

<style>
.uni-list{display: flex;justify-content: space-between;}
.uni-list-cell{position: relative;}
.uni-list-cell-db button{position: absolute;right: 20upx;top: 10upx;background: rgb(255, 172, 96);color: #FFFFFF;z-index: 99;}
.rui-head{font-size: 4vw;height: 10vw;line-height: 10vw;padding: 0 4vw;text-align: left;}
.rui-flex{display: -webkit-flex;display: flex;align-items: center;font-size: 28upx;background: #FFFFFF;}
.rui-picker{border: none !important;}
.box{background: #FFFFFF;margin-bottom: 24upx;display: flex;position: fixed;top: 0upx;width: 100%;height: 72upx;/* #ifdef H5 */
top: 88upx;
/* #endif */}
.box input{padding: 0 20upx;}
.section {position: relative;background: #FFFFFF; }
.content input {padding: 0 10px;padding-left: 100upx;}
.section text{position: absolute;top: 10upx;}
button{position: absolute;right: 20upx;top: 10upx;background: rgb(255, 172, 96);color: #FFFFFF;z-index: 99;}	
.warp{background: #FFFFFF;}
/* .warp{background: #FFFFFF;margin-top: 40upx;} */
/* .t-table .t-tr:nth-child(2n){background: #FFFFFF;}
.t-table .t-tr:nth-child(2n){background: #FFFFFF;} */
.dw{position: fixed;bottom: 0;background: #FFFFFF;}

</style>
