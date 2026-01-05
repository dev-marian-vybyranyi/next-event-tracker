import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(process.env.MONGODB_URI);

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email.includes("@" || !name || name.trim() === "" || !text)) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    await db.collection("commets").insertOne(newComment);

    res.status(201).json({ message: "Comment added!", comment: newComment });
  }

  if (req.method === "GET") {
    const comments = [
      {
        id: "c1",
        name: "Max",
        text: "This is a first comment!",
      },
      {
        id: "c2",
        name: "Manuel",
        text: "This is a second comment!",
      },
      {
        id: "c3",
        name: "Sarah",
        text: "This is a third comment!",
      },
    ];

    res.status(200).json({ comments });
  }

  client.close();
}
