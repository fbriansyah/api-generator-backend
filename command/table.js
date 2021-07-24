const query = require('../utils/query');

// add function digunakan untuk membuat table baru
// param:
//  - options:
//    - default   {array} di isi dengan [id, created, edited]
//    - fields    {array} untuk custom fields
//    - name      {string} nama table
function add(options) {
  const defaultFields = query.genDefaultFields(options.default);
  const customFields = query.genCustomFields(options.fields);
  const field = defaultFields.concat(customFields)
  return ` CREATE TABLE ${options.name} ( ${field.join(',')} ) `
}

function edit(options) {

}

function del(options) {

}

function list(options) {

}


module.exports = {
  add
}