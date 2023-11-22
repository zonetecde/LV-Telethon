import { Sequelize } from '@sequelize/core';
import ProjectTable from '../../../Models/Project';
import FileTable from '../../../Models/File';
import StudentTable from '../../../Models/Student';

const dbConnection = new Sequelize('sqlite:./database/database.db', { logging: false });

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

dbConnection.sync().then(() => {});

process.on('exit', () => {
	console.log('Closing database connection...');
	dbConnection.close();
});

export { dbConnection };
