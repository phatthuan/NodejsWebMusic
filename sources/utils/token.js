const JWT = require('jsonwebtoken');
const { AppError } = require('./error.util');
class TokenJwt {
	async signAccessToken(userId) {
		return new Promise((resolve, reject) => {
			const payload = {
				userId,
			};
			const options = {
				expiresIn: process.env.JWT_EXPIRES_IN || '1d',
			};
			const secretKey = process.env.JWT_SECRET_ACCESS_TOKEN;
			if (!secretKey) {
				reject(createErrors.InternalServerError("Can't find secret key"));
				return;
			}
			JWT.sign(payload, secretKey, options, (err, token) => {
				if (err) {
					console.log(err);
					reject(createErrors.InternalServerError("Can't sign access token"));
					return;
				}
				resolve(token);
			});
		});
	}
	async createSendToken(user, statusCode, req, res) {
		const token = await this.signAccessToken(user._id);

		res.cookie('jwt', token, {
			expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
		});

		// Remove password from output
		user.password = undefined;

		res.status(statusCode).json({
			status: 'success',
			token,
			data: {
				user,
			},
		});
	}

	async verifyAccessToken(token) {
		return new Promise((resolve, reject) => {
			const secretKey = process.env.JWT_SECRET_ACCESS_TOKEN;
			if (!secretKey) {
				reject(new AppError("Can't find secret key", 500));
				return;
			}

			JWT.verify(token, secretKey, (err, payload) => {
				if (err) {
					const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
					return reject(new AppError(message, 401));
				}
				resolve(payload);
			});
		});
	}
}

module.exports = new TokenJwt();
