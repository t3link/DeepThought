/**
 * 参考链接
 * https://github.com/zzuieliyaoli/back-to-top-pure-javascript
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event
 */
let last_known_scroll_position = 0;
let ticking = false;

function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    return Math.round(percent);
}

function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 2;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;        
        scrollTo(element, to, duration - 2);
    }, 10);
}    

// scroll
var position = document.getElementById("scrollpercent");
var scroll_to_top   = document.getElementById('scroll_to_top_id')

//判断在页面加载完成时，滚动条的位置
if ((document.documentElement.scrollTop + document.body.scrollTop) < 100) {
    scroll_to_top.style.display = "none";
}
if ((document.documentElement.scrollTop + document.body.scrollTop) >= 100){
    scroll_to_top.style.display = "inline";
}
position.innerHTML = getScrollPercent();

window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
  
    if (!ticking) {
      window.requestAnimationFrame(function() {
        position.innerHTML = getScrollPercent();
        ticking = false;
      });
  
      ticking = true;
    }

    if ((document.documentElement.scrollTop + document.body.scrollTop) < 100) {
        scroll_to_top.style.display = "none";
    }
    if ((document.documentElement.scrollTop + document.body.scrollTop) >= 100){
        scroll_to_top.style.display = "inline";
    }
});

//click事件处理程序
scroll_to_top.addEventListener("click", function(event){
    //取消默认行为
    event.preventDefault();

    setTimeout(function(){
        document.documentElement.scrollTop = document.documentElement.scrollTop - (document.documentElement.scrollTop / 2);
        document.body.scrollTop = document.body.scrollTop - (document.body.scrollTop / 2);

        if ((document.documentElement.scrollTop + document.body.scrollTop) > 0) {
            setTimeout(arguments.callee, 20);
        }

    }, 30);
}, false);