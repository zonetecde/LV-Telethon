import { Sequelize } from '@sequelize/core';
import ProjectTable from '../../../Models/ProjectTable.js';
import ResourceTable from '../../../Models/ResourceTable.js';
import StudentTable from '../../../Models/StudentTable.js';

const dbConnection = new Sequelize('sqlite:./database/database.db');

process.on('exit', () => {
	console.log('Closing database connection...');
	dbConnection.close();
});

export { dbConnection };
