const express = require('express');
const router = express.Router();

const {getAllUnits,
    getUnitUnitById, 
    getUnitByCatId, 
    getUnitByAdvantages, 
    getUnitByHostLang, 
    getUnitByPlaceType, 
    getUnitByPropertyType,
    deleteUnitById,
    addNewUnit,
} = require('../controllers/units');




router.get('/', async function(req, res){
    try{
        res.json(await getAllUnits('en'))
    }catch(err){
        res.status(404).json(err,message)
    }
});


router.get('/:id', async function(req, res){
    try{
        res.json( await getUnitUnitById(req.params.id, 'en'))
    }catch(err){
        res.status(404).json("err")
    }
});


router.get('/category/:cadId', async function(req, res){
    try{
        res.json( await getUnitByCatId(req.params.cadId))
    }catch(err){
        res.json(err.message)
    }
});


// router.get('/search', async function(req, res){
//     try{
//         // res.json(req.query)
//         let query = await req.query;
//     }catch(err){
//         res.json('err')
//     }
// })

router.post('/', async function(req, res){
    try{
        let unit = req.body;
        res.json(await addNewUnit(unit))
    }catch(err){
        res.status(err.statusCode).json(err.message)
    }
})


module.exports = router;