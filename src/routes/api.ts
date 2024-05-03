import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Task from '@src/models/Task';
import TaskRoutes from './TaskRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add TaskRouter ** //

const TaskRouter = Router();

// Get all Tasks
TaskRouter.get(
  Paths.Tasks.Generic,
  TaskRoutes.getAll,
);

// Get one Task
TaskRouter.get(
  Paths.Tasks.Unique,
  TaskRoutes.getOne,
);

// Add one Task
TaskRouter.post(
  Paths.Tasks.Generic,
  validate(['task', Task.isTask]),
  TaskRoutes.add,
);

// Update one Task
TaskRouter.put(
  Paths.Tasks.Unique,
  validate(['task', Task.isTask]),
  TaskRoutes.update,
);

// Delete one Task
TaskRouter.delete(
  Paths.Tasks.Unique,
  validate(['id', 'number', 'params']),
  TaskRoutes.delete,
);

// Add TaskRouter
apiRouter.use(Paths.Tasks.Base, TaskRouter);


// **** Export default **** //

export default apiRouter;
