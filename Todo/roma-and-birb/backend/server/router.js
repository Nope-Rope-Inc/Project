const Router = require('koa-router');
const auth = require('./middlewares/auth');

const TasksController = require('./controllers/tasks');
const CategoriesController = require('./controllers/categories');
const UsersController = require('./controllers/users');

const router = new Router();

/** TASKS **/
router.get('/tasks', auth(TasksController.readMany));
router.get('/tasks/:id', auth(TasksController.readOne));
router.post('/tasks', auth(TasksController.create));
router.put('/tasks/:id', auth(TasksController.updateOne));
router.delete('/tasks/:id', auth(TasksController.deleteOne));

/** CATEGORIES **/
router.get('/categories', auth(CategoriesController.readMany));
router.get('/categories/:id', auth(CategoriesController.readOne));
router.post('/categories', auth(CategoriesController.create));
router.put('/categories/:id', auth(CategoriesController.updateOne));
router.delete('/categories/:id', auth(CategoriesController.deleteOne));

/** USERS **/
router.post('/sign-up', UsersController.signUp);
router.post('/sign-in', UsersController.signIn);
router.get('/check-auth', UsersController.check);
router.get('/sign-out', UsersController.signOut);
router.get('/me', auth(UsersController.readMe));
router.put('/me', auth(UsersController.updateMe));
router.delete('/me', auth(UsersController.deleteMe));

module.exports = router;
