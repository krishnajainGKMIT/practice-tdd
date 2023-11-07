const responseHelper = (code, success, message, payload) => {
  return {
    code: code,
    success: success,
    data: { message: message, payload: payload },
  };
}

module.exports = {
  responseHelper,
};
