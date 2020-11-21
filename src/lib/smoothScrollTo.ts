// https://gist.github.com/andjosh/6764939

const left = (element: HTMLDivElement, to: number, duration: number) => {
  var start = element.scrollLeft,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
  var animateScroll = async function(){        
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if(currentTime < duration) {
          await new Promise((resolve) => setTimeout(() => {
            animateScroll();
            resolve();
          }, increment));
          // setTimeout(animateScroll, increment);
      }
  };
  animateScroll();
};

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

export const scrollTo = {
  left,
};