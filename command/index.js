const table = require('./table');

// commandExtractor fungsi untuk mengambil data dari request
const commandExtractor = (data) => {
  const command = data.command;
  const options = data.options;

  let response = {
    message: "",
    data: [],
    query: ""
  }

  switch (command) {
    case 'table:add':
      response.query = table.add(options);
      break;
    case 'table:update':
    case 'table:delete':
    case 'table:list':
    case 'table:describe':
      response.message = command;
      break;
    default:
      response.message = "unknown command";
      break;
  }

  return response;
}

exports.commands = {
  commandExtractor
}