function genField(opt) {
  const options = opt.split('|');
  const fieldName = options[0];
  const modifier = options[1].split(';'); // int-6;nn;u;pk;ai;'hello'
  const type = modifier[0].split('-'); // int-6
  const typeStr = type.length > 1 ? `${type[0]}(${type[1]})` : `${type[0]}`;
  let strArr = [fieldName, typeStr]
  modifier.forEach((mod, i) => {
    if (i === 0) return;
    switch (mod) {
      case 'nn': strArr.push('NOT NULL'); break;
      case 'u': strArr.push('UNSIGNED'); break;
      case 'ai': strArr.push('AUTO_INCREMENT'); break;
      case 'pk': strArr.push('PRIMARY KEY'); break;
      default:
        const defaultData = mod.split('=');
        if (defaultData.length > 1) {
          strArr.push(`DEFAULT ${defaultData[1]}`);
        }
        break;
    }
  });
  return strArr.join(' ');
}

function genCustomFields(fields) {
  const fieldArr = [];
  fields.forEach(field => {
    fieldArr.push(genField(field));
  });
  return fieldArr;
}

function genDefaultFields(opt) {
  let queryArr = [];
  for (key in opt) {
    switch (opt[key]) {
      case 'id':
        queryArr.push('id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY');
        break;
      case 'created':
        queryArr.push(' created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
        break;
      case 'edit':
        queryArr.push(' edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        break;
      default: break;
    }
  }
  return queryArr;
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function checkData(value) {
  if (isNumeric(value)) {
    return ~value;
  } else if (value === 'date_now') {
    return 'NOW()'
  } else {
    return `'${value}'`
  }
}

function genWhereString(where) {
  if (where) {
    const keys = Object.keys(where);
    const conditions = keys.map(key => `${key} ${where[key]}`)

    return `WHERE ${conditions.join(' AND ')}`;
  } else {
    return ``;
  }
}

function objectToSetString(data) {
  const keys = Object.keys(data);
  return keys.map(key => `${key} = ${checkData(data[key])}`).join(',')
}

module.exports = {
  genCustomFields,
  genDefaultFields,
  checkData,
  genWhereString,
  objectToSetString
}