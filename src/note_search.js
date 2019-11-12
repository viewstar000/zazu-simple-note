const { BASE_URL, httpGET } = require("./globals");

module.exports = (pluginContext) => {
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      let uri = BASE_URL + '/search_note?query=' + encodeURIComponent(query);
      httpGET(pluginContext, uri, function (rawData) {
        const parsedData = JSON.parse(rawData);
        pluginContext.console.log('verbose', 'parsedData', parsedData);
        let result = [];
        parsedData.forEach(item => {
          result.push({
            title: item[2],
            subtitle: item[3],
            value: item[0]
          });
        });
        resolve(result);
      });
    });
  };
};


