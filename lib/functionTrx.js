const fs = require('fs');

function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

function generateRandomString(length) {
  var result = 'JF';

  // Tambahkan tanggal saat ini dalam format yyyymmdd
  var currentDate = new Date();
  var formattedDate =
    currentDate.getFullYear().toString().padStart(4, '0') +
    (currentDate.getMonth() + 1).toString().padStart(2, '0') +
    currentDate.getDate().toString().padStart(2, '0');

  result += formattedDate;

  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;

  // Tambahkan huruf acak
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = {
	formatmoney,
	generateRandomString,
};