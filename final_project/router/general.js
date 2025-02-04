const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  let getBooks = await books
  return res.send(JSON.stringify(getBooks))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const isbn = req.params.isbn;
  let getBooks = await books[isbn]
  return res.send(getBooks);
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  const author = req.params.author;
  let book = await Object.values(books).filter((book) => book.author === author)
  return res.send(book)
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  const title = req.params.title;
  let book = await Object.values(books).filter((book) => book.title === title)
  return res.send(book)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  console.log(books[isbn].reviews)
  return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
