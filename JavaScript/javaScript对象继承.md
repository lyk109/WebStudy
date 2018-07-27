# JavaScript对象继承
js对象涉及到的：构造函数、原型对象、实例对象
+ 通过new方法可以实例化构造函数初始化的对象。
+ 构造函数的prototype和实例对象的__proto__指向的都是原型对象
+ 原型对象中的constructor属性的值对应着构造函数。这样，通过实例对象的原型链方法得知该实例的构造函数。

获取实例对象的属性步骤：
首先，在实例对象本身的属性上查找 --> obj.hasOwnProperty(prop)
若在实例对象本身上查到不到，则在实例对象的__proto__所指向的对象身上查找。
若在在实例对象的__proto__所指向的对象身上查找不到，则再往上一级__proto__查找。
这样就可以通过查找到实例对象原型链上的所有方法
**原型链最顶端为Object**

### 继承
var ObjA = function(a, b) {
	this.a = a;
	this.b = b;
}

ObjB继承ObjA
方法一：
```javascirpt
Var ObjB = function(a, b, c) {
	// 继承ObjA对象本身的属性到ObjB本身
	ObjA.call(this, a, b);
	// ObjB自身属性
	this.c = c;
}

ObjB.prototype = Object.create(ObjA.prototype);
```
> 不使用ObjB.prototype = ObjA.prototype，因为这样在修改ObjB原型属性时，会把ObjA的原型属性也给修改了。
> 不使用ObjB.prototype = new ObjA(), 因为这样会把ObjA本身属性加到ObjB原型上，而非ObjB本身身上。
