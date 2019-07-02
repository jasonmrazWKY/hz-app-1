<template>
	<view class="content">
		<view class="uni-list">
            <radio-group @change="radioChange">
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.worktype_bh" >
					<view>{{item.worktype}}</view>
                    <view >
                        <radio  :value="item.worktype_bh" :checked="index === current" color="#FFAC60" style="transform:scale(0.7)"  />
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
			worktype_bh:'',
			worktype:'',
			userid:'',
			showFlag:false,
            items: [],
            current: -1,
			dk:''
        }
    },
	onLoad(r) {
		console.log(r);
		this.userid = r.result;
		this.dk = this.websiteUrl
		uni.getStorage({
			key:'fwqsj',success: res => {
				this.dk = res.data
				//console.log(res.data);
			}
		}),
		uni.request({
			url: `https://${this.dk}/getSearchUidWorktype.aspx`,
			method: 'GET',
			data: {Userid:this.userid},
			success: res => {
				this.showFlag = true;
				//console.log("!!!"+JSON.stringify(res));
				this.items = res.data;
			}
		});
	},
    methods: {
        radioChange: function(evt) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].worktype_bh === evt.target.value) {
                    this.current = i;
					this.worktype_bh  = evt.target.value;
					this.worktype = this.items[i].worktype; 
					console.log("当前工序："+this.current);
                    break;
                }
            }
        },
		openBtn(){
		    //console.log(this.worktype_bh+'###'+this.worktype);
			uni.navigateTo({						
				url:'../SweepCode/SweepCode1?result='+this.userid+'&bh='+this.worktype_bh
			})
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
