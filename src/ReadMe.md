        ----------------   Blog PoST----------------------------
# QUESTION-1: What are some differences between interfaces and types in TypeScript?
ANS : 1. interface হলো TypeScript-এর একটি feature যেটা দিয়ে 
আমরা কোনো object কেমন হবে তা define করি।
উদাহরণ :
interface User {
  name: string;
  age: number;
}
const user: User = {
  name: "Rahim",
  age: 25
};
এখানে,User interface বলে দিচ্ছে object-এ name হবে string এবং age হবে number | ভুল data দিলে TypeScript error দেখাবে |

type keyword ব্যবহার করে, আমরা: object,union,tuple,primitive type
সবকিছু define করতে পারি।যেমন:
a.Type Example (Object)  :  type User = {name: string;
                                         age: number; };
                            const user: User = {
                                        name: "Mahim",
                                        age: 20};

b.Type Example(Union) : type ID = string | number;
                                  let userId: ID;
                                  userId = "123";
                                  userId = 123;

2.Interface একই নামে একাধিকবার declare করা যায়, এবং সেগুলো merge হয়ে যায়। যেমন:
interface Person {
  name: string;
}
interface Person {
  age: number;
}
const person: Person = {
  name: "Karim",
  age: 30
}; 
অন্যদিকে Type merge করা যায় না
type Person = {
  name: string;
};
type Person = {
  age: number;
};
Error দিবে: Duplicate identifier 'Person'

3.TypeScript-এ interface একটার প্রপার্টি আরেকটায় inherit করতে পারে extends keyword ব্যবহার করে।
উদাহরণ:
interface Person {
  name: string;
  age: number;
}
interface Student extends Person {
  roll: number;
}
Student interface-টি Person কে extends করেছে,তাই Student এর মধ্যে Person এর সব property + নিজের property আছে| অর্থাৎ Student এর মধ্যে থাকবে:

{
  name: string;
  age: number;
  roll: number;
}
 অন্যদিকে,type এ সরাসরি extends ব্যবহার করা যায় না।
এখানে intersection (&) ব্যবহার করে multiple type একসাথে জোড়া লাগানো হয়।

উদাহরণ:
type Person = {
  name: string;
  age: number;
};
type Student = Person & {
  roll: number;
};
এখানে,Person type + নতুন object type কে & দিয়ে merge করা হয়েছে,ফলে Student টাইপে দুইটার সব property চলে এসেছে
{
  name: string;
  age: number;
  roll: number;
}
4.বড় project-এ object structure define করার জন্য interface বেশি ব্যবহার করা হয়।

Complex এবং flexible type definition-এর জন্য type বেশি উপযোগী।

🔹সুতরাং Differences Between Interface and Type এর সংক্ষিপ্ত বিবরণ  হচ্ছে:

* interface মূলত object-এর structure define করতে ব্যবহৃত হয়, কিন্তু type object ছাড়াও অন্য type define করতে পারে।

* একই নামে একাধিক interface declare করলে সেগুলো merge হয়ে যায়, কিন্তু type-এ এটা সম্ভব নয়।

* interface extends keyword ব্যবহার করে inherit করা যায়। type inherit করতে হলে intersection (&) ব্যবহার করতে হয়।

* interface দিয়ে union type তৈরি করা যায় না। type দিয়ে union (|) এবং intersection (&) type তৈরি করা যায়।

* interface সাধারণত OOP-style coding-এর সাথে বেশি compatible। type functional এবং advanced TypeScript feature-এর সাথে বেশি powerful।





# QUESTION-2 :Explain the difference between any, unknown, and never types in TypeScript.
Ans: TypeScript-এ any, unknown, এবং never হলো তিনটি special type, যেগুলো মূলত type safety, error handling, এবং control flow বোঝাতে ব্যবহার হয়।

any type ব্যবহার করলে TypeScript-এর static type checking পুরোপুরি বন্ধ হয়ে যায়।
এই type ব্যবহার করলে TypeScript আর compile-time error দেখায় না, এমনকি code ভুল হলেও। তখন, এটি JavaScript-এর মতো behave করে। এটি,JavaScript থেকে TypeScript-এ migrate করার সময় এবং Third-party library যেগুলোর type নেই সেখানে ব্যবহৃত হয়|
 
উদাহরণ : let value: any = "hello";
value.toUpperCase(); 
value(); \\ no error
value.toFixed(2) ; \\ no error    

এখানে,value যেহেতু string তাই toUpperCase() string এর method ঠিক আছে | কিন্তু string কে function value() হিসেবে কল করা যাবে না,TypeScript compile time এ error দেখাবে → “value is not a function”| আবার,toFixed() হলো number এর method
TypeScript compile time এ error দেখাবে → “Property 'toFixed' does not exist on type 'string'”|
যেহেতু,type হিসেবে any দেওয়া ,TypeScript মনে করে value যেকোনো type হতে পারে , এইজন্য TypeScript কোনো error দেয় না|

unknown হলো TypeScript-এ any এর type-safe version।
এটি যেকোনো মান রাখতে পারে (string, number, boolean, object ইত্যাদি)।
কিন্তু direct কোনো operation বা method call করা যাবে না যতক্ষণ না আমরা type check বা type assertion ব্যবহার করি।
এটি,any এর মতো নয়, এখানে TypeScript compile-time safety নিশ্চিত করে,ভুল operation আগেই ধরতে সাহায্য করে
উদাহরণ:
let value: unknown = "hello";
 value.toUpperCase(); 
 \\ Error দিবে কারণ এখানে,value এর type unknown, TypeScript জানে না value কোন type এর মান।
তাই কোনো method কল করা বা operation করা সরাসরি সম্ভব নয়।

এখন, Type Guard দিয়ে যদি check করা হয়
if (typeof value === "string") {
  console.log(value.toUpperCase()); 
}
তাহলে Error দেবে না কারণ typeof value === "string" → TypeScript নিশ্চিত হলো যে value এখন string।যেহেতু এখন value string, তাই আমরা string method toUpperCase() safely ব্যবহার করতে পারি।

never type এমন function বা value বোঝায় যেটা কখনো কোনো value return করে না বা
যেখানে কোনো value exist করবে না।
এটি সাধারণত এমন function বা code path-এর জন্য ব্যবহার হয় যেগুলো কখনো শেষ হয় না।
যেমন: Error throw করা function
       Infinite loop
       Exhaustive type checking
উদাহরণ:
function throwError(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {}
}

সুতরাং, Differences between any, unknown, and never এর সারসংক্ষেপ হলো:

* any type checking বন্ধ করে দেয়, কিন্তু unknown এবং never type safety বজায় রাখে।
* any এবং unknown type ব্যবহার করলে যেকোনো value রাখা যায় এবং return করে|অন্য দিকে, never type যা কখনো  কোনো value নেয় না return করে না|
* any যেকোনো operation allow করে, unknown type check ছাড়া কিছুই allow করে না।
never type এ কোনো operation allowed নয়|
* any and never type এ Type narrowing দরকার নেই। unknown ব্যবহার করার আগে type narrowing প্রয়োজন হয়। 
* any runtime error হওয়ার ঝুঁকি বাড়ায়,unknown runtime error কমাতে সাহায্য করে।
never টাইপের মান কখনো থাকবে না, তাই কোনো runtime এ value আসার সম্ভাবনা নেই|

