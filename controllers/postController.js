const Post = require("../models/postModel");
const fs =require("fs");
const slugify =require("slugify");
require("../models/userModel");
require("../models/categoryModel");


exports.createPost = async (req, res) => {
    try {
      const { title, content, author, category } =
        req.fields;
      const { photo } = req.files;
  
      // validation
      switch (true) {
        case !title.trim():
          return res.json({ error: "Title is required" });
        case !content.trim():
          return res.json({ error: "Content is required" });
        case !author.trim():
          return res.json({ error: "UserId is required" });
        case !category.trim():
          return res.json({ error: "Category is required" });
        case photo && photo.size > 1000000:
          return res.json({ error: "Image should be less than 1mb in size" });
      }
  
      // create product
      const product = new Post({ ...req.fields, slug: slugify(title) });
  
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
  
      await product.save();
      res.json(product);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  };

  
  exports.listPost = async (req, res) => {
    try {
      const posts = await Post.find({})
        .populate("author")
        .populate("category")
        .sort({ createdAt: -1 });
  
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  };



  exports.readPost = async (req, res) => {
    try {
      const post = await Post.findOne({ slug: req.params.slug })
      .populate("author")
      .populate("category")
  
      res.json(post);
    } catch (err) {
      console.log(err);
    }
  };


  // post Update
exports.updatePost = async (req, res) => {
    try {
      // console.log(req.fields);
      // console.log(req.files);
      const { title, content, author, category } = req.fields;
      const { photo } = req.files;
  
      // validation
      switch (true) {
        case !title.trim():
          return res.json({ error: "Title is required" });
        case !content.trim():
          return res.json({ error: "Content is required" });
        case !author.trim():
          return res.json({ error: "UserId is required" });
        case !category.trim():
          return res.json({ error: "Category is required" });
        case photo && photo.size > 1000000:
          return res.json({ error: "Image should be less than 1mb in size" });
      }
  
      // update product
      const post = await Post.findByIdAndUpdate(
        req.params.id, { ...req.fields, slug: slugify(title) }
      );
  
      if (photo) {
        post.photo.data = fs.readFileSync(photo.path);
        post.photo.contentType = photo.type;
      }
  
      await post.save();
      res.json(post);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  };


  // post remove
exports.removePost = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(
        req.params.id
      ).select("-photo");
      res.json(post);
    } catch (err) {
      console.log(err);
    }
  };