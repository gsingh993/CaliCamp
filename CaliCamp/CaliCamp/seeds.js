var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
        name: "Clouds Rest", 
        image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie sollicitudin urna et aliquet. Cras hendrerit dui ut fringilla dapibus. Donec fermentum sit amet felis vel blandit. Donec fringilla iaculis nisl. Phasellus id placerat mi. Ut orci metus, commodo id justo a, pulvinar viverra ante. Donec in leo turpis. Nunc vel feugiat "

        },  
        {
        name: "Rocks Rest", 
        image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie sollicitudin urna et aliquet. Cras hendrerit dui ut fringilla dapibus. Donec fermentum sit amet felis vel blandit. Donec fringilla iaculis nisl. Phasellus id placerat mi. Ut orci metus, commodo id justo a, pulvinar viverra ante. Donec in leo turpis. Nunc vel feugiat"
        },  
        {
        name: "Camp Lit", 
        image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie sollicitudin urna et aliquet. Cras hendrerit dui ut fringilla dapibus. Donec fermentum sit amet felis vel blandit. Donec fringilla iaculis nisl. Phasellus id placerat mi. Ut orci metus, commodo id justo a, pulvinar viverra ante. Donec in leo turpis. Nunc vel feugiat"
        }
    ];

function seedDB(){
    //Remove the Campgorunds from the Database
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
        console.log("removed campground");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    //this is where we will create the comments 
                    console.log("added a campground");
                    Comment.create({
                        text:"Supa Dupa Swankin",
                        author: "Joey BA"
                    }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new campground");
                            }
                    });
                
                }
            });
        });
    });
}

module.exports = seedDB;

