
module.exports={
	//定义页面路径
	apiAddres:"http://gasapi.tsingd.cn", //统一接口
	login:"/IdentityCenter/SysUser/login", //登录s
	personal:"/IdentityCenter/SysUser/ModifyPassword",//修改密码
	orderone:'/AppService/GetUnprocessedOrders',//这是可接订单接口
	fullcar:'/AppService/GetOwnGasInfo',  //车上燃气瓶
	test:'/GasCylinderCirculation/InflatableStation/EmptyFromAll' ,   // 充气站发起(空瓶入库)
	testZt:'/GasCylinderCirculation/InflatableStation/SwapWithGcUser', //储配站（自提）
	gtestZt:'/GasCylinderCirculation/SupplyStorage/SwapWithGcUser' ,   //供应站 （自提）
	Fullsupply:'/GasCylinderCirculation/SupplyStorage/FullFromInflatableStation', //供应站（重瓶）
	Empty:"/GasCylinderCirculation/SupplyStorage/EmptyFromAll"   ,//供应站（空瓶入库）
	EmptyTo :'/GasCylinderCirculation/SupplyStorage/EmptyToGcCarrier',//供应站 （空瓶出库）
	cert:'/AppService/GetUserInfoByCertificateId', //充气站（身份证验证）
    GetReceived:'/AppService/GetReceivedOrders' ,//送气工可接订单
    addUser:'/AppService/AddUserInfo',   //供气站添加用户
	AppService:'/AppService/GetUserInfoByPhone', //联系方式获取用户
	GetUserBynum:'/AppService/GetUserInfoByCertificateId',//证件号获取用户
	Getcor:'/AppService/GetCorpDispatcherByRegionId?',//企业押运员
	Dispatcher:'/GasCylinderCirculation/Dispatcher/EmptyFromAll',  //送气工（空瓶装车）
	zDispatcher:'/GasCylinderCirculation/Dispatcher/FullFromAll',   //送气工（重瓶装车）
	qDispatcher:'/GasCylinderCirculation/Dispatcher/SwapWithGcUser', //送气工（分配气瓶）
    yanzhengUser:'/AppService/VerifyGcUser', //验证用户
	statistics:'/AppService/GetOrderInfoByCorpDispatcher',//送气工订单统计
	securityCheck:'/AppService/SecurityCheck',//日常安检
	gasType: '/AppService/GetGcType',//获取气瓶类型
	userInfo: '/AppService/GetUserInfo',//获取登录用户信息
	uploadFile: '/UntilApi/PostFiles', //上传文件
}

