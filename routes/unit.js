const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth')


const { getAllUnits,
    getUnitUnitById,
    getUnitByCatId,
    getUnitByAdvantages,
    getUnitByHostLang,
    getUnitByPlaceType,
    getUnitByPropertyType,
    deleteUnitById,
    addNewUnit,
    fiterUnits
} = require('../controllers/unitControl');



router.get('/', async function (req, res) {
    let lang = req.query.lang || 'en'
    try {
        res.json(await getAllUnits(lang))
    } catch (err) {
        res.status(404).json(err)
    }
});




router.get('/:id', async function (req, res) {
    let lang = req.query.lang || 'en'

    try {
        res.json(await getUnitUnitById(req.params.id, lang))
    } catch (err) {
        res.status(404).json("err")
    }
});


router.get('/category/:catName', async function (req, res) {
    let lang = req.query.lang || 'en'
    console.log(req.params.catName);
    try {
        res.json(await getUnitByCatId(req.params.catName, lang))
    } catch (err) {
        res.json(err.message)
    }
});

router.delete('/:id', adminAuth, async function (req, res) {
    try {
        res.json(await deleteUnitById(req.params.id))
    } catch (err) {
        res.json(err.message)
    }
});


router.get('/search/query', async function (req, res) {
    let lang = req.query.lang || 'en'
    try {
        let filteredUnits = await fiterUnits(req.query, lang)
        res.json(filteredUnits)
    } catch (err) {
        res.json(err.message)
    }
})

router.post('/', async function (req, res) {
    try {
        let unit = req.body;
        console.log(unit);
        console.log(333333);
        res.json(await addNewUnit(unit))
    } catch (err) {
        res.status(err.statusCode).json(err)
    }
})


module.exports = router;