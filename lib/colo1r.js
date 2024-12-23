const chalk = require('chalk')
require('../db/config')
const productData = './db/datadigi.json';
const crypto = require('crypto')
const fs = require('fs')
const { connect } = require('./myfunc')
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const updateServices = async () => {
  
  const cmd = 'prepaid';
  const combinedString = username + apiKey + cmd;
  const signature = crypto.createHash('md5').update(combinedString).digest('hex');
  const endPoint = "https://api.digiflazz.com/v1/price-list";
  const postData = {
    cmd,
    username,
    sign: signature,
  };

  const apiResponse = await connect(endPoint, postData);

  if (apiResponse && apiResponse.data) {
    fs.writeFileSync(productData, JSON.stringify(apiResponse.data, null, 2));
      
    
  }
};

const updateInterval = 30 * 1000; // 30 seconds
setInterval(updateServices, updateInterval);

updateServices();

module.exports = {
	color,
	bgcolor
}
