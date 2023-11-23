import { dbConnection } from '../database/db.js';
import { extname } from 'path';
import { createWriteStream } from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function POST(request) {
	const url = new URL(request.url);
	const formData = await request.request.formData();

	const files = formData.getAll('resources');

	if (files) {
		await Promise.all(
			files.map(async (file) => {
				if (file instanceof File) {
					// Générez un nom de fichier unique en ajoutant un horodatage à l'original
					const fileName = `${Date.now()}_${file.name}`;

					// Créez un flux d'écriture pour enregistrer le fichier dans le dossier souhaité
					const writeStream = createWriteStream(`database/files/${fileName}`);

					// Pipez le contenu du fichier vers le flux d'écriture
					await file.stream().pipe(writeStream);
				}
			})
		);
	}

	return new Response(JSON.stringify({}));
}
