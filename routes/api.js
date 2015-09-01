var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post') ;

router.use(function(req, res, next){
    if(req.method === "GET"){
        //continue to the next middleware or request handler
        return next();
    }
    if(!req.isAuthenticated()){
        //user not auth redirect to login page
        return res.redirect('/#login');
    }
        //user authenticated continue to next middleware or handler
        return next();
});
router.route('/posts')
    //returns all posts
    .get(function(req, res){
        //temporary
        res.send({message: 'TODO return all posts'});

    })

    .post(function(req, res){
        //temporary
        res.send({message: 'TODO Create a new post'});
    });

router.route('/posts/:id')
    //returns specific posts
    .get(function(req, res){
        res.send({message: 'TODO return post with ID ' + req.params.id});
    })
    //updates post
    .put(function(req, res){
        res.send({message: 'TODO return post with ID ' + req.params.id});
    })
    //delete post
    .delete(function(req, res){
        res.send({message: 'TODO delete post with ID ' + req.params.id});
    });

module.exports = router;
