import * as fs from 'fs';
import type Resource from '../../../Models/Resource.js';
import type Student from '../../../Models/Student.js';
import ProjectTable from '../../../Models/ProjectTable.js';
import ResourceTable from '../../../Models/ResourceTable.js';
import StudentTable from '../../../Models/StudentTable.js';
import { dbConnection, initDb } from '../database/db.js';
import ffmpeg from 'ffmpeg';

/** @type {import('./$types').RequestHandler} */
export async function POST(request) {
	try {
		initDb();

		const formData = await request.request.formData();

		// Ajoute le projet à la base de données
		const projectName = formData.get('projectName');
		const projectDescription = formData.get('projectDescription') ?? '';

		if (!projectName) {
			return new Response(JSON.stringify('Nom de projet ou description manquante.'), {
				status: 400
			});
		}

		const hideOurNames = JSON.parse(formData.getAll('hideOurNames').toString());

		const projectId = (
			await ProjectTable.create({
				projectName: projectName.toString(),
				projectDescription: projectDescription.toString(),
				hideStudentsNames: hideOurNames
			})
		).getDataValue('id');

		// Ajoute les ressources à la base de données et les télécharge

		// Contient les fichiers envoyés par l'utilisateur
		const resources = formData.getAll('resources');

		// Contient les données des fichiers envoyés par l'utilisateur
		// (type, nom de fichier, isMain, etc.)
		const resourcesData: Resource[] = formData
			.getAll('resourcesData')
			.map((f) => JSON.parse(f.toString()));

		if (!resources || !resourcesData) {
			return new Response(JSON.stringify('Pas de ressources.'), { status: 400 });
		}

		await Promise.all(
			resources.map(async (file) => {
				if (file instanceof File) {
					// Nom de fichier unique
					const fileName = `${Date.now()}` + file.name.match(/\.[0-9a-z]+$/i)![0];

					const path = `./static/uploaded/${fileName}`;

					// Téléchargement du fichier
					file
						.arrayBuffer()
						.then((buffer) => {
							fs.appendFile(path, Buffer.from(buffer), function (err: any) {
								console.log('File saved: ' + path);

								if (err) {
									console.log(err);
									return new Response(JSON.stringify(err), { status: 400 });
								} else {
								}
							});
						})
						.then(async () => {
							// Si c'est une vidéo, enregiste le thumbnail à la première seconde de la vid
							if (file.type.startsWith('video')) {
								try {
									await new Promise((resolve) => setTimeout(resolve, 2500));

									await new Promise((resolve, reject): any => {
										var process = new ffmpeg(path);

										process.then(
											function (video) {
												video.addCommand('-ss', '00:00:02');
												video.addCommand('-vframes', '1');
												video.save(`${path}.jpg`, function (error, file) {
													if (!error) {
														console.log('Thumbail sauvegardé: ' + file);
														resolve(0);
													} else {
														console.log(error);
														reject(error);
													}
												});
											},
											function (err) {
												console.log('Error: ' + err);
												reject(err);
											}
										);
									});
								} catch (e: any) {
									console.log(e);
									console.log(e.code);
									console.log(e.msg);
									console.log(path);
									console.log(await fs.existsSync(path));
									console.log(await fs.existsSync(path));
								}
							}
						});

					await new Promise((resolve) => setTimeout(resolve, 2500));

					// Ajout du fichier à la base de données
					const fileData = resourcesData.find((f) => f.nomFichier === file.name);
					if (fileData) {
						await ResourceTable.create({
							nomFichier: fileData.nomFichier,
							Path: path.replaceAll('static/', ''),
							Type: fileData.Type,
							isMain: fileData.IsMainRessource,
							projectId: projectId
						});
					}
				}
			})
		);

		// Ajout des élèves à la base de données
		const students = JSON.parse(formData.getAll('students').toString()) as Student[];

		if (!students) return new Response(JSON.stringify("Pas d'élèves."), { status: 400 });

		await Promise.all(
			students.map(async (student) => {
				if (student) {
					await StudentTable.create({
						prenom: student.prenom,
						classe: student.classe,
						nom: student.nom,
						projectId: projectId
					});
				}
			})
		);
	} catch (err: any) {
		return new Response(JSON.stringify(err.message), { status: 400 });
	}

	return new Response(JSON.stringify('Success'));
}
