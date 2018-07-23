// import APIHandler from "./APIHandler"


// const AddFriendFunc = Object.create({}, {
//     handleAddFriend: {
//         value: (e) => {
//             //function goes here
//             e.preventDefault()
//             // let signedInUser = JSON.parse(sessionStorage.getItem("credentials"))

//             // let yourId = signedInUser.userId

//             APIHandler.getData("users")
//                 .then((userArray) => {

//                     userArray.forEach(userObject => {
//                         if (userObject.name === this.state.newFriend)
//                             fetch(`http://localhost:5002/friends`, {
//                                 method: "POST",
//                                 headers: {
//                                     "Content-Type": "application/json; charset=utf-8"
//                                 },
//                                 body: JSON.stringify({
//                                     userId: userObject.id,
//                                     yourId: yourId
//                                 })
//                             })
//                     })
//                 })
//         }
//     }
// }) 

// export default AddFriendFunc;
