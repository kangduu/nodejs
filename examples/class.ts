/* 构造函数的方式实现类 */
console.group('--- ES5  ---');

function Super(name: string) {
	this.name = name;
}
Super.prototype.sayHello = function () {
	return 'hello';
};

function Point(name: string, x: number, y: number) {
	Super.call(this, name);
	this.x = x;
	this.y = y;
}
Point.prototype = Super.prototype;
Point.prototype.constructor = Point;
Point.prototype.toString = function () {
	return `(${this.x} + ${this.y})`;
};

const p = new Point('kangduu', 1, 2);

console.log(p.sayHello());

console.log('\n');
console.groupEnd();

/* ES6 Class 实现 */
class Parent {
	constructor() {}
}

class Count {
	public count: number;

	constructor(no: number) {
		this.count = no;
	}

	toString() {
		return this.count;
	}
}

console.group('--- ES6 ---');
console.log(typeof Count); // function
console.log('.prototype:', Count.prototype);
console.log(Count['__proto__']); // 没有继承时指向空对象
console.log(Count === Count.prototype.constructor); // 类本身指向类的原型对象的构造函数
console.log(Object.keys(Count.prototype));
console.log(Object.getOwnPropertyNames(Count.prototype));
console.log('\n');
console.groupEnd();
