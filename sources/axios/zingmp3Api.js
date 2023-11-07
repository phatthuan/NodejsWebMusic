const axios = require('axios');
const crypto = require('crypto');

class ZingMp3Api {
	constructor({ VERSION, URL, SECRET_KEY, API_KEY, CTIME }) {
		this.VERSION = VERSION;
		this.URL = URL;
		this.SECRET_KEY = SECRET_KEY;
		this.API_KEY = API_KEY;
		this.CTIME = CTIME;
	}

	getHash256 = (str) => {
		return crypto.createHash('sha256').update(str).digest('hex');
	};

	getHmac512 = (str, key) => {
		let hmac = crypto.createHmac('sha512', key);
		return hmac.update(Buffer.from(str, 'utf8')).digest('hex');
	};

	hashParam = (path, id) => {
		return this.getHmac512(
			path + this.getHash256(`ctime=${this.CTIME}id=${id}version=${this.VERSION}`),
			this.SECRET_KEY
		);
	};

	getCookie = async () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${this.URL}`)
				.then((res) => {
					// TODO: Skip Error Object is possibly 'undefined'
					if (res.headers['set-cookie']) {
						res.headers['set-cookie'].map((element, index) => {
							if (index == 1) {
								resolve(element); // return cookie
							}
						});
					}
				})
				.catch((err) => {
					reject(err); // return error value if any
				});
		});
	};

	requestZingMp3Api = async (path, qs) => {
		return new Promise((resolve, reject) => {
			const client = axios.create({
				baseURL: `${this.URL}`,
			});

			client.interceptors.response.use((res) => res.data);

			this.getCookie()
				.then((cookie) => {
					// request
					client
						.get(path, {
							headers: {
								Cookie: `${cookie}`,
							},
							params: {
								...qs,
								ctime: this.CTIME,
								version: this.VERSION,
								apiKey: this.API_KEY,
							},
						})
						.then((res) => {
							resolve(res);
						})
						.catch((err) => {
							reject(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	getSong = (songId) => {
		return new Promise((resolve, rejects) => {
			this.requestZingMp3Api('/api/v2/song/get/streaming', {
				id: songId,
				sig: this.hashParam('/api/v2/song/get/streaming', songId),
			})
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					rejects(err);
				});
		});
	};
}

const zingMp3Api = new ZingMp3Api({
	VERSION: '1.6.34', // VERSION
	URL: 'https://zingmp3.vn', // base URL
	SECRET_KEY: '2aa2d1c561e809b267f3638c4a307aab',
	API_KEY: '88265e23d4284f25963e6eedac8fbfa3',
	CTIME: String(Math.floor(Date.now() / 1000)), // CTIME
});

module.exports = zingMp3Api;
