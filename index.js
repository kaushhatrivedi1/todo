const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');
const faker = require('faker');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb://localhost:27017';

app.use(bodyParser.json());
app.get('/api/tasks/random', async (req, res) => {
  try {
    const client = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db();

    for (let i = 0; i < 10; i++) {
      const task = {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
      }
      db.collection('tasks').insertOne(task);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const client = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db();
    const result = await db.collection('tasks').insertOne(req.body);
    res.send(result.ops[0]);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const client = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db();
    const result = await db.collection('tasks').find({}).toArray();
    res.send(result);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get a task by id
app.get('/api/tasks/:id', async (req, res) => {

  // const { id } = req.params;
  // const client = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
  // //     const db = client.db();
  // const db = client.db();
  // db.collection('tasks').findOne({ _id: new ObjectId(id) }, (err, task) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ message: 'Server error' });
  //   }
  //   if (!task) {
  //     return res.status(404).json({ message: 'Task not found' });
  //   }
  //   return res.json(task);
  // });

  try {
    const client = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db();
    const result = await db.collection('tasks').findOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) }
    );
    res.send(result);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }



});

// Update a task by id
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const client = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db();
    const result = await db.collection('tasks').updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.send(result);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a task by id
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const client = await mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db();
    const result = await db.collection('tasks').deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    res.send(result);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
