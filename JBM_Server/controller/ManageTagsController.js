const route = require('express').Router();
const tagsData = require('../model/manageTagsSchema');

route.post('/', async(req, res)=>{
    try{
        await tagsData.create(req.body)
        res.send({status : 200})
    } catch (error) {
        console.log(error)
    }
});

module.exports = route;