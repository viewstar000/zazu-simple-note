const http = require('http');

function httpGET(ctx, uri, onResponse) {
    http.get(uri, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
        }
        else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
        }
        if (error) {
            ctx.console.error(error.message);
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
                onResponse(rawData);
            }
            catch (e) {
                ctx.console.error(`Response process error: ${e.message}`);
            }
        });
    }).on('error', (e) => {
        ctx.console.error(`Got error: ${e.message}`);
    });
}
exports.httpGET = httpGET;
exports.BASE_URL = 'http://localhost:24306';