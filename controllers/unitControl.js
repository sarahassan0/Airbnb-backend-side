const UnitModel = require('../models/Unit');


function localize(localizedUnit, originalUnit) {
    let unit = Object.assign({}, localizedUnit);
    unit.images = originalUnit.images
    unit.date = originalUnit.date,
        unit.pricePerNight = originalUnit.pricePerNight;
    unit.guestsNumber = originalUnit.guestsNumber;
    unit.numberOfRates = originalUnit.numberOfRates;
    unit.hostLang = originalUnit.hostLang;
    unit.catName = originalUnit.catName;
    unit.id = originalUnit._id
    unit.navigation = originalUnit.navigation
    unit.host = originalUnit.host
    unit.bedrooms = originalUnit.bedrooms
    unit.bathrooms = originalUnit.bathrooms
    unit.beds = originalUnit.beds
    unit.available = originalUnit.available
    unit.reviews = originalUnit.reviews
    unit.numberOfRates = originalUnit.numberOfRates
    unit.avgRating = originalUnit.avgRating
    return unit
}

const getAllUnits = async (lang) => {
    let units = await UnitModel.find().populate('host');
    console.log(6666666666666666);
    console.log(units[0])

    let localizedUnits;
    if (lang === 'ar') {
        localizedUnits = units.map((unit) => localize(unit.ArabicUnit, unit))
    } else if (lang === 'en') {
        localizedUnits = units.map((unit) => localize(unit.EnglishUnit, unit))
    }
    return localizedUnits;
}

const getUnitUnitById = async (id, lang) => {
    let unit = await UnitModel.findById(id).populate(['host', 'reviews']);
    let arabicUnit = unit.ArabicUnit;
    let englishUnit = unit.EnglishUnit;
    if (lang === 'ar') {
        return localize(arabicUnit, unit);
    } else if (lang === 'en') {
        return localize(englishUnit, unit)
    };
}


const getUnitByCatId = async (catName, lang) => {
    let localizedUnits;
    let units = await UnitModel.find({ 'catName': catName }).populate('host');
    if (lang === 'ar') {
        console.log(units);
        localizedUnits = units.map((unit) => localize(unit.ArabicUnit, unit))

    } else if (lang === 'en') {
        localizedUnits = units.map((unit) => localize(unit.EnglishUnit, unit))
    }
    return localizedUnits;
}


const fiterUnits = async (query, lang) => {
    let queryObj = { ...query }
    const excludeFeilds = ['lang', 'catName']
    excludeFeilds.forEach(element => {
        delete queryObj[element]
    });
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|or|in|all|and)\b/g, match => `$${match}`)
    queryStr = JSON.parse(queryStr)
    let filteredUnits = await UnitModel.find(queryStr)
    let localizedUnits;
    if (lang === 'ar') {
        localizedUnits = filteredUnits.map((unit) => localize(unit.ArabicUnit, unit))
    } else if (lang === 'en') {
        localizedUnits = filteredUnits.map((unit) => localize(unit.EnglishUnit, unit))
    }
    return localizedUnits;
}

const getUnitByHostLang = (lang) => {
    return UnitModel.find({ hostLang: lang })
}

const getUnitByAdvantages = (advantages) => {
    return UnitModel.find({ advantages })
}

const getUnitByPropertyType = (unitType) => {
    return UnitModel.find({ unitType })
}

const getUnitByPlaceType = (placeType) => {
    return UnitModel.find({ placeType })
}
// Ending search layers


const deleteUnitById = (id) => {
    console.log(id);
    return UnitModel.findByIdAndDelete(id)
}

const addNewUnit = async (u) => {
    const unit = await UnitModel.create(u)
    console.log(unit);
    return unit
}


module.exports = {
    getAllUnits,
    getUnitUnitById,
    getUnitByCatId,
    getUnitByAdvantages,
    getUnitByHostLang,
    getUnitByPlaceType,
    getUnitByPropertyType,
    deleteUnitById,
    addNewUnit,
    fiterUnits
}