import * as logger from "loglevel";

// const levelNames = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "SILENT"];
// var originalFactory = logger.methodFactory;
//@ts-ignore
// logger.methodFactory = function (methodName, logLevel, loggerName) {
//   var rawMethod = originalFactory(methodName, logLevel, loggerName);

//   return function () {
//     var messages = [
//       `${levelNames[logLevel]} | ${new Date().toLocaleTimeString()} | `,
//     ];
//     for (var i = 0; i < arguments.length; i++) {
//       messages.push(arguments[i]);
//     }
//     rawMethod.apply(undefined, messages);
//   };
// };
logger.setLevel(logger.levels.INFO); // Be sure to call setLevel method in order to apply plugin

logger.info();
const log = {
  info: (...msg: any[]) =>
    logger.info(`INFO | ${new Date().toLocaleTimeString()} | `, ...msg),
  error: (...msg: any[]) =>
    logger.error(`ERROR | ${new Date().toLocaleTimeString()} | `, ...msg),
  warn: (...msg: any[]) =>
    logger.warn(`WARN | ${new Date().toLocaleTimeString()} | `, ...msg),
  debug: (...msg: any[]) =>
    logger.debug(`DEBUG | ${new Date().toLocaleTimeString()} | `, ...msg),
};
export { log };
