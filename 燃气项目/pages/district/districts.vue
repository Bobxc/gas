<template>
	<!-- 地址页面 -->
    <view>
        <pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
            <h2 style="height: 20rpx;border: 1px solid #000000;">点击</h2>
       </pick-regions>
        <h3>{{regionName}}</h3>
    </view>
</template>

<script>
	 import pickRegions from '../../components/pick-regions/pick-regions.vue'
	    export default {
	        components:{ pickRegions },
	        data(){
	            return {
	                region:[],
	                defaultRegion:['浙江省','温州市','鹿城区'],
	                defaultRegionCode:'325000'
	            }
	        },
	        computed:{
	            regionName(){
	                // 转为字符串
	                return this.region.map(item=>item.name).join(' ')
	            }
	        },
	        methods:{
	            // 获取选择的地区
	            handleGetRegion(region){
	                this.region = region
					console.log(this.region)
	            }
	        }
	    }
	
</script>


 <!-- <template>
     <view>
         <addressd @changes="childClick"></addressd>
     </view>
 </template>
 
 <script>
	 import addressd from "../../components/jm-address/jm-address.vue"
	
	 export default {
	     data(){
	         return {
	  
	         }
	     },
	    components: { addressd } ,
	     onLoad(){
	  
	     },
	     methods: {
	         childClick(e){
	                 console.log(e)
	             }
	  
	     }
	 }
	 
 </script>
    
 
 
 <style>
 
 </style> -->
