<template>
	<view class="content">
		<view class="toubu">
			<view class="header">
				<image src="../../static/img/1201.png" mode="widthFix"></image>
			</view>
			<view class="" style="text-align: center;line-height: 30upx;font-size: 32upx;color: #FFFFFF;margin-top: 30upx;">弘兆移动工票</view>
		</view>
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/img/1.png"></image>
				<input class="biaoti" v-model="uid" type="text"  placeholder="账号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/img/2.png"></image>
				<input class="biaoti" v-model="password" type="password"  placeholder="密码" password="true"/>
			</view>			
		</view>
		<view class="remember-psw">
			<checkbox-group class="checkbox">
				<label style="line-height: 40upx;color: #FFAC60;font-size: 24upx;">
					<checkbox style="transform:scale(0.8)" value="psw" :checked='rememberPsw' @tap="rememberPsw =!rememberPsw" color="#FFAC60"/>记住账号密码
				</label>
			</checkbox-group>
		</view>
		<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin">
			<text>登录</text>
		</view>	
		<view class="xieyi">
			<navigator  @tap="openRegister" >扫码配置网络</navigator>
		</view>
		<view class="xinxi" v-show="showFlag">义乌弘兆信息有限公司-<text @tap="makePhoneCall">客服电话:0579-85161036</text><view style="font-size: 20upx;">客服QQ:3051216276</view></view>
	</view>
</template>
<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				token:'',
				fullHight:'',
				currentHight:'',
				showFlag:true,
				rememberPsw:true,
				uid:'',
				password:'',
				dk:''
				
			};
		},
		onShow() {
			////console.log("全屏高度:"+this.fullHight)
			//this.dk = this.websiteUrl
			/* uni.getStorage({
				key:'fwqsj',success: res => {
					this.dk = res.data
				}
			}) */
			this.showFlag = false;
			uni.onWindowResize((res) => {
				this.currentHight = res.size.windowHeight;
				////console.log("当前高度:"+this.currentHight);
				if(Math.abs(this.fullHight-this.currentHight)>100){
					this.showFlag = false;
				}else{
					this.showFlag = true;
				}
			})
			
			// #ifdef APP-PLUS
			var wgtVer=null; 
			var uuid = plus.device.uuid;  
			plus.runtime.getProperty(plus.runtime.appid,function(inf){  
				wgtVer=inf.version;  
				console.log("当前应用版本："+wgtVer); 
				//console.log("当前uuid："+uuid); 
			});
			uni.request({
				url: `https://${this.dk.split('/')[0]}/update/update.txt`,
				method: 'GET',
				success: res => {
					//console.info(JSON.stringify(res));   
					let temp = res.data.split("\r\n");
					//console.info(JSON.stringify(temp));
				    let version = temp[0].split("=")[1];
					console.info(version);
					let url = `https://${this.dk.split('/')[0]}/update/update.apk`;
					//console.info(url);
					if(wgtVer.trim()!=version.trim()){
						uni.showModal({
							title: '提示',
							content: '有新版本，请问是否下载',
							success:function(res){
								if(res.confirm){
									//自动更新
									//console.log(url);
									plus.runtime.openURL(url);
								}else{
									
								}
							}
						})
					}
				}
			});
			// #endif
			
			//  #ifdef MP-WEIXIN
				uni.getProvider({
					service:'oauth',
					success:function(res){
						 console.log(res.provider);
						 if(~res.provider.indexOf('weixin')){
							 uni.login({
							 	provider:'weixin',
								success:function(loginRes){
									console.log('-------获取openid(unionid)-----');
                                    console.log(JSON.stringify(loginRes));
								}
							 })
						 }
					}
				})
			// #endif
		},
		onLoad(){
			uni.getSystemInfo({
			    success: res => {
					this.fullHight = res.windowHeight;
			    }
			})
			this.dk = this.websiteUrl;
			//获取缓存账号
			const uid = uni.getStorageSync('uid');
			//console.log('缓存账号：'+uid);
			const password = uni.getStorageSync('password');
			//const storeToken = uni.getStorageSync('token');
			//console.log('缓存token：'+storeToken);
			if(uid && password){
				this.uid = uid;
				this.password = password;
			}else{
				this.uid = "";
				this.password = "";
			}
	
			uni.getStorage({
				key:'dk',success: res => {
					console.log(res);
					this.dk  = res.data
					console.log(this.dk);
				}
			})
		},	
		methods: {
			...mapMutations(['login']),
		    bindLogin() {
				this.token = this.Random();
				if(this.uid==''){
					uni.showToast({title:'请输入用户名'	,icon:'none'});		
					return;
				}
				if(this.password==''){
					uni.showToast({title:'请输入密码'	,icon:'none'});		
					return;
				}
				uni.request({
				    url: `https://${this.dk}/userLogin.aspx`,
				    data: {
						uid:this.uid,
						password:this.password,
						token:this.token
					},
					method: 'GET',
					dataType:'json',
				    success: (res) => {
						//console.log(res); 
						if(res.statusCode == 404){
							uni.showToast({title:'网络配置异常，请检查是否正确',icon:'none'});	
							return;
						}
						var temp = {}
						temp.uid = res.data.uid;
						temp.uname = res.data.uname;
						temp.curr_worktype_bh = res.data.curr_worktype_bh;
						temp.curr_worktype_name = res.data.curr_worktype_name;
						temp.move_admin = res.data.move_admin;
						temp.move_change = res.data.move_change;   //移动改数权限
						temp.move_scan = res.data.move_scan;       //移动扫描方式
						//请求失败
						if(res.statusCode != 200){
							uni.showToast({title:res.data.errMsg,icon:'none'});
						}else{
						//请求成功
							if(res.data.state==0){
								uni.showToast({title:'无此用户'	,icon:'none'});													
							}else if(res.data.state==1){
								uni.showToast({title:'账号或密码不对',icon:'none'});
							}else if(res.data.state==2){
								//console.info(temp);
								uni.setStorage({key:'loginData', data:temp})
								uni.setStorageSync('token', this.token);
								//登录成功将用户名密码存储到用户本地
								if(this.rememberPsw){//用户勾选“记住密码”
									uni.setStorageSync('uid', this.uid);
									uni.setStorageSync('password',this.password);
								}else{//用户没有勾选“记住密码”
									uni.removeStorageSync('uid');
									uni.removeStorageSync('password');
								}
								
								uni.offWindowResize(() => {
                                      //console.log('取消监听窗口尺寸变化事件')
                                })
								
								uni.switchTab({
									url: '/pages/index/index'
								});
								
								this.test();
							}		
						}										
				    }
				});			
		    },
			openRegister(){
				// uni.redirectTo({
				// 	url:'../register/register'
				// })
				uni.scanCode({
					onlyFromCamera:false,
					scanType:['qrCode'],
					success: (res) => {
						this.dk = res.result
						console.log(this.dk);
						uni.setStorage({
							key:'fwqsj',
							data:this.dk
						})					
					}
				})
			},
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber: '0579-85161036' //仅为示例
				});
			},
			savaToken(){
				
			},
			test(){
				
			},
			Random(){
				var time = new Date();
				var num = time.getTime()+Date.now().toString(36);
				//console.log(num);
				return num;
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
		overflow: hidden;
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
		font-size: 20upx;
	}
	.xinxi1{
		position: absolute;
		width: 100%;
		bottom: 10upx;
		text-align: center;
		color: #000;
		font-size: 20upx;
	}
</style>
