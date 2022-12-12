const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const Product = require('../models/product');
const {isLoggedIn} = require('../middleware');
const router = express.Router();


router.get('',isLoggedIn, (req,res)=>{
    res.render('home');
});

router.get('/',(req,res)=>{
     res.render('login');
});

router.get('/home', isLoggedIn,(req,res)=>{
    console.log(req.user.username);
    res.render('home',{uname:req.user.username,ubatch:req.user.batch,uage:req.user.age,ufname:req.user.name,enrolled:req.user.enrolled});
});

router.get('/register',(req,res)=>{
    res.render('signup');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/404',(req,res) =>{
    res.render('notfound');
})

router.post('/pay',isLoggedIn,async (req,res)=>{
    console.log(req.body);
  
    try {

        const pro = await Product.updateOne({name:req.user.username},{

            $push :{
                payment:{
                    month: req.body.month,
                    batch: req.body.batch,
                    amount: req.body.amount,
                }
            }
        });

        res.redirect('/home');
        
    } catch (error) {
        res.redirect('/home');
        // console.log(error);
    }
})

router.post('/register',async (req,res)=>{
    console.log(req.body);

    if(req.body.age<18||req.body.age>65){
        res.render('notfound');
    }else{
    try {
        console.log(req.body);
            const user= {
                
                firstName: req.body.firstname,
                age: req.body.age,
                username:req.body.username,
                email:req.body.email,
                batch:req.body.batch,
                enrolled:req.body.enrolled,
                
            }

            const product = {
                name: req.body.username
            }

                const newUser = await User.register(user,req.body.password);
                const newProduct = await Product.create(product);
                res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}
    
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',                         
    failureRedirect: '/404' 
}), (req,res)=>{
  // res.render('home');                               
});


router.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
});

module.exports = router;