const routes = require('express').Router();
const mongodb = require('../db/connect');
const { ensureAuth, ensureGuest} = require('../middleware/auth')

routes.use('/', require('./swagger'));
routes.use('/', require('./rings'));
routes.use('/', require('./users'));
routes.use('/', require('./auth'));

routes.get('/', ensureGuest,  (req, res, next) => {
    res.render('login', {
        layout: 'login',
    })
})

routes.get('/dashboard', ensureAuth, async(req, res, next) => {
    try{
        const rings = await mongodb.getMongoDb().db('boardedRings').collection('rings').find().toArray();
        res.render('dashboard', {
            name: req.user.displayName,
            rings, 
        })
    }catch (error){
        console.error(error);

    }
    
})

module.exports = routes;
