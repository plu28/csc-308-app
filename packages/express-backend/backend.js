import express from 'express';
import * as UserCrud from './user-services';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const findUserByName = (name) => {
	return UserCrud.findUserByName(name)
		.then((result) => {
			return result;
		})
		.catch((result) => {});
};

const findUserByJob = (job, list) => {
	return list.filter((user) => user['job'] === job);
};

const findUserById = (id) => {
	return users['users_list'].find((user) => user['id'] === id);
};

const delUserById = (userId) => {
	let arrIndex = users['users_list'].findIndex((elem) => elem.id === userId);
	console.log(arrIndex);
	if (arrIndex === -1) {
		return null;
	}
	return users['users_list'].splice(arrIndex, 1);
};

const addUser = (user) => {
	users['users_list'].push(user);
	return user;
};

// Add a user to the users list
app.post('/users', (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
	res.send();
});

app.delete('/users/:id', (req, res) => {
	const id = req.params.id;
	let deletedUser = delUserById(id);
	console.log(deletedUser);
	if (deletedUser) {
		console.log('sent 200');
		res.status(200).send();
	} else {
		console.log('sent 404');
		return res.status(404).send('Resource not found');
	}
	res.send();
});

// Get a user by an id
app.get('/users/:id', (req, res) => {
	const id = req.params.id;
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send('Resource not found.');
	} else {
		res.status(200).send(result);
	}
});

// Get users. If a name is given, filter by that name
app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined) {
		let result;
		if (job != undefined) {
			result = findUserByJob(job, users['users_list']);
			console.log(`result: ${result}`);
			result = findUserByName(name, result);
		} else {
			result = findUserByName(name, users['users_list']);
		}
		result = { users_list: result };
		res.send(result);
	} else if (job != undefined) {
		let result = findUserByJob(job, users['users_list']);
		result = { users_list: result };
		res.send(result);
	} else {
		res.send(users);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
});
