import _ from 'lodash';

const serverLogger = () => next => action => {
  let keys = _.without(_.keys(action), 'type');
  let data = JSON.stringify(action.data);
  let entry = `ACTION: ${action.type} [${keys}]`;

  if (data && data !== 'null') entry += ` ==> ${data}`;
  console.log(entry);
  next(action);
};

export default serverLogger;