const { responseHelper } = require("../helpers/responseHelp");
const db = require("../models");
const User = db.User;

const { errorHelper } = require("./../helpers/errorHelp");
const { passHashHelper } = require("./../helpers/passHelper");

async function userRegistrationService(payload) {
  try {
    // creating the password hash
    const pass = await passHashHelper(payload.password);
    console.log(pass);
    if (pass == undefined) {
      throw new Error(
        errorHelper(
          "Service Error",
          500,
          "service error",
          "password hash not generated"
        )
      );
    }

    const data = {
      email: payload.email,
      mobile: payload.mobile,
      password: pass,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };

    const userdata = await User.create(data);
    return responseHelper(201, true, "user registered successfully", userdata);
    console.log(userdata);
  } catch (err) {
    console.log(err)
    const errors = errorHelper(
      409,
      err.name,
      "please check the payload and try again",
      err.parent.detail
    );
    return errors;
  }
}

module.exports = {
  userRegistrationService,
};
