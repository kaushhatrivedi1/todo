const express = require('express');
const taskController = require('../controllers/taskController');
const app = require('../app');
const router = express.Router();
const multer = require('multer');
const upload = multer();


router.get('/add', taskController.addTasks);

router.post('/add', upload.none(),taskController.createTask);
router.get('/getdata', taskController.getTasks);
router.get('/getid', taskController.getid);
router.post('/getdatabyid', upload.none(),taskController.getTaskById);
router.get('/getidup', taskController.getidup);
router.post('/updatedata', upload.none(), taskController.updateTask);
router.get('/getiddel', taskController.getiddel);
router.post('/delete',upload.none(),taskController.deleteTask);
router.get('/random',taskController.randomTask)
module.exports = router;
