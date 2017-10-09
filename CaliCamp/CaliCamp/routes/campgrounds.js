var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id, 
        username: req.user.username
    };
    var newCamp = {name: name, price: price, image: image, description: desc, author: author};
    // push new camp into the data base
    Campground.create(newCamp, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
            }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//This route will show more information about the selected campground
router.get("/:id", function(req, res){
   // res.send("This will be the show route m8");
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
   });
});

//=========================
//edit campgrounds
//=========================

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
           res.render("campgrounds/edit", {campground: foundCampground});   
            });
    });
//=========================
//update campgrounds
//=========================
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});
//=========================
//Destroy
//=========================
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
   });
});

//============
//middlewares
//============


module.exports = router;