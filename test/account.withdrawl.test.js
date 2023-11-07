const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { User, USERS } = require("../helpers/fakeUser");
require("dotenv").config();
chai.use(chaiHttp);

const { BASE_API_URL: api_url, API_AUTH_TOKEN: token } = process.env;
const endpoint = "/account/create-account";

const auth = `Bearer ${token}`;

const id = "5b069ef0-7af9-11ee-9941-a13d98c3f1fe";
const data = {
  amount: 25979.8,
  type: "deposite",
};

const not_found_data = {
  amount: 25979.8,
  type: "deposite",
};

const invalid_data = {
  amount: 25979.8,
  type: "deposite",
};

describe("patch / Describe the update account balance test case ", () => {
  it("should send code 200 balance updated successfully", (done) => {
    chai
      .request(api_url)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .query({ account_id: id })
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(200);
        expect(res.body.code).eq(200);
        expect(res.body.success).eq(true);

        done();
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
    chai
      .request(api_url)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(401);
        expect(res.body.code).eq(401);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });

  it("should send code 500 internal server errors", (done) => {
    chai
      .request(api_url)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.status).eq(500);
        }
        done();
      });
  });
  it("should send code 404 if user not found ", (done) => {
    chai
      .request(api_url)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
  it("should send code 422 if unprocessable content ", (done) => {
    chai
      .request(api_url)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(422);
        expect(res.body.code).eq(422);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
  it("should send code 400 if user not found ", (done) => {
    chai
      .request(api_url)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eq(400);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
});