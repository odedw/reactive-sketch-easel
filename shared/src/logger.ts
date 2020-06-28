import * as log from 'loglevel';

const levelNames = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'SILENT'];
var originalFactory = log.methodFactory;
//@ts-ignore
log.methodFactory = function (methodName, logLevel, loggerName) {
  var rawMethod = originalFactory(methodName, logLevel, loggerName);

  return function () {
    var messages = [
      `${levelNames[logLevel]} | ${new Date().toLocaleTimeString()} | `,
    ];
    for (var i = 0; i < arguments.length; i++) {
      messages.push(arguments[i]);
    }
    rawMethod.apply(undefined, messages);
  };
};
log.setLevel(log.levels.INFO); // Be sure to call setLevel method in order to apply plugin

export { log };
