var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    text: String,
    username: String,
    created_at: {type: Date, default: Date.now}
});

//declare model called User which has schema userSchema
mongoose.model("User", userSchema);
//declare model called Post which has schema postSchema
mongoose.model("Post", postSchema);
