// const assert = require('assert').strict;
// const a=[1]
// const b=[1,2];
// // assert.deepStrictEqual(a,b)
// function bar(){
//   return {
//     x:1,
//     y:2,
//     z:3
//   }
// }
// var { x:m, y, z } = bar();
// console.log(y,z,m)

// const run={
//   some:function some(x,y){
//     if(x<y) return some(y,x)
//     return x-y
//   }
// }
// console.log(run.some(1,4))
// console.log(run.some(4,1))

const { a: X, b: Y }={a:10,b:20}
const {M,N}={M:10,N:20}
console.log([X,Y])
console.log([M,N])

function foo(...arg){
  console.log([...arg])
}
const a=10;
const b=2;
foo`Hello ${ a + b } world ${ a * b }`;
// foo`jack${sex}`