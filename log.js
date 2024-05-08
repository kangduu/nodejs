let data = (function () {
	let source = {
		a: 10,
		b: 99,
	};
	Object.prototype(source, null);
	return {
		get: function (key) {
			return source[key];
		},
	};
})();

// 请问，在不修改上面代码的情况下，如何修改source对象？

// 在data的原型上添加一个 _get 方法
Object.defineProperty(data.__proto__, '_get', {
	// 将这个属性变为一个访问器
	// 之后读取这个属性，就会执行get这个函数
	get() {
		// 直接返回this
		return this;
	},
});

const source = data.get('_get');

source.b = 100;
console.log(data.get('b')); // 100

source.b = 10;
console.log(data.get('b')); //10
