
//Setting Requirements
const request = require('request');
const cheerio = require('cheerio');
var readlineSync = require('readline-sync');        
var firstline = require('firstline');

var PhoneNumberReg = "(\\+\\d{1,3}\\s?(\\s\\(0\\))?|0)(\\d{3}\\s?\\d{3}\\s?\\d{4}|\\d{4}\\s?\\d{6})(?![0-9])";
var emailReg = "[A-Za-z][A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\\.[A-Za-z]{3}|(\\.[A-Za-z]{2}){2})";
var postCodeReg = "^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})";

	//asks user for email and takes domain name from email
	var emailAccount = readlineSync.question('please enter your email account ');
	const domain = emailAccount.replace(/.*@/, "");
	site = 'http://www.' + domain;
	

//sends request to website and checks for a 200 response. If there is no 200 status code, program finishes.
request(site, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
	var html = $.html();
	scrapeDate(html,PhoneNumberReg,"phone number");
	scrapeDate(html,emailReg, "email address");
	scrapeDate(html,postCodeReg, "postcode");
  }else{
	  console.log(site + " cannot be reached, please restart the program and try again");
  }
});

//formats scrape from site using regex;
function scrapeDate(scrape, reg, info){
	var matches = scrape.match(reg);
if(matches === null){
	console.log("cannot find address " + info);
}else{
	var slicedData = matches.slice(0,1);
	console.log("the " + info + " is " + slicedData);
}
};


