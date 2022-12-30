import "./config.js";
import express from "express";
import { userRepository } from "./redis-om.js";

const PORT = 5000 || process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (res) => res.status(200).send("Working"));

app.get("/users", async (req, res) => {
	try {
        const users = await userRepository.search().return.all()
        res.send(users);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.post("/register", async (req, res) => {
	try {
		const user = await userRepository.createAndSave({
			username: req.body.username,
			password: req.body.password,
			age: req.body.age,
		});
        res.send(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.post("/login", async(req, res) => {
    try {
        let user = (await userRepository.search().where('username').eq(req.body.username).return.first()) && (await userRepository.search().where('password').eq(req.body.password).return.first())
        res.status(200).send(`Welcome ${user}`);
    } catch (error) {
		res.status(500).send(error.message);
    }
});

app.put("/users/:id", async(req, res) => {
    try {
        const user = await userRepository.fetch(req.params.id);
        res.send(user);
    } catch (error) {
		res.status(500).send(error.message);
    }
});

app.delete("/users/:id", async(req, res) => {
    try {
        await userRepository.remove(req.params.id);
        res.send({ entityId: req.params.id });
    } catch (error) {
		res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
	console.log(`Server on http://localhost:${PORT}`);
});
