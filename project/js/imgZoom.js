/**
 * Created by Lee on 2017/7/8.
 */

function imgZoom(obj,maxHeight,minHeight) {
	var ITEM_HEIGHT = 15;      //图片每次缩放的大小（高度）
    obj.onmousewheel = function (event) {
		//解决浏览器兼容性问题，可兼容IE8
        event = event || window.event;

        //光标在目标元素上滚轮滚动时的初始坐标
        var left = event.offsetX;
        var top = event.offsetY;
        //获得图片放大前的宽和高
        var bch = obj.clientHeight;
        var bcw = obj.clientWidth;

		//event.detail 为火狐特有滚轮滚动属性 其值小于0即表示滚轮向上滚动
        if(event.wheelDelta > 0 || event.detail < 0){
			//图片高度判断，大于最大高度即停止放大
            if(obj.clientHeight < maxHeight) {

                obj.style.height = obj.clientHeight + ITEM_HEIGHT + "px";
				//获得图片放大后的宽和高
                var ech = obj.clientHeight;
                var ecw = obj.clientWidth;

                /*
                 * 获得光标相对于图片的偏移量，即如 X 轴上的偏移量就是图片大小改变后的宽度与原来图片的宽度的比例乘以
                 *     光标的初始 X 轴坐标，Y 轴上的偏移量亦同
				 *这里指的光标的偏移量只是希望光标随着图片的缩放，自身的位置也按图片缩放前后的比例偏移
                 * */
                var endTop = ech / bch * top ;
                var endLeft = ecw / bcw * left ;

                /*
                 * 元素的新坐标，即用当前图片的偏移量减去光标在图片上相对于它自己之前位置的偏移量
				 * 这样做的目的就是让图片以光标为中心点缩放
                 * */
                obj.style.top = obj.offsetTop - (endTop - top) + "px";
                obj.style.left = obj.offsetLeft - (endLeft - left) + "px";
            }
        }else {
            if(obj.clientHeight > minHeight) {
                obj.style.height = obj.clientHeight - ITEM_HEIGHT + "px";
                var ech = obj.clientHeight;
                var ecw = obj.clientWidth;

                var endTop = ech * top / bch ;
                var endLeft = ecw * left / bcw ;

                obj.style.top = obj.offsetTop + (top - endTop) + "px";
                obj.style.left = obj.offsetLeft + (left - endLeft) + "px";
            }
        }
        //为火狐取消滚轮默认样式
        event.preventDefault && event.preventDefault();

        //取消一般浏览器的滚轮默认样式
        return false;
    };

    //为火狐绑定滚轮滚动事件
    obj.addEventListener("DOMMouseScroll",obj.onmousewheel,false);
}