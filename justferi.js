require('./db/config')
const {
    makeWALegacySocket,
    BufferJSON,
    Browsers,
    initInMemoryKeyStore,
    extractMessageContent,
    makeInMemoryStore,
    proto,
    DisconnectReason,
    useMultiFileAuthState,
    AnyMessageContent,
    fetchLatestBaileysVersion,
    prepareWAMessageMedia,
    downloadContentFromMessage,
    getBinaryNodeChild,
    jidDecode,
    areJidsSameUser,
    generateWAMessage,
    generateForwardMessageContent,
    generateWAMessageContent, 
    generateWAMessageFromContent,
    getAggregateVotesInPollMessage,
    WAMessageStubType,
    getContentType,
    relayMessage,
    WA_DEFAULT_EPHEMERAL,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys")
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const fs = require('fs')
const cron = require('node-cron');
const schedule = require('node-schedule');
const path = require('path')
const glob = require('glob');
const ffmpeg = require('fluent-ffmpeg');
const stream = require('stream');
const nodemailer = require('nodemailer');
let defaultMarkupPercentage = 0.03;
const util = require('util')
const chalk = require('chalk')
const sharp = require('sharp');
const Jimp = require('jimp');
const os = require('os')
const FormData = require('form-data');
const axios = require('axios')
const archiver = require('archiver');
const md5 = require('md5');
const rp = require('request-promise-native')
const fsx = require('fs-extra')
const crypto = require('crypto')
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone')
const {
	createCanvas,
	loadImage,
	registerFont
} = require('canvas')
registerFont('./fonts/notosans.ttf', { family: 'Noto Sans' })
const {
	color,
	bgcolor
} = require('./lib/color')

const {
	generateRandomString
} = require('./lib/functionTrx');
const {
	exec,
	spawn,
	execSync
} = require("child_process")
const {
	smsg,
	tanggal,
	getTime,
	isUrl,
	sleep,
	clockString,
	runtime,
	fetchJson,
	getBuffer,
	jsonformat,
	format,
	parseMention,
	getRandom,
	getGroupAdmins,
	generateUniqueRefID,
	connect
} = require('./lib/myfunc')

let autoUpdateLayanan = false;
let intervalId;
module.exports = client = async (client, m, chatUpdate, store) => {
	try {
		const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
		var budy = (typeof m.text === 'string' ? m.text : '');
		var prefix = "."
		const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
		const hariini = moment.tz('Asia/Jakarta').locale('id').format('YYYY-MM-DD HH:mm:ss');
		const isCmd = body.startsWith(prefix)
		const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		const pushname = m.pushName || "No Name"
		const text = q = args.join(" ")
		const {
			type,
			quotedMsg,
			mentioned,
			now,
			fromMe
		} = m
		const quoted = m.quoted ? m.quoted : m
		const quotes = (quoted.mtype == 'buttonsMessage') ? quoted[Object.keys(quoted)[1]] : (quoted.mtype == 'templateMessage') ? quoted.hydratedTemplate[Object.keys(quoted.hydratedTemplate)[1]] : (quoted.mtype == 'product') ? quoted[Object.keys(quoted)[0]] : m.quoted ? m.quoted : m

		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
		const from = mek.key.remoteJid
		const botNumber = await client.decodeJid(client.user.id)
		const isOwner = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
		const groupMetadata = m.isGroup ? await client.groupMetadata(from).catch(e => {}) : ''
		const groupName = m.isGroup ? groupMetadata.subject : ''
		const participants = m.isGroup ? await groupMetadata.participants : ''
		const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
		const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
		const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		const isGroup = m.key.remoteJid.endsWith('@g.us')
		let db_respon_list = JSON.parse(fs.readFileSync('./db/list.json'));
		let grupConfig = JSON.parse(fs.readFileSync('./db/grup.json'));
		const antilink = JSON.parse(fs.readFileSync('./db/antilink.json'));

		const lastOrderTimes = {};  
		
		const dbs = global.database
		const uri = global.mongodb;
		
		const mClient = new MongoClient(uri, {
		  connectTimeoutMS: 60000, 
		  serverSelectionTimeoutMS: 60000,
		  serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true
		  }
		});
		
		const apikey_jf = 'JFfP9diDDgxRUob1pPgMKEY';
		const paydisiniApikey = '21ec45f166376cb271d0030fc347b547';
		const fUri = 'mongodb+srv://justferianss:Bkzutr9090!@botdb.vbuzlbh.mongodb.net/?appName=botdb';
		const fClient = new MongoClient(fUri, {
		  connectTimeoutMS: 60000, 
		  serverSelectionTimeoutMS: 60000,
		  serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true
		  }
		});

		const time1 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
		if (time1 < "23:59:00") {
			var ucapanWaktu1 = 'Malam'
		}
		if (time1 < "19:00:00") {
			var ucapanWaktu1 = 'Malam'
		}
		if (time1 < "18:00:00") {
			var ucapanWaktu1 = 'Sore'
		}
		if (time1 < "15:00:00") {
			var ucapanWaktu1 = 'Siang'
		}
		if (time1 < "10:00:00") {
			var ucapanWaktu1 = 'Pagi'
		}
		if (time1 < "05:00:00") {
			var ucapanWaktu1 = 'Pagi'
		}
		if (time1 < "03:00:00") {
			var ucapanWaktu1 = 'Malam'
		}

		const content = JSON.stringify(m.message)
		const fdocc = {
			key: {
				participant: '0@s.whatsapp.net',
				...(m.chat ? {
					remoteJid: `status@broadcast`
				} : {})
			},
			message: {
				documentMessage: {
					title: `*Selamat ${ucapanWaktu1} ${pushname}*`,
					jpegThumbnail: m,
				}
			}
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' +
				'VERSION:3.0\n' +
				'FN:' + name + '\n' +
				'ORG:;\n' +
				'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
				'END:VCARD'
			return client.sendMessage(from, {
				contacts: {
					displayName: name,
					contacts: [{
						vcard
					}]
				},
				mentions: mn ? mn : []
			}, {
				quoted: quoted
			})
		}

		const owned = `${global.owner}@s.whatsapp.net`
		const numberQuery = text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
		const kiw = sender.split("@")[0]
		const formatSaldo = (amount) => `Rp. ${amount.toLocaleString()}`;

		if (!client.public) {
			if (!m.key.fromMe) return
		}
		if (m.message) {
			console.log(chalk.red(chalk.bgBlack('[ PESAN ] => ')), chalk.white(chalk.bgBlack(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender.split("@")[0]) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat'), chalk.magenta(`\nJam :`) + time1)
		}
		
		// Antilink & Afk
        const isAntiLink = isGroup ? antilink.includes(from) : false
        if (isGroup && isAntiLink && !isOwner && !isAdmins && isBotAdmins){
                    if (chath.includes(`https://`)) {
                        await client.sendMessage(from, { delete: m.key })
                        m.reply(`🛡 *Link Terdeteksi* 🛡\n\nDilarang share Link!!`)
                        let number = sender
        
                    } else if (chath.includes(`http://`)) {
                        await client.sendMessage(from, { delete: m.key })
                        m.reply(`🛡 *Link Terdeteksi* 🛡\n\nDilarang share Link!!`)
                        let number = sender
        
                    } else if (chath.includes(`www.`)) {
                        await client.sendMessage(from, { delete: m.key })
                        m.reply(`🛡 *Link Terdeteksi* 🛡\n\nDilarang share Link!!`)
                        let number = sender
        
                    } else if (chath.includes(`wa.me`)) {
                        await client.sendMessage(from, { delete: m.key })
                        m.reply(`🛡 *Link Terdeteksi* 🛡\n\nDilarang share Link!!`)
                        let number = sender
        
                    } else if (chath.includes(`https://chat.whatsapp.com`)) {
                        await client.sendMessage(from, { delete: m.key })
                        m.reply(`🛡 *Link Terdeteksi* 🛡\n\nDilarang share Link!!`)
                        let number = sender
        
                    }
            }
		
		/* ADDLIST FUNCTION */
		
		function TelegraPh(Path) {
			return new Promise(async (resolve, reject) => {
				if (!fs.existsSync(Path)) return reject(new Error("File not Found"));
				
				try {
					const form = new FormData();
					form.append('image', fs.createReadStream(Path), 'image.png');  // Use 'image' as per API

					const response = await axios.post('https://j-f.cloud/api/tourl.php', form, {
						headers: {
							...form.getHeaders(),
						}
					});

					const result = response.data;
					console.log(result)

					if (result.status === 'success' && result.url) {
						return resolve(result.url);
					} else {
						return reject(new Error("Unexpected response from API"));
					}
				} catch (err) {
					console.error("Error uploading to j-f.cloud:", err.response ? err.response.data : err.message);
					return reject(new Error(`Error uploading file: ${err.message}`));
				}
			});
		}
		
		function getDataResponList(groupID, key, _db) {
			let position = null
			Object.keys(_db).forEach((x) => {
				if (_db[x].id === groupID && _db[x].key === key) {
					position = x
				}
			})
			if (position !== null) {
				return _db[position]
			}
		}
		
		function isAlreadyResponList(groupID, key, _db) {
			let found = false
			Object.keys(_db).forEach((x) => {
				if (_db[x].id === groupID && _db[x].key === key) {
					found = true
				}
			})
			return found
		}
		
		if (isAlreadyResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)) {
            var get_data_respon = getDataResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list)
            if (get_data_respon.isImage === false) {
                client.sendMessage(m.chat, { text: sendResponList((m.isGroup ? m.chat: botNumber), body.toLowerCase(), db_respon_list) }, {
                    quoted: m
                })
            } else {
                client.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: m
                })
            }
        }
		
		function sendResponList(groupId, key, _dir) {
			let position = null
			Object.keys(_dir).forEach((x) => {
				if (_dir[x].id === groupId && _dir[x].key === key) {
					position = x
				}
			})
			if (position !== null) {
				return _dir[position].response
			}
		}
		
		function addResponList(groupID, key, response, isImage, image_url, _db) {
			var obj_add = {
				id: groupID,
				key: key,
				response: response,
				isImage: isImage,
				image_url: image_url
			}
			_db.push(obj_add)
			fs.writeFileSync('./db/list.json', JSON.stringify(_db, null, 3))
		}
		
		function delResponList(groupID, key, _db) {
			let position = null
			Object.keys(_db).forEach((x) => {
				if (_db[x].id === groupID && _db[x].key === key) {
					position = x
				}
			})

			if (position !== null) {
				_db.splice(position, 1)
				fs.writeFileSync('./db/list.json', JSON.stringify(_db, null, 3))
			}
		}
		
		function updateResponList(groupID, key, response, isImage, image_url, _db) {
			let position = null
			Object.keys(_db).forEach((x) => {
				if (_db[x].id === groupID && _db[x].key === key) {
					position = x
				}
			})
			if (position !== null) {
				_db[position].response = response
				_db[position].isImage = isImage
				_db[position].image_url = image_url
				fs.writeFileSync('./db/list.json', JSON.stringify(_db, null, 3))
			}
		}
		
		function isAlreadyResponListGroup(groupID, _db) {
			let found = false
			Object.keys(_db).forEach((x) => {
				if (_db[x].id === groupID) {
					found = true
				}
			})
			return found
		}
		
		/* ADDLIST FUNCTION */
		
		// MONGODB FUNCTION
		
		async function getMarkupConfig() {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const markupConfigCollection = db.collection('markup');

				const config = await markupConfigCollection.findOne({});
				return config || {};
			} catch (error) {
				console.error('Error fetching markup configuration:', error);
				throw error;
			} finally {
				await mClient.close();
			}
		}

		let markupConfig = {};

		try {
			markupConfig = await getMarkupConfig();
		} catch (error) {
			console.error('Error reading markup configuration:', error);
		}
		
		async function myInfo(sender, m, pushname) {
				try {
					await mClient.connect();
					const database = mClient.db(dbs);
					const usersCollection = database.collection('users');
					const pointsCollection = database.collection('points');
					
					const userNomor = sender.split("@")[0];
					const userProfile = await usersCollection.findOne({ nomor: userNomor });

					if (!userProfile) {
						m.reply('Kamu belum terdaftar, silahkan ketik *Daftar* dan cek email kamu untuk verifikasi.');
						return;
					}
					const { nomor, saldo, role } = userProfile;
					
					const formatSaldo = (amount) => `Rp. ${amount.toLocaleString()}`;
					const profileMessage = `──〔 *Profile* 〕──

*Username*: ${pushname}
*Nomor:* ${nomor}
*Saldo:* ${formatSaldo(saldo)}
*Role:* ${role}

Cek riwayat transaksi mu dengan cara
ketik *Cekriwayat*

Ingin upgrade role?
ketik *UPGRADE*`;
					m.reply(profileMessage);
				} catch (err) {
					console.error(err);
					m.reply('Terjadi kesalahan pada server');
				} finally {
					await mClient.close();
				}
			}
			
		async function registerUser(sender, m, client, reactionWait, reactionDone) {

			try {
				await mClient.connect();
				const database = mClient.db(dbs);
				const usersCollection = database.collection('users');

				const target = sender.split("@")[0];
				const existingUser = await usersCollection.findOne({
					nomor: target
				});

				if (existingUser) {
					return m.reply(`Kamu sudah terdaftar\nRole kamu adalah ${existingUser.role}`);
				} else {
					const defaultRole = 'BRONZE';
					const newUser = {
						nomor: target,
						saldo: 0,
						role: defaultRole,
					};

					await usersCollection.insertOne(newUser);

					return client.sendText(m.chat, `─〔 *REGISTRASI SUKSES* 〕─\n\n*Nomer :* ${target}\n*Role :* BRONZE\n*Saldo :* 0`);
				}
			} catch (err) {
				console.error("Error in register command:", err);
				client.sendText(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
			} finally {
				await mClient.close();
			}
		}
		
		async function registerUsers(sender, m, client) {
			try {
				await mClient.connect();
				const database = mClient.db(dbs);
				const usersCollection = database.collection('users');

				const target = sender.split("@")[0];
				const existingUser = await usersCollection.findOne({
					nomor: target
				});

				if (existingUser) {
					return
				} else {
					const defaultRole = 'BRONZE';
					const newUser = {
						nomor: target,
						saldo: 0,
						role: defaultRole,
					};

					await usersCollection.insertOne(newUser);

					//return client.sendText(m.chat, `─〔 *REGISTRASI SUKSES* 〕─\n\n*Nomer :* ${target}\n*Role :* BRONZE\n*Saldo :* 0\n\nKetik *menu* untuk lihat daftar.`, m);
				}
			} catch (err) {
				console.error("Error in register command:", err);
				client.sendText(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
			} finally {
				await mClient.close();
			}
		}
		await registerUsers(sender, m, client)

		async function getUserProfile(nomor) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const userCollection = db.collection('users');

				const userProfile = await userCollection.findOne({
					nomor: nomor
				});
				return userProfile;

			} catch (error) {
				console.error("Error in getUserProfile:", error);
				return {
					error: 'Terjadi kesalahan saat mengambil data pengguna.'
				};
			} finally {
				await mClient.close();
			}
		}
		
		async function addTransaction(transaction) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const transactionsCollection = db.collection('trx');

				await transactionsCollection.insertOne(transaction);
				return {
					success: true
				};

			} catch (error) {
				console.error("Error in addTransaction:", error);
				return {
					error: 'Terjadi kesalahan saat menambahkan transaksi.'
				};
			} finally {
				await mClient.close();
			}
		}
		
		async function addProfit(profit) {
			try {
				await fClient.connect();
				const db = fClient.db('botdb');
				const transactionsCollection = db.collection('pendapatan');

				await transactionsCollection.insertOne(profit);
				return {
					success: true
				};

			} catch (error) {
				console.error("Error in addProfit:", error);
				return {
					error: 'Terjadi kesalahan saat menambahkan transaksi.'
				};
			} finally {
				await fClient.close();
			}
		}
		
		async function getTransactions() {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const transactionsCollection = db.collection('trx');
				const transactions = await transactionsCollection.find({}).toArray();
				return transactions;
			} catch (error) {
				console.error("Error in getTransactions:", error);
				return [];
			} finally {
				await mClient.close();
			}
		}
		
		async function getTransactionsByUser(nomor) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const transactionsCollection = db.collection('trx');
				const transactions = await transactionsCollection.find({
					nomor: nomor,
					status: 'Sukses'
				}).toArray();
				return transactions;
			} catch (error) {
				console.error("Error in getTransactionsByUser:", error);
				return [];
			} finally {
				await mClient.close();
			}
		}
		
		async function getUserByNumber(nomor) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');
				const user = await usersCollection.findOne({nomor: nomor});
				return user;
			} catch (error) {
				console.error("Error in getUserByNumber:", error);
				return null;
			} finally {
				await mClient.close();
			}
		}

		async function updateUser(nomor, saldo) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');
				const result = await usersCollection.updateOne({nomor: nomor}, {$set: {saldo: saldo}}, {upsert: true});
				return result;
			} catch (error) {
				console.error("Error in updateUser:", error);
				return null;
			} finally {
				await mClient.close();
			}
		}
		
		async function addUserSaldo(target, amountToAdd) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');

				const targetUser = await usersCollection.findOne({
					nomor: target
				});
				if (!targetUser) {
					return null;
				}

				const sebelum = targetUser.saldo || 0;
				const updatedSaldo = sebelum + amountToAdd;

				await usersCollection.updateOne({
					nomor: target
				}, {
					$set: {
						saldo: updatedSaldo
					}
				});

				return {
					sebelum,
					sekarang: updatedSaldo
				};
			} catch (error) {
				console.error("Error in addUserSaldo:", error);
				throw error;
			} finally {
				await mClient.close();
			}
		}
		
		async function rmvUserSaldo(target, amountToAdd) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');

				const targetUser = await usersCollection.findOne({
					nomor: target
				});
				if (!targetUser) {
					return null;
				}

				const sebelum = targetUser.saldo || 0;
				const updatedSaldo = sebelum - amountToAdd;

				await usersCollection.updateOne({
					nomor: target
				}, {
					$set: {
						saldo: updatedSaldo
					}
				});

				return {
					sebelum,
					sekarang: updatedSaldo
				};
			} catch (error) {
				console.error("Error in rmvUserSaldo:", error);
				throw error;
			} finally {
				await mClient.close();
			}
		}

		async function setMarkupConfig(markupConfig) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const markupCollection = db.collection('markup');

				await markupCollection.updateOne({}, {
					$set: markupConfig
				}, {
					upsert: true
				});
			} catch (error) {
				console.error("Error setting markup configuration:", error);
				throw error;
			} finally {
				await mClient.close();
			}
		}
		
		async function updateRole(target, newRole) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');
				const result = await usersCollection.findOneAndUpdate({nomor: target}, {$set: {role: newRole.toUpperCase()}}, {returnDocument: 'after'});
				console.log('FindOneAndUpdate result:', result);

				if (!result.nomor) return m.reply('User/Role tidak ditemukan dalam database/');
				

				return {
					awal: result.role,
					baru: newRole.toUpperCase()
				};
			} catch (error) {
				console.error("Error updating user role:", error);
				throw error;
			} finally {
				await mClient.close();
			}
		}
		
		async function getUsers(filter = {}) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');

				const users = await usersCollection.find(filter).toArray();

				return users;
			} catch (error) {
				console.error("Error fetching users:", error);
				throw error;
			} finally {
				await mClient.close();
			}
		}
		
		async function fetchUserProfile(nomor) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');

				const userProfile = await usersCollection.findOne({
					nomor
				});

				return userProfile;
			} catch (error) {
				console.error('Error fetching user profile:', error);
				return null;
			} finally {
				await mClient.close();
			}
		}

		async function updateUserSaldo(nomor, newSaldo) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');
				await usersCollection.updateOne({
					nomor
				}, {
					$set: {
						saldo: newSaldo
					}
				});
			} catch (error) {
				console.error('Error updating user saldo:', error);
				throw error;
			} finally {
				await mClient.close();
			}
		}
		
		async function updateUserRole(nomor, newRole, newSaldo) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');
				await usersCollection.updateOne({
					nomor
				}, {
					$set: {
						role: newRole,
						saldo: newSaldo
					}
				});
			} catch (error) {
				console.error('Error updating user role:', error);
				throw error;
			} finally {
				await mClient.close();
			}
		}

		async function updateUserBalance(nomor, amount) {
			try {
				await mClient.connect();
				const db = mClient.db(dbs);
				const usersCollection = db.collection('users');
				await usersCollection.updateOne({
					nomor: nomor
				}, {
					$inc: {
						saldo: amount
					}
				});
			} catch (error) {
				console.error('Error updating user balance:', error);
			}
		}
		
		async function getJFProducts(nomor, requestedBrand) {
			const postData = {
				api_key: apikey_jf
			};
			await mClient.connect();
			const db = mClient.db(dbs);

			try {
				const response = await fetch('https://topup.j-f.cloud/api/products', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postData)
				});

				const data = await response.json();

				if (!data.status) {
					return { error: 'Gagal mengambil data dari JFSTORE API.' };
				}

				const userCollection = db.collection('users');
				const userProfile = await userCollection.findOne({ nomor: nomor });

				if (!userProfile) {
					return { error: 'Kamu belum terdaftar, silahkan ketik *Daftar*.' };
				}

				const { role } = userProfile;
				const products = data.data.filter(product =>
					new RegExp(`^${requestedBrand}$`, 'i').test(product.category)
				);

				if (products.length === 0) {
					return { error: `Tidak ada produk dengan nama *${requestedBrand.toUpperCase()}*.` };
				}

				products.sort((a, b) => a.gold_price - b.gold_price);

				return { role, products };
			} catch (error) {
				console.error("Error in getJFProducts:", error);
				return { error: 'Terjadi kesalahan saat mengambil data.' };
			} finally {
				await mClient.close();
			}
		}

		async function getJFProductId(productId) {
			const postData = {
				api_key: apikey_jf
			};

			try {
				const response = await fetch('https://topup.j-f.cloud/api/products', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postData)
				});

				const data = await response.json();

				if (!data.status) {
					console.error('Gagal mengambil data dari JFSTORE API.');
					return null;
				}

				const regex = new RegExp(`^${productId}$`, 'i');
				return data.data.find(product => regex.test(product.product_id));
			} catch (error) {
				console.error("Error in getJFProductId:", error);
				return null;
			}
		}
		
		async function statusOrderPaydisini(unique_code, startTime, m, product, target, quantity, userProfile, nomor, adjustedPrice, originalPrice , qrMessage) {
			const currentTime = Date.now();
			const toUser = sender.split("@")[0];
			const sign = md5(paydisiniApikey + unique_code + "StatusTransaction");

			const formData = new FormData();
			formData.append("key", paydisiniApikey);
			formData.append("request", "status");
			formData.append("unique_code", unique_code);
			formData.append("signature", sign);

			try {
				const response = await axios.post('https://paydisini.co.id/api/', formData, {
					headers: formData.getHeaders()
				});

				const responseData = response.data;

				if (responseData.success === true) {
					const data = responseData.data;

					if (data.status === 'Success') {
						
						for (let i = 0; i < quantity; i++) {
							const orderData = {
								api_key: apikey_jf,
								product_id: product.product_id, 
								target: target,
								nomor: global.owner
							};

							try {
								const orderResponse = await axios.post('https://topup.j-f.cloud/api/order', orderData, {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									}
								});

								const orderResult = orderResponse.data;

								if (orderResult.status) {
									const nickname = orderResult.data.username ? orderResult.data.username : '-';
									let invo = `╭────[ *STATUS TRANSAKSI* ]\n`;
									invo += `│\n`;
									invo += `│ *${product.product_name}*\n`;
									invo += `│ Tujuan : *${target}*\n`;
									invo += `│ Nickname : *${nickname}*\n`;
									invo += `│ ID Trx : *${orderResult.data.trx_id}*\n`;
									invo += `│ Status Pembayaran : *PAID ✅*\n`;
									invo += `│\n`;
									invo += `│ ⏳ _Sedang diproses..._ ⏳\n`;
									invo += `╰────[ *${global.botName}* ]`;
									client.sendText(m.chat, invo, m);

									const trx_id = orderResult.data.trx_id;

									const checkStatus = async () => {
										const statusData = {
											api_key: apikey_jf,
											trx_id: trx_id
										};

										try {
											const statusResponse = await axios.post('https://topup.j-f.cloud/api/order/status', statusData, {
												headers: {
													'Content-Type': 'application/x-www-form-urlencoded'
												}
											});

											const statusResult = statusResponse.data;

											if (statusResult.data.status === 'Sukses') {
												let invos = `╭────[ *STATUS TRANSAKSI* ]\n`;
												invos += `│\n`;
												invos += `│ ID Trx : *${statusResult.data.trx_id}*\n`;
												invos += `│ Status : *Sukses ✅*\n`;
												invos += `│ Date : *${hariini}*\n`;
												if (product_id.startsWith('pln')) {
													invos += `│ SN : *${statusResult.data.serial_number}*\n`;
												}
												invos += `│\n`;
												invos += `│ _Terima kasih sudah order._\n`;
												invos += `╰────[ *${global.botName}* ]`;
												client.sendText(m.chat, invos, m);

												const transaction = {
													nomor: nomor,
													status: statusResult.data.status,
													invoice: statusResult.data.trx_id,
													item: product.product_name,
													rc: '',
													tujuan: `${target}`,
													harga: `${adjustedPrice}`,
													waktu: `${hariini}`,
												};
												await addTransaction(transaction);
												
												const netIncome = Math.round(adjustedPrice - originalPrice);
												const newProfit = {
													status: statusResult.data.status,
													owner: `${global.user}`,
													no_owner: `${global.owner}`,
													pendapatan: `${netIncome}`,
													waktu: `${hariini}`,
												};
												await addProfit(newProfit);

												let toOwn = `*── 「 LAPORAN TRANSAKSI 」 ──*\n\n`;
												toOwn += `Nama : *${pushname}*\n`;
												toOwn += `Nomor : *${m.sender.split("@")[0]}*\n`;
												toOwn += `Harga Jual : *Rp ${adjustedPrice.toLocaleString()}*\n`;
												toOwn += `Pendapatan : *Rp ${netIncome.toLocaleString()}*\n`;
												toOwn += `Produk : *${product.product_name}*\n`;
												toOwn += `Tujuan : *${target}*`;

												global.owner.forEach(owner => {
													let ownedd = `${owner}@s.whatsapp.net`;
													setTimeout(() => {
														client.sendMessage(ownedd, {
															text: toOwn
														})
													}, 10000);
												});

												clearInterval(statusInterval);

											} else if (statusResult.data.status === 'Gagal') {
												let invos = `╭────[ *STATUS TRANSAKSI* ]\n`;
												invos += `│\n`;
												invos += `│ ID Trx : *${statusResult.data.trx_id}*\n`;
												invos += `│ Status : *Gagal❌*\n`;
												invos += `│ Date : *${hariini}*\n`;
												invos += `│\n`;
												invos += `│ _Terima kasih sudah order._\n`;
												invos += `╰────[ *${global.botName}* ]`;
												client.sendText(m.chat, invos, m);

												clearInterval(statusInterval);

												await updateUserBalance(nomor, +adjustedPrice);

											}

										} catch (error) {
											console.error(error);
											m.reply(`Terjadi kesalahan saat menghubungi API untuk memeriksa status. Silahkan coba lagi nanti.`);
											clearInterval(statusInterval);
										}
									};

									const statusInterval = setInterval(checkStatus, 10 * 1000);

								} else if (orderResult.status === 'Canceled') {
									await m.reply('Pembayaran sudah dibatalkan.\nSilahkan lakukan deposit ulang!');
								}

							} catch (error) {
								console.error("Order Error:", error);
								m.reply('Terjadi kesalahan saat memproses order.');
							}
						}
					} else if (data.status === 'Canceled') {
						await m.reply('Pembayaran sudah dibatalkan.\nSilahkan lakukan deposit ulang!');
					} else {
						if (currentTime - startTime < 300000) {
							setTimeout(() => {
								statusOrderPaydisini(unique_code, startTime, m, product, target, quantity, userProfile, nomor, adjustedPrice, originalPrice , qrMessage);
							}, 10000);
						} else {
							await m.reply('QR sudah kadaluwarsa.\nSilahkan lakukan order ulang!');

							client.sendMessage(m.chat, {
								delete: {
									remoteJid: qrMessage.chat,
									id: qrMessage.id,
									participant: qrMessage.sender
								}
							});
						}
					}
				} else {
					await m.reply(responseData.msg);
				}

			} catch (error) {
				console.error('An error occurred:', error);
				await m.reply('Terjadi kesalahan saat memeriksa status pembayaran.');
			}
		}
		
		// MONGODB FUNCTION
		
		// SESI
		
		const getSessionFilePath = (sender) => {
			return path.join(__dirname, 'sesi', `${sender.split('@')[0]}.json`);
		};

		// Batalkan perintah
		const pathTrx = "./sesi/";
		if (budy.toLowerCase() === "cancel") {
		  const { sender } = m;
		  if (fs.existsSync(`${pathTrx}${sender.split("@")[0]}.json`)) {
			m.reply("Perintah telah dibatalkan.");
			return fs.unlinkSync(`${pathTrx}${sender.split("@")[0]}.json`);
		  }
		  if (!fs.existsSync(`${pathTrx}${sender.split("@")[0]}.json`)) return;
		}
		
		// SESI

		function generateRandomTicket(length) {
			var result = '';
			var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			var charactersLength = characters.length;

			for (var i = 0; i < length; i++) {
				var randomIndex = Math.floor(Math.random() * charactersLength);
				result += characters.charAt(randomIndex);
			}
			result = 'JF' + result + 'WD';
			return result;
		}

		function removeHTMLTags(str) {
			return str.replace(/<\/?[^>]+(>|)/g, "\n");
		}

		function formatmoney(n, opt = {}) {
			if (!opt.current) opt.current = "IDR"
			return n.toLocaleString("id", {
				style: "currency",
				currency: opt.current
			})
		}
		
		const reactionWait = {
			react: {
				text: "🕒",
				key: m.key
			}
		}
		
		const reactionDone = {
			react: {
				text: "✅",
				key: m.key
			}
		}

		switch (command) {
			
			case 'menu': {
				let menuq = `Hallo *@${m.sender.split('@')[0]}*, Selamat berbelanja di *${global.botName}*\n`;
				menuq += `Ketik salah satu menu berikut\n\n`;
				menuq += `╭────[ *Produk Digital* ]\n`;
				menuq += `│ • E-money\n`;
				menuq += `│ • Games\n`;
				menuq += `│ • PLN\n`;
				menuq += `│ • Pulsa\n`;
				menuq += `│ • Sewabot\n`;
				menuq += `├────[ *Menu Profile* ]\n`;
				menuq += `│ • CekRiwayat\n`;
				menuq += `│ • CekTrx\n`;
				menuq += `│ • Pay\n`;
				menuq += `│ • Upgrade\n`;
				menuq += `├────[ *Menu Publik* ]\n`;
				menuq += `│ • Sticker\n`;
				menuq += `│ • CekEwallet\n`;
				menuq += `│ • CekRekening\n`;
				menuq += `│ • Cekml -> Cek nickname Mobile Legends\n`;
				menuq += `│ • Cekff -> Cek nickname Free Fire\n`;
				menuq += `│ • KalkulatorML\n`;
				menuq += `├────[ *Menu Owner* ]\n`;
				menuq += `│ • Dashboard\n`;
				menuq += `╰────[ *${global.botName}* ]\n\n🧑‍💻 ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ : ᴊꜰ ᴅᴇᴠ`;

				return client.sendTextWithMentions(m.chat, menuq, m);
			}
			break;
			
			case 'dashboard':
			case 'ownermenu': {
				
				if (!isOwner) return m.reply('Fitur khusus owner!')

				const fs = require('fs').promises;
				const {
					ChartJSNodeCanvas
				} = require('chartjs-node-canvas');
				const {
					DateTime
				} = require('luxon');

				const width = 800;
				const height = 600;
				const chartJSNodeCanvas = new ChartJSNodeCanvas({
					width,
					height,
					backgroundColour: 'white'
				});

				async function fetchData() {
					try {
						await mClient.connect();
						const db = mClient.db(dbs);
						const transactionsCollection = db.collection('trx');

						const data = await transactionsCollection.find().toArray();

						return data;
					} catch (error) {
						console.error('Error fetching transactions:', error);
						return [];
					} finally {
						await mClient.close();
					}
				}

				const parseDate = (dateString) => {
					return DateTime.fromSQL(dateString, {
						zone: 'Asia/Jakarta'
					}).toJSDate();
				};

				const data = await fetchData();
				const today = DateTime.now().setZone('Asia/Jakarta').startOf('day').toJSDate();
				const currentMonth = today.getMonth();
				const currentYear = today.getFullYear();

				let salesTodaySuccess = 0;
				let salesTodayFail = 0;
				let salesThisMonthSuccess = 0;
				let salesThisMonthFail = 0;
				let totalSalesSuccess = 0;
				let totalSalesFail = 0;

				const dailySalesSuccess = new Array(31).fill(0);
				const dailySalesFail = new Array(31).fill(0);

				data.forEach((transaction) => {
					const transactionDate = parseDate(transaction.waktu);
					const transactionValue = parseFloat(transaction.harga);

					if (transaction.status === 'Sukses') {
						totalSalesSuccess += transactionValue;
						if (transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === currentMonth) {
							salesThisMonthSuccess += transactionValue;
							dailySalesSuccess[transactionDate.getDate() - 1] += transactionValue;
						}
						if (transactionDate.toDateString() === today.toDateString()) {
							salesTodaySuccess += transactionValue;
						}
					} else if (transaction.status === 'Gagal') {
						totalSalesFail += transactionValue;
						if (transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === currentMonth) {
							salesThisMonthFail += transactionValue;
							dailySalesFail[transactionDate.getDate() - 1] += transactionValue;
						}
						if (transactionDate.toDateString() === today.toDateString()) {
							salesTodayFail += transactionValue;
						}
					}
				});

				const generateChart = async () => {
					const configuration = {
						type: 'line',
						data: {
							labels: dailySalesSuccess.map((_, i) => i + 1),
							datasets: [{
								label: 'Penjualan Sukses Bulan Ini',
								data: dailySalesSuccess,
								borderColor: 'rgba(75, 192, 192, 1)',
								backgroundColor: 'rgba(75, 192, 192, 0.2)',
							}, {
								label: 'Penjualan Gagal Bulan Ini',
								data: dailySalesFail,
								borderColor: 'rgba(255, 99, 132, 1)',
								backgroundColor: 'rgba(255, 99, 132, 0.2)',
							}]
						},
						options: {
							scales: {
								x: {
									title: {
										display: true,
										text: 'Tanggal'
									}
								},
								y: {
									title: {
										display: true,
										text: 'Penjualan (dalam harga)'
									}
								}
							}
						}
					};
					return chartJSNodeCanvas.renderToBuffer(configuration);
				};

				const chartBuffer = await generateChart();
				
				let caps = `*「 DASHBOARD ADMIN 」*\n\n`;
				caps += `Penjualan Sukses Hari Ini :\n╰─>Rp ${salesTodaySuccess.toLocaleString()}\n`;
				caps += `Penjualan Sukses Bulan Ini :\n╰─>Rp ${salesThisMonthSuccess.toLocaleString()}\n`;
				caps += `Total Penjualan Sukses :\n╰─>Rp ${totalSalesSuccess.toLocaleString()}\n\n`;
				caps += `Penjualan Gagal Hari Ini :\n╰─>Rp ${salesTodayFail.toLocaleString()}\n`;
				caps += `Penjualan Gagal Bulan Ini :\n╰─>Rp ${salesThisMonthFail.toLocaleString()}\n`;
				caps += `Total Penjualan Gagal :\n╰─>Rp ${totalSalesFail.toLocaleString()}\n\n`;

				caps += `╭────[ ${global.botName} ]\n`
                caps += `│ • Account\n`
                caps += `├─────────────\n`
                caps += `│ • Addlist\n`
				caps += `│ • Antilink on/off\n`
                caps += `│ • Updatelist\n`
                caps += `│ • Dellist\n`
                caps += `│ • Ubahrole\n`
                caps += `│ • Setpay\n`
                caps += `│ • Resetlist\n`
                caps += `│ • Renamekey\n`
                caps += `│ • Hidetag/H\n`
                caps += `│ • Open/Close\n`
                caps += `│ • Linkgroup\n`
                caps += `│ • Kick/K\n`
                caps += `│ • Join\n`
                caps += `│ • Getip\n`
                caps += `╰────[ ${global.botName} ]\n\n🧑‍💻 ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ : ᴊꜰ ᴅᴇᴠ`
				await client.sendMessage(m.chat, {
					image: chartBuffer,
					caption: caps
				}, {
					quoted: m
				});
			}
			break
			
			case 'sewabot': {
				let sewa = `Mau Buka Top-Up Store Sendiri, Tapi Bingung Mulai Dari Mana? Budget Minim?

Nggak usah khawatir! Kami hadir dengan solusi praktis: Jasa Sewa Bot Top-Up. Nggak perlu pusing mikirin stok, tinggal isi saldo deposit, dan kamu sudah siap jualan diamond, pulsa, kuota, dan banyak lagi!

Keuntungan yang bisa kamu dapatkan:
» Jualan Tanpa Ribet: Cukup isi deposit, langsung bisa jualan produk digital.
» Request Sesuai Kebutuhan: Bahan game, pulsa, kuota, dll, tinggal request, kami yang urus!
» Terpercaya & Terbukti: Lebih dari 30+ klien dengan 100+ order setiap hari.

✨ Baru! Jasa Pembuatan Website Top-Up! Bikin website top-up yang keren dan profesional untuk bisnismu. Siap dipakai, user-friendly, dan bikin usaha top-up kamu makin lancar! 💻🚀

Hubungi kami sekarang untuk info lebih lanjut: 
📩 PM: https://wa.me/6285773305337
🌐 Website: https://topup.j-f.cloud/jasaweb
🔍 Testimoni: https://t.me/testi_jfstore

Jangan tunggu lagi, mulai bisnismu hari ini dengan modal kecil tapi untung besar!`
				client.sendMessage(m.chat, { image: { url: 'https://j-f.cloud/api/assets/gambar/670b647e610c7_1728799870.png' }, caption: sewa }, { quoted : m });

			}
			break
			
			case 'games': {
				let message = `Hallo *@${m.sender.split('@')[0]}*, Selamat berbelanja di *${global.botName}*\n`;
				message += `╭────[ *Menu Games* ]\n`;
				message += `│ Penggunaan: *Get* ML\n`
				message += `│\n`
				message += `│ • *AOV* -> Arena of Valor\n`;
				message += `│ • *AU2* -> AU2 Mobile\n`;
				message += `│ • *BS* -> Blood Strike\n`;
				message += `│ • *CODM* -> Call of Duty Mobile\n`;
				message += `│ • *FF* -> Free Fire\n`;
				message += `│ • *GI* -> Genshin Impact\n`;
				message += `│ • *HOK* -> Honor of Kings\n`;
				message += `│ • *HSR* -> Honkai Star Rail\n`;
				message += `│ • *WR* -> League of Legends Wild Rift\n`;
				message += `│ • *MC* -> Magic Chess Go Go\n`;
				message += `│ • *ML* -> Mobile Legends Indo\n`;
				message += `│ • *MLBR* -> Mobile Legends Brazil\n`;
				message += `│ • *MLG* -> Mobile Legends Global\n`;
				message += `│ • *MLPH* -> Mobile Legends Philipina\n`;
				message += `│ • *MLMY* -> Mobile Legends Malaysia\n`;
				message += `│ • *PB* -> Point Blank\n`;
				//message += `│ • *PGR1* -> Punishing Gray Raven Android\n`;
				//message += `│ • *PGR2* -> Punishing Gray Raven IOS\n`;
				message += `│ • *PUBG* -> PUBG Mobile Indo\n`;
				message += `│ • *PMG* -> PUBG Mobile Global\n`;
				message += `│ • *UD* -> Undawn\n`;
				message += `│ • *VMY* -> Valorant Malaysia\n`;
				message += `│\n`
				message += `╰────[ *${global.botName}* ]`;

				return client.sendTextWithMentions(m.chat, message, m);
			}
			break;

			case 'pulsa': {
				let message = `Hallo *@${m.sender.split('@')[0]}*, Selamat berbelanja di *${global.botName}*\n`;
				message += `╭────[ *Menu Pulsa* ]\n`;
				message += `│ Penggunaan: *Get* INDOSAT\n`
				message += `│\n`
				message += `│ • *BY.U* -> BY.U\n`;
				message += `│ • *INDOSAT* -> Indosat\n`;
				message += `│ • *TELKOMSEL* -> Telkomsel\n`;
				message += `│ • *TRI* -> TRI\n`;
				message += `│\n`
				message += `╰────[ *${global.botName}* ]`;

				return client.sendTextWithMentions(m.chat, message, m);
			}
			break;
			
			case 'e-money': {
				let message = `Hallo *@${m.sender.split('@')[0]}*, Selamat berbelanja di *${global.botName}*\n`;
				message += `╭────[ *Menu E-Money* ]\n`;
				message += `│ Penggunaan: *Get* DANA\n`
				message += `│\n`
				message += `│ • *OVO* -> OVO\n`;
				message += `│ • *GOPAY* -> Go Pay\n`;
				message += `│ • *DANA* -> Dana\n`;
				message += `│ • *SPAY* -> Shopee Pay\n`;
				message += `│\n`
				message += `╰────[ *${global.botName}* ]`;

				return client.sendTextWithMentions(m.chat, message, m);
			}
			break;
			
			case 'pln': {
				let message = `Hallo *@${m.sender.split('@')[0]}*, Selamat berbelanja di *${global.botName}*\n`;
				message += `╭────[ *Menu PLN* ]\n`;
				message += `│ Penggunaan: *Get* PLN\n`
				message += `│\n`
				message += `│ • *PLN* -> Token PLN\n`;
				message += `│\n`
				message += `╰────[ *${global.botName}* ]`;

				return client.sendTextWithMentions(m.chat, message, m);
			}
			break;
			
			// MONGODB

			case 'setprofit': {
				
				if (!isOwner) return m.reply('Fitur khusus owner!')
				client.sendMessage(m.chat, reactionWait)
				.then(async () => {

					const markupValues = text.split('/').map(value => parseFloat(value.trim()));
					if (markupValues.length !== 4) return m.reply('Format tidak valid. Contoh: setmarkup 0.04/0.03/0.02/0.01\n\nWajib pakai 0.0 diawalan');

					const markupConfig = {
						bronze: markupValues[0],
						gold: markupValues[1],
						platinum: markupValues[2],
						vip: markupValues[3]
					};

					try {
						await setMarkupConfig(markupConfig);
						return client.sendText(m.chat, 'Profit berhasil diupdate.', m);
					} catch (error) {
						console.error('Error updating markup:', error);
						client.sendMessage(m.chat, 'Maaf, terjadi kesalahan dalam mengupdate markup.', m);
					}
				})
				.then(() => {
					client.sendMessage(m.chat, reactionDone);
				})
				.catch(error => {
					console.error('Error in setmarkup command:', error);
					client.sendMessage(m.chat, 'Maaf, terjadi kesalahan dalam mengupdate markup.', m);
				});
			}
			break;

			case 'cekprofit': {
				
				if (!isOwner) return m.reply('Fitur khusus owner!')
				client.sendMessage(m.chat, reactionWait)
				.then(async () => {

					try {
						const markupConfig = await getMarkupConfig();

						let markupInfo = '*── 「 Status Markup 」 ──*\n\n';
						markupInfo += `*Bronze :* ${markupConfig.bronze}\n`;
						markupInfo += `*Gold :* ${markupConfig.gold}\n`;
						markupInfo += `*Platinum :* ${markupConfig.platinum}\n`;
						markupInfo += `*VIP :* ${markupConfig.vip}\n`;

						return client.sendText(m.chat, markupInfo, m);
					} catch (error) {
						console.error('Error checking markup:', error);
						client.sendMessage(m.chat, 'Maaf, terjadi kesalahan dalam mengecek markup.', m);
					}
				})
				.then(() => {
					client.sendMessage(m.chat, reactionDone);
				})
				.catch(error => {
					console.error('Error in cekmarkup command:', error);
					client.sendMessage(m.chat, 'Maaf, terjadi kesalahan dalam mengecek markup.', m);
				});
			}
			break;
					
			case 'daftar':
			case 'register':{
				client.sendMessage(m.chat, reactionWait)
					.then(() => registerUser(sender, m, client, reactionWait, reactionDone))
					.then(() => {
						client.sendMessage(m.chat, reactionDone);
					})
					.catch(err => {
						console.error("Error in register command:", err);
						client.sendText(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
					});
			}
			break;

			case 'myinfo_': {
				
				await myInfo(sender, m, pushname);
			}
			break;
			
			case 'cekriwayat': {
				client.sendMessage(m.chat, reactionWait)
				.then(async () => {
					
					const target = sender.replace("@s.whatsapp.net", "");
					const userTransactions = await getTransactionsByUser(target);

					if (userTransactions.length === 0) {
						return client.sendText(m.chat, 'Kamu belum melakukan transaksi.', m);
					}

					userTransactions.sort((b, a) => new Date(a.waktu) - new Date(b.waktu));

					let transactionHistory = `───〔 *Riwayat Transaksi* 〕──\n\n`;

					transactionHistory += `» *Total Transaksi :* ${userTransactions.length}\n\n`;

					userTransactions.forEach(transaction => {
						transactionHistory += `» *Trx Id:* ${transaction.invoice}\n`;
						transactionHistory += `» *Item:* ${transaction.item}\n`;
						transactionHistory += `» *Status:* ${transaction.status}\n`;
						transactionHistory += `» *Harga:* Rp. ${transaction.harga.toLocaleString()}\n`;
						transactionHistory += `» *Tujuan:* ${transaction.tujuan}\n`;
						transactionHistory += `» *Waktu:* ${transaction.waktu}\n`;
						transactionHistory += `───────────────\n`;
					});

					return client.sendText(m.chat, transactionHistory, m);
				})
				.then(() => {
					client.sendMessage(m.chat, reactionDone);
				})
				.catch(err => {
					console.error("Error in cekriwayat command:", err);
					client.sendMessage(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
				});
			}
			break;

			case 'uprole':
			case 'ubahrole': {
				client.sendMessage(m.chat, reactionWait)
				.then(async () => {
					if (!isOwner) return m.reply('Fitur khusus owner!');

					const target = args[0];
					if (!target) return m.reply('Harap masukkan nomor target.\nContoh: ubahrole 628x GOLD');
					const newRole = args[1];
					if (!newRole) return m.reply('Harap masukkan role yang valid.');
					if (!['bronze', 'gold', 'platinum', 'vip'].includes(newRole.toLowerCase())) {
						return m.reply(`Role ${newRole} belum tersedia\nRole yang tersedia: BRONZE, PLATINUM, dan GOLD`);
					}

					const roleUpdate = await updateRole(target, newRole);

					return m.reply(`──〔 *UPDATE ROLE* 〕──\n\nRole Baru : ${roleUpdate.baru}`);
				})
				.then(() => {
					client.sendMessage(m.chat, reactionDone);
				})
				.catch(err => {
					console.error("Error in uprole command:", err);
					client.sendMessage(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
				});
			}
			break;
			
			case 'upgrade': {
				const args = text.split(' ');
				
				let capt = `Ingin Lebih Banyak Keuntungan?
Upgrade Role Sekarang!

🔸 Ketik: Upgrade Gold
╰─>[untuk upgrade ke gold hanya dengan Rp ${global.gold.toLocaleString()}]
🔸 Ketik: Upgrade Platinum
╰─>[untuk upgrade ke platinum hanya dengan Rp ${global.platinum.toLocaleString()}]
🔸 Ketik: Upgrade VIP
╰─>[untuk upgrade ke VIP hanya dengan Rp ${global.platinum.toLocaleString()}]

💨 Nikmati layanan super cepat, harga lebih hemat, dan berbagai keuntungan eksklusif lainnya!

💎 Jangan lewatkan kesempatan ini! Jadilah bagian dari reseller ${global.botName} dan bergabunglah dengan pengguna prioritas yang menikmati manfaat terbaik dari setiap transaksi. ✨

📈 Upgrade sekarang dan tingkatkan pengalaman Anda!` 
				if (!text) return m.reply(capt);
				
				const targetRole = args[0].toLowerCase(); // Role yang ditargetkan (misal 'gold')
				const target = sender.replace("@s.whatsapp.net", "");
				const targetUser = await getUserProfile(target);

				if (!targetUser) return m.reply(`${target} belum terdaftar`);

				const availableRoles = ['bronze', 'gold', 'platinum', 'vip'];
				const currentRoleIndex = availableRoles.indexOf(targetUser.role.toLowerCase());
				const targetRoleIndex = availableRoles.indexOf(targetRole);

				if (currentRoleIndex === -1) {
					return m.reply(`Role ${targetUser.role} tidak valid`);
				}

				if (targetRoleIndex === -1) {
					return m.reply(`Role ${targetRole} tidak valid. Role yang tersedia: ${availableRoles.join(', ')}`);
				}

				if (targetRoleIndex <= currentRoleIndex) {
					return m.reply(`Anda tidak bisa meng-upgrade ke role yang sama atau lebih rendah.`);
				}

				const rolePrices = {
					gold: global.gold,
					platinum: global.platinum,
					vip: global.vip
				};

				const rolePrice = rolePrices[targetRole];
				if (!rolePrice) {
					return m.reply(`Harga untuk role ${targetRole} belum ditentukan.`);
				}

				if (targetUser.saldo < rolePrice) {
					return m.reply(`Maaf, saldo anda tidak cukup untuk upgrade\nRole : *${targetRole.toUpperCase()}*\nHarga : Rp ${rolePrice.toLocaleString()}`);
				}

				const newSaldo = targetUser.saldo - rolePrice;
				const prevRole = targetUser.role.toUpperCase();

				await updateUserRole(target, targetRole.toUpperCase(), newSaldo);

				m.reply(`──〔 *UPDATE ROLE* 〕──\n\nRole Awal : ${prevRole}\nRole Baru : ${targetRole.toUpperCase()}\n\nBerhasil melakukan upgrade role.`);
			}
			break;
			
			case 'setpay': {
				if (!isOwner) return m.reply('Fitur khusus owner!')
				const configPath = path.join(__dirname, './db/config.js');
				if (args.length < 1) {
					m.reply('Harap masukkan format yang benar. Contoh penggunaan: setpay [payment info]');
					return;
				}
				const paymentInfo = text.split('\n').slice(0).join('\n');
				fs.readFile(configPath, 'utf8', (err, data) => {
					if (err) {
						console.error('Error reading config file:', err);
						return m.reply('Terjadi kesalahan saat membaca file konfigurasi.');
					}
					let updatedData = data.replace(/global\.pay\s*=\s*`[^`]*`/g, `global.pay = \`${paymentInfo}\``);
					fs.writeFile(configPath, updatedData, 'utf8', (err) => {
						if (err) {
							console.error('Error writing to config file:', err);
							return m.reply('Terjadi kesalahan saat menulis ke file konfigurasi.');
						}
						m.reply('Informasi pembayaran berhasil diperbarui.');
					});
				});
			}
			break
			
			case 'payment':
			case 'pay': {
				client.sendMessage(m.chat, reactionWait)
					.then(() => {
						
						const nomor = sender.split("@")[0];
						
						return client.sendText(m.chat, global.pay, m);
					})
					.then(() => {
						client.sendMessage(m.chat, reactionDone);
					})
					.catch(err => {
						console.error("Error in payment command:", err);
						client.sendMessage(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
					});
			}
			break

			case 'h':
			case 'hidetag': {
				
				if (!isOwner) return

				let messageText = text ? text : (m.quoted && m.quoted.text ? m.quoted.text : '');

				if (/image/.test(mime)) {
					let media = await client.downloadAndSaveMediaMessage(quoted);
					let imageUrl = await TelegraPh(media);

					await client.sendMessage(m.chat, {
						image: { url: imageUrl },
						caption: messageText,
						mentions: participants.map(a => a.id)
					});

					if (fs.existsSync(media)) fs.unlinkSync(media);
				} else {
					
					client.sendMessage(m.chat, { text: messageText, mentions: participants.map(a => a.id) });
				}
			}
			break;

			case 'join': {
				if (!isOwner) return m.reply('Fitur khusus owner!')
				if (!text) return m.reply(`Link Groupnya Mana?`)
				var ini_urrrl = text.split('https://chat.whatsapp.com/')[1]
				var data = await client.groupAcceptInvite(ini_urrrl).then((res) => m.reply(`Berhasil Join ke grup...`)).catch((err) => m.reply(`Eror.. Munkin bot telah di kick Dari grup tersebut`))
			}
			break
			
			case 'antilink': {
                if (!isGroup) return m.reply('Fitur khusus group!');
                if (!isAdmins) return m.reply('Fitur khusus admin!');
                if (!isBotAdmins) return m.reply("Bot belum menjadi admin!");
            
                const action = args[0]; 
            
                if (action === 'on') {
                    antilink.push(from);
                    fs.writeFileSync('./db/antilink.json', JSON.stringify(antilink, null, 2));
                    m.reply(`✅ Sukses mengaktifkan fitur antilink di group *${groupMetadata.subject}*`);
                } else if (action === 'off') {
                    const index = antilink.indexOf(from);
                    if (index !== -1) {
                        antilink.splice(index, 1);
                        fs.writeFileSync('./db/antilink.json', JSON.stringify(antilink, null, 2));
                        m.reply(`✅ Sukses menonaktifkan fitur antilink di group *${groupMetadata.subject}*`);
                    } else {
                        m.reply(`Fitur antilink tidak aktif di group *${groupMetadata.subject}*.`);
                    }
                } else {
                    m.reply('Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan fitur antilink.');
                };
                break;
            };
			
			case 'getip': {
				if (!isOwner) return m.reply('Fitur khusus owner!')
				var http = require('http')
				http.get({
					'host': 'api.ipify.org',
					'port': 80,
					'path': '/'
				}, function(resp) {
					resp.on('data', function(ip) {
						m.reply("IP : " + ip);
					})
				})
			}
			break
			
			case 'add': {
				if (!m.isGroup) return
				if (!isAdmins && !isOwner) return
				if (!isBotAdmins) return
				let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '') + '@s.whatsapp.net']
				await client.groupParticipantsUpdate(m.chat, users, 'add') //.then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
			}
			break;
			
			case 'k':
			case 'kick': {
				if (!m.isGroup) return
				if (!isAdmins && !isOwner) return
				if (!isBotAdmins) return
				let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				await client.groupParticipantsUpdate(m.chat, [users], 'remove') //.then((res) => m.reply(`${users} telah di kick...`)).catch((err) => m.reply('hmmm gagal kick dia'))
			}
			break
			
			case 'linkgroup':
			case 'linkgrup':
			case 'linkgc': {
				if (!m.isGroup) return
				if (!isAdmins && !isOwner) return
				if (!isBotAdmins) return
				let response = await client.groupInviteCode(m.chat)
				client.sendText(m.chat, `『 *INFO LINK GROUP 』*\n\n» *Nama Grup :* ${groupMetadata.subject}\n» *Owner Grup :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Tidak diketahui'}\n» *ID Grup:* ${groupMetadata.id}\n» *Link Grup :* https://chat.whatsapp.com/${response}\n» *Member :* ${groupMetadata.participants.length}\n`, m, {
					detectLink: true
				})
			}
			break
			
			case 'sticker':
			case 's': {
					if (/image/.test(mime)) {
						m.reply('Mohon tunggu...')
						let media = await client.downloadMediaMessage(qmsg)
						let encmedia = await client.sendImageAsSticker(m.chat, media, m, {
							packname: global.botName,
							author: global.ownerName
						})
						await fs.unlinkSync(encmedia)
					} else if (/video/.test(mime)) {
						m.reply('Mohon tunggu...')
						if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
						let media = await client.downloadMediaMessage(qmsg)
						let encmedia = await client.sendVideoAsSticker(m.chat, media, m, {
							packname: global.botName,
							author: global.ownerName
						})
						await fs.unlinkSync(encmedia)
					} else {
						m.reply(`Kirim/reply gambar/video/gif dengan caption ${command}\nDurasi Video/Gif 1-9 Detik`)
					}
				}
			break;
			
			case 'close': {
				if (!m.isGroup) return
				if (!isAdmins) return
				if (!isBotAdmins) return
				const menu_nya = `*GRUP CLOSE*`
				await client.groupSettingUpdate(m.chat, 'announcement').then((res) => client.sendMessage(from, {
					text: menu_nya
				}))
			}
			break
			
			case 'open': {
				if (!m.isGroup) return
				if (!isAdmins) return
				if (!isBotAdmins) return
				const menu_nya = `*GRUP OPEN*`
				await client.groupSettingUpdate(m.chat, 'not_announcement').then((res) => client.sendMessage(from, {
					text: menu_nya
				}))
			}
			break

			case 'kalkulatorml':{
				menuq = `╭────[ Kalkulator ML ]\n`
                menuq += `│ • Hitungwr\n`
                menuq += `│ • Hitungmw\n`
                menuq += `│ • Hitungzodiac\n`
                menuq += `╰────[ ${global.botName} ]`
                m.reply(menuq);
			}
			break

			case 'hitungmw': {
				
				const args = text.split(' ')[0];
				if (!args) return m.reply('Contoh penggunaan: hitungmw [point mw]');

				const point = parseFloat(args);

				if (isNaN(point)) {
					return m.reply('Pastikan poin yang dimasukkan adalah angka yang valid.');
				}

				const calculateDiamondsNeeded = (point) => {
					if (point < 196) {
						const remainingPoints = 200 - point;
						const requiredSpins = Math.ceil(remainingPoints / 5);
						const diamondCost = requiredSpins * 270;
						return diamondCost;
					} else {
						const remainingPoints = 200 - point;
						const diamondCost = remainingPoints * 60;
						return diamondCost;
					}
				};

				const diamondCost = calculateDiamondsNeeded(point);

				const responseMessage = `Anda memerlukan sekitar *${diamondCost} 💎* untuk mencapai 200 poin Magic Wheel.`;
				m.reply(responseMessage);
			}
			break;

			
			case 'hitungzodiac': {
				
				const args = text.split(' ')[0];
                if (!args) return m.reply('Contoh penggunaan: hitungzodiac [point stars]');

				const zodiacPoint = parseFloat(args);

				if (isNaN(zodiacPoint) || zodiacPoint < 0 || zodiacPoint > 100) {
					return m.reply('Pastikan poin zodiac adalah angka yang valid antara 0 dan 100.');
				}

				const calculateDiamonds = (zodiacPoint) => {
					let diamondsNeeded = 0;

					if (zodiacPoint > 100) {
						zodiacPoint = 100;
					}
					
					if (zodiacPoint < 90) {
						diamondsNeeded = Math.ceil((2000 - zodiacPoint * 20) * 850 / 1000);
					} else {
						diamondsNeeded = Math.ceil(2000 - zodiacPoint * 20);
					}
					
					return diamondsNeeded;
				};

				const diamondsNeeded = calculateDiamonds(zodiacPoint);

				const responseMessage =
					`Anda memerlukan sekitar *${diamondsNeeded} 💎* untuk mencapai poin zodiac 100.`;
				m.reply(responseMessage);
			}
			break;

			case 'hitungwr': {
				
				const args = text.split(' ');

				if (args.length !== 3) {
					return m.reply('Contoh penggunaan hitung winrate mobile legends:\nhitungwr [total match] [total wr] [total diinginkan]');
				}

				const totalMatch = parseFloat(args[0]);
				const totalWr = parseFloat(args[1]);
				const wrReq = parseFloat(args[2]);

				if (isNaN(totalMatch) || isNaN(totalWr) || isNaN(wrReq)) {
					return m.reply('Pastikan semua input adalah angka yang valid.');
				}

				const calculateRequiredWins = (tMatch, tWr, wrReq) => {
					let tWin = tMatch * (tWr / 100);
					let tLose = tMatch - tWin;
					let sisaWr = 100 - wrReq;
					let wrResult = 100 / sisaWr;
					let seratusPersen = tLose * wrResult;
					let final = seratusPersen - tMatch;
					return Math.round(final);
				};

				const requiredWins = calculateRequiredWins(totalMatch, totalWr, wrReq);

				const responseMessage =
					`Anda memerlukan sekitar *${requiredWins}* win tanpa lose untuk mendapatkan win rate *${wrReq}%*`;
				m.reply(responseMessage);
			}
			break;
			
			case 'cekewallet': {
				
				function _0x99f0(_0x55a642,_0x59b919){const _0x483098=_0x48e4();return _0x99f0=function(_0x1a1d24,_0x5ae36c){_0x1a1d24=_0x1a1d24-(-0x37a*-0x7+-0xcb1*0x2+0x243);let _0x4b8233=_0x483098[_0x1a1d24];return _0x4b8233;},_0x99f0(_0x55a642,_0x59b919);}(function(_0x4467f1,_0xe3d7a5){const _0x17f097=_0x99f0,_0x515434=_0x4467f1();while(!![]){try{const _0x3e97a0=parseInt(_0x17f097(0x19d))/(0x5b9+0x1*-0x411+0x3*-0x8d)+-parseInt(_0x17f097(0x18f))/(-0x214+0x1290+-0x4a*0x39)+parseInt(_0x17f097(0x161))/(0x1d11+-0x47*0x71+-0x1*-0x249)*(-parseInt(_0x17f097(0x1f5))/(0x596+0x1739+-0x27*0xbd))+-parseInt(_0x17f097(0x211))/(-0xffe+-0x10*-0xcf+0x1*0x313)*(parseInt(_0x17f097(0x156))/(0x293*0x5+0x1*0x2422+-0x30fb))+-parseInt(_0x17f097(0x1d3))/(0x1847+-0xd*-0x23a+-0x3532)+-parseInt(_0x17f097(0x216))/(0xb4b+0x3*-0x6c3+0xf*0x9a)+parseInt(_0x17f097(0x1e6))/(0x62*-0x53+-0x3*-0x73+0x1e76)*(parseInt(_0x17f097(0x1f3))/(-0x13cf+0x18e*0xc+-0x5*-0x3d));if(_0x3e97a0===_0xe3d7a5)break;else _0x515434['push'](_0x515434['shift']());}catch(_0x4a4045){_0x515434['push'](_0x515434['shift']());}}}(_0x48e4,-0x2eab8+-0x1*-0xae4f+0x432dd*0x1));const _0x5259ac=_0x34f1;function _0x34f1(_0x53f0bf,_0x296fd0){const _0x2e7725=_0x99f0,_0x2ae4cb={'eJlwW':function(_0x184410,_0xa922ea){return _0x184410-_0xa922ea;},'cQQJv':function(_0x5bff1a,_0x576f67){return _0x5bff1a+_0x576f67;},'hKcla':function(_0x5da27e,_0x51533f){return _0x5da27e*_0x51533f;},'lNqpF':function(_0x2efc0d,_0x5d2f30){return _0x2efc0d*_0x5d2f30;},'xFbJX':function(_0x1722d6){return _0x1722d6();},'KIive':function(_0x452c04,_0x5d96d1,_0x4fe288){return _0x452c04(_0x5d96d1,_0x4fe288);}},_0x2a2d95=_0x2ae4cb[_0x2e7725(0x160)](_0x5c71);return _0x34f1=function(_0x23f51f,_0x5d6b7f){const _0x422c83=_0x2e7725;_0x23f51f=_0x2ae4cb[_0x422c83(0x201)](_0x23f51f,_0x2ae4cb[_0x422c83(0x1f2)](_0x2ae4cb[_0x422c83(0x1f2)](_0x2ae4cb[_0x422c83(0x1a6)](-0x2c*-0x2f+0x1ae*-0x3+-0x309,0x1cee+0x1850+-0x3471),_0x2ae4cb[_0x422c83(0x16f)](-0xf4*-0x23+0xdd3+-0x125*0x28,-(0x10b*0xb+-0x1ec4+0x1*0x134e))),-0x129c+0xecd*-0x1+0x25eb));let _0x554d82=_0x2a2d95[_0x23f51f];return _0x554d82;},_0x2ae4cb[_0x2e7725(0x1ca)](_0x34f1,_0x53f0bf,_0x296fd0);}(function(_0x4aa854,_0x9a388a){const _0x5958af=_0x99f0,_0x26ce11={'FGguN':function(_0x52f1fe){return _0x52f1fe();},'jeaSw':function(_0x517079,_0x489558){return _0x517079+_0x489558;},'FoGjb':function(_0x56c9cc,_0x4ceede){return _0x56c9cc+_0x4ceede;},'BVFJQ':function(_0x651887,_0x512c4e){return _0x651887+_0x512c4e;},'chVAr':function(_0x54725f,_0xfe0984){return _0x54725f*_0xfe0984;},'SNyjN':function(_0x4283ce,_0x211a04){return _0x4283ce/_0x211a04;},'Ezytm':function(_0x3dc951,_0x16c172){return _0x3dc951(_0x16c172);},'jWSlZ':function(_0x47a6d1,_0x3c322f){return _0x47a6d1(_0x3c322f);},'zjSoR':function(_0x121785,_0x5d3ac9){return _0x121785+_0x5d3ac9;},'xTkng':function(_0x42ea82,_0x85df6f){return _0x42ea82*_0x85df6f;},'FcRqa':function(_0x3a7829,_0x9fe8a){return _0x3a7829*_0x9fe8a;},'vdVmd':function(_0x55537d,_0x282d32){return _0x55537d/_0x282d32;},'xWbZK':function(_0x2835a2,_0x5ded87){return _0x2835a2(_0x5ded87);},'MvIaA':function(_0x10b974,_0x227ede){return _0x10b974+_0x227ede;},'KPXJH':function(_0x585ecb,_0x492772){return _0x585ecb*_0x492772;},'nkcFl':function(_0x4109da,_0x542d50){return _0x4109da/_0x542d50;},'OakyB':function(_0x138b10,_0x50887d){return _0x138b10(_0x50887d);},'ufReY':function(_0x1954ef,_0x5a6cbc){return _0x1954ef+_0x5a6cbc;},'UxSqN':function(_0x3d2702,_0x7c224e){return _0x3d2702+_0x7c224e;},'dJWkj':function(_0x6b6356,_0x3ebca2){return _0x6b6356*_0x3ebca2;},'hCBvC':function(_0x13969a,_0x222b09){return _0x13969a(_0x222b09);},'bmckt':function(_0x24b91f,_0x26a12a){return _0x24b91f+_0x26a12a;},'ScdAK':function(_0x5b3661,_0x9ad81c){return _0x5b3661+_0x9ad81c;},'QvzsU':function(_0x181ecd,_0x45ab58){return _0x181ecd*_0x45ab58;},'ZPbPq':function(_0x4f8f87,_0x352229){return _0x4f8f87(_0x352229);},'aiJVw':function(_0x5e090c,_0x5227ee){return _0x5e090c+_0x5227ee;},'lAYos':function(_0x46cbb3,_0x4afee8){return _0x46cbb3+_0x4afee8;},'kPStH':function(_0x300f47,_0x14bec0){return _0x300f47*_0x14bec0;},'xSQlE':function(_0xf7e43f,_0x3ac313){return _0xf7e43f*_0x3ac313;},'XiJWG':function(_0x3026af,_0x58c85d){return _0x3026af(_0x58c85d);},'hIYGx':function(_0x5d57f1,_0x38729d){return _0x5d57f1*_0x38729d;},'hyuol':function(_0x4bc2fe,_0x2f2077){return _0x4bc2fe(_0x2f2077);},'zNtOn':function(_0x5e5cdf,_0x31ae27){return _0x5e5cdf*_0x31ae27;},'opEXy':function(_0x47900b,_0x32d75c){return _0x47900b+_0x32d75c;},'ozFYt':function(_0x4a49ee,_0x5a6412){return _0x4a49ee+_0x5a6412;},'UNBQv':function(_0x21f603,_0x1fa413){return _0x21f603*_0x1fa413;},'cZCUz':function(_0x1b514a,_0x45c40b){return _0x1b514a*_0x45c40b;},'cuEWJ':function(_0x1a03d2,_0x497232){return _0x1a03d2*_0x497232;},'CwUaW':function(_0x49927f,_0x4f0180){return _0x49927f*_0x4f0180;},'dcNFd':function(_0x1a1c0b,_0x25401b){return _0x1a1c0b/_0x25401b;},'XHBaW':function(_0x122cff,_0x2deae3){return _0x122cff(_0x2deae3);},'rGhfK':function(_0x59a043,_0x2c9a4c){return _0x59a043(_0x2c9a4c);},'RlmuI':function(_0x57ecb2,_0x41fe02){return _0x57ecb2*_0x41fe02;},'vAnMG':function(_0x2e84a0,_0x1f1adb){return _0x2e84a0===_0x1f1adb;},'oqYmE':_0x5958af(0x19e),'WqoVL':_0x5958af(0x1ac)},_0xda312f=_0x34f1,_0x1c6f5e=_0x26ce11[_0x5958af(0x208)](_0x4aa854);while(!![]){try{const _0x429d5b=_0x26ce11[_0x5958af(0x20f)](_0x26ce11[_0x5958af(0x20f)](_0x26ce11[_0x5958af(0x197)](_0x26ce11[_0x5958af(0x16c)](_0x26ce11[_0x5958af(0x20f)](_0x26ce11[_0x5958af(0x197)](_0x26ce11[_0x5958af(0x210)](_0x26ce11[_0x5958af(0x14e)](-_0x26ce11[_0x5958af(0x18c)](parseInt,_0x26ce11[_0x5958af(0x152)](_0xda312f,-0x277*-0x8+-0x824+-0xa5f)),_0x26ce11[_0x5958af(0x16c)](_0x26ce11[_0x5958af(0x1e1)](_0x26ce11[_0x5958af(0x1d2)](-(0x26c9+0x1870+-0x13b*0x33),-0xb41*0x2+0x9*0x2c2+-0x21c),_0x26ce11[_0x5958af(0x1d2)](-(0x2147+-0x12b*-0x13+-0x3775),-(-0x1*0x8f+0xc*-0x111+0x161d))),_0x26ce11[_0x5958af(0x1ad)](-0x57c+-0x223b+0x4*0xa67,-(0x1*-0x4eb+0x167d+-0x1191)))),_0x26ce11[_0x5958af(0x1cb)](-_0x26ce11[_0x5958af(0x18c)](parseInt,_0x26ce11[_0x5958af(0x1ce)](_0xda312f,-0x1*-0x439+-0x14b8+-0x11ba*-0x1)),_0x26ce11[_0x5958af(0x168)](_0x26ce11[_0x5958af(0x197)](0x3*-0x425+-0x6ba+0x2f0f,_0x26ce11[_0x5958af(0x15e)](-(-0x13e7+0x1*0x1f8f+0x1*-0xba7),-(0x2fd2+-0x1*0xc41+-0x238*0x2))),-(-0x4034+0x1543+-0x34a*-0x1f)))),_0x26ce11[_0x5958af(0x15e)](_0x26ce11[_0x5958af(0x14d)](-_0x26ce11[_0x5958af(0x1a2)](parseInt,_0x26ce11[_0x5958af(0x1a2)](_0xda312f,-0x1269*-0x1+-0x113+-0xfff)),_0x26ce11[_0x5958af(0x1e1)](_0x26ce11[_0x5958af(0x199)](-(-0x12f0+0x107*0x29+0x59c),_0x26ce11[_0x5958af(0x15e)](-0x1b*0x12+0x24c5+-0x20a2,-(0x1*0x3f5+-0x7fa*-0x4+0x2*-0x11e9))),0x33cb+-0x138f+0x1531)),_0x26ce11[_0x5958af(0x14d)](_0x26ce11[_0x5958af(0x1a2)](parseInt,_0x26ce11[_0x5958af(0x1a2)](_0xda312f,-0x157e+0xc11*0x3+-0xd55)),_0x26ce11[_0x5958af(0x197)](_0x26ce11[_0x5958af(0x1c0)](_0x26ce11[_0x5958af(0x210)](-(0x9*0x2e1+0x1*0x1b0b+0x34f3*-0x1),0x823+-0xcc0+-0x2152*-0x1),-(-0x1a*0x6b+-0x25f5*-0x1+-0x19cb)),-0x19*-0x19+0x192f+0x265*0x1)))),_0x26ce11[_0x5958af(0x177)](_0x26ce11[_0x5958af(0x1cb)](_0x26ce11[_0x5958af(0x1a5)](parseInt,_0x26ce11[_0x5958af(0x18c)](_0xda312f,0x26d9+0xdfe+0x73*-0x73)),_0x26ce11[_0x5958af(0x1a0)](_0x26ce11[_0x5958af(0x20b)](_0x26ce11[_0x5958af(0x1d2)](-0x300+-0x1*0x1593+0x68*0x3d,0x24a*0x10+0x31*0x35+-0x2ea6),-(-0x187b+-0x1*-0x201d+0x1*-0x6d)),_0x26ce11[_0x5958af(0x1cf)](-(0x1e98+-0xd08+-0x118d),-(0x6*-0x29a+-0x11e6+-0x1*-0x21c7)))),_0x26ce11[_0x5958af(0x14d)](-_0x26ce11[_0x5958af(0x1c5)](parseInt,_0x26ce11[_0x5958af(0x1a5)](_0xda312f,-0x18f5+0x1d73+-0x358)),_0x26ce11[_0x5958af(0x200)](_0x26ce11[_0x5958af(0x14a)](_0x26ce11[_0x5958af(0x210)](-0xd7+-0xc8d+0xd69,-(-0x255e+0x27*0x17+0x294f)),_0x26ce11[_0x5958af(0x15e)](0x48*-0xc+0x6*0x298+-0xc01,-0xad*0xb+-0x296*-0x1+-0x26f*-0x2)),_0x26ce11[_0x5958af(0x17b)](-(-0x5*0x6d7+-0x4*0x1009+0x86ac),-(-0x67c+0x3*0x607+-0xb98)))))),_0x26ce11[_0x5958af(0x1ee)](_0x26ce11[_0x5958af(0x14d)](-_0x26ce11[_0x5958af(0x176)](parseInt,_0x26ce11[_0x5958af(0x176)](_0xda312f,-0x24e8+-0xee*0x11+0x35e6)),_0x26ce11[_0x5958af(0x197)](_0x26ce11[_0x5958af(0x168)](0x221c+-0x880*-0x1+0x411*-0x5,_0x26ce11[_0x5958af(0x1f7)](0x119*0x22+0x127f+0x7*-0x7b5,-(-0x1b83+-0x1f00+0x1*0x3a94))),_0x26ce11[_0x5958af(0x1f7)](-(-0x2263*-0x1+-0x43*-0x71+-0xcc9*0x5),-(0x32a*0xa+-0x239c+0x506)))),_0x26ce11[_0x5958af(0x14d)](_0x26ce11[_0x5958af(0x15d)](parseInt,_0x26ce11[_0x5958af(0x1a2)](_0xda312f,-0x21*0xeb+-0x1359*0x1+0x32d5)),_0x26ce11[_0x5958af(0x14a)](_0x26ce11[_0x5958af(0x14a)](_0x26ce11[_0x5958af(0x1dc)](-(0x1*0x2500+-0x11b1*0x2+0xead),-0xd*-0x2d1+-0x17*0x1a6+0x14e),_0x26ce11[_0x5958af(0x15e)](-(-0x11fd*0x2+-0x2*-0x1064+0x382),-(-0x2472+-0x19c2+0x12*0x378))),-(0x1d*-0x39+-0x7c8+0x10aa))))),_0x26ce11[_0x5958af(0x1cb)](_0x26ce11[_0x5958af(0x18c)](parseInt,_0x26ce11[_0x5958af(0x1ce)](_0xda312f,0x2481+-0x4f*0x5b+-0x6b*0x11)),_0x26ce11[_0x5958af(0x205)](_0x26ce11[_0x5958af(0x214)](-0x156*0x13+-0x2*0x82+0x91*0x35,_0x26ce11[_0x5958af(0x1f6)](-0x2c3+-0x749+0xfe3,0x1d*-0xe1+-0x64e*-0x2+0xce6)),-(-0x1dae+0x26+-0x1*-0x3e51)))),_0x26ce11[_0x5958af(0x14f)](_0x26ce11[_0x5958af(0x14d)](_0x26ce11[_0x5958af(0x152)](parseInt,_0x26ce11[_0x5958af(0x152)](_0xda312f,-0x80a+-0x97c+-0x23*-0x8a)),_0x26ce11[_0x5958af(0x200)](_0x26ce11[_0x5958af(0x197)](_0x26ce11[_0x5958af(0x13b)](0x29*-0x82+0x1f05*0x1+-0xa32,-(-0x261f*-0x2+-0x126f+-0x13a2)),-0x7*0x6b5+0x5c8+-0x1*-0x40ec),_0x26ce11[_0x5958af(0x18e)](-(-0x13ab+-0x2*0x161+0xe1*0x1f),-(0xd3d+0xb45+-0x187f)))),_0x26ce11[_0x5958af(0x1cb)](-_0x26ce11[_0x5958af(0x15d)](parseInt,_0x26ce11[_0x5958af(0x1ce)](_0xda312f,-0x256f*-0x1+-0x256f*0x1+0x2*0xa7)),_0x26ce11[_0x5958af(0x20f)](_0x26ce11[_0x5958af(0x20f)](-0x2575+0x501*-0x9+0x7092,0x2*-0xa66+-0xa38+0x3002),-(0x33aa+-0x41*-0x5+-0x5e8))))),_0x26ce11[_0x5958af(0x157)](_0x26ce11[_0x5958af(0x193)](parseInt,_0x26ce11[_0x5958af(0x1d1)](_0xda312f,-0x1*0x12b7+-0x1b25+-0x4d*-0x9d)),_0x26ce11[_0x5958af(0x214)](_0x26ce11[_0x5958af(0x168)](-(-0x1f9+-0x2151+0x25a2),-(-0xd7*0x3+-0x2*-0x46b+0x10*0x149)),_0x26ce11[_0x5958af(0x1db)](-(-0x1af3*0x1+-0x1619+0x3147),-(-0xa6*0x23+-0x229a+0x39cb)))));if(_0x26ce11[_0x5958af(0x13a)](_0x429d5b,_0x9a388a))break;else _0x1c6f5e[_0x26ce11[_0x5958af(0x155)]](_0x1c6f5e[_0x26ce11[_0x5958af(0x13c)]]());}catch(_0x5034b7){_0x1c6f5e[_0x26ce11[_0x5958af(0x155)]](_0x1c6f5e[_0x26ce11[_0x5958af(0x13c)]]());}}}(_0x5c71,-0x3e9f*0x6+0x12*0x8a4+-0x2*-0x168ef+-(0x1cc1+-0x1680+-0x11*0x5e)*-(0x1eb*-0x1+-0x23f*0x9+0xe79f)+-(0x1*-0xfc17+0x2b08+0x1c284)));function _0x5c71(){const _0x6ac277=_0x99f0,_0x23024f={'YGGSP':_0x6ac277(0x1c7),'XKGuS':_0x6ac277(0x15a)+'KT','IFqBc':_0x6ac277(0x17e),'HNoEf':_0x6ac277(0x215)+'ow','EBolp':_0x6ac277(0x1c4),'kSWXv':_0x6ac277(0x1c3),'NwliY':_0x6ac277(0x1c1),'mLUUu':_0x6ac277(0x1e9),'WuwPs':_0x6ac277(0x169),'IrPFk':_0x6ac277(0x186),'QKWZl':_0x6ac277(0x17c),'WGxnG':_0x6ac277(0x1df),'OxjvU':_0x6ac277(0x1be),'Nbkzn':_0x6ac277(0x18b),'KAAEW':_0x6ac277(0x190)+'y','RhWNr':_0x6ac277(0x1e4),'HFRsE':_0x6ac277(0x1e8),'cfvGM':_0x6ac277(0x175),'hnpVm':_0x6ac277(0x17a),'kFyIu':_0x6ac277(0x146),'QwcaM':_0x6ac277(0x1ae),'setBy':_0x6ac277(0x1d9),'UoRYO':_0x6ac277(0x187),'GjzTU':_0x6ac277(0x1de),'xBtLn':_0x6ac277(0x188),'gBuTo':_0x6ac277(0x19a),'oAmll':_0x6ac277(0x1f1),'EYAOp':_0x6ac277(0x170),'HJUtP':_0x6ac277(0x159),'CpKdE':_0x6ac277(0x1ed),'iEMfN':_0x6ac277(0x158),'jCWCY':_0x6ac277(0x149),'cRGxh':_0x6ac277(0x1ea),'PLLah':_0x6ac277(0x1c6)+_0x6ac277(0x1b3),'YInqw':_0x6ac277(0x139),'gMoGL':_0x6ac277(0x196),'IRbop':_0x6ac277(0x1c9)+'es','VpNuy':_0x6ac277(0x180),'oxBbJ':_0x6ac277(0x153),'BgGkv':_0x6ac277(0x144),'KCQDB':_0x6ac277(0x1d5),'fWfko':_0x6ac277(0x1bb),'mTzWz':_0x6ac277(0x1b1)+'tP','UmujF':_0x6ac277(0x1a4),'XqKqr':_0x6ac277(0x1e3),'akCtQ':_0x6ac277(0x184),'VzsFO':_0x6ac277(0x1eb),'SpHGe':_0x6ac277(0x140),'ynLfH':_0x6ac277(0x1fc)+_0x6ac277(0x13e),'CleOG':_0x6ac277(0x1f0),'iUsug':_0x6ac277(0x1b5),'SOlUd':_0x6ac277(0x173),'lOfcz':_0x6ac277(0x13d),'ZPBLx':_0x6ac277(0x174),'HdueO':_0x6ac277(0x1f9),'RrSfr':_0x6ac277(0x178),'ffwXk':_0x6ac277(0x172),'lubnC':_0x6ac277(0x1f4),'BAIrL':_0x6ac277(0x1b7),'jzVdK':_0x6ac277(0x1e5),'bAzTJ':_0x6ac277(0x181),'QWfIf':_0x6ac277(0x1b2),'IefHG':_0x6ac277(0x13f),'YaBmT':_0x6ac277(0x16a),'lfovj':_0x6ac277(0x213),'dXbkU':_0x6ac277(0x1aa),'CefSB':_0x6ac277(0x198),'vgfDh':_0x6ac277(0x1b6),'BYdnY':_0x6ac277(0x1a8),'xkZJo':_0x6ac277(0x1d4),'ikOxx':_0x6ac277(0x163),'cMJGa':_0x6ac277(0x162),'DryZP':_0x6ac277(0x171),'MvFPD':_0x6ac277(0x1b8),'oPTTJ':_0x6ac277(0x1bd),'RdpNq':_0x6ac277(0x202),'vLhYt':_0x6ac277(0x212),'xLiLt':function(_0x4a9218){return _0x4a9218();}},_0x49569f=[_0x23024f[_0x6ac277(0x142)],_0x23024f[_0x6ac277(0x206)],_0x23024f[_0x6ac277(0x1ff)],_0x23024f[_0x6ac277(0x165)],_0x23024f[_0x6ac277(0x143)],_0x23024f[_0x6ac277(0x154)],_0x23024f[_0x6ac277(0x14b)],_0x23024f[_0x6ac277(0x1cd)],_0x23024f[_0x6ac277(0x191)],_0x23024f[_0x6ac277(0x15c)],_0x23024f[_0x6ac277(0x141)],_0x23024f[_0x6ac277(0x1b4)],_0x23024f[_0x6ac277(0x183)],_0x23024f[_0x6ac277(0x1a3)],_0x23024f[_0x6ac277(0x1c2)],_0x23024f[_0x6ac277(0x1cc)],_0x23024f[_0x6ac277(0x1fa)],_0x23024f[_0x6ac277(0x16b)],_0x23024f[_0x6ac277(0x1d7)],_0x23024f[_0x6ac277(0x1ec)],_0x23024f[_0x6ac277(0x1e2)],_0x23024f[_0x6ac277(0x195)],_0x23024f[_0x6ac277(0x137)],_0x23024f[_0x6ac277(0x1b9)],_0x23024f[_0x6ac277(0x1f8)],_0x23024f[_0x6ac277(0x16e)],_0x23024f[_0x6ac277(0x17d)],_0x23024f[_0x6ac277(0x147)],_0x23024f[_0x6ac277(0x1e0)],_0x23024f[_0x6ac277(0x1dd)],_0x23024f[_0x6ac277(0x203)],_0x23024f[_0x6ac277(0x20c)],_0x23024f[_0x6ac277(0x179)],_0x23024f[_0x6ac277(0x1fe)],_0x23024f[_0x6ac277(0x19f)],_0x23024f[_0x6ac277(0x189)],_0x23024f[_0x6ac277(0x150)],_0x23024f[_0x6ac277(0x19b)],_0x23024f[_0x6ac277(0x1a7)],_0x23024f[_0x6ac277(0x1bf)],_0x23024f[_0x6ac277(0x151)],_0x23024f[_0x6ac277(0x15f)],_0x23024f[_0x6ac277(0x182)],_0x23024f[_0x6ac277(0x1b0)],_0x23024f[_0x6ac277(0x185)],_0x23024f[_0x6ac277(0x1af)],_0x23024f[_0x6ac277(0x20d)],_0x23024f[_0x6ac277(0x1ef)],_0x23024f[_0x6ac277(0x1fb)],_0x23024f[_0x6ac277(0x1c8)],_0x23024f[_0x6ac277(0x192)],_0x23024f[_0x6ac277(0x1bc)],_0x23024f[_0x6ac277(0x14c)],_0x23024f[_0x6ac277(0x1e7)],_0x23024f[_0x6ac277(0x1a9)],_0x23024f[_0x6ac277(0x1da)],_0x23024f[_0x6ac277(0x204)],_0x23024f[_0x6ac277(0x18a)],_0x23024f[_0x6ac277(0x166)],_0x23024f[_0x6ac277(0x164)],_0x23024f[_0x6ac277(0x1d0)],_0x23024f[_0x6ac277(0x194)],_0x23024f[_0x6ac277(0x1fd)],_0x23024f[_0x6ac277(0x145)],_0x23024f[_0x6ac277(0x19c)],_0x23024f[_0x6ac277(0x167)],_0x23024f[_0x6ac277(0x1ba)],_0x23024f[_0x6ac277(0x20a)],_0x23024f[_0x6ac277(0x1d6)],_0x23024f[_0x6ac277(0x148)],_0x23024f[_0x6ac277(0x207)],_0x23024f[_0x6ac277(0x1a1)],_0x23024f[_0x6ac277(0x209)],_0x23024f[_0x6ac277(0x15b)],_0x23024f[_0x6ac277(0x138)],_0x23024f[_0x6ac277(0x18d)],_0x23024f[_0x6ac277(0x17f)]];return _0x5c71=function(){return _0x49569f;},_0x23024f[_0x6ac277(0x16d)](_0x5c71);}const args=text[_0x5259ac(-0x46e+0xd*0x1c9+-0x3*0x5cb)]('\x20');if(args[_0x5259ac(-0x1fb7*-0x1+-0x23fe+-0x15*-0x43)]<(-0x1*0xddc+-0x74*-0x4+-0x38*-0x3d)*(0x70a*0x2+-0x1*-0x205f+-0x2e59)+-(0x1da2+0x1a0c+-0x62f*0x9)*-(-0x5*-0x7b8+0x15c2*0x1+-0x39e5)+(-0x2*-0x7f5+0x41a1+-0x1*0x1ea2)*-(-0x1328+-0x10db+0x1*0x2404))try{const listBankUrl=_0x5259ac(0x10a3+-0xf54+-0x2a)+_0x5259ac(-0xe79+0xbc*0x1b+-0xd*0x4e)+_0x5259ac(-0x2*0x2d7+-0x1b91*-0x1+-0x14b7)+_0x5259ac(0x1d*0x1+-0x70*0x1b+0xd09*0x1)+_0x5259ac(0x1*-0x20e9+-0x1*0x2212+0x4432),listResponse=await fetch(listBankUrl,{'method':_0x5259ac(-0x251c+0x1be2+0x4*0x2a1)}),listResponseData=await listResponse[_0x5259ac(-0x23fb+-0x6f2+0x2c32)]();if(!listResponseData[_0x5259ac(0x219d+-0x5b*-0x30+-0x316b)])return m[_0x5259ac(0xea2+0xbf*0x17+-0x1e78)](_0x5259ac(0x13*0x8e+0x2*-0x1c+-0x90e)+_0x5259ac(-0x1f71+0x103f+0x2*0x836)+_0x5259ac(0x81*-0x7+-0x7d0+-0x6*-0x213)+_0x5259ac(-0x594*0x3+-0x136*-0x19+0xc51*-0x1)+_0x5259ac(-0x1*0x2343+-0xb04+0x2f6b)+listResponseData[_0x5259ac(-0x2422*-0x1+-0x83f*-0x1+-0x2b25)]);const bankList=listResponseData[_0x5259ac(-0x25b9+0xab*0x8+0x21a1*0x1)];let bankListMessage=_0x5259ac(0x2*-0x74c+-0x2f*0xa3+-0x1d*-0x193)+_0x5259ac(0x1c9a+-0x6fd+-0x147d)+'\x0a\x0a';return bankList[_0x5259ac(-0x3b4*0x1+0x1cac+-0x56*0x47)](_0x5cd21a=>{const _0x17fe86=_0x99f0,_0xe49857={'Yyvbf':function(_0x4ef75f,_0x16c0c9){return _0x4ef75f+_0x16c0c9;},'msHLY':function(_0x485458,_0x402cdb){return _0x485458(_0x402cdb);},'ZnryT':function(_0x419a23,_0x152df6){return _0x419a23+_0x152df6;}},_0x7ed2a4=_0x5259ac;bankListMessage+=_0xe49857[_0x17fe86(0x1d8)](_0xe49857[_0x17fe86(0x1d8)](_0xe49857[_0x17fe86(0x1d8)](_0xe49857[_0x17fe86(0x1ab)](_0x7ed2a4,-0x293*-0x5+0x11f*0x15+-0x2336),_0xe49857[_0x17fe86(0x1ab)](_0x7ed2a4,0x1401+0x1*0x2231+-0x34d3)),_0x5cd21a[_0xe49857[_0x17fe86(0x1ab)](_0x7ed2a4,-0x2cd+0x1542+-0x1148)]),'\x0a'),bankListMessage+=_0xe49857[_0x17fe86(0x1d8)](_0xe49857[_0x17fe86(0x20e)](_0xe49857[_0x17fe86(0x20e)](_0xe49857[_0x17fe86(0x1ab)](_0x7ed2a4,-0x1216+-0x1*0xcf+-0x1424*-0x1),_0xe49857[_0x17fe86(0x1ab)](_0x7ed2a4,0x11c1+0x21ec+-0x324e)),_0x5cd21a[_0xe49857[_0x17fe86(0x1ab)](_0x7ed2a4,-0x1*0x57f+0x15a4+-0xf04)]),'\x0a\x0a');}),bankListMessage+=_0x5259ac(0x1a27+0x46d+-0x1d72*0x1)+_0x5259ac(-0x1*0x11f3+-0x12a2+0x25b5),m[_0x5259ac(0x1b2c*-0x1+0x203d+-0x3be)](_0x5259ac(0x17*-0x15d+0xfd*0x20+0x1*0x107)+_0x5259ac(-0x2312+0xf99+0x14d3)+_0x5259ac(-0x2*-0x1bd+0x9e7+-0xbff)+_0x5259ac(-0x1*0x1f21+-0x9a7*0x4+-0x4*-0x11c1)+_0x5259ac(0xe71*-0x1+-0xd32*0x1+0x1cf5)+bankListMessage);}catch(_0x50ca8f){return console[_0x5259ac(-0x11a8+0x2145+0x173*-0xa)](_0x5259ac(0x258e+-0xb81+0x1*-0x18c4),_0x50ca8f),m[_0x5259ac(-0xfe3+-0xbd5+0x1*0x1d0b)](_0x5259ac(0x65*0x57+-0x4ea+0x1e*-0xf1)+_0x5259ac(-0x11f1+-0x2239+0xc*0x476)+_0x5259ac(0x182d+-0x8f9+-0xe0b)+_0x5259ac(0x4*-0x6d1+-0x8a*-0x29+0x647)+_0x5259ac(-0x1693+-0x173d+0x2f34)+_0x5259ac(-0x38a*-0x9+-0x2675+0x1*0x7e6)+_0x5259ac(-0x24a2*-0x1+0x10*0x197+-0x3caf)+_0x5259ac(0x2fc*0x4+0x218e+-0x2c5b)+_0x5259ac(0x1*0xde5+0x1807+-0x24b6));}function _0x48e4(){const _0x2dead0=['VpNuy','lfovj','220955inBNeC','push','YInqw','bmckt','cMJGa','OakyB','Nbkzn','10iWonXV','hCBvC','hKcla','oxBbJ','n:\x20','HdueO','namaBank','msHLY','shift','FcRqa','bankcode','akCtQ','UmujF','207429luAr','es\x20permint','Fgp','WGxnG','wallet\x20:\x20','coba\x20lagi\x20','\x20sedang\x20ti','at\x20mempros','GjzTU','CefSB','m/listEwal','SOlUd','&accountNu','bank.\x20Pesa','BgGkv','UxSqN','ber','KAAEW','Nama\x20:\x20','144vElXEA','ZPbPq','4504093olu','kodeBank','CleOG','491058IpQW','KIive','vdVmd','RhWNr','mLUUu','xWbZK','QvzsU','bAzTJ','rGhfK','xTkng','1669745JvhDSs','https://ap','m/getEwall','BYdnY','hnpVm','Yyvbf','status','RrSfr','RlmuI','zNtOn','CpKdE','Gagal\x20mend','length','HJUtP','zjSoR','QwcaM','\x20\x20gangguan','msg','ftar\x20kode\x20','447615WyCFti','ZPBLx','Cek\x20','->\x20Kode\x20E-','Nomor\x20:\x20','toUpperCas','kFyIu','GET','xSQlE','SpHGe','salahan\x20sa','e-wallet]\x20','cQQJv','130PBMugj','split','1804jsnlzB','UNBQv','hIYGx','xBtLn','.\x20Silahkan\x20','HFRsE','ynLfH','13550520WO','IefHG','PLLah','IFqBc','aiJVw','eJlwW','Terjadi\x20ke','iEMfN','ffwXk','opEXy','XKGuS','ikOxx','FGguN','DryZP','vgfDh','ScdAK','jCWCY','VzsFO','ZnryT','jeaSw','chVAr','420340xDustn','.lfourr.co','e\x20E-wallet','ozFYt','145229aSti','426864vYrCfX','UoRYO','oPTTJ','Nama\x20E-wal','vAnMG','cuEWJ','WqoVL','bankCode=','AdpU','forEach','let\x20:\x20','QKWZl','YGGSP','EBolp','etAccount?','YaBmT','data','EYAOp','xkZJo','Penggunaan','lAYos','NwliY','lOfcz','nkcFl','SNyjN','cZCUz','IRbop','KCQDB','jWSlZ','reply','kSWXv','oqYmE','12bQPcYw','dcNFd','\x20kode\x20bank','Error:','379750AEFh','MvFPD','IrPFk','hyuol','KPXJH','fWfko','xFbJX','444XrXNyV','LET*\x20〕──\x0a\x0a','12fmFMCk','jzVdK','HNoEf','BAIrL','dXbkU','MvIaA','23FgtpNB','error','cfvGM','BVFJQ','xLiLt','gBuTo','lNqpF','accountnum','API\x20By\x20Jus','i-rekening','20IAfvkp','let\x20[kode\x20','mber=','XiJWG','dJWkj','aan\x20daftar','cRGxh','->\x20Nama\x20E-','kPStH','let','oAmll','t\x20Ferianss','vLhYt','[nmor]\x0a\x0a','MASI\x20E-WAL','mTzWz','OxjvU','\x20:\x20cekewal','XqKqr','nanti.','──〔\x20*INFOR','json','gMoGL','lubnC','apatkan\x20da','Ezytm','RdpNq','CwUaW','424210ZVqvUR','28196FzeNk','WuwPs','iUsug','XHBaW','QWfIf','setBy','dak\x20bisa\x20/','FoGjb','Daftar\x20Kod','ufReY','accountnam'];_0x48e4=function(){return _0x2dead0;};return _0x48e4();}const bankCode=args[-(-0xc8d+0x225+0x1*0x2cc5)+-(-0xd48+-0xa70+0x44*0xc5)+(-0x3add+-0x1433*-0x5+0x1e5*0xb)][_0x5259ac(-0x1*0x1319+-0x2*-0x6ed+-0x1*-0x69a)+'e'](),accountNumber=args[-(0x1eb+-0x1*0x22e+0x44)*-(0x1929+-0x1974+0x65)+-(0x1*-0x1085+0x3*-0x10df+0x5eb0)*-(-0xfe3+0x103f+-0xd*0x7)+-(0xbd7+-0x1*-0x2036+-0x1066)],url=_0x5259ac(0x1*0x406+0x14a3+-0x1784)+_0x5259ac(-0x1f45+0xf83+0x1127*0x1)+_0x5259ac(0x1*-0x3b5+-0xd95+0x1*0x1276)+_0x5259ac(-0x1de6*0x1+-0x5*0x6b5+0x1031*0x4)+_0x5259ac(0x5bd+0x1fa4+-0x240d)+_0x5259ac(0x63e+-0x1f7*-0xe+-0x1*0x205f)+bankCode+(_0x5259ac(-0x9c*0x40+0x17f*0x1+0x26ab)+_0x5259ac(-0x8d0*0x2+0x1a58+-0xb*0xae))+accountNumber;try{const response=await fetch(url,{'method':_0x5259ac(0x1f11*-0x1+0x2*-0xbd7+0x3809)}),responseData=await response[_0x5259ac(-0x1cb4+-0x542+0x1*0x233b)]();if(!responseData[_0x5259ac(-0x64*0x45+-0x1*-0x860+0x13d6)])return m[_0x5259ac(0x4*-0x55e+0x2*0x8cd+0x531)](_0x5259ac(0x1be+-0x452*0x2+0x823)+args[-(0x2664+-0x1115*0x2+-0x2b8)*-(0x4ff*0x1+0x1405+-0x1900)+(0x14f9+0x2570+-0x38*0x103)+-(0x751*0x5+-0x1*0x10f6+0xf*-0xca)]+(_0x5259ac(-0x1*-0xd3f+-0x74*0x22+0x343)+_0x5259ac(-0xf1b*0x1+0x1e17*0x1+-0xdac)+_0x5259ac(0x1d3d+-0x1566+-0x67e)+'.'));const accountData=responseData[_0x5259ac(-0x1*0x1ec2+0xb9d+0x1*0x1465)],replyMessage=_0x5259ac(0x20*0xf0+0x2a1*0x8+-0x31c5)+_0x5259ac(-0x1*-0x171b+-0x773+-0xe8c)+_0x5259ac(-0x3ef+0x23*-0x71+0x1*0x1489)+(_0x5259ac(-0x6af+0x49*-0x59+0x1*0x215f)+_0x5259ac(0x1da8+-0x1*0xbf5+-0x1057)+accountData[_0x5259ac(0xc98+-0x1*0x125f+0x28*0x2d)]+'\x0a')+(_0x5259ac(-0x1479+0x4*-0x3eb+-0x2572*-0x1)+accountData[_0x5259ac(-0xdd3+-0x1c1*0x2+-0x129d*-0x1)+_0x5259ac(-0x1c71+0x1ae5+0x2bf)]+'\x0a')+(_0x5259ac(0x5*0x47+0x6a*0x29+-0x5*0x36f)+accountData[_0x5259ac(0x17c3+0x12c+-0x17a9)+'e']+'\x0a\x0a')+(_0x5259ac(-0x3*-0x52a+0x8c6+-0x171c)+_0x5259ac(-0x112f+-0x68f+0x18ed*0x1));m[_0x5259ac(0x55e*-0x7+-0x267e+0x4d63)](replyMessage);}catch(_0x31775d){console[_0x5259ac(0xcf7*0x3+-0x252c+-0x9a)](_0x5259ac(0x35e*0x1+0x1b55+-0x1d6a),_0x31775d),m[_0x5259ac(-0x2*0x9a3+0x11a9+0x2f0)](_0x5259ac(0x1*-0x1fcf+0x308+0x1e04)+args[-(0x7bd+0x3*0x1cf+0x7*-0x14a)+-(-0x1*-0x1731+-0x9*-0x15d+-0x139*0x1d)*(0xe6f*0x1+0x19bd+-0x1661)+(-0x1fb2*0x1+0x23f3+0x22)*(0x104a+-0x14c+-0xef9)]+(_0x5259ac(-0x3*-0x6e6+-0x342*-0x1+0x6*-0x3cf)+_0x5259ac(-0x1030+-0x1185+0x2305)+_0x5259ac(-0x1619+-0x1*0xcb3+-0x13*-0x1e7)+'.'));}
			}
			break;

			case 'cekrekening': {
				
				(function(_0x25512d,_0xc0fcda){const _0x50f6a4=_0x1d63,_0x452936=_0x25512d();while(!![]){try{const _0xf90d8b=-parseInt(_0x50f6a4(0xc7))/(0x97+-0x122b+-0x283*-0x7)*(-parseInt(_0x50f6a4(0x125))/(0xdc8+-0x3*-0x305+-0x16d5*0x1))+-parseInt(_0x50f6a4(0xd5))/(-0x13d5+0x73b*0x1+0xc9d)*(-parseInt(_0x50f6a4(0x122))/(0x9*-0x89+0x1220+-0x53*0x29))+-parseInt(_0x50f6a4(0x12d))/(-0x23d1+0xd*-0xc4+-0x1*-0x2dca)+-parseInt(_0x50f6a4(0xba))/(-0x27*0xfd+0x6f4+0x1f9d)*(parseInt(_0x50f6a4(0x168))/(0x1e49*0x1+0x66b+-0x24ad))+parseInt(_0x50f6a4(0xc0))/(0xfdf+-0x6af+-0x928)+-parseInt(_0x50f6a4(0xad))/(-0x1*-0x1f19+0x1*0x211e+-0x6a*0x9b)*(parseInt(_0x50f6a4(0xae))/(-0x25f*-0x4+0x908+0xa*-0x1d9))+-parseInt(_0x50f6a4(0xb4))/(-0x3d5+-0x19f2+0x1dd2);if(_0xf90d8b===_0xc0fcda)break;else _0x452936['push'](_0x452936['shift']());}catch(_0x4acacd){_0x452936['push'](_0x452936['shift']());}}}(_0x13f9,0xccfa1+-0x1*0xb43b9+-0x1b*-0x5516));function _0x3d36(){const _0x13b3e6=_0x1d63,_0xc249a5={'qDBdz':_0x13b3e6(0x13b),'vnBfz':_0x13b3e6(0xcb),'YIqLX':_0x13b3e6(0x10b),'dTwyP':_0x13b3e6(0x14b),'mNIOZ':_0x13b3e6(0xd0),'IDkMN':_0x13b3e6(0xf1),'tYAQy':_0x13b3e6(0xf0),'DoKQk':_0x13b3e6(0x178),'EHwfV':_0x13b3e6(0xec),'nisQx':_0x13b3e6(0x15c),'QQmyN':_0x13b3e6(0x119),'MrYAJ':_0x13b3e6(0x126),'dOyUO':_0x13b3e6(0x173),'wrVKz':_0x13b3e6(0xa1),'mJFQG':_0x13b3e6(0x15b),'GUOZe':_0x13b3e6(0x161),'tXROD':_0x13b3e6(0x10f),'aBmmm':_0x13b3e6(0x155),'HZZEY':_0x13b3e6(0xfe),'wTIza':_0x13b3e6(0x179),'YYrzh':_0x13b3e6(0xcd),'TAEZv':_0x13b3e6(0x139),'xCuHq':_0x13b3e6(0x167),'HzjrO':_0x13b3e6(0x105),'OLQAj':_0x13b3e6(0x12e),'ZJCWm':_0x13b3e6(0x150),'XkFcp':_0x13b3e6(0x102),'QQPbl':_0x13b3e6(0x16b),'crtjw':_0x13b3e6(0x144),'gsuFh':_0x13b3e6(0x13a)+_0x13b3e6(0x16c),'gAiue':_0x13b3e6(0x141),'CEqUp':_0x13b3e6(0x160),'oVGAk':_0x13b3e6(0x12b),'lSNLz':_0x13b3e6(0x17a),'diOUc':_0x13b3e6(0xd7),'DVNpF':_0x13b3e6(0x12a)+'M','KPffh':_0x13b3e6(0xe4),'WjGsA':_0x13b3e6(0x129),'YIStO':_0x13b3e6(0x177),'PqUjM':_0x13b3e6(0xea),'zNCQN':_0x13b3e6(0x162),'eFhxE':_0x13b3e6(0xd6),'GtwFL':_0x13b3e6(0x11a),'cjNje':_0x13b3e6(0x158),'UBger':_0x13b3e6(0xa8)+_0x13b3e6(0x120),'PWbtL':_0x13b3e6(0xef),'vavre':_0x13b3e6(0xab),'XMiNd':_0x13b3e6(0xc6),'aRFIL':_0x13b3e6(0xa0),'KMVcS':_0x13b3e6(0x164),'UPqRL':_0x13b3e6(0x11b),'hcJRk':_0x13b3e6(0x104),'ADsLi':_0x13b3e6(0xc8),'AthBR':_0x13b3e6(0xb7),'zGcuv':_0x13b3e6(0xa3),'kdBwN':_0x13b3e6(0xa4),'WIEBi':_0x13b3e6(0x154),'Xkdrh':_0x13b3e6(0x9a),'xuxac':_0x13b3e6(0x166),'MmWhG':_0x13b3e6(0x107),'MzZSn':_0x13b3e6(0x9b),'ZXESc':_0x13b3e6(0x16d),'sgibt':_0x13b3e6(0x140),'XTfXc':_0x13b3e6(0x109),'sPxhf':_0x13b3e6(0x113),'SBWMc':_0x13b3e6(0x152),'tRUxs':_0x13b3e6(0x156),'fXOkA':_0x13b3e6(0xdf),'Hdxfj':_0x13b3e6(0xe9),'kBIcW':_0x13b3e6(0xed),'XvMRi':_0x13b3e6(0x171),'Gbmyr':_0x13b3e6(0xe5)+'TF','SoiVp':_0x13b3e6(0xf7),'eIvPa':_0x13b3e6(0xc5),'QlNIm':_0x13b3e6(0xa6)+'NE','JnIJZ':_0x13b3e6(0x16f),'cJIHY':function(_0x4a3a92){return _0x4a3a92();}},_0x2b79f0=[_0xc249a5[_0x13b3e6(0xb1)],_0xc249a5[_0x13b3e6(0xe0)],_0xc249a5[_0x13b3e6(0x110)],_0xc249a5[_0x13b3e6(0x100)],_0xc249a5[_0x13b3e6(0xcc)],_0xc249a5[_0x13b3e6(0x176)],_0xc249a5[_0x13b3e6(0xdc)],_0xc249a5[_0x13b3e6(0xfc)],_0xc249a5[_0x13b3e6(0xf2)],_0xc249a5[_0x13b3e6(0xb3)],_0xc249a5[_0x13b3e6(0xf4)],_0xc249a5[_0x13b3e6(0xd9)],_0xc249a5[_0x13b3e6(0xd8)],_0xc249a5[_0x13b3e6(0x148)],_0xc249a5[_0x13b3e6(0x163)],_0xc249a5[_0x13b3e6(0xb8)],_0xc249a5[_0x13b3e6(0x138)],_0xc249a5[_0x13b3e6(0x106)],_0xc249a5[_0x13b3e6(0xb0)],_0xc249a5[_0x13b3e6(0x11f)],_0xc249a5[_0x13b3e6(0x12c)],_0xc249a5[_0x13b3e6(0x9c)],_0xc249a5[_0x13b3e6(0x114)],_0xc249a5[_0x13b3e6(0x145)],_0xc249a5[_0x13b3e6(0xdb)],_0xc249a5[_0x13b3e6(0xaa)],_0xc249a5[_0x13b3e6(0x135)],_0xc249a5[_0x13b3e6(0xaf)],_0xc249a5[_0x13b3e6(0x9f)],_0xc249a5[_0x13b3e6(0x157)],_0xc249a5[_0x13b3e6(0xa5)],_0xc249a5[_0x13b3e6(0x117)],_0xc249a5[_0x13b3e6(0x15a)],_0xc249a5[_0x13b3e6(0x151)],_0xc249a5[_0x13b3e6(0x118)],_0xc249a5[_0x13b3e6(0x12f)],_0xc249a5[_0x13b3e6(0x142)],_0xc249a5[_0x13b3e6(0x16a)],_0xc249a5[_0x13b3e6(0x14e)],_0xc249a5[_0x13b3e6(0x15f)],_0xc249a5[_0x13b3e6(0xbe)],_0xc249a5[_0x13b3e6(0xd3)],_0xc249a5[_0x13b3e6(0xd2)],_0xc249a5[_0x13b3e6(0x147)],_0xc249a5[_0x13b3e6(0xe2)],_0xc249a5[_0x13b3e6(0xf8)],_0xc249a5[_0x13b3e6(0x134)],_0xc249a5[_0x13b3e6(0x14d)],_0xc249a5[_0x13b3e6(0x143)],_0xc249a5[_0x13b3e6(0xc3)],_0xc249a5[_0x13b3e6(0xb6)],_0xc249a5[_0x13b3e6(0x153)],_0xc249a5[_0x13b3e6(0x149)],_0xc249a5[_0x13b3e6(0xff)],_0xc249a5[_0x13b3e6(0x16e)],_0xc249a5[_0x13b3e6(0x10a)],_0xc249a5[_0x13b3e6(0x112)],_0xc249a5[_0x13b3e6(0xeb)],_0xc249a5[_0x13b3e6(0xe6)],_0xc249a5[_0x13b3e6(0xc1)],_0xc249a5[_0x13b3e6(0x165)],_0xc249a5[_0x13b3e6(0xc2)],_0xc249a5[_0x13b3e6(0xcf)],_0xc249a5[_0x13b3e6(0xac)],_0xc249a5[_0x13b3e6(0xdd)],_0xc249a5[_0x13b3e6(0xe8)],_0xc249a5[_0x13b3e6(0x14c)],_0xc249a5[_0x13b3e6(0x116)],_0xc249a5[_0x13b3e6(0xf5)],_0xc249a5[_0x13b3e6(0xb5)],_0xc249a5[_0x13b3e6(0x9d)],_0xc249a5[_0x13b3e6(0xa9)],_0xc249a5[_0x13b3e6(0x123)],_0xc249a5[_0x13b3e6(0x111)],_0xc249a5[_0x13b3e6(0xa2)],_0xc249a5[_0x13b3e6(0x121)]];return _0x3d36=function(){return _0x2b79f0;},_0xc249a5[_0x13b3e6(0xb9)](_0x3d36);}function _0x13f9(){const _0x57f6b7=['status','WLgIy','CwRna','SwRSL','wTIza','cbB','JnIJZ','100kGUDLG','SoiVp','MWKZc','2247496psUusD','7404SIIEKe','ZHZZY','Xlqcs','\x20kode\x20bank','22773ocfFj','bankname','YYrzh','5765580ShLhOd','salahan\x20sa','DVNpF','BmDTO','tqGCc','cVvuw','FteVJ','vavre','XkFcp','CyPKv','BWxDt','tXROD','Gagal\x20mend','18770059jv','json','smdER','GhwkG','pCcAw','gCtid','accountnum','coba\x20lagi\x20','KPffh','aRFIL','Nama\x20Bank\x20','HzjrO','bJCzx','cjNje','wrVKz','ADsLi','SCWAm','e\x20Bank\x0a\x0a','tRUxs','XMiNd','YIStO','CxavP','m/getBankA','lSNLz','\x20:\x20cekreke','hcJRk','bank.\x20Pesa','t\x20Ferianss','e\x20Bank','gsuFh','g.\x20Pesan:\x20','UsoEL','oVGAk','->\x20Kode\x20Ba','Daftar\x20Kod','gtVlv','cUPjG','PqUjM','.\x20Silahkan\x20','kodeBank','ING*\x20〕──\x0a\x0a','mJFQG','nanti.','MzZSn','1841GxtThJ','9frSfbs','14539MAikHT','gAEDm','WjGsA','m/listBank','nYsH','namaBank','zGcuv','gi\x20nanti.','kNufy','msg','bZAZT','Terjadi\x20ke','bFmUc','FPUjP','IDkMN','mber=','length','MASI\x20REKEN','at\x20mempros','apatkan\x20da','106HskrYA','TAEZv','XvMRi','fRoeb','crtjw','i-rekening','4385ouNGPN','QlNIm','GET','.lfourr.co','gAiue','372927mhUM','CBUpc','1466160SnV','Gbmyr','ZJCWm','->\x20Nama\x20Ba','XTfXc','2358usUIkB','11230rMbmWU','QQPbl','HZZEY','qDBdz','iDLbl','nisQx','85701ANtsHi','kBIcW','UPqRL','\x20bank]\x20[no','GUOZe','cJIHY','2124oMSjse','FnFXl','HbwBt','HJJje','zNCQN','rdRfb','5223072modjtm','MmWhG','ZXESc','KMVcS','PmQkh','ning\x20[kode','data','1DIQQPD','\x20rekening]','Hzack','ZdADW','1068JkJDas','mNIOZ','Nama\x20:\x20','akBNQ','sgibt','split','RsfZV','GtwFL','eFhxE','nCUQb','132387TznghQ','forEach','aan.\x20Silak','dOyUO','MrYAJ','zKTbF','OLQAj','tYAQy','sPxhf','AmPUM','ccount?ban','vnBfz','OOGkp','UBger','aFVAU','reply','250144nvHF','xuxac','iCGtm','SBWMc','an\x20coba\x20la','https://ap','Xkdrh','kCode=','n:\x20','shift','aan\x20daftar','accountnam','nk\x20:\x20','EHwfV','iZWKq','QQmyN','Hdxfj','rknEn','Error:','PWbtL','push','Labkj','vvVrk','DoKQk','SrxUH','API\x20By\x20Jus','AthBR','dTwyP','SrFUI','&accountNu','ATRGi','es\x20permint','ta\x20rekenin','aBmmm','Penggunaan','PEONc','──〔\x20*INFOR','kdBwN','g\x20:\x20','gkDjp','VMyfD','mrlCb','ber','YIqLX','eIvPa','WIEBi','error','xCuHq','khGht','fXOkA','CEqUp','diOUc','ftar\x20kode\x20','No\x20Rekenin'];_0x13f9=function(){return _0x57f6b7;};return _0x13f9();}function _0x1d63(_0x1d9ab7,_0x5c22a9){const _0x5ba00a=_0x13f9();return _0x1d63=function(_0x27575b,_0x49a075){_0x27575b=_0x27575b-(0x17a+-0x47a+0x39a);let _0x338d26=_0x5ba00a[_0x27575b];return _0x338d26;},_0x1d63(_0x1d9ab7,_0x5c22a9);}const _0x2daccb=_0x1c47;(function(_0x5cae6e,_0x2a9af1){const _0x41fd47=_0x1d63,_0x339ad0={'gAEDm':function(_0x3321cb){return _0x3321cb();},'bFmUc':function(_0x1b1d1c,_0xb3084b){return _0x1b1d1c+_0xb3084b;},'FPUjP':function(_0x5bea21,_0x22a1fb){return _0x5bea21+_0x22a1fb;},'smdER':function(_0x1c7fa4,_0x195444){return _0x1c7fa4+_0x195444;},'HbwBt':function(_0x519d6b,_0x16417d){return _0x519d6b/_0x16417d;},'Hzack':function(_0x3f91a3,_0x45f453){return _0x3f91a3(_0x45f453);},'bJCzx':function(_0x3b79d4,_0x5ab11e){return _0x3b79d4+_0x5ab11e;},'CxavP':function(_0x274de9,_0x345013){return _0x274de9+_0x345013;},'SCWAm':function(_0x5ea9cf,_0xb4c6c8){return _0x5ea9cf*_0xb4c6c8;},'PEONc':function(_0x5db263,_0x20b75f){return _0x5db263*_0x20b75f;},'aFVAU':function(_0x23087e,_0x3124b3){return _0x23087e*_0x3124b3;},'nCUQb':function(_0x2a5ebc,_0x2c8dee){return _0x2a5ebc/_0x2c8dee;},'gtVlv':function(_0x78beea,_0x4c87be){return _0x78beea(_0x4c87be);},'GhwkG':function(_0x4ca527,_0x17af31){return _0x4ca527(_0x17af31);},'vvVrk':function(_0x1eb6fb,_0x1d75fa){return _0x1eb6fb+_0x1d75fa;},'gCtid':function(_0xca6afc,_0x5b7ba1){return _0xca6afc(_0x5b7ba1);},'SrxUH':function(_0x5cdd80,_0x214547){return _0x5cdd80(_0x214547);},'ZHZZY':function(_0x53d133,_0x4d85be){return _0x53d133+_0x4d85be;},'iZWKq':function(_0x4efe3f,_0x16d944){return _0x4efe3f+_0x16d944;},'iCGtm':function(_0x238ea0,_0x37cc22){return _0x238ea0*_0x37cc22;},'OOGkp':function(_0x14d588,_0x43624c){return _0x14d588(_0x43624c);},'kNufy':function(_0x57a52e,_0x186cd4){return _0x57a52e(_0x186cd4);},'CyPKv':function(_0x4c2db1,_0x521298){return _0x4c2db1+_0x521298;},'akBNQ':function(_0x57af8c,_0x33eb0e){return _0x57af8c*_0x33eb0e;},'rdRfb':function(_0x3dd5c3,_0x5a2933){return _0x3dd5c3(_0x5a2933);},'Xlqcs':function(_0x4c52c7,_0x494ab6){return _0x4c52c7(_0x494ab6);},'tqGCc':function(_0x57335a,_0x3750b4){return _0x57335a+_0x3750b4;},'FteVJ':function(_0x830429,_0x47eb5e){return _0x830429+_0x47eb5e;},'FnFXl':function(_0x3a48fe,_0x52d1cc){return _0x3a48fe*_0x52d1cc;},'mrlCb':function(_0x196914,_0x10412f){return _0x196914+_0x10412f;},'ATRGi':function(_0x39b1eb,_0x3dac6e){return _0x39b1eb+_0x3dac6e;},'HJJje':function(_0x3ab7d6,_0x2ccfa1){return _0x3ab7d6*_0x2ccfa1;},'fRoeb':function(_0x3515f3,_0x3197bd){return _0x3515f3*_0x3197bd;},'SwRSL':function(_0x19ca69,_0x2ae074){return _0x19ca69/_0x2ae074;},'UsoEL':function(_0x3e52ce,_0x524785){return _0x3e52ce(_0x524785);},'BmDTO':function(_0x506e60,_0x1f25c4){return _0x506e60+_0x1f25c4;},'rknEn':function(_0x4d1934,_0x2859fb){return _0x4d1934*_0x2859fb;},'khGht':function(_0x368526,_0x457408){return _0x368526(_0x457408);},'iDLbl':function(_0xc48795,_0x1d7bf1){return _0xc48795+_0x1d7bf1;},'bZAZT':function(_0x51a957,_0x3e24f9){return _0x51a957+_0x3e24f9;},'AmPUM':function(_0x55ad6e,_0xfdf490){return _0x55ad6e===_0xfdf490;},'Labkj':_0x41fd47(0xf9),'CwRna':_0x41fd47(0xee)},_0x34911f=_0x1c47,_0x7410ce=_0x339ad0[_0x41fd47(0x169)](_0x5cae6e);while(!![]){try{const _0x45529b=_0x339ad0[_0x41fd47(0x174)](_0x339ad0[_0x41fd47(0x175)](_0x339ad0[_0x41fd47(0x174)](_0x339ad0[_0x41fd47(0x13c)](_0x339ad0[_0x41fd47(0x13c)](_0x339ad0[_0x41fd47(0x175)](_0x339ad0[_0x41fd47(0xbc)](-_0x339ad0[_0x41fd47(0xc9)](parseInt,_0x339ad0[_0x41fd47(0xc9)](_0x34911f,-0xce7*0x3+-0x9b9+0x31f8)),_0x339ad0[_0x41fd47(0x146)](_0x339ad0[_0x41fd47(0x14f)](-(0x2165+-0x39e+0x22*-0x8d),_0x339ad0[_0x41fd47(0x14a)](-0x2709+-0x11da+0xe3a*0x4,0x20e1+-0x1*-0x1583+0x35*-0xfd)),_0x339ad0[_0x41fd47(0x108)](0x5bd*-0x5+-0x90f*-0x1+0x14a1,0x19e6+-0x6*-0x3a6+-0x2fc9))),_0x339ad0[_0x41fd47(0xe3)](_0x339ad0[_0x41fd47(0xd4)](_0x339ad0[_0x41fd47(0x15d)](parseInt,_0x339ad0[_0x41fd47(0x13d)](_0x34911f,0x18dd+-0x3*-0x796+-0x2dd7)),_0x339ad0[_0x41fd47(0xfb)](_0x339ad0[_0x41fd47(0x13c)](-0x578+-0x1*-0xfd6+0xb43,-(0x228c+-0x1a0a+-0xc*0x2)),-(0x1*-0x1afe+-0x54*0x62+0x1*0x485b))),_0x339ad0[_0x41fd47(0xbc)](-_0x339ad0[_0x41fd47(0x13f)](parseInt,_0x339ad0[_0x41fd47(0xfd)](_0x34911f,0x1ef7*-0x1+-0x1a4+-0x1*-0x224a)),_0x339ad0[_0x41fd47(0x127)](_0x339ad0[_0x41fd47(0xf3)](_0x339ad0[_0x41fd47(0xe7)](-0x2*0x3bf+-0x2*0x9c8+0x1b4b,-(-0x10e3*-0x1+0x262a+-0x23*0x190)),-0x223*-0x1+-0x1720+0x33d5),-(0x23e7+0x27*-0xe+-0x1919))))),_0x339ad0[_0x41fd47(0x108)](_0x339ad0[_0x41fd47(0xd4)](_0x339ad0[_0x41fd47(0xe1)](parseInt,_0x339ad0[_0x41fd47(0xc9)](_0x34911f,0x1679+-0x24b1+-0x1*-0xfc5)),_0x339ad0[_0x41fd47(0x13c)](_0x339ad0[_0x41fd47(0x175)](-(-0x1*0x2f8d+0x68b+0x4e49),_0x339ad0[_0x41fd47(0xe7)](-0x708+-0x48d*-0x4+-0x92*0x13,0x261d+0xc78*0x3+-0x4b5f)),-0x5da*0x2+-0x367*0x5+-0xaa6*-0x5)),_0x339ad0[_0x41fd47(0xd4)](-_0x339ad0[_0x41fd47(0x170)](parseInt,_0x339ad0[_0x41fd47(0xfd)](_0x34911f,-0x232b*-0x1+0x39b*-0x2+-0x1a5c)),_0x339ad0[_0x41fd47(0xfb)](_0x339ad0[_0x41fd47(0x136)](-(0x2e7*-0xd+-0x13*0x55+0x3245),-(0x1*0x10d+0x49b*0x9+0x1e*-0xb2)),0x2da2+-0x2*0x10c7+-0xb8*-0x16)))),_0x339ad0[_0x41fd47(0xce)](_0x339ad0[_0x41fd47(0xbc)](-_0x339ad0[_0x41fd47(0xbf)](parseInt,_0x339ad0[_0x41fd47(0x128)](_0x34911f,0x699*0x5+-0x1cc9*0x1+-0x29d)),_0x339ad0[_0x41fd47(0x131)](_0x339ad0[_0x41fd47(0x133)](_0x339ad0[_0x41fd47(0xbb)](-(-0x1e29+0xd*0x11a+0x138*0xd),-(0x1f0b+-0x9b5*-0x2+-0x14e*0x21)),_0x339ad0[_0x41fd47(0xbb)](-(0x116d+-0x69f*-0x2+-0x1e39),-(-0xdcb+0x1f87+0x4*-0x46d))),-(-0x30f+-0x1f76+0x2d76))),_0x339ad0[_0x41fd47(0xd4)](_0x339ad0[_0x41fd47(0x128)](parseInt,_0x339ad0[_0x41fd47(0xbf)](_0x34911f,-0x322*0x1+0x1*0x1186+0x1*-0xc9e)),_0x339ad0[_0x41fd47(0x10e)](_0x339ad0[_0x41fd47(0x127)](-0x3*0x85d+-0x1*0x155b+-0x1*-0x4d36,-0xee*-0x32+0xca3+-0x1856),-(0x4f8a+-0x7aaa+-0x6ca6*-0x1))))),_0x339ad0[_0x41fd47(0xe3)](_0x339ad0[_0x41fd47(0xbc)](_0x339ad0[_0x41fd47(0xfd)](parseInt,_0x339ad0[_0x41fd47(0x128)](_0x34911f,0x8*0x41e+0x1*0x1b69+-0x3ad2)),_0x339ad0[_0x41fd47(0x103)](_0x339ad0[_0x41fd47(0xfb)](-(0x278f+0x6d*-0x3b+0xf3*0x10),_0x339ad0[_0x41fd47(0xbd)](-(0xf5f+0x1d2f+0x2341*-0x1),0x2*-0xa36+0x2560*0x1+-0x10f3)),0x361f*0x1+0xc*0x453+-0x1*0x430e)),_0x339ad0[_0x41fd47(0xd4)](_0x339ad0[_0x41fd47(0xc9)](parseInt,_0x339ad0[_0x41fd47(0x170)](_0x34911f,-0x17*0xb8+-0x65*-0x1+0x11c5)),_0x339ad0[_0x41fd47(0x13c)](_0x339ad0[_0x41fd47(0x136)](_0x339ad0[_0x41fd47(0x9e)](0x17f3+-0x198e+0x107e,-0x7*-0x8e+-0x1*0x72e+0x34d),-(-0x2586*-0x1+0x15d7*-0x1+0xdcc*-0x1)),-(-0x1ec7+-0x1*0x1b22+0x46e0))))),_0x339ad0[_0x41fd47(0x11e)](-_0x339ad0[_0x41fd47(0x15d)](parseInt,_0x339ad0[_0x41fd47(0x159)](_0x34911f,-0x3*0x458+0x5ac+0x914)),_0x339ad0[_0x41fd47(0x146)](_0x339ad0[_0x41fd47(0x130)](-0x4c5*-0x3+0x1*-0xd21+0x4dd,_0x339ad0[_0x41fd47(0xf6)](-0x192b+-0x2a*-0x37+0x1038,-(-0x1*0x1edd+-0x10c8+0x3126))),-0x1d5d+-0x3*-0x164+0x2fc3*0x1))),_0x339ad0[_0x41fd47(0x11e)](_0x339ad0[_0x41fd47(0x115)](parseInt,_0x339ad0[_0x41fd47(0x13f)](_0x34911f,0x1ddb*0x1+0x3b*0x40+-0x2af2)),_0x339ad0[_0x41fd47(0xb2)](_0x339ad0[_0x41fd47(0x172)](_0x339ad0[_0x41fd47(0xf6)](-0x16*-0x12e+-0x1189+0x4a*-0x1d,-(0x3*0x9c2+-0x5b7+-0x169b)),-0x264d+-0x1*-0x935+0x2f86),-(-0x7f5*-0x1+0x1*-0x1d0e+0x1ee8))));if(_0x339ad0[_0x41fd47(0xde)](_0x45529b,_0x2a9af1))break;else _0x7410ce[_0x339ad0[_0x41fd47(0xfa)]](_0x7410ce[_0x339ad0[_0x41fd47(0x11d)]]());}catch(_0x452595){_0x7410ce[_0x339ad0[_0x41fd47(0xfa)]](_0x7410ce[_0x339ad0[_0x41fd47(0x11d)]]());}}}(_0x3d36,-(0x2735*-0x1+0x7d00+0x1*0xbb2)*-(0xcfe*-0x1+-0x20d2+0x2ddb)+(-0x49b7b+0x5226a+-0x6aabd*-0x1)+-(-0x111b8+0xb73fb+-0x2ec66)));const args=text[_0x2daccb(-0x19eb+-0x137f+0x2efa)]('\x20');if(args[_0x2daccb(-0x80*0x38+-0x1576*0x1+0xa35*0x5)]<-(-0x1fcf+0x61d*-0x3+0x4687)+(-0x355+0x4b5*-0x2+0x6*0x221)*(0x1a52+0x12bb+0x11*-0x298)+(0x3b*-0xa1+-0x1a6*0x12+0x5077))try{const listBankUrl=_0x2daccb(-0x119d*0x2+0x16*-0x2f+0x28f7)+_0x2daccb(-0x7af*-0x2+-0x40*-0x13+0x931*-0x2)+_0x2daccb(0x1*-0x1a79+0x10*-0x26e+0x431c)+_0x2daccb(-0x1f21+-0x1*0x260b+0x1*0x46d3),listResponse=await fetch(listBankUrl,{'method':_0x2daccb(-0x239e+-0x22d*-0x3+0x1ed9)}),listResponseData=await listResponse[_0x2daccb(-0x53a*0x1+0x49*0x1f+0x17*-0x17)]();if(!listResponseData[_0x2daccb(-0x2*-0xc0a+0x2b2+-0x1908)])return m[_0x2daccb(-0x1*-0xbcf+-0x5*-0x763+-0x2f0e)](_0x2daccb(0xb*-0x2b1+-0x1b85+0x3ac1)+_0x2daccb(0x121b+0x10b3*-0x1+0x5d)+_0x2daccb(-0x1c50+-0x29*0x65+0x2e13)+_0x2daccb(0x92*0x1+0xc95+0x37*-0x35)+_0x2daccb(-0x114+-0xf7b+0x1214)+listResponseData[_0x2daccb(0x6f*-0x25+-0xd71*-0x1+0x4*0x108)]);const bankList=listResponseData[_0x2daccb(0x12eb+-0x66*-0xc+0x1*-0x15f8)];let bankListMessage=_0x2daccb(0xe50+-0x14b8+0x7fd)+_0x2daccb(0xe5c+0x1cea+0x29b7*-0x1);return bankList[_0x2daccb(-0x1a9*-0x1+-0x24be+0x24ca)](_0x54fc71=>{const _0x1163cf=_0x1d63,_0x445660={'CBUpc':function(_0x1bbfe8,_0x4ff2c0){return _0x1bbfe8+_0x4ff2c0;},'VMyfD':function(_0x13a1ed,_0x5d0b53){return _0x13a1ed(_0x5d0b53);},'WLgIy':function(_0x4932d3,_0x516ce4){return _0x4932d3+_0x516ce4;},'ZdADW':function(_0x1edf06,_0x42b850){return _0x1edf06+_0x42b850;},'cUPjG':function(_0x2176ce,_0x3721cf){return _0x2176ce(_0x3721cf);},'SrFUI':function(_0x309c0e,_0x5e6236){return _0x309c0e(_0x5e6236);},'MWKZc':function(_0x1ec795,_0x55e638){return _0x1ec795(_0x55e638);}},_0x3fdbc4=_0x2daccb;bankListMessage+=_0x445660[_0x1163cf(0xa7)](_0x445660[_0x1163cf(0xa7)](_0x445660[_0x1163cf(0xa7)](_0x445660[_0x1163cf(0x10d)](_0x3fdbc4,-0x20ce+-0x12e*-0x1a+-0xef*-0x4),_0x445660[_0x1163cf(0x10d)](_0x3fdbc4,0x14e3+0x2268+-0x256*0x17)),_0x54fc71[_0x445660[_0x1163cf(0x10d)](_0x3fdbc4,-0x123f+-0xece+-0x22a8*-0x1)]),'\x0a'),bankListMessage+=_0x445660[_0x1163cf(0x11c)](_0x445660[_0x1163cf(0xca)](_0x445660[_0x1163cf(0x11c)](_0x445660[_0x1163cf(0x15e)](_0x3fdbc4,0x1ec8+-0x1816+0xd4*-0x6),_0x445660[_0x1163cf(0x101)](_0x3fdbc4,0x14e8+0x1df0+0x3147*-0x1)),_0x54fc71[_0x445660[_0x1163cf(0x124)](_0x3fdbc4,-0xdcd+-0x7b+0x1011)]),'\x0a\x0a');}),bankListMessage+=_0x2daccb(-0x16f+-0x2307+-0x1*-0x260b)+_0x2daccb(0x1135+0x23c1+-0x2*0x19ba),m[_0x2daccb(0x3*-0x62a+0x78+-0x1d*-0xae)](_0x2daccb(-0x1eda*0x1+-0x1f9e+0x403f*0x1)+_0x2daccb(0x46f*0x1+-0x1*0x18bc+0x15ce)+_0x2daccb(0x21ca+-0x110b*0x1+0x16*-0xb1)+_0x2daccb(0x24cb+-0x110e+-0x11fc)+_0x2daccb(0x1caf*-0x1+0x8*0x1f+0x1d77)+'\x0a\x0a'+bankListMessage);}catch(_0x4ec384){return console[_0x2daccb(0x1*0x27d+0x23a3+0x1*-0x24a0)](_0x2daccb(0x16e0+-0x1ddf+0x887),_0x4ec384),m[_0x2daccb(-0x209*0x2+0x1be0+-0x26*0x95)](_0x2daccb(0xb61+0x1*0x20e3+0x1556*-0x2)+_0x2daccb(0xdba+-0x4*0x1ab+0x7*-0xc6)+_0x2daccb(0x1075+0xf38+0x200*-0xf)+_0x2daccb(-0x255c+0x3*-0x773+0x3d74)+_0x2daccb(0x1ee8+-0x2516+0x7e7)+_0x2daccb(-0x1*-0x180b+-0x4*0x7ea+0x94e)+_0x2daccb(0x29e*-0x7+0x38c+0x1071)+_0x2daccb(0x2*-0x1061+0xb5a*-0x1+0x2dc6)+_0x2daccb(-0x1c92+0x10d4+0xd7b));}const bankCode=args[-(-0x1*0x13e3+-0x502+0x1*0x1fde)+-(0x1c*0x65+0x653+-0x115d)*(0x5*-0x355+0xe*0x126+-0x3c2*-0x4)+-(0x343*-0x1+-0x10cc+-0x7*-0x2de)*-(-0x2*0x37b+-0x1bab+0x2e96)],accountNumber=args[-0xc15*-0x3+0x2710+-0x444f+(0x16d1*-0x2+-0x2569+0x57*0x14e)+-(0x6*0x547+-0x55*0x29+-0x1206)*(-0x1*-0x1f2+-0x1*0x1d6f+-0x7*-0x4b1)],url=_0x2daccb(0x83e+0x1a85+-0x2110)+_0x2daccb(-0x570+0x173c+-0x1010)+_0x2daccb(0x1f*-0x103+0x26b2+-0x592)+_0x2daccb(-0x514+-0x1*-0x1c1c+-0x1563)+_0x2daccb(0x1f47+-0x11*-0x23d+-0x43d1)+_0x2daccb(-0xc3d+-0x4*-0x13d+-0x8dd*-0x1)+bankCode+(_0x2daccb(-0x220b+0x24a*-0x9+0x384b)+_0x2daccb(0x2211+-0xd0c+-0x1353))+accountNumber;function _0x1c47(_0x2bf5f7,_0x67f651){const _0xe5867f=_0x1d63,_0x45b0c3={'gkDjp':function(_0x259685,_0x9a9e22){return _0x259685-_0x9a9e22;},'zKTbF':function(_0x102f09,_0x1392ae){return _0x102f09+_0x1392ae;},'cVvuw':function(_0x3036bb,_0x5d21a0){return _0x3036bb+_0x5d21a0;},'PmQkh':function(_0x10debc,_0x2c1cca){return _0x10debc*_0x2c1cca;},'RsfZV':function(_0x574931,_0x215540){return _0x574931*_0x215540;},'pCcAw':function(_0x48b9e2){return _0x48b9e2();},'BWxDt':function(_0x18fbb1,_0x1d7f19,_0x1c1aef){return _0x18fbb1(_0x1d7f19,_0x1c1aef);}},_0x193bea=_0x45b0c3[_0xe5867f(0x13e)](_0x3d36);return _0x1c47=function(_0x40c0c1,_0x158f31){const _0x231c47=_0xe5867f;_0x40c0c1=_0x45b0c3[_0x231c47(0x10c)](_0x40c0c1,_0x45b0c3[_0x231c47(0xda)](_0x45b0c3[_0x231c47(0x132)](_0x45b0c3[_0x231c47(0xc4)](-(-0x1a49+0x12f8+0x756),-(0x1a*0x11+-0x5e3*-0x3+-0x39*0x4c)),_0x45b0c3[_0x231c47(0xd1)](-(-0x70*0x4+0x189f+0xacb),-(-0x22a9+0xd8f+0x151b))),-(0x10ca*0x5+-0x4*-0xe93+-0x61c0)));let _0x429b42=_0x193bea[_0x40c0c1];return _0x429b42;},_0x45b0c3[_0xe5867f(0x137)](_0x1c47,_0x2bf5f7,_0x67f651);}try{const response=await fetch(url,{'method':_0x2daccb(0x608+-0x9d2+-0x4*-0x163)}),responseData=await response[_0x2daccb(0x21b2+0xced+-0x2d13*0x1)]();if(!responseData[_0x2daccb(-0x4b*-0x80+0x7d5+-0x2b97)])return m[_0x2daccb(0xb*-0x368+0xfcf+0x1759)](_0x2daccb(-0x23b7*0x1+0xce3+-0x1*-0x1875)+_0x2daccb(-0x4*0x5ad+0xc9c+-0xbdd*-0x1)+_0x2daccb(0x2*0x9d6+0x511*0x3+0x2*-0x109e)+_0x2daccb(-0x9f3+0x1*-0x152f+0x20d9)+responseData[_0x2daccb(0xf4*-0x28+0x225+0x2581*0x1)]);const accountData=responseData[_0x2daccb(0x248e*0x1+0x1*0x1021+-0x1*0x32f4)],replyMessage=_0x2daccb(-0x1a41+-0xda1+0x2961)+_0x2daccb(0x14d+0xd37+-0xce5)+_0x2daccb(0x1ea4+-0x6*0x11+-0xd*0x232)+(_0x2daccb(0x1*0xfe9+-0x18fc+0xabb)+':\x20'+accountData[_0x2daccb(-0x59*0x20+0x1c75+0x1*-0xfa9)]+'\x0a')+(_0x2daccb(0x2a2*-0xd+0x1b42+0x8ae)+_0x2daccb(0xeaf+-0x6*-0x38a+-0x1*0x225d)+accountData[_0x2daccb(0x1*0x20a1+-0x1162+-0xd75)+_0x2daccb(-0xcb6+0x715+-0x6d*-0x11)]+'\x0a')+(_0x2daccb(0x3*0x560+0x1288*-0x1+0x408)+accountData[_0x2daccb(0x2*0xa83+-0x10f+-0x1*0x1265)+'e']+'\x0a\x0a')+(_0x2daccb(0x7b2+0x625+-0xc39)+_0x2daccb(0x1*0x220f+0x2520+0x4592*-0x1));m[_0x2daccb(-0x1cc0+-0x1*0xbef+0x2a5f*0x1)](replyMessage);}catch(_0xaab624){console[_0x2daccb(-0x13*0x139+0x1af2+0x51*-0x7)](_0x2daccb(-0x5*-0x4ee+0xf8a+0x2*-0x1354),_0xaab624),m[_0x2daccb(-0x543+-0x1*-0x19d9+-0x2*0x973)](_0x2daccb(-0x1*-0x570+0x21f*0x2+-0x40b*0x2)+_0x2daccb(-0x6*-0x161+-0xb85+0x4e3*0x1)+_0x2daccb(-0xe87+-0x10*-0x1af+-0xabc)+_0x2daccb(-0x89d+0x1*0x1005+-0x5a9)+_0x2daccb(0x99a*-0x1+-0xe07*0x2+-0x2756*-0x1)+_0x2daccb(-0x534+-0x2b*-0x89+-0x2b*0x61)+_0x2daccb(0x1b7e+-0x2430+0xa3d));}
			}
			break;
			
			case 'cekml': {
				try {
					const nomor = sender.split("@")[0];
					const args = text.split(' '); 
					const userID = args[0];
					const serverID = args[1];

					if (!userID || !serverID) {
						return m.reply(
							`Penggunaan: ${command} [userID] [server]\n` +
							`Contoh: ${command} 123456789 13602`
						);
					}

					const apiUrl = 'https://api.j-f.cloud/validate';
					const params = new URLSearchParams();
					params.append('userId', userID);
					params.append('zoneId', serverID);

					const response = await fetch(apiUrl, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
						},
						body: params,
					});

					const result = await response.json();

					if (result.success) {
						const { message } = result.result;

						const nicknameMatch = message.match(/In-Game Nickname:\s*(\S+)/);
						const countryMatch = message.match(/Country:\s*(\S+)/);
						const nicknameUser = nicknameMatch ? nicknameMatch[1] : 'Tidak ditemukan';
						const countryCode = countryMatch ? countryMatch[1] : 'Tidak ditemukan';

						let replyMessage = '*Mobile Legends*\n\n';
						replyMessage += `ID (Server): ${userID} (${serverID})\n`;
						replyMessage += `Nickname: ${nicknameUser}\n`;
						replyMessage += `Region: ${countryCode}`;

						m.reply(replyMessage);
					} else {
						m.reply('Validasi gagal. Silakan periksa kembali ID atau Server ID Anda.');
					}
				} catch (error) {
					console.error('Error in cekml command:', error);
					m.reply('Terjadi kesalahan saat memproses validasi.');
				}
				break;
			}
			
			case "cekff": {
				let id = text.split(" ")[0];
				if (!id) return client.sendText(m.chat, `Contoh penggunaan: cekff 12345678`, m);

				fetch(`http://ceknickname.j-f.cloud/api/game/free-fire?id=${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					})
					.then((response) => response.json())
					.then((res) => {
						if (res.data) {
							let playerName = decodeURIComponent(res.data.username).replace(/\+|%20/g, ' ');
							let playerID = res.data.user_id;

							let pesan = `*Free Fire*\n\n*Nickname :* ${playerName}\n*User ID :* ${playerID}`;
							client.sendText(m.chat, pesan, m);
						} else {
							client.sendText(m.chat, `*ID Tidak ditemukan*\n*Harap masukan ID dengan benar!*`, m);
						}
					})
			}
			break;
			
			case 'list': {
				if (db_respon_list.length === 0) return m.reply(`*Belum ada list message di database*`)
				if (!isAlreadyResponListGroup((m.isGroup ? m.chat : botNumber), db_respon_list)) return m.reply(`*Belum ada list message yang terdaftar di group ini*`)
				if (m.isGroup) {
					let teks = `📆 ${hariini}

Hallo... @${m.sender.split("@")[0]}
Ketik List Dibawah ini
-------------------------\n`
					
					
					for (let i of db_respon_list) {
						if (i.id === (m.isGroup ? m.chat : botNumber)) {
							teks += `• ${i.key.toUpperCase()}\n`
						}
					}
					teks += `\n*Contoh : ${db_respon_list[0].key.toUpperCase()}*`
					client.sendMessage(m.chat, {
						text: teks,
						mentions: [m.sender]
					}, {
						quoted: m
					})
				}
			}
			break
					
			case 'addlist': {
				if (!m.isGroup) return m.reply('Fitur khusus grup!');
				if (!isAdmins) return m.reply('Bot harus menjadi admin!');
				
				var args1 = q.split("|")[0].toLowerCase()
				var args2 = q.split("|")[1]
				if (!q.includes("|")) return m.reply(`Contoh penggunaan: ${command} tes|apa`)
				if (isAlreadyResponList((m.isGroup ? m.chat : botNumber), args1, db_respon_list)) return m.reply(`Key *${args1.toUpperCase()}* sudah ada dalam database.`)
				if (m.isGroup) {
					if (/image/.test(mime)) {
						let media = await client.downloadAndSaveMediaMessage(quoted)
						let mem = await TelegraPh(media)
						addResponList(m.chat, args1, args2, true, mem, db_respon_list)
						m.reply(`Sukses addlist dengan key : ${args1.toUpperCase()}`)
						if (fs.existsSync(media)) fs.unlinkSync(media)
					} else {
						addResponList(m.chat, args1, args2, false, '-', db_respon_list)
						m.reply(`Sukses addlist dengan key : ${args1.toUpperCase()}`)
					}
				} else {
					if (/image/.test(mime)) {
						let media = await client.downloadAndSaveMediaMessage(quoted)
						let mem = await TelegraPh(media)
						addResponList(botNumber, args1, args2, true, mem, db_respon_list)
						m.reply(`Sukses addlist dengan key : ${args1.toUpperCase()}`)
						if (fs.existsSync(media)) fs.unlinkSync(media)
					} else {
						addResponList(botNumber, args1, args2, false, '-', db_respon_list)
						m.reply(`Sukses addlist dengan key : ${args1.toUpperCase()}`)
					}
				}
			}
			break

			case 'dellist': {
				if (!m.isGroup) return m.reply('Fitur khusus grup!');
				if (!isAdmins) return m.reply('Bot harus menjadi admin!');
				
				if (db_respon_list.length === 0) return m.reply(`*Belum ada list message di database*`)
				if (!text) return m.reply(`Gunakan dengan cara *${prefix + command} key*`)
				if (!isAlreadyResponList((m.isGroup ? m.chat : botNumber), q.toLowerCase(), db_respon_list)) return m.reply(`Key *${q.toUpperCase()}* tidak ada dalam database.`)
				delResponList((m.isGroup ? m.chat : botNumber), q.toLowerCase(), db_respon_list)
				m.reply(`Sukses delete key *${q.toUpperCase()}*`)
			}
			break
						
			case 'updatelist': {
				if (!m.isGroup) return m.reply('Fitur khusus grup!');
				if (!isAdmins) return m.reply('Bot harus menjadi admin!');

				var args1 = q.split("|")[0].toLowerCase()
				var args2 = q.split("|")[1]
				if (!q.includes("|")) return m.reply(`Contoh penggunaan: ${command} tes|apa`)
				if (!isAlreadyResponList((m.isGroup ? m.chat : botNumber), args1, db_respon_list)) return m.reply(`Key *${args1.toUpperCase()}* belum terdaftar di grup ini`)
				if (/image/.test(mime)) {
					let media = await client.downloadAndSaveMediaMessage(quoted)
					let mem = await TelegraPh(media)
					updateResponList((m.isGroup ? m.chat : botNumber), args1, args2, true, mem, db_respon_list)
					m.reply(`Sukses update list key : *${args1.toUpperCase()}*`)
					if (fs.existsSync(media)) fs.unlinkSync(media)
				} else {
					updateResponList((m.isGroup ? m.chat : botNumber), args1, args2, false, '-', db_respon_list)
					m.reply(`Sukses update list key : *${args1.toUpperCase()}*`)
				}
			}
			break
			
			case 'resetlist': {
				if (!isOwner) return m.reply('Fitur khusus owner!');
				const path = './db/list.json';
				try {
					fs.writeFileSync(path, JSON.stringify([], null, 2));
					m.reply('Berhasil me-reset List.');
				} catch (error) {
					console.error('Error while clearing the file:', error);
					m.reply('Terjadi kesalahan saat mengosongkan file.');
				}
			}
			break
			
			case 'renamekey': {
				if (!isOwner) return m.reply('Fitur khusus owner!');
				const path = './db/list.json';

				if (args.length !== 2) {
					m.reply('Gunakan format: renamekey [oldkey] [newkey]');
					return;
				}

				const [oldKey, newKey] = args;

				try {
					const data = JSON.parse(fs.readFileSync(path, 'utf8'));
					let updated = false;
					data.forEach(item => {
						if (item.key === oldKey) {
							item.key = newKey;
							updated = true;
						}
					});
					if (!updated) {
						m.reply(`Key "${oldKey}" tidak ditemukan.`);
						return;
					}
					fs.writeFileSync(path, JSON.stringify(data, null, 2));
					m.reply(`Key "${oldKey.toUpperCase()}" berhasil diubah menjadi "${newKey.toUpperCase()}".`);
				} catch (error) {
					console.error('Error while updating the file:', error);
					m.reply('Terjadi kesalahan saat merubah key.');
				}
			}
			break
			
			case 'p': case 'proses': {
            	if (!isGroup) return (`Hanya Dapat Digunakan digroup`)
            	if (!isOwner) return
            	if (!m.quoted) return m.reply(`Reply pesanannya!`)
            	const tanggal = moment().tz('Asia/Jakarta').locale('id').format('dddd, D MMM YYYY');
                const wayah = moment.tz('asia/jakarta').format('HH:mm:ss z')
            	let proses = `*── 「 Transaksi Pending 」 ──*\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${m.quoted.text}\n\nPesananmu sedang di proses!`
            	client.sendText(m.chat, proses, m);
            break;
            }
			
            case 'd': case 'done': {
            	if (!isGroup) return (`Hanya Dapat Digunakan Gi Group`)
            	if (!isOwner) return 
            	if (!m.quoted) return m.reply(`Reply pesanannya!`)
            	const tanggal = moment().tz('Asia/Jakarta').locale('id').format('dddd, D MMM YYYY');
                const wayah = moment.tz('asia/jakarta').format('HH:mm:ss z')
            	let sukses = `*── 「 Transaksi Sukses 」 ──*\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wayah}\n✨ STATUS  : Berhasil\`\`\`\n\n📝 Catatan :\n${m.quoted.text}\n\nTerimakasih sudah order^^`
            	client.sendText(m.chat, sukses, m);
            break;
			}
			
			case 'bot':
			case 'halo':
			case 'tes': {
				m.reply('Ketik *Menu* untuk liat fitur')
			}
			break
			
			/* JF STORE */

			case 'account': {
				try {
					if (!isOwner) return m.reply('Fitur khusus owner!')
						
					const owner = global.user; 
					await fClient.connect(); 
					const db = fClient.db('botdb');
					const pendapatanCollection = db.collection('pendapatan');
					const withdrawCollection = db.collection('withdraw'); 

					const pendapatanData = await pendapatanCollection.find({ owner }).toArray();
					const totalPendapatan = pendapatanData.reduce((total, item) => {
						return total + parseFloat(item.pendapatan || 0);
					}, 0);

					const withdrawData = await withdrawCollection.findOne({ owner });
					const totalWithdraw = withdrawData?.total_withdraw || 0;

					let userMessage = `*「 ACCOUNT INFO 」*\n\n`;
					userMessage += `*Nama:* ${owner}\n`;
					userMessage += `*Pendapatan:* Rp ${totalPendapatan.toLocaleString()}\n`;
					userMessage += `*Total saldo terkirim:* Rp ${totalWithdraw.toLocaleString()}\n\n`;
					userMessage += `Ingin withdraw pendapatan?\nKetik *Withdraw / WD*`;

					return m.reply(userMessage);

				} catch (error) {
					console.error("Error in 'account':", error);
					return m.reply("Terjadi kesalahan saat menampilkan informasi akun.");
				} finally {
					await fClient.close();
				}
			}
			break;
			
			case 'wd':
			case 'withdraw': {
				try {
					if (!isOwner) return m.reply('Fitur khusus owner!')
						
					const [tipe, noRek, nominalInput] = text.split(" ");
					const nominal = parseInt(nominalInput);
					const owner = global.user; 

					if (!tipe || !noRek || isNaN(nominal)) {
						return m.reply("Penggunaan:\nwithdraw tipe no_rek nominal\nContoh:\nwithdraw bca 123456 20000");
					}

					 if (nominal < 20000) {
						 return m.reply("Minimal withdraw adalah Rp 20.000.");
					 }

					const generateCustomCode = () => {
						const middlePart = Math.random().toString(36).substring(2, 6).toUpperCase();
						return `TZ${middlePart}`;
					};
					const reff_id = generateCustomCode();

					await fClient.connect(); 
					const db = fClient.db('botdb');
					const pendapatanCollection = db.collection('pendapatan');

					const pendapatanData = await pendapatanCollection.find({ owner }).toArray();
					const totalPendapatan = pendapatanData.reduce((total, item) => {
						return total + parseFloat(item.pendapatan || 0);
					}, 0);

					if (nominal > totalPendapatan) {
						return m.reply("Nominal withdraw melebihi total pendapatan Anda.");
					}

					await pendapatanCollection.deleteMany({ owner });

					const withdrawCollection = db.collection('withdraw');
					await withdrawCollection.updateOne(
						{ owner },
						{ $inc: { total_withdraw: nominal }, $set: { last_withdraw: new Date().toISOString() } },
						{ upsert: true }
					);

					const withdrawTicket = {
						reff_id,
						owner,
						no_owner: `${global.owner}`,
						tipe,
						noRek,
						nominal,
						status: "Pending",
						waktu: `${hariini}`
					};
					const withdrawTicketsCollection = db.collection('withdraw_tickets');
					await withdrawTicketsCollection.insertOne(withdrawTicket);

					let responseMessage = `Berhasil mengirim permintaan withdraw, harap tunggu...\n`;
					responseMessage += `Reff ID: ${reff_id}\n\nCek status withdraw dengan cara\nKetik *Cekwd*`;
					m.reply(responseMessage);
					
					setTimeout(() => {
						let adminMessage = `*Permintaan Withdraw*\n\n`;
						adminMessage += `*Nama:* ${owner}\n`;
						adminMessage += `*Tipe:* ${tipe}\n`;
						adminMessage += `*Nomor Rekening:* ${noRek}\n`;
						adminMessage += `*Nominal:* Rp ${nominal.toLocaleString()}\n`;
						client.sendMessage(`6285773305337@s.whatsapp.net`, { text: adminMessage })
					}, 3000);

				} catch (error) {
					console.error("Error in 'withdraw':", error);
					return m.reply("Terjadi kesalahan saat memproses permintaan withdraw.");
				} finally {
					await fClient.close();
				}
			}
			break;

			case 'cekwd':
			case 'cekwithdraw': {
				try {
					if (!isOwner) return m.reply('Fitur khusus owner!')
						
					const owner = global.user; 
					await fClient.connect(); 
					const db = fClient.db('botdb'); 
					const withdrawTicketsCollection = db.collection('withdraw_tickets'); 

					const withdrawTickets = await withdrawTicketsCollection
						.find({ owner })
						.sort({ waktu: -1 }) 
						.toArray();

					if (withdrawTickets.length === 0) {
						return m.reply("Tidak ada tiket withdraw untuk akun ini.");
					}

					let statusMessage = "*「 STATUS WITHDRAW 」*\n\n";

					withdrawTickets.forEach(ticket => {
						statusMessage += `Reff ID: ${ticket.reff_id}\n`;
						statusMessage += `Tipe: ${ticket.tipe}\n`;
						statusMessage += `No Rek: ${ticket.noRek}\n`;
						statusMessage += `Diterima: Rp ${parseInt(ticket.nominal || 0).toLocaleString()}\n`;
						statusMessage += `Tanggal: ${ticket.waktu}\n`;
						statusMessage += `Status Withdraw: ${ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).toLowerCase()}\n\n`;
					});

					return m.reply(statusMessage);

				} catch (error) {
					console.error("Error in 'cekwithdraw':", error);
					return m.reply("Terjadi kesalahan saat memeriksa status withdraw.");
				} finally {
					await fClient.close();
				}
			}
			break;
			
			case 'detail': {
				client.sendMessage(m.chat, reactionWait)
					.then(async () => {
						const productId = args[0]; 
						if (!productId) {
							return client.sendText(m.chat, `Contoh: ${command} FF10`);
						}

						try {
							const postData = {
								api_key: apikey_jf
							};

							const response = await fetch('https://topup.j-f.cloud/api/products', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(postData)
							});

							const data = await response.json();

							if (!data.status) {
								return client.sendText(m.chat, 'Gagal mengambil data dari JFSTORE API.');
							}

							const product = data.data.find(prod => new RegExp(`^${productId}$`, 'i').test(prod.product_id));

							if (!product) {
								return client.sendText(m.chat, `Produk dengan ID *${productId}* tidak ditemukan.`);
							}

							const originalPrice = parseFloat(product.gold_price);
							const ownMarkup = markupConfig.vip;
							const bronzeMarkup = markupConfig.bronze;
							const platinumMarkup = markupConfig.platinum;
							const goldMarkup = markupConfig.gold;

							const ownPrice = originalPrice * (1 + ownMarkup);
							const bronzePrice = originalPrice * (1 + bronzeMarkup);
							const platinumPrice = originalPrice * (1 + platinumMarkup);
							const goldPrice = originalPrice * (1 + goldMarkup);

							const own = Math.round(ownPrice);
							const bronze = Math.round(bronzePrice);
							const platinum = Math.round(platinumPrice);
							const gold = Math.round(goldPrice);

							const formatSaldo = (amount) => `${amount.toLocaleString()}`;

							const formattedResponse = `*${product.category}*\n\n` +
								`» *Kode Produk* : ${product.product_id}\n` +
								`» *Item* : ${product.product_name}\n` +
								`» *Kategori* : ${product.category}\n` +
								`» *Harga Bronze* : Rp. ${formatSaldo(bronze)}\n` +
								`» *Harga Gold* : Rp. ${formatSaldo(gold)}\n` +
								`» *Harga Platinum* : Rp. ${formatSaldo(platinum)}\n` +
								`» *Harga VIP* : Rp. ${formatSaldo(own)}\n` +
								`» *Status* : ${product.status === 'available' ? '✅ Tersedia' : '❌ Tidak Tersedia'}\n` +
								`» *Deskripsi* :\n${product.description}\n\n` +
								`Order ${product.product_id} <tujuan>\n` +
								`Untuk Membeli ${product.product_name}`;

							return client.sendText(m.chat, formattedResponse);
						} catch (error) {
							console.error("Error in detailprod case:", error);
							return client.sendText(m.chat, 'Terjadi kesalahan saat mengambil data produk.');
						}
					})
					.then(() => {
						client.sendMessage(m.chat, reactionDone);
					})
					.catch(err => {
						console.error("Error in detailprod command:", err);
						client.sendMessage(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.');
					});
				break;
			}

			case 'get': {
				client.sendMessage(m.chat, reactionWait)
					.then(async () => {
						
						const nomor = sender.split("@")[0];
						let requestedBrand = args.join(" ").toLowerCase();

						const gameMapping = {
							'ar': 'ace racer',
							'aov': 'arena of valor',
							'bs': 'blood strike',
							'codm': 'call of duty mobile',
							'coc': 'clash of clans',
							'dr': 'dragon raja - sea',
							'ep': 'eggy party',
							'fc': 'fc mobile',
							'ff': 'free fire',
							'gi': 'genshin impact',
							'hok': 'honor of kings',
							'hoy': 'hoyoverse',
							'hsr': 'honkai star rail',
							'la': 'lifeafter credits',
							'lads': 'love and deepspace',
							'lm': 'lords mobile',
							'wr': 'league of legends wild rift',
							'mc': 'magic chess go go',
							'ml': 'mobile legends',
							'mlbr': 'mobile legends br',
							'mlg': 'mobile legends global',
							'mlph': 'mobile legends ph',
							'mlmy': 'mobile legends my',
							'msa': 'metal slug awakening',
							'msw': 'marvel super war',
							'opm': 'one punch man',
							'pb': 'point blank',
							'pgr1': 'pgr (android)',
							'pgr2': 'pgr (ios)',
							'pubg': 'pubg mobile',
							'pmg': 'pubg mobile global',
							'rm': 'ragnarok m: eternal love',
							'rok': 'rise of kingdom',
							'sg': 'stumble guys',
							'sm': 'sausage man',
							'ss': 'super sus',
							'taj': 'tom and jerry: chase',
							'tm': 'timi',
							'ud': 'undawn',
							'val': 'valorant',
							'vmy': 'valorant my',
							'zpt': 'zepeto',
							'tri': 'tri',
							'indosat': 'indosat',
							'telkomsel': 'telkomsel',
							'by.u': 'by.u',
							'dana': 'dana',
							'gopay': 'go pay',
							'spay': 'shopee pay',
							'ovo': 'ovo',
							'pln': 'pln'
						};

						if (gameMapping[requestedBrand]) {
							requestedBrand = gameMapping[requestedBrand];
						}

						if (!requestedBrand) {
							return client.sendText(m.chat, `Contoh penggunaan: *Get* ML`);
						}

						const result = await getJFProducts(nomor, requestedBrand);

						if (result.error) {
							return client.sendText(m.chat, result.error);
						}

						const { role, products } = result;

						let formattedResponse = `Hallo *${pushname}*\nBerikut LIST *${requestedBrand.toUpperCase()}* Untukmu\n\n`;

						if (requestedBrand === 'mobile legends') {
							formattedResponse += `*Cara Beli:*\n`;
							formattedResponse += `Order ML10 12345678|1234\n\n`;

						} else if (requestedBrand === 'magic chess go go') {
							formattedResponse += `*Cara Beli:*\n`;
							formattedResponse += `Order MC1 12345678,1234\n\n`;

						} else if (requestedBrand === 'mobile legends global') {
							formattedResponse += `*TIDAK UNTUK AKUN ID, BR, MY, SG, PH!!!*\n\n`;
							formattedResponse += `*Cara Beli:*\n`;
							formattedResponse += `Order ML10 12345678|1234\n\n`;

						} else if (requestedBrand === 'mobile legends br' || requestedBrand === 'mobile legends ph' || requestedBrand === 'mobile legends my') {
							formattedResponse += `*Cara Beli:*\n`;
							formattedResponse += `Order ML10 12345678|1234\n\n`;

						} else if (requestedBrand === 'genshin impact') {
							formattedResponse += `*Cara Beli:*\n`;
							formattedResponse += `Order GS80 12345678|os_asia\n\n`;

						} else {
							formattedResponse += `*Cara Beli:*\n`;
							formattedResponse += `Order FF5 12345678\n\n`;

						}

						products.sort((a, b) => {
							const aName = a.product_name ? a.product_name.toLowerCase() : '';
							const bName = b.product_name ? b.product_name.toLowerCase() : '';

							const aPriority = aName.includes('membership') || aName.includes('card') || aName.includes('weekly') || aName.includes('coupon') || aName.includes('pass') ? -1 : 1;
							const bPriority = bName.includes('membership') || bName.includes('card') || bName.includes('weekly') || bName.includes('coupon') || bName.includes('pass') ? -1 : 1;

							return aPriority - bPriority;
						});

						const seenProducts = new Set();

						products.forEach(product => {
							if (seenProducts.has(product.product_name)) {
								return;
							}

							seenProducts.add(product.product_name);

							let markupPercentage = defaultMarkupPercentage;
							if (role) {
								if (role === "GOLD") {
									markupPercentage = markupConfig.gold;
								} else if (role === "PLATINUM") {
									markupPercentage = markupConfig.platinum;
								} else if (role === "BRONZE") {
									markupPercentage = markupConfig.bronze;
								} else if (role === "VIP") {
									markupPercentage = markupConfig.vip;
								}
							}

							const originalPrice = parseFloat(product.gold_price);
							const priceIDR = Math.round(originalPrice * (1 + markupPercentage));

							const formattedPriceIDR = parseFloat(priceIDR).toLocaleString();

							formattedResponse += `*${product.product_name}*\n`;
							formattedResponse += `> *ID Produk :* ${product.product_id}\n`;
							formattedResponse += `> *Harga :* Rp ${formattedPriceIDR}\n`;
							formattedResponse += `> *Status :* ${product.status === 'available' ? '✅' : '❌'}\n`;
							formattedResponse += `-⊶-⊶-⊶-⊶-⊶-⊶-⊶-⊶-\n`;
						});

						return client.sendText(m.chat, formattedResponse, m);
					})
					.then(() => {
						client.sendMessage(m.chat, reactionDone);
					})
					.catch(err => {
						console.error("Error in get command:", err);
						client.sendMessage(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.');
					});
			}
			break;
			
			case 'order': {
				client.sendMessage(m.chat, reactionWait).then(async () => {
					const nomor = m.sender.split("@")[0];
					const userProfile = await getUserProfile(nomor);

					if (!userProfile) {
						await m.reply(`Kamu belum terdaftar, silahkan ketik *Daftar* untuk memulai.`);
						return;
					}

					let [product_id, secondArg, thirdArg] = args;
					let quantity, target;

					if (args.length === 2) {
						quantity = 1;
						target = secondArg;
					} else {
						if (!isNaN(secondArg)) {
							quantity = parseInt(secondArg);
							target = thirdArg;
						} else {
							quantity = 1;
							target = secondArg;
						}
					}

					const product = await getJFProductId(product_id);

					if (!product) {
						await m.reply(`Produk dengan kode ${product_id} tidak ditemukan.`);
						return;
					}
					
					let nickname = "";
					let ferr = '';
					
					let kodeEwallet = '';
					let nomorEwallet = '';

					const kodeBankMap = {
						'dana': 'dana',
						'ovo': 'ovo',
						'linkaja': 'linkaja',
						'spay': 'shopeepay'
					};

					const codePrefix = Object.keys(kodeBankMap).find(prefix => product_id.startsWith(prefix));

					if (codePrefix) {
						kodeEwallet = kodeBankMap[codePrefix].toUpperCase();
						nomorEwallet = target;
					}

					if (kodeEwallet && nomorEwallet) {
						const url = `https://api-rekening.lfourr.com/getEwalletAccount?bankCode=${kodeEwallet}&accountNumber=${nomorEwallet}`;

						try {
							const response = await fetch(url, { method: 'GET' });
							const responseData = await response.json();

							if (!responseData.status) {
								return m.reply(`Error: ${responseData.msg}`);
							}

							const accountData = responseData.data;
							nickname = accountData.accountname;

						} catch (error) {
							console.error('Terjadi kesalahan:', error);
							await m.reply('Terjadi kesalahan saat memeriksa akun e-wallet.');
						}
					}

					if (product_id.startsWith("ml")) {
						const [id, zone] = target.split('|');
						ferr = `https://ceknickname.j-f.cloud/api/game/mobile-legends?id=${id}&zone=${zone}`;
					} else if (product_id.startsWith('ff')) {
						ferr = `https://ceknickname.j-f.cloud/api/game/free-fire?id=${target}`;
					} else if (product_id.startsWith('aov')) {
						ferr = `https://ceknickname.j-f.cloud/api/game/arena-of-valor?id=${target}`;
					} else if (product_id.startsWith('codm')) {
						ferr = `https://ceknickname.j-f.cloud/api/game/call-of-duty-mobile?id=${target}`;
					} else if (product_id.startsWith('bs')) {
						ferr = `https://ceknickname.j-f.cloud/api/game/blood-strike?id=${target}&zone=-1`;
					} else if (product_id.startsWith('hok')) {
						ferr = `https://ceknick.miawwstore.com/api/game/honor-of-kings-vc?id=${target}`;
					} else if (product_id.startsWith('pubg')) {
						ferr = `https://ceknick.miawwstore.com/api/game/pubg-mobile-vc?id=${target}`;
					}

					if (ferr) {
						try {
							const response = await fetch(ferr, {
								method: 'GET',
								headers: {
									'Content-Type': 'application/json',
								},
							});

							const responseData = await response.json();

							if (responseData.code === 200 && responseData.status === true) {
								nickname = decodeURIComponent(responseData.data.username);
							} else {
								await m.reply('Akun tidak ditemukan. Harap masukkan ID dengan benar!');
								return;
							}
						} catch (error) {
							console.error('Terjadi kesalahan:', error);
							await m.reply('Terjadi kesalahan saat mengambil nickname.');
							return;
						}
					}

					const userRole = userProfile.role;
					const markupPercentage = markupConfig[userRole.toLowerCase()] || defaultMarkupPercentage;
					const originalPrice = parseFloat(product.gold_price);
					const adjustedPrice = Math.round(originalPrice * (1 + markupPercentage));

					const unique_code = generateRandomString(4);
					const service = "17"; 
					const valid_time = "1800"; 
					const amount = (adjustedPrice * quantity).toString();
					const note = `JF DEV`;
					const sign = md5(paydisiniApikey + unique_code + service + amount + valid_time + "NewTransaction");

					const formData = new FormData();
					formData.append("key", paydisiniApikey);
					formData.append("request", "new");
					formData.append("unique_code", unique_code);
					formData.append("service", service);
					formData.append("amount", amount);
					formData.append("note", note);
					formData.append("valid_time", valid_time);
					formData.append("type_fee", "1");
					formData.append("signature", sign);

					try {
						const response = await axios.post("https://paydisini.co.id/api/", formData, {
							headers: formData.getHeaders(),
						});

						const { status, data } = response.data;

						const { qrcode_url, fee } = data;

						const totalAmount = (adjustedPrice * quantity) + fee;

						let invoiceText = `╭────[ DETAIL TRANSAKSI ]
│
│ Item: *${product.product_name}*
│ Tujuan: *${target}*
│ ${nickname ? `Nickname: *${nickname}*` : '-'}
│ Harga: *Rp ${adjustedPrice.toLocaleString()}*
│ Fee: *Rp ${fee.toLocaleString()}*
│ Total: *Rp ${totalAmount.toLocaleString()}*
│
│ Status: *Belum Dibayar*
│ Silahkan Scan QR ini untuk melakukan pembayaran, hanya berlaku 5 menit.
╰────[ ${global.botName} ]`

						const qrImage = await Jimp.read(qrcode_url);
						const hexGradientStart = '#ba0d0d'; 
						const hexGradientEnd = '#ff8247'; 

						const startColor = Jimp.cssColorToHex(hexGradientStart);
						const endColor = Jimp.cssColorToHex(hexGradientEnd);

						const startR = (startColor >> 24) & 255;
						const startG = (startColor >> 16) & 255;
						const startB = (startColor >> 8) & 255;

						const endR = (endColor >> 24) & 255;
						const endG = (endColor >> 16) & 255;
						const endB = (endColor >> 8) & 255;

						qrImage.scan(0, 0, qrImage.bitmap.width, qrImage.bitmap.height, function (x, y, idx) {
							const [r, g, b, a] = [this.bitmap.data[idx + 0], this.bitmap.data[idx + 1], this.bitmap.data[idx + 2], this.bitmap.data[idx + 3]];

							if (r === 0 && g === 0 && b === 0 && a === 255) {
								const gradientFactor = y / this.bitmap.height;

								const newR = startR + (endR - startR) * gradientFactor;
								const newG = startG + (endG - startG) * gradientFactor;
								const newB = startB + (endB - startB) * gradientFactor;

								this.bitmap.data[idx + 0] = newR; 
								this.bitmap.data[idx + 1] = newG; 
								this.bitmap.data[idx + 2] = newB;
							}
						});

						const modifiedQrPath = path.join(__dirname, 'modified_qrcode.png');
						await qrImage.writeAsync(modifiedQrPath);
						
						const startTime = Date.now();
						await client.sendMessage(m.chat, { image: { url: modifiedQrPath }, caption: invoiceText }, { quoted: m }).then((qrMessage) => {
							statusOrderPaydisini(unique_code, startTime, m, product, target, quantity, userProfile, nomor, adjustedPrice, originalPrice, qrMessage);
						});
						
						fs.unlink(modifiedQrPath, (err) => {
							if (err) console.error('Gagal menghapus file:', err);
						});

					} catch (error) {
						console.error("Error saat membuat QRIS:", error);
						await m.reply("Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.");
					}
				});
				break;
			}
			
			case 'cektrx': {
				
				if (args.length < 1) {
					return m.reply('Contoh penggunaan : cektrx JFXXXXXXX');
				}
				
				const [trx_id] = args;

				try {
					const statusData = new URLSearchParams();
					statusData.append('api_key', apikey_jf);
					statusData.append('trx_id', trx_id);

					const response = await fetch('https://topup.j-f.cloud/api/order/status', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						body: statusData
					});

					const statusResult = await response.json();
					console.log(statusResult)

					if (statusResult.status) {
						let statusMessage = `*── 「 STATUS TRANSAKSI 」 ──*\n\n`;
						statusMessage += `ID Trx : *${statusResult.data.trx_id}*\n`;
						statusMessage += `Tujuan : *${statusResult.data.tujuan}*\n`;
						statusMessage += `Status : *${statusResult.data.status}*\n`;
						statusMessage += `Catatan :\n*${statusResult.data.serial_number || ''}*`;

						m.reply(statusMessage);
					} else {
						m.reply(`${statusResult.data.message}`);
					}
				} catch (error) {
					console.error("Error in cektrx:", error);
					m.reply('Terjadi kesalahan saat memeriksa status transaksi.');
				}
			}
			break;

			/* END OF CASE */

			default:
		}
	} catch (err) {
		m.reply(util.format(err))
	}
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
