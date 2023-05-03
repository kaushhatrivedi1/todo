const Task = require('../models/tasks');
const faker = require('faker');
const mongoose = require('mongoose')

// exports.createTask = async function createTask(req, res) {


exports.randomTask = async (req, res) => {
  try {
    const { ObjectId } = mongoose.Types;

    for (let i = 0; i < 10; i++) {


      const id = new ObjectId()
      console.log(id);
      // check if the _id value is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid ID' });
      }
      const task = new Task({
        _id: id,
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
      })
      const savedTask = await task.save();

    }
    //res.send('10 random data generated successfully')
    res.render("random",{message:"10 random data generated successfully"});
  } catch (error) {
    console.error(error);
    //res.status(500).send(error);
    res.render("random",{message:err});
  } 
};


exports.addTasks = async (req, res) => {
  const v = '/public/todo.html'
  str = __dirname
  console.log(str.length);
  let part = str.substr(0, 35);
  console.log(part + v)
  res.sendFile(part + v)
};



exports.createTask = async (req, res) => {

  try {
    console.log(req, res)
    const title = req.body.title
    const description = req.body.description;

    if (!title || !description) {
      res.status(400).json({ error: "Title and description are required" });
      return;
    }

    const task = new Task({ title, description });
    const savedTask = await task.save();
    //res.status(201).json(savedTask);
    //res.status(201).json(savedTask).send(`Task Created: ${title}`);
    res.render("addtask", task);
    // const message = "Task Created:";
    // res.status(201).send(message + " " + JSON.stringify(savedTask));

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    //res.send(tasks);
    res.render("gettask", { tasks: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


exports.getid = async (req, res) => {
  const v = '/public/getid.html'
  str = __dirname
  console.log(str.length);
  let part = str.substr(0, 35);
  //console.log()
  console.log(part + v)
  // console.log()
  res.sendFile(part + v)
};


exports.getTaskById = async (req, res) => {
  try {
    const id = req.body.id
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    //res.send(task);
    res.render("mypage", task);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getidup = async (req, res) => {
  const v = '/public/getidup.html'
  str = __dirname
  console.log(str.length);
  let part = str.substr(0, 35);
  //console.log()
  console.log(part + v)
  // console.log()
  res.sendFile(part + v)
};


exports.updateTask = async (req, res) => {
  try {
    const title=req.body.title
    const description=req.body.description
    const task = await Task.findByIdAndUpdate(req.body.id, {title,description}, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    const message = "Task Updated";
   // res.status(201).send(message + " " + JSON.stringify(task));
    // res.send("Todo updated Succesfully");
    //res.send(task);
    res.render("update",task)
    console.log("Updated data:", task)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getiddel = async (req, res) => {
  const v = '/public/delete.html'
  str = __dirname
  console.log(str.length);
  let part = str.substr(0, 35);
  //console.log()
  console.log(part + v)
  // console.log()
  res.sendFile(part + v)
};


exports.deleteTask = async (req, res) => {
  try {
    const id = req.body.id
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    console.log("Task deleted:", task);
    //res.send({ message: 'Task deleted' });
    res.render("delete",{ message: 'Task deleted' })
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

