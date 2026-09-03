const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const sqlite = 'C:\\msys64\\ucrt64\\bin\\sqlite3.exe';
const databasePath = path.join(__dirname, 'tracker.db');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
execFileSync(sqlite, [databasePath], { input: schema, encoding: 'utf8' });

function quote(value) {
	if (value === null || value === undefined) return 'NULL';
	if (typeof value === 'number') return String(value);
	return `'${String(value).replaceAll("'", "''")}'`;
}

function prepare(sql) {
	return {
		run(...values) {
			const statement = sql.replaceAll('?', () => quote(values.shift()));
			execFileSync(sqlite, [databasePath, statement], { encoding: 'utf8' });
		},
		all(...values) {
			const statement = sql.replaceAll('?', () => quote(values.shift()));
			const output = execFileSync(sqlite, ['-json', databasePath, statement], {
				encoding: 'utf8'
			}).trim();
			return output ? JSON.parse(output) : [];
		}
	};
}

module.exports = { prepare };



/*
took AI HELP TO DIGNOSE AND FIX 
Diagnosed the crash in problemService.js.
Found better-sqlite3 was causing a Windows native crash.
Replaced it in index.js with the available SQLite CLI adapter.
Verified the service now inserts and retrieves problems successfully.
Noted that running the script repeatedly creates duplicate Two Sum records.
No changes were made to the frontend or API routes.
*/