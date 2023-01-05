const fs = require('fs').promises;

let index = 0;
let path = 'D:/Downloads';
async function main() {
  let numbers = (await fs.readdir(path))
    .map((f: string) => f.substring(6).split('.')[0])
    .map((s: string) => parseInt(s))
    .sort((a: number, b: number) => a - b);
  for (let n of numbers) {
    await fs.rename(`${path}/frame-${n}.png`, `${path}/frame-${index}.png`);
    console.log(`${path}/frame-${n}.png`, `${path}/frame-${index}.png`);
    index++;
  }
}

main()
  .then(() => console.log('done'))
  .catch((e) => console.log('failed: ' + e));

export {};
