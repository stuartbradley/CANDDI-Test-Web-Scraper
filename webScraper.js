
//Setting Requirements
var prompt = require('prompt');
const request = require('request');
var cheerio = require('cheerio');
var sleep = require('system-sleep');

//prompts for email address and formats to get domain name.
prompt.start();
prompt.get(['email'], function(err,result){
	console.log('command-line input recieved: ');
	console.log('email: ' + result.email)
	var email = result.email;
	const domain = email.replace(/.*@/, "");
	site = 'http://www.' + domain;
  console.log("Scraping information from " + site);
},);

//gives user 10 seconds to enter email before next piece of code runs
sleep(10000);

//sends request to website and checks for a 200 response. If there is no 200 status code, program finishes.
request(site, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    console.log(html);
	console.log(site);
  }else{
	  console.log(site + " cannot be reached, please restart the program and try again");
  }
});
