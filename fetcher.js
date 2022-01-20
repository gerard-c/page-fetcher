const fs = require('fs');
const readline = require('readline');
const request = require('request');

const args = process.argv.slice(2);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// most of the logic in a separate function in order to interact with fs.access check/confirmation neatly
const readAndWrite = () => {
  // expects first argument to be a URL, GETs info from said URL
  request(args[0], (error, response, body) => {
    // writes HTML content (body) of webpage at given URL to the given path
    fs.writeFile(args[1], body, () => {
      // character count = file size in bytes for text files
      let charCount = 0;
      // loops through characters in body to calculate filesize in bytes
      for (const character of body) {
        // count/bytes +1 every loop
        ++charCount;
      }
      console.log(`Downloaded and saved ${charCount} bytes to ${args[1]}`);
    });
  });
};

const confirm = () => {
  // in its own function to repeat itself on invalid entries
  rl.question(`${args[1]} already exists. Would you like to replace it? (y/n)  `, (answer => {
    if (answer === 'y') {
      readAndWrite();
      rl.close();
      return;
    } else if (answer === 'n') {
      rl.close();
      return;
    }
    console.error('Invalid response. Please try again.');
    confirm();
  }));
};

// checks to see if it can access anything at the given domain
fs.access(args[1], fs.F_OK, (err) => {
  if (err) {
    // if no, continues as normal
    readAndWrite();
    return;
  }
  // if yes, seeks confirmation from user
  confirm();
});



