function debounce(func, wait = 500, immediate = false) {
    let timer = null;
    return function anonymous(...params) {
        // 需要timer来共同决定now的值，第一次进来now的值为true，紧接着设置定时器，那么下一次now的值就不为空，因此now不能执行了，而在定时器里面，也要根据immediate的值来选择执行func
        let now = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            // func.call(this,...params)
            !immediate ? func.call(this, ...params) : null;
        }, wait)
        now ? func.call(this, ...params) : null;
    }
}

function throttle(func,wait = 500) {
    let timer = null,
        previous = 0;
    return function anonymous(...params) {
        let now = new Date();
        // 这样设定是为了进来第一次就执行，因为now是一个很大的值，超过wait，所以一开始进来remaining就是一个负值，第一次会执行
        let remaining = wait -(now-previous);
        if(remaining<=0){
            // 然后让previous等于执行的时间，下一次进来，如果没有间隔500ms的话，那么就不会立即执行，会去设置定时器，首先看一下是否有定时器,如果没有定时器，那么才会去添加一个定时器，之后在这段时间进来的点击行为都不会被执行
            previous = new Date();
            func.call(this,...params);
        }else if(!timer){
            timer = setTimeout(()=>{
                clearTimeout(timer);
                timer = null;
                previous = new Date()
                func.call(this,...params);
            },remaining)
        }
    }
}

function func() {
    console.log('ok');
    console.log(arguments)
}

// btn.onclick = debounce(func, 500, true);
btn.onclick = throttle(func, 2000);
// btn.onclick = func;