import Message from '../models/message';

function getMessages(req, res) {
	Message.find({}, null, { sort: { created_at: -1 }}).exec((err, messages) => {
		if (err) {
			console.log("error in getMessages", err);
			return res.status(500).send('error in messages');
		}

		res.status(200).send(messages);
	});
}

function addMessage(req, res) {
	if (!req.user || !req.user.isReversimTeamMember) {
		return res.send(401);
	}

	const msg = {
		created_at: new Date(),
		text: req.body.data
	};
	Message.create(msg, (err, model) => {
		if (err) {
			console.log("error in addMessage", err);
			return res.status(500).send('error in adding message');
		}

		res.status(200).send(model);
	});
}

function removeMessage(req, res) {
	if (!req.user || !req.user.isReversimTeamMember) {
		return res.send(401);
	}

	Message.findOneAndRemove({ _id: req.params.id }, err => {
		if (err) {
			console.log("error in removeMessage", err);
			return res.status(500).send('error in removing message');
		}

		res.status(200).send({ success: true });
	});
}

export default {
	getMessages,
	addMessage,
	removeMessage
}
