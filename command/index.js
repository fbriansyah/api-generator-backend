const table = require('./table');

/**
 * Fungsi untuk mengextract data
 * @param {Object} data data yang akan diextract
 * @returns {Object}
 */
const commandExtractor = (data) => {
  const command = data.command;
  const options = data.options;
  const target = data.target ? data.target : '';
  const isDry = data.dry ? true : false;

  let response = {
    message: "",
    data: [],
    query: ""
  }

  switch (command) {
    case 't:add':
      response.query = table.add(options);
      break;
    case 't:delete':
      response.query = table.del(target);
      break;
    case 't:list':
      response.query = table.list();
      break;
    case 't:describe':
      response.query = table.describe(target);
      break;
    case 't:update':
      response.message = command;
      break;
    default:
      response.message = "unknown command";
      break;
  }

  if (!isDry) {
    delete response.query;
  }

  return response;
}

exports.commands = {
  commandExtractor
}