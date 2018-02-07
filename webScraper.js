
//Setting Requirements
const request = require('request');
const cheerio = require('cheerio');
const Knwl = require('knwl.js');
var readlineSync = require('readline-sync');
var knwlInstance = new Knwl('english');   

	//asks user for email and takes domain name from email
	var userName = readlineSync.question('please enter your email account ');
	const domain = userName.replace(/.*@/, "");
	site = 'http://www.' + domain;
	

//sends request to website and checks for a 200 response. If there is no 200 status code, program finishes.
request(site, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
	var string = $.text();
	knwlInstance.init(string);
	var phone = knwlInstance.get("emails");
	console.log(phone);
  }else{
	  console.log(site + " cannot be reached, please restart the program and try again");
  }
});
