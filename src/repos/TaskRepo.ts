import { ITask } from '@src/models/Task';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one task.
 */
async function getOne(id: number): Promise<ITask | null> {
  const db = await orm.openDb();
  for (const task of db.tasks) {
    if (task.id === id) {
      return task;
    }
  }
  return null;
}

/**
 * See if a task with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const task of db.tasks) {
    if (task.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all tasks.
 */
async function getAll(): Promise<ITask[]> {
  const db = await orm.openDb();
  return db.tasks;
}

/**
 * Add one task.
 */
async function add(task: ITask): Promise<void> {
  const db = await orm.openDb();
  task.id = db.tasks.length;
  db.tasks.push(task);
  return orm.saveDb(db);
}

/**
 * Update a task.
 */
async function update(task: ITask, id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.tasks.length; i++) {
    if (db.tasks[i].id === id) {
      const dbTask = db.tasks[i];
      db.tasks[i] = {
        ...dbTask,
        name: task.name || dbTask.name,
        description: task.description || dbTask.description,
        status: task.status || dbTask.status,
        icon: task.icon || dbTask.icon
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one task.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.tasks.length; i++) {
    if (db.tasks[i].id === id) {
      db.tasks.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
