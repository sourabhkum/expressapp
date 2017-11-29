var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const db=require('../config/database');

mongoose.connect(db.mongoURI,{ useMongoClient: true }).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err);
});
module.exports={mongoose}