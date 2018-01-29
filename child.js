const fs = require('fs');
const cwd = process.cwd();
const execFile = require('child_process').execFile;
var helper = require('./helpers/helper');

module.exports = {
	runTestCase: () => { 
		fs.readdir(`${cwd}/testscripts/`, (err, files) => {
			files.forEach(file => {
				execFile('node', [`${cwd}/testscripts/${file}`], (err, stdout, stderr) => {
					if (err)
						return console.error('stderr', stderr);
					helper.updateStatus(file, stdout);
					fs.unlink(`${cwd}/testscripts/${file}`, err => {
						if (err)
							return err;
					})
				})
  			})
		})
	}
}