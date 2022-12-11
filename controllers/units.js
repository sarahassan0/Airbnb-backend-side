const UnitModel = require('../models/Unit');


function localize(localizedUnit, originalUnit){
    let unit = Object.assign({}, localizedUnit);
    unit.images = originalUnit.images
    unit.date = originalUnit.date,
    unit.pricePerNight = originalUnit.pricePerNight;
    unit.guestsNumber= originalUnit.guestsNumber;
    unit.numberOfRates = originalUnit.numberOfRates;
    unit.hostLang = originalUnit.hostLang;
    unit.catId = originalUnit.catId;
    unit.id = originalUnit._id
    unit.navigation = originalUnit.navigation
    return unit
}

const  getAllUnits = async (lang)=>{
    let units = await UnitModel.find();
    let localizedUnits;
    if(lang === 'ar'){
        localizedUnits = units.map((unit)=>localize(unit.ArabicUnit,unit))
    }else if(lang === 'en'){
        localizedUnits = units.map((unit)=>localize(unit.EnglishUnit, unit))
    }
    return localizedUnits;
}

const getUnitUnitById = async (id, lang)=>{
    let unit = await UnitModel.findById(id);
    let arabicUnit = unit.ArabicUnit;
    let englishUnit = unit.EnglishUnit;
    if(lang === 'ar'){
        return localize(arabicUnit, unit);
    }else if(lang === 'en'){
        return localize(englishUnit, unit)
    };
}


const getUnitByCatId = (catId)=>{
    return UnitModel.find({catId})
}


// const getUnitFiltered = (query)=>{
//     if(query.lang === "ar"){
//         let advantages=["wifi", "hair dryer", "kitchen", "tv", "heating", "washing machine", "dryer","iron", "air conditioning", "dedicated workspace"]
//         if(query.advantages){
//             advantages= query.advantages.split("%")
//         }
//         let filterQuery = Object.assign({}, query);
//         filterQuery.advantages = advantages;
//     }
//     else if(query.lang==="ar"){
//         // return UnitModel.find({"ArabicUnit.pricePerNight":{ $gt: min, $lt: max}, "ArabicUnit.advantages":advTitles, "ArabicUnit.palceType":placeType, "ArabicUnit.unitType":unitType, hostLang:hostLang, catId:catId})
//         let advantages = ["واي فاي", "مطبخ", "تلفاز", "تدفئة", "غسالة", "نشافة", "مكوى", "مكيف", "مساحة مخصصة للعمل", "مجفف شعر"]
//         if(query.advantages){
//             advantages= query.advantages.split("%")
//         }
//         let filterQuery = Object.assign({}, query);
//         filterQuery.advantages = advantages;
//     }
//     // }else if (query.lang === 'en'){
//     //     return UnitModel.find({"EnglishUnit.pricePerNight":{ $gt: min, $lt: max}, "EnglishUnit.advantages":advTitles, "EnglishUnit.palceType":placeType, "EnglishUnit.unitType":unitType, hostLang:hostLang, catId:catId,})
//     // }
// }

const getUnitByHostLang =(lang)=>{
    return UnitModel.find({hostLang: lang})
}

const getUnitByAdvantages =(advantages)=>{
    return UnitModel.find({advantages})
}

const getUnitByPropertyType = (unitType)=>{
    return UnitModel.find({unitType})
}

const getUnitByPlaceType = (placeType)=>{
    return UnitModel.find({placeType})
}
// Ending search layers


const deleteUnitById = (id)=>{
    return UnitModel.findOneAndDelete({id})
}

const addNewUnit = (unit)=>{
    return UnitModel.create(unit)
}


module.exports = {getAllUnits,
    getUnitUnitById, 
    getUnitByCatId, 
    getUnitByAdvantages, 
    getUnitByHostLang, 
    getUnitByPlaceType, 
    getUnitByPropertyType,
    deleteUnitById,
    addNewUnit
}