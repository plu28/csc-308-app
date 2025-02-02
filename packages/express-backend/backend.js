import express from 'express';
import userServices from './user-services.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Add a user to the users list
app.post('/users', (req, res) => {
	const userToAdd = req.body;

	userServices.addUser(userToAdd)
	.then(() => {
		res.status(200).send();
	})
	.catch((error) => {
		res.status(500).send(error);
	});
});

app.delete('/users/:id', (req, res) => {
	const id = req.params.id;
	userServices.deleteUserById(id)
	.then((result) => {
		res.status(200).send();
	})
	.catch((error) => {
		res.status(500).send()
	});
});

// Get a user by an id
app.get('/users/:id', (req, res) => {
	const id = req.params.id;
	userServices.findUserById(id)
	.then((result) => {
		res.status(200).send(result);
	})
	.catch((error) => {
		console.log(error);
		res.status(500).send();
	});
});

// Get users. If a name is given, filter by that name
app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	console.log(`name: ${name}, job: ${job}`)

	userServices.getUsers(name, job)
	.then((result) => {
		res.status(200).send(result);
	})
	.catch((error) => {
		console.log(error)
		res.status(500).send();
	});
});

app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
});
