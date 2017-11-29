var mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/keep',{ useMongoClient: true }).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err);
});
module.exports={mongoose}