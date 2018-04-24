
//importing systemEntities and mongoose modules  
var entities = require('./systemEntities');
var mongo = require('mongoose');




//adds new user to user collection
module.exports.Adduser = (userObj,res) => {

    var usermodel = entities.userEntity;
    var newUser = new usermodel(userObj);

    newUser.save(
        function(err,data){
            if (err)
            res.send('err');
            res.send(data);
        })
        
    }



module.exports.addOrder = (orederObj,res) => {

    var ordermodel = entities.order;
    var newOrder = new ordermodel(orederObj);

    newOrder.save(
        function(err,data){
            
            if (err)
                throw err;
            
            res.send(data);
        }   
    )
    
}


module.exports.verifyUser = (id,pass,res)=>{

    var usermodel = entities.userEntity;

    usermodel.findOne({id:id,password:pass},
        (err,response)=>{
            if (err)
                throw err
            res.send(response);

        }
    )
}


module.exports.verifyUserById = (id,name,res)=>{

    var usermodel = entities.userEntity;
    id = mongo.Types.ObjectId(id);
    
    usermodel.findOne({_id:id,name:name},
        (err,response)=>{
            if (err)
                res.send('user not found')
            else 
                res.send(response);

        }
    )

}



//get all categories collection and send it to client
module.exports.getCategories = (res)=>{
    
    var categoriesModel = entities.category;
    categoriesModel.find(
        (err,response)=>{
            if (err)
                throw err;
            res.send(response);

        }
    );

}

//get all products of a specific category

module.exports.getProductsByCategory = (categoryId,res)=>{

    var productsModel = entities.product;
    productsModel.find({categoryId:categoryId},
        function(err,response){
            if (err)
                throw err;
            res.send(response);
        }
    )
   

}



// get user data by id
module.exports.findId = (id,res)=>{
    
    var usermodel = entities.userEntity;
    return usermodel.findOne({id:id},
        (err,data)=>{
            res.send(data)
        }
    )
}

    /* 
        preform a regex based search on product collection names, 
        returns all matching result
    */

module.exports.searchProducts = (value,res,next)=>{

    var productModel = entities.product;
    var regValue = new RegExp(value,"g");
     
    productModel.find({name:{$regex:regValue}},
        
        function(err,result){
            res.send(result);
        }   
    );
}

/* 
    updating cart collection 
    based on user id and new cart data
 */

module.exports.updateCart = (cartObj,userId,res) => {

    var cartModel = entities.shopingCart;

    cartModel.findOneAndUpdate({customerId:userId},{customerId:userId,cartObj:cartObj},{upsert:true},
        function(result){
            res.send(result);
        })

}

// updates a given product's data in products collection.
module.exports.updateProduct = (productObj,res) => {

    var productModel = entities.product;
    var prodId = mongo.Types.ObjectId(productObj._id)

    productModel.findOneAndUpdate({_id:prodId},productObj,
        function(result){
            res.send(result);
        }
    )
}

// gets current cart of current user using the user's id 

module.exports.getCurCart = (userId,res) => {

    var cartModel = entities.shopingCart;
    var id = mongo.Types.ObjectId(userId);

    cartModel.findOne({customerId: id},
        function(err,result){
            res.send(result);
        }
    )
}

//add new product to products collectio
module.exports.addProduct = (productObj,res) =>{

    var productModel = entities.product;

    var product = new productModel(productObj);

    product.save(
        function(err,response){
            if (err)
                throw err;
            res.send(response);
        }
    )
}



 // get all orders of a specific date from orders collection

module.exports.getOrdersByDate = (dateStr,res) =>{

    var orderModel = entities.order;
    orderModel.find({shippingDate:dateStr},
        function(err,response){
            res.send(response);
        }
    )

}
 








