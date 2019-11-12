const { BASE_URL, httpGET } = require("./globals");

module.exports = (pluginContext) => {
  return (value, env = {}) => {
    return new Promise((resolve, reject) => {
      let uri = BASE_URL + '/open_note/' + value;
      httpGET(pluginContext, uri, function (rawData) {
        pluginContext.console.log('verbose', 'response', rawData);
        resolve(rawData);
      });
    });
  };
};


