<template>
	<view class="content">
		<view class="uni-list">
            <radio-group @change="radioChange">
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.bh" >
					<view>{{item.name}}</view>
                    <view >
                        <radio  :value="item.bh" :checked="index === current" color="#FFAC60" style="transform:scale(0.7)"  />
                    </view>                   
                </label>
            </radio-group>
        </view>
		<button class="btn"  type="primary" @tap="openBtn">确认</button>
	</view>
</template>

<script>
	export default {
    data() {
        return {
			uid:'',
			showFlag:false,
            items: [],
            current: -1,
			dk:''
        }
    },
	onLoad() {
		this.dk = this.websiteUrl
		uni.getStorage({
			key:'fwqsj',success: res => {
				this.dk = res.data
				//console.log(res.data);
			}
		}),
		uni.getStorage({
			key: 'loginData',
			success: res => {
				this.uid = res.data.uid
				uni.request({
					url: `https://${this.dk}/getUserWorktype.aspx`,
					method: 'GET',
					data: {uid:this.uid},
					success: res => {
						this.showFlag = true;
						//console.log("!!!"+JSON.stringify(res));
						this.items = res.data;
						var temp = res.data
						uni.getStorage({
							key: 'loginData',
							success: res => {	
								for(var j=0;j<temp.length;j++){
									if(res.data.curr_worktype_bh===temp[j].bh){
										this.current = j;
										//break;
									}
								}
							}
						});
					}
				});
			}
		})
	},
    methods: {
        radioChange: function(evt) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].bh === evt.target.value) {
                    this.current = i;
					this.bh  = evt.target.value;
					this.name = this.items[i].name;
                    break;
                }
				
            }
        },
		openBtn(){
			var bh = this.bh;
			var name = this.name;
			//console.log(JSON.stringify(this.bh));
				uni.request({
					url: `https://${this.dk}/setUserWorktype.aspx`,
					method: 'GET',
					data: {
						uid:this.uid,
						worktype_bh:bh,
						worktype_name:name
					},
					success: res => {
						uni.getStorage({
							key:'loginData',success: res =>{
								var temp = {};
								console.info("====>>>"+JSON.stringify(res));
								temp.state = res.data.state;
								temp.uid = res.data.uid;
								temp.uname = res.data.uname;
								temp.curr_worktype_bh = bh;
								temp.curr_worktype_name = name;
								temp.move_admin = res.data.move_admin;
								temp.move_change = res.data.move_change;
								temp.move_scan = res.data.move_scan;
								//console.info("===="+JSON.stringify(temp));
								uni.setStorage({key:'loginData', data:temp})
							}			
						}),
								
						uni.reLaunch({
							url:'../index/index'
						})
					},
					fail: () => {},
					complete: () => {}
				});
		}
    }
}
</script>

<style>
	.uni-list{
		margin-bottom: 130upx;
	}
	/* .btn{
		margin-top: 30upx;
		width: 90%;
		background: rgb(255, 172, 96) !important;
	} */
	.btn{
		width: 90%;position: fixed;bottom: 24upx;left: 5%;background: rgb(255, 172, 96) !important;
	}
</style>
