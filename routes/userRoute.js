const express = require('express');
const { createCat, readCat, updateCat, removeCat, listCat } = require('../controllers/categoriesController');
const formidable =require("express-formidable");
const { register, login } = require('../controllers/userController');
const { createPost, listPost, readPost, updatePost, removePost } = require('../controllers/postController');
const { isSignIn, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// User
router.post('/register', register)
router.post('/login', login)

// Category
router.post('/create-cat', isSignIn, isAdmin, createCat)
router.get('/list-cat', listCat)
router.get('/read-cat/:slug', readCat)
router.put('/update-cat/:categoryId', isSignIn, isAdmin, updateCat)
router.delete('/delete-cat/:categoryId', isSignIn, isAdmin, removeCat)

// Blog Post
router.post('/create-post', isSignIn, isAdmin , formidable() , createPost)
router.get('/list-post', listPost)
router.get('/read-post/:slug', readPost)
router.put('/update-post/:id', isSignIn, isAdmin , formidable() , updatePost)
router.delete('/delete-post/:id', isSignIn, isAdmin , removePost)


module.exports = router;