import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { defaultErrMsg as ValidatorErr } from 'jet-validator';
import insertUrlParams from 'inserturlparams';

import app from '@src/server';

import TaskRepo from '@src/repos/TaskRepo';
import Task, { ITask } from '@src/models/Task';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { TASK_NOT_FOUND_ERR } from '@src/services/TaskService';

import Paths from 'spec/support/Paths';
import apiCb from 'spec/support/apiCb';
import { TApiCb } from 'spec/types/misc';


// Dummy Tasks for GET req
const getDummyTasks = () => {
  return [
    Task.new("Enviar mensajes de texto", "Enviar mensajes de texto a amigos y familiares","completed","📱"),
    Task.new("Trabajar en la laptop","Programar y desarrollar aplicaciones en la laptop","completed","💻"),
  ];
};


// Tests
describe('TaskRouter', () => {

  let agent: TestAgent<Test>;

  // Run before all tests
  beforeAll(done => {
    agent = supertest.agent(app);
    done();
  });

  // Get all Tasks
  describe(`"GET:${Paths.Tasks.Base}"`, () => {

    // Setup API
    const api = (cb: TApiCb) => 
      agent
        .get(Paths.Tasks.Generic)
        .end(apiCb(cb));

    // Success
    it('retorna un json con todos los Tasks y status ' + 
    ` "${HttpStatusCodes.OK}" si fue exitoso.`, (done) => {
      const data = getDummyTasks();
      spyOn(TaskRepo, 'getAll').and.resolveTo(data);
      // Call API
      api(res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body).toEqual({ Tasks: data });
        done();
      });
    });
  });

  // Test add Task
  describe(`"POST:${Paths.Tasks.Unique}"`, () => {

    const ERROR_MSG = `${ValidatorErr}"Task".`,
      DUMMY_Task = getDummyTasks()[0];

    // Setup API
    const callApi = (Task: ITask | null, cb: TApiCb) => 
      agent
        .post(Paths.Tasks.Unique)
        .send({ Task })
        .end(apiCb(cb));

    // Test add Task success
    it(`retorna un còdigo de "${HttpStatusCodes.CREATED}" si ` + 
    'la solicitud fue exitosa', (done) => {
      // Spy
      spyOn(TaskRepo, 'add').and.resolveTo();
      // Call api
      callApi(DUMMY_Task, res => {
        expect(res.status).toBe(HttpStatusCodes.CREATED);
        done();
      });
    });

    // Missing param
    it(`retorna un mensaje de error : "${ERROR_MSG}" ` + 
    `y codigo "${HttpStatusCodes.BAD_REQUEST}" si ` + 
    'un parametro falta.', (done) => {
      // Call api
      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe(ERROR_MSG);
        done();
      });
    });
  });

  // Update Tasks
  describe(`"PUT:${Paths.Tasks.Unique}"`, () => {

    const ERROR_MSG = `${ValidatorErr}"Task".`,
      DUMMY_Task = getDummyTasks()[0];

    // Setup API
    const callApi = (Task: ITask | null, cb: TApiCb) => 
      agent
        .put(Paths.Tasks.Unique)
        .send({ Task })
        .end(apiCb(cb));

    // Success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'request was successful.', (done) => {
      // Setup spies
      spyOn(TaskRepo, 'update').and.resolveTo();
      spyOn(TaskRepo, 'persists').and.resolveTo(true);
      // Call api
      callApi(DUMMY_Task, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // Param missing
    it(`should return a JSON object with an error message of "${ERROR_MSG}" ` +
    `and a status code of "${HttpStatusCodes.BAD_REQUEST}" if the Task ` + 
    'param was missing.', (done) => {
      // Call api
      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe(ERROR_MSG);
        done();
      });
    });

    // Task not found
    it('should return a JSON object with the error message of ' + 
    `"${TASK_NOT_FOUND_ERR}" and a status code of ` + 
    `"${HttpStatusCodes.NOT_FOUND}" if the id was not found.`, (done) => {
      // Call api
      callApi(DUMMY_Task, res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(TASK_NOT_FOUND_ERR);
        done();
      });
    });
  });

  // Delete Task
  describe(`"DELETE:${Paths.Tasks.Unique}"`, () => {

    // Call API
    const callApi = (id: number, cb: TApiCb) => 
      agent
        .delete(insertUrlParams(Paths.Tasks.Unique, { id }))
        .end(apiCb(cb));

    // Success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'request was successful.', (done) => {
      // Setup spies
      spyOn(TaskRepo, 'delete').and.resolveTo();
      spyOn(TaskRepo, 'persists').and.resolveTo(true);
      // Call api
      callApi(5, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // Task not found
    it('should return a JSON object with the error message of ' + 
    `"${TASK_NOT_FOUND_ERR}" and a status code of ` + 
    `"${HttpStatusCodes.NOT_FOUND}" if the id was not found.`, done => {
      // Setup spies
      callApi(-1, res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(TASK_NOT_FOUND_ERR);
        done();
      });
    });
  });
});
