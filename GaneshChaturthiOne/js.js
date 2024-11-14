
// console.log("arr", arr);
// const newArr = arr.reduce((pre, next)=>pre + next, 0);
// console.log(newArr);

const arr = [1, 2 , 3 , 6, 7 , 9, 4, 5]
// const newEeven = arr.filter((num) =>  num % 2 === 0 )
// const newEeven = arr.filter((num) => { 
//   return  num % 2 === 0 
// })
const newEeven = arr.map((item) => item * 2)
console.log(newEeven);
