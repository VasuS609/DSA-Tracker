
const db = require('../db');

function addProblem({date, name, url, rating, source, tags}) {  
    const stmt = db.prepare(`
        INSERT INTO problem (date, name, url, rating, source, tags)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(date, name, url, rating, source, tags);
}


function getProblemsByDate(date){
    const stmt = db.prepare('SELECT * FROM problem WHERE date = ?');
    return stmt.all(date);
}

module.exports = {
    addProblem
    ,getProblemsByDate
};