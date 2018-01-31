var express = require('express');
var router = express.Router();
var testCaseModel = require('../models/testcaseModel');
var ObjectID = require('mongodb').ObjectID;
var helper = require('../helpers/helper');

/* List all test cases */
router.get('/getTestCases', (req, res, next) => {
	testCaseModel.find({}, (err, testCase) => {
		if (err)
			res.status(400).send(err);
		res.render('dashboard', { 
			title: 'Dashboard',
			testCase: testCase
		});
		// res.status(200).send(testCase);
	}).sort('-createdAt');
});

/* Get test case by ID */

router.get('/getTestCases/:id', (req, res, next) => {
	testCaseModel.find({_id:`${req.params.id}`}, (err, testCase) => {
		if (err)
			return res.status(400).send(err);
		res.render('individualtest', { 
			title: 'Edit Individual Test Case',
			testCase: testCase
		});
		// res.status(200).send(testCase);
	});
});

/* Add new test case */
router.post('/createTestCase', (req, res, next) => {
	req.checkBody('title', 'title is required').notEmpty();
	req.checkBody('command', 'command is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(400).send(errors);
	} else {
		let testCase = new testCaseModel();
		testCase.title = req.body.title;
		testCase.command = req.body.command;
		testCase.save(err => {
			if (err){
				return res.status(400).send(err);
			} else {
				helper.fileOperations(testCase);
				res.status(200).send(testCase);
			}
		});
	}
});

/* Update existing test case */
router.post('/editTestCase/:id', (req, res, next) => {
	var dbObj = {};
		if (req.body.title)
			dbObj.title = req.body.title
		if (req.body.command)
			dbObj.command = req.body.command
		testCaseModel.findByIdAndUpdate({_id:ObjectID(req.params.id)}, 
		{$set:dbObj}, {new: true}, (err, testCase) => {
			if(err)
				return res.status(400).send(err);
			helper.fileOperations(testCase);
			res.status(200).send(testCase);
	})
});

module.exports = router;
