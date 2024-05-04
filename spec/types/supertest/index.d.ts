import { ITask } from '@src/models/Task';
import 'supertest';


declare module 'supertest' {

  export interface Response  {
    headers: Record<string, string[]>;
    body: {
      error: string;
      tasks: ITask[];
    };
  }
}