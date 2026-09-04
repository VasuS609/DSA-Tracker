//I have taken ai help to understand and write these logics and code though i know what i am doing :)

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

function getGoalProgress(date){
    const stmt = db.prepare(`
        SELECT rating, COUNT(*) as count
        FROM problem
        WHERE date = ?
        GROUP BY rating
        `);

    const counts = stmt.all(date);

    // const solved1100 = counts.find(item => item.rating == 1100) ? counts[rating == 1100] : 0;
    // const solved1000 = counts.find(item => item.rating == 1000) ? counts[rating == 1000] : 0;
    
    const match1100 = counts.find(item => item.rating == 1100);
    const solved1100 = match1100 ? match1100.count : 0;

    const match1000 = counts.find(item => item.rating == 1000);
    const solved1000 = match1000 ? match1000.count : 0;

    let goalMet = false;
    if(solved1000 >= 1 && solved1100 >= 2) goalMet = true;
    
    return goalMet;
}

module.exports = {
    addProblem
    ,getProblemsByDate
    ,getGoalProgress
};