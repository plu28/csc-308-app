import mongoose from 'mongoose';
import userModel from './user';

mongoose.set('debug', true);

mongoose
	.connect('mongodb://localhost:27017/users', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((error) => console.log(error));

// im beginning to think all these userModel methods just return promises
function getUsers(name, job) {
	let promise;
	if (name === undefined && job === undefined) {
		promise = userModel.find();
	} else if (name && !job) {
		promise = findUserByName(name);
	} else if (job && !name) {
		promise = findUserByjob(job);
	}
	return promise;
}

// not sure why this doesn't return a promise? or maybe it does o:
function findUserById(id) {
	return userModel.findById(id);
}

// returns a promise of the user being saved?
function addUser(user) {
	const userToAdd = new userModel(user);
	const promise = userToAdd.save();
	return promise;
}

// these are just how you do queries on a userModel object?
// Do these return promises also?
// I'd think so because these are queries that are done asynchronously
function findUserByName(name) {
	return userModel.find({ name: name });
}

function findUserByJob(job) {
	return userModel.find({ job: job });
}

export default {
	getUsers,
	findUserById,
	addUser,
	findUserByName,
	findUserByJob
};
