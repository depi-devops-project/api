import express from "express";
import "reflect-metadata"
import "dotenv/config";
import cors from 'cors';
import { AppDataSource } from './typeorm.config';
import { User } from "entities/user.entity";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users: User[] = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  const errored = !user;
  res.status(errored ? 404 : 200).json(errored ? { message: "User not found" } : user);
});

const createUsers = async () => {
  const usersToCreate: User[] = [
    User.create({
      username: "adly",
      hashed_password: "adly123",
      email: "adly@gmail.com",
      first_name: "Adly",
      last_name: "Smith"
    }),
    User.create({
      username: "john_doe",
      hashed_password: "johndoe456",
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe"
    }),
    User.create({
      username: "jane_smith",
      hashed_password: "janesmith789",
      email: "jane.smith@example.com",
      first_name: "Jane",
      last_name: "Smith"
    }),
    User.create({
      username: "bob_johnson",
      hashed_password: "bobjohnson101",
      email: "bob.johnson@example.com",
      first_name: "Bob",
      last_name: "Johnson"
    }),
    User.create({
      username: "alice_williams",
      hashed_password: "alicewilliams202",
      email: "alice.williams@example.com",
      first_name: "Alice",
      last_name: "Williams"
    })
  ]

  users.push(...usersToCreate);
  await Promise.all(usersToCreate.map(user => user.save()));
  console.log("Users created");
}

const createIfNotExists = async () => {
  const fetchedUsers = await User.find({});
  if (fetchedUsers.length === 0) await createUsers();
  else users.push(...fetchedUsers);
}

(async () => {
  await AppDataSource.initialize();
  console.log("Database connected");
  await createIfNotExists();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();