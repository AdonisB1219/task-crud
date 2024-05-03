

import jsonfile from 'jsonfile';

import { ITask } from '@src/models/Task';


// **** Variables **** //

const DB_FILE_NAME = 'tasks.json';


// **** Types **** //

interface IDb {
  tasks: ITask[];
}


// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}


// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;
