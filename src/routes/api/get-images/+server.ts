import ProjectTable from '../../../Models/ProjectTable.js';
import Resource from '../../../Models/Resource.js';
import ResourceTable from '../../../Models/ResourceTable.js';
import { dbConnection, initDb } from '../database/db.js';
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function GET(request) {
	initDb();

	const projects = await ProjectTable.findAll();
	const imagesPathPromises: any = projects.map(async (project) => {
		const resources = (
			await ResourceTable.findAll({
				where: {
					projectId: project.id
				}
			})
		).map((res) => {
			return new Resource(res.Path, res.isMain, res.Type as any);
		});

		return {
			projectId: project.id,
			imagePaths: resources
		};
	});

	let imagesPath = await Promise.all(imagesPathPromises);

	// Ajoute les autres projets qui ne sont pas dans la DB
	const dir = './static/uploaded/';
	const files = fs.readdirSync(dir);

	for (const file of files) {
		if (file.includes('_') && file.includes('.jpg')) {
			imagesPath = [
				...imagesPath,
				{
					projectId: -1,
					imagePaths: [new Resource('/uploaded/' + file, true, 'image')]
				}
			];
		}
	}

	return new Response(JSON.stringify(imagesPath));
}
