import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://frans203:shelby123@cluster0.qjfec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollections = db.collection("meetups");
    const dataSend = await meetupsCollections.insertOne(data);

    client.close();

    res.status(201).json({ message: "Your data was send", dataSend });
  }
};

export default handler;
