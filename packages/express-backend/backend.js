import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name, list) => {
	return list.filter(
		(user) => user["name"] === name
	);
};

const findUserByJob = (job, list) => {
	return list.filter(
		(user) => user["job"] === job
	);
};

const findUserById = (id) => {
	return users["users_list"].find(
		(user) => user["id"] === id
	);
};

const delUserById = (userId) => {
	let arrIndex = users["users_list"].findIndex(elem => elem.id === userId)
	console.log(arrIndex);
	if (arrIndex === -1) {
		return null;
	}
	return users["users_list"].splice(arrIndex, 1);
}

const addUser = (user) => {
	user.id = Math.floor(Math.random() * 10000000).toString();
	users["users_list"].push(user);
	return user;
}

// Add a user to the users list
app.post("/users", (req, res) => {
	const userToAdd = req.body;
	const addedUser = addUser(userToAdd)
	console.log(addedUser)
	res.status(201).send(addedUser);
});

app.delete("/users/:id", (req, res) => {
	const id = req.params.id;
	let deletedUser = delUserById(id);
	console.log(deletedUser);
	if (deletedUser) {
		console.log("successfully deleted user");
		res.status(204).send();
	} else {
		console.log("could not find user to delete");
		return res.status(404).send("Resource not found");
	}
	res.send();
})

// Get a user by an id
app.get("/users/:id", (req, res) => {
	const id = req.params.id;
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send("Resource not found.");
	} else {
		res.status(200).send(result)
	}
})

// Get users. If a name is given, filter by that name
app.get("/users", (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined) {
		let result;
		if (job != undefined) {
			result = findUserByJob(job, users["users_list"]);
			console.log(`result: ${result}`)
			result = findUserByName(name, result);
		} else {
			result = findUserByName(name, users["users_list"]);
		}
		result = { users_list: result };
		res.send(result);
	} else if (job != undefined) {
		let result = findUserByJob(job, users["users_list"]);
		result = { users_list: result };
		res.send(result);
	} else {
		res.send(users);
	} 
});



app.listen(port, () => {
	console.log(
		`Example app listening on http://localhost:${port}`
	);
});
