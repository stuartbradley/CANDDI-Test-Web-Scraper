
//Setting Requirements
const request = require('request');
const cheerio = require('cheerio');
var readlineSync = require('readline-sync');        
var firstline = require('firstline');
var Knwl = require('knwl.js');
var knwlInstance = new Knwl('english');
knwlInstance.register('internationalPhones', require('./node_modules/knwl.js/experimental_plugins/internationalPhones'));



var PhoneNumberReg = "(\\+\\d{1,3}\\s?(\\s\\(0\\))?|0)(\\d{3}\\s?\\d{3}\\s?\\d{4}|\\d{4}\\s?\\d{6})(?![0-9])";
var emailReg = "[A-Za-z][A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\\.[A-Za-z]{3}|(\\.[A-Za-z]{2}){2})";
var AddressReg ="([A-Z]+\\s)*(\\d{1,3}-)?\\d*\\s([A-Z]+,?\\s)+(street|road|avenue|square|lane|grove|fair|hill|drive|circle|crescent|boulevard|parade|close|court|exchange|st|rd|av),?\\s?(([A-Z]+)?,?\\s?){1,2}([A-Z]{1,2}(([0-9]{1,2})|([0-9][A-Z]))\\s[0-9][A-Z]{1,2})";


	//asks user for email and takes domain name from email
	var emailAccount = readlineSync.question('please enter your email account ');
	const domain = emailAccount.replace(/.*@/, "");
	site = 'http://www.' + domain;
	

//sends request to website and checks for a 200 response. If there is no 200 status code, program finishes.
request(site, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
	var html = $.html();
	knwlInstance.init(html);
	var phoneNumber = knwlInstance.get('internationalPhones');
	console.log(phoneNumber);
	scrapeDate(html,PhoneNumberReg);
	scrapeDate(html,emailReg);
	scrapeDate(html,AddressReg);
  }else{
	  console.log(site + " cannot be reached, please restart the program and try again");
  }
});

//formats scrape from site using regex;
function scrapeDate(scrape, reg){
	var matches = scrape.match(reg);
if(matches === null){
	console.log("cannot find address");
}else{
	var information = matches.slice(0,1);
	console.log(information);
}
};


