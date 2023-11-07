const { account } = require("./account.validation.schema");

const addAccountValidation = async (req, res, next) => {
  const value = await account.validate(req.body);
  if (value.error) {
    res.status(400).json({
      code: 400,
      success: false,
      body: {
        message: value.error.details[0].message,
      },
    });
  } else {
    res.status(200);
    next();
  }
};
const updateAccountBalanceValidation = async (req, res, next) => {
  const value = await account_balance.validate({
    account_id: req.params,
    balance: req.body.balance,
    type: req.body.type,
  });
  if (value.error) {
    res.status(400).json({
      code: 400,
      success: false,
      body: {
        message: value.error.details[0].message,
      },
    });
  } else {
    res.status(200);
    next();
  }
};
module.exports = {
  updateAccountBalanceValidation,
  addAccountValidation,
};