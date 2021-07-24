const table = require('./table');
const dataQ = require('./data');

/**
 * Fungsi untuk mengextract data
 * @param {Object} data data yang akan diextract
 * @returns {Object}
 */
const commandExtractor = async (data, db) => {
  const command = data.cmd;
  const options = data.options;
  const target = data.target ? data.target : '';
  const isDry = data.dry ? true : false;
  const asObject = data.asObject ? true : false;
  const where = data.where ? data.where : null;

  let response = {
    code: "00",
    message: "",
    data: [],
    query: ""
  }

  switch (command) {
    // table command
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
    // data command
    case 'd:list':
      response.query = dataQ.list(target, where, options);
      break;
    case 'd:add':
      response.query = dataQ.add(target, options);
      break;
    case 'd:delete':
      if (!where) {
        response.code = "11";
        response.message = "where is mandatory"
        return response;
      }
      response.query = dataQ.del(target, where);
      break;
    case 'd:update':
      if (!where || !options) {
        response.code = "11";
        response.message = "where and options is mandatory"
        return response;
      }
      response.query = dataQ.update(target, options, where);
      break;
    default:
      response.message = "unknown command";
      break;
  }

  try {
    if (isDry) {
      return response;
    }
    const data = await db.query(response.query);
    if (Array.isArray(data)) {
      if (!asObject) {
        response["fields"] = Object.keys(data[0]);
        let rows = [];
        data.forEach(dt => {
          const cols = [];
          response["fields"].forEach(key => cols.push(dt[key]))
          rows.push(cols)
        })
        response["data"] = rows;
      } else {
        response["data"] = data;
      }

    } else {
      response["data"] = data;
    }
  } catch (e) {
    response.code = e.code;
    response.message = e.sqlMessage;
  }


  if (!isDry) {
    delete response.query;
  }

  return response;
}

exports.commands = {
  commandExtractor
}