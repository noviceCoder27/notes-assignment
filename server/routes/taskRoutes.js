const router = require('express').Router();
const {createTask,getAllTasks,updateChecked, changeCategory} = require('../controllers/taskControllers');

router.get('/',getAllTasks);
router.post('/create',createTask);
router.patch('/category/:id',changeCategory);
router.patch('/checked/:id',updateChecked)

module.exports = router;