import { SystemData } from './types';
import moment from 'moment';
// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

export const save = (data: SystemData) => {
  console.log(JSON.stringify(data, null, 2));
  download(JSON.stringify(data, null, 2), `${moment().format('YYYY-MM-DD_h:mm:ss')}.json`, 'text/plain');
};

// function readSingleFile(e) {
//   var file = e.target.files[0];
//   if (!file) {
//     return;
//   }
//   var reader = new FileReader();
//   reader.onload = function (e) {
//     var contents = e.target.result;
//     console.log('===========================');
//     console.log(contents);
//     console.log('===========================');
//   };
//   reader.readAsText(file);
// }

export const load = () => {
  // readSingleFile();
};
