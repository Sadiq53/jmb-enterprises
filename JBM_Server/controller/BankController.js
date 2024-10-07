const route = require('express').Router();
const bankData = require('../model/addBankSchema');


route.get('/', async(req, res)=>{
    const allBanks = await bankData.find();
    res.send({status : 200, bank : allBanks})
});

route.post('/', async(req, res)=>{
    try{
        // const bank = req.body
        const checkBank = await bankData.findOne({bank : req.body.bank});
        if(!checkBank) {
            await bankData.create(req.body);
            res.send({status : 200});
        }
    } catch (error) {
        console.log(error)
    }
});

route.delete('/:id', async(req, res)=>{
    const bankId = req.params.id;
    const isBankPresent = await bankData.findOne({_id : bankId});
    if(isBankPresent) {
        await bankData.deleteOne({_id : bankId})
        res.send({status : 200})
    }

});

module.exports = route;