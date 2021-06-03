// import { User } from "../controllers/users.js";
// import { Category } from "../controllers/categories.js";
// import { Task } from "../controllers/tasks.js";

// const { createCategory } = require('../controllers/categories.js');
// const { createTask } = require('../controllers/tasks.js');
// const { createUser } = require('../controllers/users.js');




// test('Category is created',  () => {
//     const data =  createCategory(Category);
//     expect(data).toBe(true);
//   });

// beforeEach(()=>{
//     let category1 = {
//         _id: "02inkjnf9j",
//         name: "work",
//         color: red
//     }
//     let category2 ={
//         _id: "123145ydef",
//         name: "home",
//         color: blue

//     }
//     let category3 = {
//         _id: "24142jnf9j",
//         name: "sportground",
//         color: green
//     };
//     categories = [category1,category2,category3];
//     topCot = [category2];
//     draft = {
//         items: categories,
//         topUsers: topCot,
//         LoadingStatus: LoadingStatus.LOADED,
//     };
// }) 

// test("SET_ITEMS", () => {
//     let action = setUsers(draft.items);
//     const newState = usersReducer(draft, action);
//     expect(newState.items).toBe(action.payload);
//     expect(newState.LoadingStatus).toBe(LoadingStatus.LOADED);
// });


// test('Task is created',  () => {
//     const data =  createTask(Task);
//     expect(data).toBe(true);
//   });

// beforeEach(()=>{
//     let task1 = {
//         _id: "02inkjnf9j",
//         name: "rewop ",
//         description: "wrufds wruey vxcr",
//         importance: 1

//     }
//     let task2 ={
//         _id: "123145ydef",
//         name: "fsfsd fds",
//         description: "wrufds wruey vxcr",
//         importance: 2

//     }
//     let task3 = {
//         _id: "24142jnf9j",
//         name: "fdsfdsfds  df",
//         description: "wrufds wruey vxcr",
//         importance: 3
//     };
//     tasks = [task1,task2,task3];
//     topTK = [task2];
//     draft = {
//         items: tasks,
//         topTasks: tasks,
//         LoadingStatus: LoadingStatus.LOADED,
//     };
// }) 

// test("SET_ITEMS", () => {
//     let action = setUsers(draft.items);
//     const newState = usersReducer(draft, action);
//     expect(newState.items).toBe(action.payload);
//     expect(newState.LoadingStatus).toBe(LoadingStatus.LOADED);
// });


// test('User is created',  () => {
//     const data =  createUser(User);
//     expect(data).toBe(true);
//   });

// beforeEach(()=>{
//     let user1 = {
//         _id: "02inkjnf9j",
//         email: "firstname@gmail.com",
//         username: "username",
//         password: "password",

//     }
//     let user2 ={
//         _id: "123145ydef",
//         email: "firstname2@gmail.com",
//         username: "2username",
//         password: "2password",

//     }
//     let user3 = {
//         _id: "24142jnf9j",
//         email: "firstname3@gmail.com",
//         username: "3username",
//         password: "3password",
//     };
//     users = [user1,user2,user3];
//     topUs = [user2];
//     draft = {
//         items: users,
//         topUsers: topUs,
//         LoadingStatus: LoadingStatus.LOADED,
//     };
// }) 

// test("SET_ITEMS", () => {
//     let action = setUsers(draft.items);
//     const newState = usersReducer(draft, action);
//     expect(newState.items).toBe(action.payload);
//     expect(newState.LoadingStatus).toBe(LoadingStatus.LOADED);
// });
