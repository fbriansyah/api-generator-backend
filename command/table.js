const query = require('../utils/query');

/**
 * Fungsi yang digunakan untuk menggenerate query create table
 * @param {Object} options merupakan opsi untuk membuat query create table
 * @param {Array} options.defaults diisi dengan [id, created, edited]
 * @param {Array} options.fields merupakan custom fields yang akan dibuat
 * @param {string} options.string merupakan nama dari table yang akan dibuat
 * @returns {string}
 */
function add(options) {
  const defaultFields = query.genDefaultFields(options.default);
  const customFields = query.genCustomFields(options.fields);
  const field = defaultFields.concat(customFields)
  return ` CREATE TABLE ${options.name} ( ${field.join(',')} ) `
}

/**
 * Fungsi untuk menggenerate query delete table
 * @param {string} target merupakan nama table yang akan dihapus
 * @returns {string}
 */
function del(target) {
  return `DROP TABLE ${target}`;
}

/**
 * Fungsi untuk menggenerate query list semua table
 * @returns {string}
 */
function list() {
  return `SHOW TABLES`;
}

/**
 * Fungsi untuk menggenerate detail dari table
 * @param {string} target nama table yang ingin dilihat
 * @returns {string}
 */
function describe(target) {
  return `DESCRIBE ${target}`;
}

function edit(options) {
  // TODO membuat query untuk edit
}

module.exports = {
  add, del, list, describe
}