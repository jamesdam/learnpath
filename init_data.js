fs = require('fs');

fs.readFile('tags.txt', function (err, data) {
  if (err) throw err;
  console.log(data);
});