let obj = {
    a: 100,
    b: [10, 20, 30],
    c: function () {},
    d: /^\d+$/,
    e: new Date(),
    f: Symbol('f'),
    g: BigInt('10')
};

let arr = [10, [100, 200], {
    x: 10,
    y: 20
}];

let cloneDeep = (target) => {
    if(target === null) return null;
    // null没有constructor，因此不能写在第一位
    const constructor = target.constructor;
    if(typeof target !== "object") return target;
    if(/^(RegExp|Date)$/i.test(constructor.name)) return new constructor(target);
    let clone = new constructor();
    Object.keys(target).forEach(key=>{
        clone[key] = cloneDeep(target[key]);
    })
    return clone;
}

let newObj = cloneDeep(obj);
console.log(newObj);
console.log(newObj===obj);
console.log(newObj.b===obj.b);
let a = cloneDeep(2);
console.log(a)