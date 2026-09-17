// neshan.js
const request = require("postman-request");

function getCoordsNeshan(address, callback) {
  // Read key directly from process.env
  const apiKey = process.env.NESHAN_API_KEY;

  if (!apiKey) {
    return callback(
      "Missing NESHAN_API_KEY in environment variables!",
      undefined,
    );
  }

  const neshanUrl =
    "https://api.neshan.org/v4/geocoding?address=" +
    encodeURIComponent(address);

  const options = {
    url: neshanUrl,
    json: true,
    headers: {
      "Api-Key": apiKey,
    },
  };

  request(options, (error, response) => {
    if (error) {
      return callback("Unable to connect to location services!", undefined);
    }

    if (response.statusCode !== 200) {
      return callback(
        "API Error: Server responded with status code " + response.statusCode,
        undefined,
      );
    }

    if (!response.body || !response.body.location) {
      return callback(
        "Unable to find coordinates for this address.",
        undefined,
      );
    }
    callback(undefined, {
      response: response.body,
      latitude: response.body.location.y,
      longitude: response.body.location.x,
    });
  });
}

module.exports = getCoordsNeshan;
