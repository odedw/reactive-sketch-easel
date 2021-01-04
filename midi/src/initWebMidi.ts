import WebMidi from 'webmidi';

export default function init(): Promise<void> {
  return new Promise((resolve, reject) => {
    WebMidi.enable((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
