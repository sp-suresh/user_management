# User Management Assignment

## Technologies

1. NodeJS (v10.16.3)
2. pm2 (v3.2.1)
3. MongoDB (4.0.12)

## How to run

1. Extract and cd to this project
2. `$ npm install`
3. Start the app using `$ pm2 start ./ecosystem.config.js --env=development` and application will start listing on port `4400`(to change it update port in environment file - `./env.js`)
4. You can run test cases using `$ npm test`

## API Documentation

1. To create a new User in the database

```
Url: /api/users/
Method: POST
Hedaer: {tkn: jwtToken}
Request Body: {
  "firstName":"erer",
  "lastName":"vdsd", 
  "email":"e@g.com",
  "mobileNum":"0099887766",
  "password": "eva",
  "dob":1371075031683
}
Response Body: 
{
  "responseCode": 200,
  "responseDesc": "Success!",
  "data": "Inserted successfully!"
}
```
All parameters are required and strickly validated

2. To get list of users

```
Url: /api/users/?offset=1&limit=2
Method: GET
Header: {tkn: jwtToken}
Response Body:
{
  "responseCode": 200,
  "responseDesc": "Success!",
  "data": {
    "userList": [
      {
        "firstName": "erer",
        "lastName": "vdsd",
        "email": "e@g.com",
        "mobileNum": "0099887766",
        "dob": 1371075031683,
        "createdOn": 1571080926508
      },
      {
        "firstName": "Eva",
        "lastName": "Green",
        "email": "e@g.com",
        "mobileNum": "0099887766",
        "dob": 1371075031683,
        "createdOn": 1571080830921
      }
    ],
    "total": 17
  }
}
```
offset(default 0) and limit(default 20) are optional parameters.

## Note
1. Sample JWT for testing -```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxMDc3NzEyLCJleHAiOjE2MDI2MTM3MTJ9.bsAJS_yO52XX0YdWeSbjJrKOggw9YW6gycMpA7kRRvk```
2. Environment related details are added in `./env.js` file.
