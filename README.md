# calendar-component-es6
日历组件
## 功能
给定一个输入框，点击输入框日历显示，通过选取年份、月份、日期，使输入框显示“2017年8月1号”类型的日期。
[日历组件]()
## ES6
* let
  * 不能重复声明
  * 块级作用域，相当于匿名函数立即执行
    * var a = [];
     for(var i = 0; i < 3; i++) {
        (function(j) {
          a.push(j);
        })(i);
     }
     * var a = [];
     for(let i = 0; i < 3; i++) {
        a.push(i);
     }
* const
  * 定义之后不能重新赋值
  * 定义时必须初始化
  * 不能重复声明
* 字符串连接
  * var a = '哈哈哈';
  var str = '如果感到快乐你就'+a+'。';
  document.write(str);
  * var a = '哈哈哈';
  var str = `如果感到快乐你就${a}。`;
  document.write(str);
* 解构赋值
  * var a = 2;var b = 3;var c = 4;
  * var {a,b,c} = {a:2,b:3,c:4};// 顺序无关
  * var [a,[b,c]] = [2,[3,4]];//模式匹配
  * var {a = 2} = {};//默认值
  * 解析json数据
* 复制数组
  * var arr2 = [...arr];
  * function(...arg) {//arguments没有数组方法
    arg.push(2);
  }
* for of
  * for(var i in arr)//i索引
  * for(var i of arr)//值
  * 不能循环json
  * for(var i of map.entries())//键值对
  * for(var [key,value] of map)//key或value
  * for(var key of map.keys())//循环key
  * for(var val of map.values())//循环value
* 箭头函数
    * 写法
      * var show = (a) => a;//function show(a){return a;}
      * var show = (a,b) => a+b;//function show(a,b){return a+b;}
      * var show = () => 'welcome';//function show(){return 'welcome';}
      * var show = () => {}//function show(){}
    * 注意
      * this指向window
      * arguments不能用
* 对象
  * 写法
    * var name="a"; var person = {name,showName(){}};
    * class Person{
        constructor(name){this.name = name;}
        showName(){return this.name;}
      }
      var p1 = new Person("aaa");
    * class Worker extends Person{
      constructor(){
      super()//调用父级构造函数
      }
      }//继承
* 模块化
  * 导出 const a = 12;export default a;
  * 引用 import modA from './a.js';
* Promise
  * 一个对象，用来传递异步操作的数据
  * 状态
    * pending//等待、处理中
    * resolve//成功
    * rejected//失败
  * 使用
    * var p1 = new Promise(function(resolve,reject){});
    * p1.then(function(val){},function(val){});//返回Promise对象
    * catch()//捕获错误
    * Promise.all([p1,p2,p3]).then(function(){},function(){});//所有Promise对象都正确执行成功函数，有一个错误执行失败函数
    * Promise.race([p1,p2,p3]).then(function(){},function(){});//哪个最快用哪个
    * Promise.reject().then(function(){},function(){});//生成失败的Promise对象
    * Promise.resolve([p1,p2,p3]).then(function(){},function(){});//生成成功的Promise对象
* Generator
  * var res = function* show(){}
  * res.next()//value：yield后面的值,done：是否结束
  * 内部用yield语句
  * 状态机
## Date对象
* 主要函数
 * getFullYear()//获取年份
 * getMonth()//获取月份，0代表1月
 * getDay()//获取星期几
 * getDate()//获取日期
 * setDate()//设置日期
