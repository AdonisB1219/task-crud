import TaskRepo from '@src/repos/TaskRepo';
import { ITask } from '@src/models/Task';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const TASK_NOT_FOUND_ERR = 'Task not found';


// **** Functions **** //

/**
 * Get all tasks.
 */
function getAll(): Promise<ITask[]> {
  return TaskRepo.getAll();
}

/**
 * Get one tasks.
 */
async function getOne(id: number): Promise<ITask | null>{
  const persists = await TaskRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      TASK_NOT_FOUND_ERR,
    );
  }
  return TaskRepo.getOne(id);
}

/**
 * Add one task.
 */
function addOne(task: ITask): Promise<void> {
  return TaskRepo.add(task);
}

/**
 * Update one task.
 */
async function updateOne(task: ITask, id: number): Promise<void> {
  const persists = await TaskRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      TASK_NOT_FOUND_ERR,
    );
  }
  // Return task
  return TaskRepo.update(task, id);
}

/**
 * Delete a task by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await TaskRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      TASK_NOT_FOUND_ERR,
    );
  }
  // Delete task
  return TaskRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  getOne
} as const;
