var fs = require('fs');
var cwd = process.cwd();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test-automation');
var testCaseModel = require('../models/testcaseModel');

module.exports = {
	fileOperations: dbModel => {
		var fileName = `${cwd}/testscripts/${dbModel._id}`;
		fs.writeFile(`${fileName}.js`, dbModel.command, err => {
			if(err)
				return false;
		})
	},

	updateStatus: (file, stdout) => {
		var testCaseObj = {};
		testCaseObj.status = `${stdout.slice(0, -1)}`;
		testCaseModel.findByIdAndUpdate({_id:`${file.slice(0, -3)}`}, 
		{$set:testCaseObj}, {new: true}, (err, testCase) => {
			if(err)
				return err;
			console.log(testCase);
		})
	},
}