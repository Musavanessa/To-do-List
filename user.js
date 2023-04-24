module.exports = function (app) {
    const fs = require('fs');
  
    function writeData(userList, request) {
      let user = {
        name: request.name,
        email: request.email,
        username: request.username,
        password: request.password
      };
      userList.push(user);
      userList = JSON.stringify(userList);
      fs.writeFile('appFiles/users.json', userList, (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
      return user;
    }
  
    app.post('/api/users/register', (req, res) => {
      let request = req.body;
      let userList = [];
      let result = {};
      fs.readFile('appFiles/users.json', 'utf8', (err, data) => {
        if (err) {
          userList = [];
          request = writeData(userList, request);
          result = {
            message: 'Success: User registered successfully',
            result: 'success'
          };
        } else if (data) {
          userList = JSON.parse(data);
          userList.forEach(function (u) {
            if (u.email === request.email || u.username === request.username) {
              result = {
                message: 'Error: Email already exists',
                result: 'error'
              };
              console.log(result);
            } else {
              request = writeData(userList, request);
              result = {
                message: 'Success: User registered successfully',
                result: 'success'
              };
            }
          });
        }
        return res.status('200').json(result);
      });
    });
  
    
  };