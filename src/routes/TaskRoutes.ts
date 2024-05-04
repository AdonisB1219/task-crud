import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import TaskService from '@src/services/TaskService';
import { ITask } from '@src/models/Task';
import { IReq } from './types/express/misc';
import { Response } from 'express';


// **** Functions **** //

/**
 * Get all tasks.
 */
async function getAll(_: IReq, res: Response) {
  const tasks = await TaskService.getAll();
  return res.status(HttpStatusCodes.OK).json({ tasks });
}

/**
 * Get one task.
 */
async function getOne(req: IReq, res: Response) {
  const task = await TaskService.getOne(+req.params.id);
  return res.status(HttpStatusCodes.OK).json({ task });
}

/**
 * Add one task.
 */
async function add(req: IReq<{task: ITask}>, res: Response) {
  const { task } = req.body;
  await TaskService.addOne(task);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one task.
 */
async function update(req: IReq<{task: ITask}>, res: Response) {  
  const { task } = req.body;  
  const id = +req.params.id;
  await TaskService.updateOne(task, id);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one task.
 */
async function delete_(req: IReq, res: Response) {
  const id = +req.params.id;
  await TaskService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
  getOne
} as const;
