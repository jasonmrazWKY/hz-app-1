<template>
	<view class="content">
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/img/2.png"></image>
				<input class="biaoti" v-model="password_old" type="number" placeholder="输入旧密码" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/img/2.png"></image>
				<input class="biaoti" v-model="password_new" type="text" maxlength="32" placeholder="输入新密码" password="true"/>
			</view>
			<view class="list-call">
				<image class="img" src="/static/img/2.png"></image>
				<input class="biaoti" v-model="password_new1" type="text" maxlength="32" placeholder="请再次输入密码" password="true"/>
			</view>	
			<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin">
				<text>修改密码</text>
			</view>
		</view>
	</view>
</template>
<script>
	var tha;
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				rememberPsw:true,
				uid:'',
				password:'',
				dk:'',
				password_old:'',
				password_new:'',
				password_new1:''
				
			};
		},
		onLoad(){
			tha = this;
			this.dk = this.websiteUrl;	
			uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data				
				}
			}),
			uni.getStorage({
				key:'loginData',success: res =>{
					this.title = res.data.uname
					this.uid = res.data.uid
					this.curr_worktype_bh = res.data.curr_worktype_bh
					this.curr_worktype_name = res.data.curr_worktype_name
					this.huohao=res.data.huohao
				}			
			})
		},	
		methods: {
		    bindLogin() {
				
				if(this.password_new1 !== this.password_new){
					uni.showToast({title:'两次密码输入不一致',icon:'none'})
					return;
				}
				
				uni.request({
				    url: `https://${this.dk}/updatePassword.aspx`,
				    data: {
						UID:this.uid,
						password_old:this.password_old,
						password_new:this.password_new
					},
					method: 'GET',
					dataType:'json',
				    success: (res) => {
						console.log("~~~~"+JSON.stringify(res));
						var result = res.data.split(",");
						if (result[0] == 0) {
							uni.showToast({title:'修改密码成功',icon:'none'})
						} else{
							uni.showToast({title:'旧密码输入错误',icon:'none'})
						}
						this.password_old = ''
						this.password_new = ""
						this.password_new1 = ""
					}
				})		
		    }		
		}
	}
</script>

<style>
	.remember-psw{
		margin-top: 10upx;
        width: 80%;
        margin-left: 60%;
		position: relative;		
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
	}
	.toubu{
		height: 300upx;
		width: 100%;
		background: #FFAC60;
	}
	.header {
		width:161upx;
		height:161upx;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
	}
	.header image{
		width:161upx;
		height:161upx;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 40upx;
		height: 40upx;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width:80%;
		height:72upx;
		border-radius:10upx; 
		line-height: 72upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 40upx;
		background: #FFAC60;
	}
	.xieyi{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 40upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
	.xieyi text{
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
	.xinxi{
		position: absolute;
		width: 100%;
		bottom: 40upx;
		text-align: center;
		color: #000;
	}
</style>
