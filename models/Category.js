const mongoose = require('mongoose');

const CatSchema = mongoose.Schema({
    title:String,
    img:String,
});

const CatModel = mongoose.model('Cat', CatSchema);

module.exports = CatModel;