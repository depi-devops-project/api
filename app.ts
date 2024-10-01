import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 20,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    age: 21,
  }
]

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  const errored = !user;
  res.status(errored ? 404 : 200).json(errored ? { message: "User not found" } : user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});