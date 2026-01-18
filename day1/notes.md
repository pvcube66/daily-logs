js code is executed in execution context. 
it has two main components.

1.memory component/variable environment: 
here all the variable and the functions are stored in key value pairs. 

2. code component/thread of execution:
this is like a thread in which the entire code is executed line by line

js is a synchronous single threaded language. 

how is the code executed
eg:


const n=4;
function square(num){
const ans=num*num;
return ans;
}
const first=square(n);
const second=square(2);


phase 1: memory is created
n: undefined
square:{entire function is copied}
first=undefined
second=undefined

phase 2: execution( here the variables are assigned values also for the functions a seperate new execution context is created diff from global)


how da fk does js handles all this.
ans: call stack/run time stack/machine stack /execution context stack


pl-1:other execution contexts
pl: global exe context


hoisting: hoisting is a concept by which we can access varialbes/funcitns even before they are initialized. 
  
console.log(x)
goFuckYoSelf()

const x=1
function goFuckYoSelf(){
console.log("meow meow")
}

even before the code is executed in the memory phase the memory is allocated to the variable and the functions

output:
 undefined
 meow meow
 
functions have a seperate execution context of their own .
execution context gets destroyed when its work is over


new stuff: 
along with the execution context a "window" and also "this " objects are also created

global space: any code/variable/functions which is not present in any funciton is called as global space 

eg:
var a=1
function k()={

}

now both of these are attached to the window object

scope:
remember the modiji(india) and bob(ap) example
its the location where we can access any variable/func
global scope nd functional scope. 

lexical: hierarchy nigga
where da fk is something present. 
lexical envi: local memory+lexical envi of parent

eg:
function test1(){
    var a=5;
    test2();
    function test2(){
    console.log(a);
    }
    console.log(k)
    console.log(l)
    
}

const k=5;
test1();

output: flow -> call test1()-> a initizlized. call test2(). try to find a in the local memory of test2 but we cant find a . so search in the lexical environment of the parent. we found woohoo. print it. trying to pring k, but we can find in the local memory of the test1, but again we search in lexical environment of parent we found we print. trying to print l, we cant find anywhere not defined error. 
this flow is called as scope chain. 

lexical environment=kind of hte execution context



hoisting : 
let vs var

var is hoisted but not let,const because the memory allocation is done in different places 

temporal dead zone: time since the let varialbe is hoisted and till it is initialized. (phase between hoisting and value assignment ) 

block/compound statement: 
it combines multiple statements into a single space. 

eg:
if(true){
//this mf is a block
}

block scope: let nd const are block scoped. and var is global scoped. 
{
var a=1;
let b=3;
const k=4;
}
block scope: b,k can only be accessed in that {} and the a can be accessed anywhere in the program. 


shadowing: same variable name

var a=1;
let c=33;

{

var a=2;
const b=3;
let c=5;
console.log(a) //2
console.log(c) //5
}
console.log(a) //output: 2
//reason: niga u thought a=1 right lol but remember brother. that a is defined with var which is global scope so both are pointing to the same memory location 
hence the value was updated. 

console.log(c) // 33 
again here teh let/const is block scoped so there are two different varialbes even though their names are same its different memory location 

remember NOTE: var is a functional scope. 

closure: a function bundled together with its lexical environment 
function+lexical environment = closure 