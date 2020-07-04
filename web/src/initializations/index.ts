import * as log from "loglevel";
// import emitters, { EventEmitter } from '../event-emitters';
import { server } from "../services";
// import CgaGlitch from '../routines/CgaGlitch/CgaGlitch';
// const createInitPromiseForEmitter = (e: EventEmitter) =>
// e
//   .init()
//   .then(() => log.info(`${e.constructor.name} finished init`))
//   .catch((err) => log.error(`${e.constructor.name} error in init: ${err}`));

export default async () => {
  log.setDefaultLevel(log.levels.INFO);
  // await Promise.all(emitters.map(createInitPromiseForEmitter));
  await server.init();
  
  // new CgaGlitch().init();
};
