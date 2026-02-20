type ValueOfInput = string | number | boolean;
const formatValue =( value: ValueOfInput) : ValueOfInput  =>{
if (typeof value ==='string'){
    return value.toUpperCase()}
else if( typeof value === "number"){
    return value * 10
    }
    else {
    return !value
    }
   
} 

const getLength =( value: string | any[] ): number=>{
  if (typeof value === "string"){
    return value.length;}
  else if (Array.isArray(value))
    {
    return value.length; }
  else {
   throw new Error ("invalid input!")
  }

}


class Person {
    name : string;
    age: number;

    constructor(name : string,age: number){
     this.name = name,
     this.age = age
    }
    getDetails(){
     return `'Name:${this.name},Age: ${this.age}'`

 }}



type Item = {
    title: string;
    rating:number;
  }
function isRatingValid (rating:number):boolean{
return rating >=0 && rating <=5;
}
const filterByRating =(items : Item[] ) : Item[]=>{
    return items.filter(item=>isRatingValid(item.rating) && 
    item.rating>= 4)
  }



interface Users{
    id: number;
    name:string;
    email:string;
    isActive:boolean;
}
  
function filterActiveUsers (users: Users[]):Users[]{
 return users.filter(user=>user.isActive === true)
}



interface Book {
title :string;
author :string;
publishedYear :number;
isAvailable : boolean;
}
function printBookDetails (book:Book): void{

const isBookAvailable = book.isAvailable ? "Yes" : "No";

console.log(`Title: ${book.title}, Author: ${book.author},
 Published: ${book.publishedYear}, Available: ${isBookAvailable}`)
}


const getUniqueValues=<T extends string | number >
                      (array1:T[],array2:T[]) :T[]=>
    {let result:T[]= [];

    const findUnique =(arr:T[])=>{
    for(let i=0;i<arr.length; i++){
       let exist = false;
       for(let j=0; j<result.length; j++){
        if(arr[i] === result[j]){
            exist = true;
          
        }
        
       }
     if(!exist){
         result[result.length] = arr[i];
     }

     }
     }
 
     findUnique(array1);
     findUnique(array2)
     return result;
     
}


interface Product {
  name:string;
  price:number;
  quantity:number;
  discount?:number;
}
const calculateTotalPrice =(products:Product[]):number=>{
      if (products.length === 0) return 0;
      else{
  return products.reduce((total, product) => {

    const totalProductPrice = product.price * product.quantity;
    const discount = product.discount ?? 0;
    const discountedAmount = (discount / 100) * totalProductPrice;
    
    return total + (totalProductPrice - discountedAmount);
  }, 0)
      }
  }









