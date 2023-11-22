import { dbConnection } from '../database/db';

/** @type {import('./$types').RequestHandler} */
export async function GET(request) {
	const url = new URL(request.url);

	return new Response(JSON.stringify({}));
}
