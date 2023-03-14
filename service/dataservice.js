const jwt = require("jsonwebtoken")

const db = require('./db')
// userDetails= {
//        1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },
//        1001: { acno: 1000, username: "Amal", password: "abc123", balance: 0, transaction: [] },
//        1002: { acno: 1000, username: "Arun", password: "abc123", balance: 0, transaction: [] },
//        1003: { acno: 1000, username: "Akhil", password: "abc123", balance: 0, transaction: [] }
//      }



register = (user, pass, acno) => {



  // if (acno in userDetails) {
  return db.User.findOne({ acno }).then(user1 => {
    if (user1) {
      return {
        status: false,
        message: "user already present",
        statusCode: 401
      }
    }

    else {
      // create a nw object in db
      const newUser = new db.User({
        acno, username: user, password: pass, balance: 0, transaction: []
      })
      // save in db
      newUser.save()
      return {
        status: true,
        message: "success",
        statusCode: 200
      }

    }
  })
  // else {

  //  userDetails[acno] = { acno: acno, username: user, password: pass, balance: 0, transaction:[]}
  // //   console.log(userDetails);



  //   return {
  //     status:true,
  //     message:"success",
  //     statusCode:200
  //   }



  // }

}
login = (acno, pass) => {



  // if (acno in userDetails) {
  return db.User.findOne({ acno, password: pass }).then(user1 => {
    if (user1) {
      currentName = user1.username
      currentAcno = acno

      const token = jwt.sign({ currentAcno }, "secretkey1")



      return {
        status: true,
        message: "success",
        statusCode: 200,
        currentName,
        currentAcno,
        token
      }
    } else {
      return {
        status: false,
        message: "inncorrect account number or password",
        statusCode: 401
      }
    }
  })
  // if (pass == userDetails[acno]["password"]) {

}

deposit = (acnum, password, amount) => {

  // let userDetails = this.userDetails
  var amnt = parseInt(amount) //to convert string value into integer value

  // if (acnum in userDetails) {
    return db.User.findOne({acno:acnum,password}).then(user1=>{
      if(user1){
        user1.balance+=amnt
        user1.transaction.push({Type: "CREDIT", amount: amnt })
        user1.save()
        return{
          status: true,
        message: `${amount} is credited to your ac and the balamce
          ${user1.balance}`,
        statusCode: 200
        }
      }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 401

      }
    }
  })
  }
  


//withdraw

withdraw = (acnum, password, amount) => {


  var amnt = parseInt(amount) //to convert string value into integer value
return db.User.findOne({acno:acnum,password}).then(user=>{
  if(user){
    if(amnt<=user.balance){
      user.balance-=amnt
      user.transaction.push({Type: "DEBIT", amount: amnt})
      user.save()
      return{
        status: true,
         message: `${amount} has been debited from your account and your current balance is${user.balance}`,
           statuscode: 200
      }
    }else{
      return {
                  status: false,
                  message: "Insufficient balance",
                  statuscode: 401
                 }

    }
  }
  else{
    return {
               status: false,
             message: "incorrect passsword or incorrect acnum",
               statuscode: 401
             }
  }
})

  // if (acnum in userDetails) {
//  if (password == userDetails[acnum]["password"]) {
//   if (amnt <= userDetails[acnum]["balance"]) {
//         userDetails[acnum]["balance"] -= amnt // update balance
//         //store transaction data
//         userDetails[acnum]["transaction"].push({ Type: "DEBIT", amount: amnt })
//         return {
//           status: true,
//           message: `${amount} has been debited from your account and your current balance is${userDetails[acnum]["balance"]}`,
//           statuscode: 200
//         }
//       } else {
//         return {
//           status: false,
//           message: "Insufficient balance",
//           statuscode: 401
//         }
//       }
//     }
//     else {
//       return {
//         status: false,
//         message: "incorrect passsword",
//         statuscode: 401
//       }
//     }
//   }
//   else {
//     return {
//       status: false,
//       message: "Account doesnt exist",
//       statuscode: 401
//     }
//   }
// 
}

//get transaction

getTransaction = (acno) => {
return db.User.findOne({acno}).then(user=>{
if(user){
  return {
    status: true,
    statuscode: 200,
    transaction: user.transaction

  }
}
  })


  
}
deleteAcc=(acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
if(user){
  return {
    status: true,
    statuscode: 200,
    message:'account Deleted'
  }
}
else {
           return {
             status: false,
             message: "user not exist",
             statuscode: 401
           }
         }
  })
}

module.exports = {
  register, login, deposit,withdraw,getTransaction,deleteAcc
}