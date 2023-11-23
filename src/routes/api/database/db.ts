import { Sequelize } from '@sequelize/core';
import ProjectTable from '../../../Models/ProjectTable.js';
import ResourceTable from '../../../Models/ResourceTable.js';
import StudentTable from '../../../Models/StudentTable.js';

const dbConnection = new Sequelize('sqlite:./database/database.db');

if (!ProjectTable.isInitialized()) {
	console.log('Initializing project table...');
	dbConnection.addModels([ProjectTable]);
}
if (!ResourceTable.isInitialized()) {
	console.log('Initializing resource table...');
	dbConnection.addModels([ResourceTable]);
}
if (!StudentTable.isInitialized()) {
	console.log('Initializing student table...');
	dbConnection.addModels([StudentTable]);
}

dbConnection.sync().then(() => {
	console.log('Initialized');
});

process.on('exit', () => {
	console.log('Closing database connection...');
	dbConnection.close();
});

export { dbConnection };
