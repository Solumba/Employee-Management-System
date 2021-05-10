/* 
Actually function used in our router
Exporting a single callbackfunction to 
be used in place of callbacks in our routes 

const { default: axios } = require("axios");

*/

/* axios a promise based HTTP client for the 
browser and Node. js which allows us to make requestd to REST APIS and endpoints 
, making CRUD operations easier.
*/
const axios = require("axios");

//using fetch in node js
//const fetch = require("node-fetch");

exports.homeRoutes = (req, res) => {
    //make a get request to api/users using axios
    axios.get('http://localhost:3000/api/users')
    .then(response=>{
        res.render('index',{users:response.data})
    })
    .catch(err=>{
        res.status(500)
        .send({message:err.message || "some error occured"});
    })
    
}
exports.add_user = (req, res) => {
    res.render('add_user');
}
exports.update_user = (req, res) => {
    //getting the data of a user with a particular id using query parameters
    axios.get('http://localhost:3000/api/users', {params: {id:req.query.id}})
        .then(userData=>{
            //render the update_user form with the userdata populated 
            res.render('update_user', {
                user:userData.data
            })
        })
        .catch(err=>{
            res.render(err);
        })
}