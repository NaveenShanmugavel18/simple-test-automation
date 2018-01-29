var child = require('./child');
var cronJob = require('cron').CronJob;
var job = new cronJob('*/1 * * * *', err => {
	if (err)
		job.stop();
	child.runTestCase();
});

job.start();