const mongoose=require('mongoose');
//const db=require('dotenv').config()
mongoose.Promise=global.Promise;
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI,{ useMongoClient: true }).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err);
});
module.exports={mongoose}