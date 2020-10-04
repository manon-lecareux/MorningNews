var express = require('express');
var router = express.Router();

var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')

var userModel = require('../models/users')
var favoriteModel = require('../models/favorites')
var langModel = require('../models/languages')


router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }


  if(error.length == 0){

    var salt = uid2(32)
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: SHA256(req.body.passwordFromFront+salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
    })
  
    saveUser = await newUser.save()
  
    
    if(saveUser){
      result = true
      token = saveUser.token
    }
  }
  

  res.json({result, saveUser, error, token})
})

router.post('/sign-in', async function(req,res,next){

  var result = false
  var user = null
  var error = []
  var token = null
  
  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){
    const user = await userModel.findOne({
      email: req.body.emailFromFront,
    })
  
    
    if(user){
      const passwordEncrypt = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64)

      if(passwordEncrypt == user.password){
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      
    } else {
      error.push('email incorrect')
    }
  }
  

  res.json({result, user, error, token})


})



router.post('/addfavorite', async function(req,res,next){

    var newFavorite = new favoriteModel({
      image: req.body.imageFromFront,
      title: req.body.titleFromFront,
      content: req.body.contentFromFront,
      token: req.body.tokenFromFront,
      language : req.body.langFromFront})
  
    saveFavorite = await newFavorite.save()
  
    
  //   if(saveUser){
  //     result = true
  //     token = saveUser.token
  //   }
  // }

  res.json("hello")


})


router.post('/deletefavorite', async function(req,res,next){

await favoriteModel.deleteOne({title:req.body.titleFromFront, token: req.body.tokenFromFront});

res.json("hello")
})




router.post('/searcharticles', async function(req,res,next){

  var searchFavorite = await favoriteModel.find({token:req.body.tokenFromFront});

  res.json(searchFavorite)
  })


     


router.post('/languages', async function(req,res,next){


    var newLang = new langModel({
      language: req.body.languageFromFront,
    })
  
    saveLang = await newLang.save()

  res.json({saveLang})
})

module.exports = router;
