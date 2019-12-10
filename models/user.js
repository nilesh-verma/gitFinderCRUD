var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gitFinder',{useNewUrlParser:true});
var conn = mongoose.connection;
var userSchema = new mongoose.Schema({
    login:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    id:{
        type:Number,
        required:true,
        index:{
            unique:true
        },
    },
    url:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    html_url:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    repos_url:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    }
});

var userModel = mongoose.model('users',userSchema);
module.exports.userModel;