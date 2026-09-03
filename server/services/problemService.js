
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

addProblem({
    date: '2026-09-03',
    name: 'Two Sum',
    url: 'https://leetcode.com/problems/two-sum/',
    rating: 1000,
    source: 'leetcode',
    tags: 'array,hashmap'
});


console.log(getProblemsByDate('2026-09-03'));

module.exports = {
    addProblem
    ,getProblemsByDate
};