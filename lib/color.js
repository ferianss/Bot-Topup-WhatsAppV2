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



  

module.exports = {
	color,
	bgcolor
}
