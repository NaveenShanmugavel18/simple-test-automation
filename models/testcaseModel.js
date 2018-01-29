var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var TestCaseModel = new Schema({
    id: ObjectId,
    title: {type: String, required: true},
    command: {type: String, required: true},
    status: {type: String, default:""},
    createdAt: {type: Date, required: true, default: Date.now}
});

var TestCaseModel = mongoose.model('testcases', TestCaseModel);

module.exports = TestCaseModel;