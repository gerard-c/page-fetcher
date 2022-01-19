const fs = require('fs');
const request = require('request');
const args = process.argv.slice(2);

// expects first argument to be a URL, GETs info from said URL
request(args[0], (error, response, body) => {
  // writes HTML content (body) of webpage at given URL to the given path
  fs.writeFile(args[1], body, err => {
    if (err) {
      console.error(err);
      return;
    }
    // character count = file size in bytes for text files
    let charCount = 0;
    // loops through characters in body to calculate filesize in bytes
    for (const character of body) {
      ++charCount;
    }
    console.log(`Downloaded and saved ${charCount} bytes to ${args[1]}`);
  });
});

