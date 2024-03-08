const mongoose=require('mongoose');

async function connectToMongoDB(url){
    console.log("Connected to Database");
    return mongoose.connect(url);
}

module.exports={connectToMongoDB};