/*
 * @Author: huangbo 
 * @Date: 2017-11-21 13:25:53 
 * @Last Modified by: heying
 * @Last Modified time: 2017-12-20 15:56:01
 */
//解决iOS10的Safari下Meta设置user-scalable=no无效的方法
function ckeckScreen() {  
    document.addEventListener('touchstart',function (event) {  
        if(event.touches.length>1){  
            event.preventDefault();  
        }  
    })  
    var lastTouchEnd=0;  
    document.addEventListener('touchend',function (event) {  
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
            event.preventDefault();  
        }  
        lastTouchEnd=now;  
    },false)  
} 
ckeckScreen();
function toastBG(text) {
    $('body').toast({
        position:'fixed',
        content:text,
        duration:1000,
        animateDuration:500,
        isCenter:false,
        background:'rgba(239, 144, 57,0.8)',//244,64,64
        animateIn:'bounceIn-hastrans',
        animateOut:'bounceOut-hastrans',
    });
 }

//获取参数
function getUrlParam(position) {
	var reg = new RegExp("(^|&)" + position + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return decodeURI(r[2]);
	} else {
		return null;
	}
};