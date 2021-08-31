function bindScroll(){
    document.addEventListener('DOMMouseScroll', throttle(realFunc, 0, 100), false)
document.addEventListener('mousewheel', throttle(realFunc, 0, 100), false)

}

function throttle(func, wait, mustRun) {
	var timeout,
		startTime = new Date();

	return function() {
		var context = this,
			args = arguments,
			curTime = new Date();

		clearTimeout(timeout);
		// 如果达到了规定的触发时间间隔，触发 handler
		if (curTime - startTime >= mustRun) {
			func.apply(context, args);
			startTime = curTime;
			// 没达到触发间隔，重新设定定时器
		} else {
			//timeout = setTimeout(func, wait);
		}
	};
};
// 实际想绑定在 scroll 事件上的 handler
function realFunc() {
	var detail = event.wheelDelta || event.detail;
	var moveForwardStep = 1;
	var moveBackStep = -1;
	var step = 0;
	if (detail > 0) {
		step = moveForwardStep * 600;
	} else {
		step = moveBackStep * 600;
	}
	let str = gitFlexBox.scrollLeft - step
	gitFlexBox.scrollTo({
		left: str,
		behavior: 'smooth'
	});
}



function scrollGit(n) {
	gitFlexBox.scrollTo({
		left: n === 1 ? 0 : n === 2 ? 1350 : n === 3 ? 2400 : n === 4 ? 3600 : 0,
		behavior: 'smooth'
	});

	gitNowActive = n;
	gitSub[n].siblings('.sub-active').removeClass('sub-active')
	gitSub[n].addClass('sub-active');
}




$(document).keydown((event) => {

	let kc = event.keyCode
    //!!!!!!
	if (gitContent.hasClass('content-item-active')) {
		if ((kc === 37) || (kc === 65)) {
			if (gitNowActive != 1) {
				gitNowActive--;
				scrollGit(gitNowActive)
				gitSub[gitNowActive].siblings('.sub-active').removeClass('sub-active')
				gitSub[gitNowActive].addClass('sub-active');
			}
		} else if ((kc === 39) || (kc === 68)) {
			if (gitNowActive != 4) {
				gitNowActive++;
				scrollGit(gitNowActive)
				gitSub[gitNowActive].siblings('.sub-active').removeClass('sub-active')
				gitSub[gitNowActive].addClass('sub-active');
			}
		} else {}


	}

});

export default {bindScroll}