
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/home/index","pages/home/unit","pages/home/Industry","pages/home/supply","pages/home/adduser","pages/home/ewm","pages/login/register","pages/weixinoreder/orderone","pages/weixinoreder/ordertwo","pages/weixinoreder/orderthree","pages/search/serch","pages/truckcar/kongcar","pages/truckcar/fullcar","pages/truckcar/operation","pages/allocation/user","pages/allocation/gascylinder","pages/allocation/loadingrecord","pages/securitycheck/ajlogin","pages/securitycheck/ajloginOne","pages/securitycheck/ajloginTwo","pages/securitycheck/ajloginThree","pages/securitycheck/ajloginFor","pages/securitycheck/ajloginFive","pages/securitycheck/ajloginSix","pages/orderinquiry/orderinquiry","pages/myself/main","pages/home/statistics","pages/myself/personal","pages/district/districts","pages/test/test","pages/scancode/empty","pages/scancode/full","pages/scancode/dispatcher","pages/scancode/fulldistribution","pages/scancode/fullenterSupply","pages/scancode/emptyenterSupply","pages/scancode/emptyoutSupply","pages/scancode/emptyenterInflated","pages/station/stationStockin"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#000000","text":"home页","navigationStyle":"custom","titleView":false},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"ranqi","compilerVersion":"2.8.11","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/index","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/unit","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/Industry","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/supply","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/adduser","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/ewm","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/weixinoreder/orderone","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/weixinoreder/ordertwo","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/weixinoreder/orderthree","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/search/serch","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/truckcar/kongcar","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/truckcar/fullcar","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/truckcar/operation","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/allocation/user","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/allocation/gascylinder","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/allocation/loadingrecord","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/securitycheck/ajlogin","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/securitycheck/ajloginOne","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/securitycheck/ajloginTwo","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/securitycheck/ajloginThree","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/securitycheck/ajloginFor","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/securitycheck/ajloginFive","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/securitycheck/ajloginSix","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/orderinquiry/orderinquiry","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/myself/main","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/statistics","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/myself/personal","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/district/districts","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/test/test","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/empty","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/full","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/dispatcher","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/fulldistribution","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/fullenterSupply","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/emptyenterSupply","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/emptyoutSupply","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/scancode/emptyenterInflated","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/station/stationStockin","meta":{},"window":{"navigationBarTitleText":""}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
