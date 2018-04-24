var mongo = require('mongoose');
mongo.connect("mongodb://localhost/supermarket")

var schema = mongo.Schema;

var tryoutSchema = new schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    age2:{type:Number,required:true}
})

var userEntitySchema =  new schema({
    name:{type: String,requierd:true},
    role:{type:String,required:true},
    famillyName:{type:String,requierd:true},
    email:{type:String,required:true},
    id:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    city:{type:String},
    street:{type:String}
})



var customerSchema =  new schema({
    name:{type: String,requierd:true},
    famillyName:{type:String,requierd:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    id:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    city:{type:String,required:true},
    street:{type:String,require:true}
})


var managerSchema =  new schema({
    name:{type: String,requierd:true},
    famillyName:{type:String,requierd:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    id:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    
})

var categorySchema = new schema({
    id:{type:Number,unique:true},
    name:{type:String,requierd:true}
})


var productSchema = new schema({
    name:{type:String,requierd:true},
    categoryId :{type:schema.Types.ObjectId,ref:'categories',requierd:true},
    price:{type:Number,required:true},
    picturePath:{type:String,required:true}
})


var shopingCartSchema = new schema ({
    customerId:{type:schema.Types.ObjectId,ref:'customers'},
    cartObj:{type:Object,required:true}
})

cartItemSchema = new schema({
    
    name:{type:String,required:true},
    productId:{type:schema.Types.ObjectId,ref:'product',required:true},
    amount:{type:String,requierd:true},
    generalPrice:{type:Number,requierd:true}   

})

orderSchema = new schema({
    customerId:{type:schema.Types.ObjectId,ref:'customers',required:true},
    price:{type:Number,required:true},
    city:{type:String,required:true},
    street:{type:String,required:true},
    creditCard:{type:String,required:true},
    shippingDate:{type:String,required:true}


})

module.exports = {

    tryOut:mongo.model('tryout',tryoutSchema),
    userEntity:mongo.model('userEntity',userEntitySchema),
    customer:mongo.model('customer',customerSchema),
    manager:mongo.model('manager',managerSchema),
    category:mongo.model('categories',categorySchema),
    product:mongo.model('products',productSchema),
    shopingCart:mongo.model('shopingCarts',shopingCartSchema),
    cartItem:mongo.model('cartItem',cartItemSchema),
    order:mongo.model('orders',orderSchema)

}





