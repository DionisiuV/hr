var mongoose = require('mongoose');

//schema
var employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    companyAge: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paysTax: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Employee Model
var Employee = module.exports = mongoose.model('employee', employeeSchema);

module.exports.get = function (callback, limit) {
    Employee.find(callback).limit(limit); 
}