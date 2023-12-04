import Project from '../../../Models/Project.js';
import ProjectTable from '../../../Models/ProjectTable.js';
import Resource from '../../../Models/Resource.js';
import ResourceTable from '../../../Models/ResourceTable.js';
import Student from '../../../Models/Student.js';
import StudentTable from '../../../Models/StudentTable.js';
import { dbConnection, initDb } from '../database/db.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: { url: URL }) {
	const projectId = url.searchParams.get('projectId') ?? 0;

	if (projectId === '-1') {
		// n'est pas dans la DB
		return new Project('Espoir pour le Téléthon', '', [], []);
	}

	const project = await ProjectTable.findByPk(projectId);

	if (!project) {
		return new Response(JSON.stringify('Projet introuvable.'), { status: 404 });
	}

	const resources = (
		await ResourceTable.findAll({
			where: {
				projectId: project.id
			}
		})
	).map((res) => {
		return new Resource(res.Path, res.isMain, res.Type as any);
	});

	let students: Student[] = [];

	if (project.hideStudentsNames === false) {
		students = (
			await StudentTable.findAll({
				where: {
					projectId: project.id
				}
			})
		).map((res) => {
			return new Student(res.prenom, res.nom, res.classe);
		});
	}

	const answer = new Project(project.projectName, project.projectDescription, students, resources);

	return new Response(JSON.stringify(answer));
}
