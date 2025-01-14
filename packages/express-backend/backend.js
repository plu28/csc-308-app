import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/poop", (req, res) => {
	res.send(`Hello ${port}!`);
});

app.listen(port, () => {
	console.log(
		`Example app listening on http://localhost:${port}`
	)
});
