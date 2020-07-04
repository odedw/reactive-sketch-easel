import * as logger from "loglevel";
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
