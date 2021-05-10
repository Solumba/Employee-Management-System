const mongoose = require('mongoose');

/*creating our connection to our DB cluster and setting it to reove
unwanted errors */

const connectDB = async() => {
    try{
        //mongoDB connection string
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useFindAndModify: false,
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });
        console.log(`MongoDB Connected : ${con.connection.host}`)
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

//exporting connection function which would be called in our server
module.exports = connectDB;