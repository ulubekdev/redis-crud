import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();
await client.open("redis://localhost:6379");

class Users extends Entity {}

const userSchema = new Schema(
	Users,
	{
		username: { type: "string" },
		password: { type: "text" },
		age: { type: "number" },
	},
	{
		dataStructure: "HASH",
	}
);

const userRepository = client.fetchRepository(userSchema);

export default userRepository;
