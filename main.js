var express = require('express');
var app = express();
var path = require ('path');
var dal = require('./server/DAL');
var fs = require('fs')
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var multer = require('multer');

//static assets for app
app.use(express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname,'client')));
app.use(express.static(path.join(__dirname,'images')));
app.use(express.static(path.join(__dirname,'bower_components')));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var upload = multer({ dest: 'images/products/' })





app.use('/login',function(req,res){
    res.send('login');
})


app.get('/verifyUser',function(req,res){
    dal.verifyUser(req.query.id,req.query.pass,res)
})

app.get('/verifyUserById',function(req,res){
    dal.verifyUserById(req.query.id,req.query.name,res)
})



app.post('/addCustomer',function(req,res){
    var params = req.body.params;
    dal.Adduser({name:params.name,role:'customer',famillyName:params.famillyName,email:params.email,id:params.id,password:params.password,city:params.city,street:params.street},res)
})

app.get('/getCategories',function(req,res){
    dal.getCategories(res);
})

app.get('/checkIdExist',function(req,res){
    dal.findId(req.query.id,res)
})


app.get('/getProductsByCategory',function(req,res){
    var categoryId = req.query.categoryId;
    dal.getProductsByCategory(categoryId,res);
})


app.get('/searchProducts',function(req,res,next){
    var searchVal = req.query.value;
    dal.searchProducts(searchVal,res);
})

app.post('/orderSubmit',function(req,res,next){
    var orderObj = req.body.order;
    dal.addOrder(orderObj,res);
})

app.get('/getCurCart',function(req,res){
    var userId = req.query.userId;
    dal.getCurCart(userId,res)
})

app.post('/updateCart',function(req,res,next){
    var userId = req.body.userId;
    var newCartObj = req.body.cartObj;
    dal.updateCart(newCartObj,userId,res);
})

app.post('/newProductImage',upload.single('picturePath'), function(req,res){
    imagePath = req.file.path.slice(6,req.file.path.length);
    res.send(imagePath)
})

app.post('/editProduct',function(req,res){
    var productData = req.body.productData;
    dal.updateProduct(productData,res);
})

app.post('/newProduct',function(req,res){
    var productData = req.body.productData;
    dal.addProduct(productData,res);
})



app.get('/getOrdersByDate',function(req,res){
    var dateStr = req.query.dateStr;
    dal.getOrdersByDate(dateStr,res);
})

app.get('/check',function(req,res,next){
    dal.checkFunck(res,next);
})



app.listen(8080,() =>{console.log('app started')})
