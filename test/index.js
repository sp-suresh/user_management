const env = require('../env')
Object.keys(env.development).forEach(key => {
  process.env[key] = env.development[key]
})

var chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../index"),
  should = chai.should(),
  expect = chai.expect

chai.use(chaiHttp)

//Parent block
describe("Testcases", () => {
  /*
   * Test the /POST route
   */
  describe("/POST create new user", async () => {
    it("It should create 401 as there is no token", async () => {
      var userObj = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@gmail.com',
        mobileNum: '9986543907',
        password: 'testuser@123',
        dob: '13710750316'
      }

      var res = await chai
        .request(server)
        .post("/api/users")
        .send(userObj)
      res.should.have.status(401)
      res.body.should.be.an("object")
    })
  })
  
  describe("/POST create new user", async () => {
    it("It should create a new user in database", async () => {
      var userObj = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@gmail.com',
        mobileNum: '9986543907',
        password: 'testuser@123',
        dob: '13710750316'
      }

      var res = await chai
        .request(server)
        .post("/api/users")
        .set('tkn', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxMDc3NzEyLCJleHAiOjE2MDI2MTM3MTJ9.bsAJS_yO52XX0YdWeSbjJrKOggw9YW6gycMpA7kRRvk')
        .send(userObj)
      res.should.have.status(200)
      res.body.should.be.an("object")
    })
  })

  /*
   * Test the /GET route
   */

  describe("/GET user list", async () => {
    it("It should create 401 error as token is missing", async () => {
      var res = await chai
        .request(server)
        .get(`/api/users?offset=0&limit=5`)
      res.should.have.status(401)
      res.body.should.be.an("object")
    })
  })

  describe("/GET user list", async () => {
    it("It should GET all the users", async () => {
      var res = await chai
        .request(server)
        .get(`/api/users?offset=0&limit=5`)
        .set('tkn', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxMDc3NzEyLCJleHAiOjE2MDI2MTM3MTJ9.bsAJS_yO52XX0YdWeSbjJrKOggw9YW6gycMpA7kRRvk')
      res.should.have.status(200)
      res.body.should.be.an("object")
      res.body.data.userList.should.be.an("array")
    })
  })

  describe("/GET user list", async () => {
    it("It should return jwt malformed error", async () => {
      var res = await chai
        .request(server)
        .get(`/api/users?offset=0&limit=5`)
        .set('tkn', 'I am the invalid token!')
      res.should.have.status(401)
      res.body.should.be.an("object")
      expect(res.body.data).to.equal('jwt malformed')
    })
  })
})
