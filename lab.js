const fn={
  add : (a,b)=>(a+b),
  person : (name, age)=>({name,age,gender : undefined}),
  throwErr : ()=>{
    throw new Error("에러")
  },
  getName : callback=>{
    const name = "jack";
    setTimeout(()=>{callback(name)},1000)
  },
  getAge : ()=>{
    const age = 30;
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        res(age);
        // rej("error")
      }, 1000)
    })  
},

  dbConnect : ()=>{
    return new Promise((res,rej)=>{
      const user = {
        name : "Lee",
        age : 100,
        gender: "male"
      }
      setTimeout(()=>{
        res(user)
      }, 300)
    })
  },
  dbDisconnect : ()=>{
    return new Promise((res,rej)=>{
      setTimeout(()=>{
        res();
      }, 300)
    })
  }


} 

module.exports={
  fn
}














// class CustomError extends Error {
//     constructor(foo, ...params) {
//       // Pass remaining arguments (including vendor specific ones) to parent constructor
//       super(...params);
  
//       // Maintains proper stack trace for where our error was thrown (only available on V8)
//       if (Error.captureStackTrace) {
//         Error.captureStackTrace(this, CustomError);
//       }
  
//       // Custom debugging information
//       this.name = foo;
//       this.date = new Date();
//     }
//   }
  
//   try {
//     throw new CustomError('validationError', 'bazMessage');
//   } catch(e){
//     // console.log(e.name); //baz
//     // console.log(e.message); //bazMessage
//     console.log(e.date)
//     console.log(e.stack); //stacktrace
// }