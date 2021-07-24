const query = require('../utils/query');

function add(target, data) {
  const fields = Object.keys(data);
  const values = [];
  fields.forEach(field => {
    values.push(query.checkData(data[field]));
  });

  return `INSERT INTO ${target}(${fields.join(',')}) VALUES(${values.join()})`;
}

function list(target, where, options) {
  const whereString = query.genWhereString(where);
  return `SELECT * FROM ${target} ${whereString}`
}

function del(target, where) {
  const whereString = query.genWhereString(where);
  return `DELETE FROM ${target} ${whereString}`
}


function update() { }

module.exports = {
  add, del, list, update
}