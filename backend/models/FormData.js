const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    savedLocations: {
        type: [String],
        default: []  // Array of strings to store saved locations
    }
});


const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
