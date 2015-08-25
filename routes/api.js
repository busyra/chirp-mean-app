var express = require('express');
var router = express.Router();

router.route('/posts')
    //returns all posts
    .get(function(req,res){
        //temporary
        res.send({message: 'TODO return all posts'});

    })

    .post(function(req,res){
        //temporary
        res.send({message: 'TODO Create a new post'});
    });

router.route('/posts/:id')
    //returns specific posts
    .get(function(req,res){
        res.send({message: 'TODO return post with ID' +req.params.id});
    })
    //updates post
    .put(function(req,res){
        res.send({message: 'TODO modify post with ID'} + req.params.id);
    })
    //delete post
    .delete(function(req,res){
        res.send({message: 'TODO delete post with ID'} + req.params.id);
    });

module.exports = router;
