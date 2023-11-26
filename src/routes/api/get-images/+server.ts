import ProjectTable from '../../../Models/ProjectTable.js';
import Resource from '../../../Models/Resource.js';
import ResourceTable from '../../../Models/ResourceTable.js';
import { dbConnection, initDb } from '../database/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET(request) {
	initDb();

	const projects = await ProjectTable.findAll();
	const imagesPathPromises = projects.map(async (project) => {
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

	const imagesPath = await Promise.all(imagesPathPromises);

	return new Response(JSON.stringify(imagesPath));
}
