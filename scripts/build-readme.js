const fs = require('fs');
const os = require('os');
const readline = require('readline');

const templates = {};

for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '-t') {
    const [name, path] = process.argv[++i].split(':');
    templates[name] = fs.readFileSync(path, 'utf-8');
  }
}

const rl = readline.createInterface({input: process.stdin});

rl.on('line', (line) => {
  console.log(line.replace(/<% ([a-zA-Z0-9-_]+) %>/g, (_, group) => templates[group]));
});
