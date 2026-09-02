const database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new database(path.join(__dirname, 'tracker.db'));

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

module.exports = db;