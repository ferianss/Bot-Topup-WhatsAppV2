const fs = require('fs')
const chalk = require('chalk')

global.owner = ['6285773305337']
global.botName = 'Titanz Store' //Ganti
global.ownerName = 'JF Dev' //Ganti
global.sessionName = 'session-bot'

global.user = 'justferi' // Daftar di https://j-f.cloud/api/wl/

global.gold = 50000
global.platinum = 100000
global.vip = 300000

// Untuk case 'pay'
global.pay = `Untuk Pembayaran Silahkan Transfer ke Payment dibawah ini

Bank dan E-Wallet
7635169958 | BCA
085773305337 | DANA (+100 perak)
085773305337 | GOPAY
085773305337 | OVO
Pembayaran dari Bank ke E-Wallet Wajib +1500 !!!

Note :
Wajib Sertakan Screenshot Detail Pembayaran!!!
Berani Kirim Bukti TF Palsu atau Bukti punya Orang lain
Auto Kick Permanen!!`

// Mongodb
global.mongodb = "mongodb+srv://zopsgamingshop:zopsgamingshop@botdb.zpg5g.mongodb.net/?appName=botdb" //Ganti url databasemu
global.database = "tester" //Ganti sesuai nama databasemu


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
