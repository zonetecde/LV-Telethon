import { Sequelize } from '@sequelize/core';
import ProjectTable from '../../../Models/ProjectTable.js';
import FileTable from '../../../Models/FileTable.js';
import StudentTable from '../../../Models/StudentTable.js';

const dbConnection = new Sequelize('sqlite:./database/database.db', { logging: true });

if (!ProjectTable.isInitialized()) {
	console.log('Initializing project table...');
	dbConnection.addModels([ProjectTable]);
}
if (!FileTable.isInitialized()) {
	console.log('Initializing file table...');
	dbConnection.addModels([FileTable]);
}
if (!StudentTable.isInitialized()) {
	console.log('Initializing student table...');
	dbConnection.addModels([StudentTable]);
}

dbConnection.sync({ alter: true }).then(() => {
	console.log('Initialized');
});

process.on('exit', () => {
	console.log('Closing database connection...');
	dbConnection.close();
});

export { dbConnection };
