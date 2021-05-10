/*
writing functions to add, update and find users
in out db. That's why our db is been required here
*/

var Userdb = require('../model/model');

//create and save a new user
exports.create = (req, res)=>{
    //to validate that our req body carries content
    if(!req.body){
        res.status(400).send({message : "content can't be empty"});
        return
    }

    // to create a new user after validation
    const user = new Userdb({
        //passing the request body compnents as data values
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })

    //save user in the database 
    user
        .save(user)
        .then(data=>{
            //res.send(data)
            //redirect the user to the home page
            res.redirect('/');
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'Some weird error'
            });
        });
}

//retrieve and return a single user or all users //the query param is now being passed in as
exports.find = (req, res)=>{
    //using Query parameters 
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(user=>{
                if(!user){
                    res.status(404).send({
                        message:`no user found with this ID ${id}`
                    })
                }else{
                    res.send(user)
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message: err.message || "a weird error occured"
                })
            })  
        }else{
            //runs when the data with that query ID isnt found
            Userdb.find()
                .then(userData=>{
                    res.send(userData);
                })
                .catch(err=>{
                    res.status(500).send({message:err.message || 'couldnt get the data'})
                });
        }
    
}

//Update a user by ID
exports.update = (req, res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: 'update cannot be empty'});
    }
    /*using id param we set for our api path. this is 
    also known as a url parameter
    */
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(400).send({message: `cannot update user with ${id}. Maybe user not found`});
            }else{
                res.send(data)
            }
        })

        .catch(err=>{
            res.status(500).send({message: 'update user failed'})
        });
}

//delete a user by ID
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:`can not delete user with ID ${id}. ID may be wrong`
                })
            }else{
                res.send({
                    message: "User was successfully deleted!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some Error Occured"
            });
        });
}