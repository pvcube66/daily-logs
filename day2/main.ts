 //inference
let count: number = 1
//we can simply do 
let counter = 1 //ts can easily identify the type we dont externally have to  define the types


 function add(a:number, b:number) : number {
  return a + b;
}

//when we are not very sure. do this
let temp: string | number;
temp = Math.random() > 1 ? "pavu" : 1

console.log(add(1, 2))

type User={
  id:string,
  name:string,
  email?:string, //either the field dsnt exist if exist it shud be string type
  readonly createdAt:Date
}

const user1:User = {
  id:"1",name:"vishnu",createdAt:new Date(),email:"meow"
}
console.log(user1)

