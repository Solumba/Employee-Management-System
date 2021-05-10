/*
this allows us to load all of our pages
using get methods.
here we replace app with routes 
gotten when we require express.Router
*/

const express = require('express');
const route = express.Router();

const services = require('../services/route_functions');
const controller = require('../controller/controller');
/** 
 * @description Root Route
 * @method Get/
*/
route.get('/',services.homeRoutes);

/** 
 * @description add-user
 * @method Get/
*/
route.get('/add_user',services.add_user);

/** 
 * @description update
 * @method Get/
*/
route.get('/update_user',services.update_user);


//API 
route.post('/api/users',controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
module.exports = route;