module.exports = function (app) {
    const fs = require('fs');
  
    function writeData(taskList, request, username) {
      const task = {};
      if (request !== null) {
        taskList.push(request);
      }
      taskList = JSON.stringify(taskList);
      const dir = 'appFiles/' + username;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFile(dir + '/tasks.json', taskList, (err) => {
        if (err) {
          throw err;
        }
      });
      return task;
    }
  
    function setHeader(res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
      return res;
    }
  
    app.post('/api/entity/task', (req, res) => {
      res = setHeader(res);
      let request = req.body;
      let taskList = [];
      let result = {};
      fs.readFile('appFiles/' + request.username + '/tasks.json', 'utf8', (err, data) => {
        if (err) {
          taskList = [];
          request = writeData(taskList, request, request.username);
          result = {
            message: 'Success: Task added successfully',
            result: 'success'
          };
        } else {
          if (data === '' || data === undefined || data === null) {
            taskList = [];
          } else {
            taskList = JSON.parse(data);
          }
          request = writeData(taskList, request, request.username);
          result = {
            message: 'Success: Task added successfully',
            result: 'success'
          };
        }
        return res.status('200').json(result);
      });
    });
  
  
    app.get('/api/entity/task/:id', (req, res) => {
      res = setHeader(res);
      const id = req.params.id;
      let taskList = [];
      let result = {};
      fs.readFile('appFiles/' + id + '/tasks.json', 'utf8', (err, data) => {
        if (err) {
          taskList = [];
          result = {
            message: 'Error: No Task found for the user',
            result: 'error'
          };
        } else if (data) {
          if (data === '' || data === undefined || data === null) {
            taskList = [];
          } else {
            taskList = JSON.parse(data);
          }
          if (taskList !== undefined && taskList !== null && taskList.length > 0 && taskList[0].username === id) {
            result = {
              message: 'Success: User task retrieved successfully',
              result: 'success',
              value: taskList
            };
  
          }
        }
        return res.status('200').json(result);
      });
    });
  
  
    app.post('/api/entity/delete/task', (req, res) => {
      res = setHeader(res);
      const id = req.body.username;
      const request = req.body;
      let taskList = [];
      let result = {};
      fs.readFile('appFiles/' + id + '/tasks.json', 'utf8', (err, data) => {
        if (err) {
          result = {
            message: 'Error: No Task found for the user',
            result: 'error'
          };
        } else {
          if (data === '' || data === undefined || data === null) {
            taskList = [];
          } else {
            taskList = JSON.parse(data);
            if (taskList !== undefined && taskList !== null && taskList.length > 0) {
              taskList.forEach(function (task) {
                if (task.id === request.id) {
                  taskList.splice(taskList.indexOf(task), 1);
                }
              });
              writeData(taskList, null, request.username);
            }
          }
          result = {
            message: 'Success: User task removed successfully',
            result: 'success',
          };
          return res.status('200').json(result);
        }
      });
    });
  
    app.put('/api/entity/task', (req, res) => {
      res = setHeader(res);
      const id = req.body.username;
      const request = req.body;
      let taskList = [];
      let result = {};
      fs.readFile('appFiles/' + id + '/tasks.json', 'utf8', (err, data) => {
        if (err) {
          result = {
            message: 'Error: No Task found for the user',
            result: 'error'
          };
        } else {
          if (data === '' || data === undefined || data === null) {
            taskList = [];
          } else {
            taskList = JSON.parse(data);
            if (taskList !== undefined && taskList !== null && taskList.length > 0) {
              taskList.forEach(function (task) {
                if (task.id === request.id) {
                  taskList[taskList.indexOf(task)] = request;
                }
              });
              writeData(taskList, null, request.username);
            }
          }
          result = {
            message: 'Success: User task updated successfully',
            result: 'success',
          };
          return res.status('200').json(result);
        }
      });
    });
  };