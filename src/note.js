/*jshint esversion: 6 */
const http = require('http');
const MarkdownIt = require('markdown-it');

module.exports = (pluginContext) => {
  return (query, env = {}) => {
    return new Promise((resolve, reject) => {
      http.get('http://localhost:24306/search_note?query=' + encodeURIComponent(query), (res) => {
        const {
          statusCode
        } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
        }
        if (error) {
          pluginContext.console.error(error.message);
          // consume response data to free up memory
          res.resume();
          return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            const md = new MarkdownIt();
            const parsedData = JSON.parse(rawData);
            pluginContext.console.log('verbose', 'parsedData', parsedData);
            result = [];
            parsedData.forEach(item => {
              result.push({
                title: item[2],
                subtitle: item[3],
                preview: item[4],
                value: item[0]
              });
            });
            resolve(result);
          } catch (e) {
            pluginContext.console.error(e.message);
          }
        });
      }).on('error', (e) => {
        pluginContext.console.error(`Got error: ${e.message}`);
      });
    });
  };
};