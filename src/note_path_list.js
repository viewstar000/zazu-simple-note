const { BASE_URL, httpGET } = require("./globals");

module.exports = (pluginContext) => {
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      let uri = BASE_URL + '/note_path_list?query=' + encodeURIComponent(query);
      httpGET(pluginContext, uri, function (rawData) {
        const parsedData = JSON.parse(rawData);
        pluginContext.console.log('verbose', 'parsedData', parsedData);
        let result = [];
        parsedData.forEach(item => {
          result.push({
            title: item[0],
            subtitle: item[1],
            value: item[1]
          });
        });
        resolve(result);
      });
    });
  };
};


