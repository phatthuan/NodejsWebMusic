const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		account: {
			type: mongoose.Schema.ObjectId,
			ref: 'Account',
			required: [true, 'Review must belong to a user'],
		},
		parentReview: {
			type: mongoose.Schema.ObjectId,
			ref: 'Review',
			default: null,
			cascade: true,
		},
		replies: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Review',
				default: [],
			},
		],
		song: {
			type: mongoose.Schema.ObjectId,
			ref: 'Song',
			required: [true, 'Review must belong to a song'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

reviewSchema.post('save', async function (doc, next) {
	try {
		if (doc.parentReview) {
			await this.reply();
		}
	} catch (err) {
		console.log(err);
	}
	next();
});

reviewSchema.methods.reply = async function () {
	try {
		const parentReview = await ReviewModel.findById(this.parentReview);
		parentReview.replies.push(this._id);
		await parentReview.save();
	} catch (err) {
		console.log(err);
	}
};

reviewSchema.pre('remove', async function (next) {
	const replies = this.replies;

	if (replies.length > 0) {
		// Delete all replies that belong to the review
		await mongoose.model('Review').deleteMany({ _id: { $in: replies } });
	}
	next();
});

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
