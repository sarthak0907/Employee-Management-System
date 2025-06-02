const fs = require("fs");

function readJSON(file) {
 try {
 const data = fs.readFileSync(file);
 return JSON.parse(data);
 } catch {
 return [];
 }
}

function writeJSON(file, data) {
 fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };