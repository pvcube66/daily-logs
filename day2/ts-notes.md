ts is a layer on top of js.
ts=js+extra features

concept: inference: 
typescript automatically detencets the data type  of vars.
eg: 
let k=0;

const love="her"
i mean we can do like const k:number=10; but not needed coz typescript the goat mf. 

concept: primitives

let name:string="vishnu"
let age:number=22
let gender:string="male"
let canVote:boolean=true;

function test(parameter:type) : return_type{

}

concept: special types

note: the funcs which dont return any values, use never for their return type
never use "any" for the types..

concept:objects

type User={
  id:string,
  name:string,
  email?:string, //either the field dsnt exist if exist it shud be string type
  readonly createdAt:Date
}

type Count={[K:string]:number}

//concept: literals
somethings which doesnt change thier value(unlike some bich ass ppl)


concept: assertions:
thsi is like telling ts brotha i know my types. 
eg: func hi(x: unknown){
console.log(x.length)  //can throw error
 }
 workaround: 
 func hi(x:unknown){
 console.log((x as string).length);
 }