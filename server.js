import "./config.js";
import express from "express";
import userRepository from "./redis-om.js"; 

const PORT = 5000 || process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", res => res.status(200).send("Working"));

app.get("/users", async (req, res) => {
	try {
        const users = await client.hGetAll('users');
	    res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/register", async(req, res) => {
    try {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            age: req.body.age
        };
        await repository.save(users)

    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/login", (req, res) => {});

app.put("/users/:id", (req, res) => {});

app.delete("/users/:id", (req, res) => {});

app.listen(PORT, () => {
	console.log(`Server on http://localhost:${PORT}`);
});
