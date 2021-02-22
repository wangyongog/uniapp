<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view>
			<uni-badge text="1"></uni-badge>
			<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
			<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
		</view>
		
		<view>
			<picker mode="date"  start="2015-09-01"  @change="bindDateChange">
			    <view class="picker">
			      当前选择: {{date}}
			    </view>
			</picker>
		</view>
	</view>
	

</template>

<script>


	export default {
		components: {uniBadge},
		data() {
			return {
				title: 'Hello',
				date: '2015-09-01'
			}
		},
		onLoad() {

		},
		methods: {
			bindClick(){
				console.log(this.$config.apiUrl);
				console.log(111)
			},
			bindDateChange(e){
				console.log(e.detail.value)
				this.date = e.detail.value
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
