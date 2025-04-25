import { createConnection } from '$lib/db/mysql';
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from '$env/static/private';

// GET: Returns all articles as JSON
export async function GET() {
	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles');
	await connection.end();

	return new Response(JSON.stringify(rows), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
}

// Auth function for basic authentication
async function auth(request) {
	const auth = request.headers.get('authorization');

	// Check for missing or invalid auth header
	if (!auth || auth !== `Basic ${btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`)}`) {
		return new Response(null, {
			status: 401,
			headers: { 'www-authenticate': 'Basic realm="Secure Area"' }
		});
	}

	// Validate credentials
	const base64Credentials = auth.split(' ')[1];
	const credentials = atob(base64Credentials);
	const [username, password] = credentials.split(':');

	if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
		return new Response(JSON.stringify({ message: 'Access denied' }), {
			status: 401,
			headers: { 'www-authenticate': 'Basic realm="Secure Area"' }
		});
	}
	return null;
}

// POST: Add new article (with auth check)
export async function POST({ request }) {
	const authResponse = await auth(request);
	if (authResponse) return authResponse;

	let connection = await createConnection();
	const data = await request.json();

	// Validate required fields
	if (!data.image || !data.description || !data.author) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
	}

	await connection.execute(
		'INSERT INTO articles (image, description, author, votes) VALUES (?,?,?,?)',
		[data.image, data.description, data.author, data.votes]
	);

	await connection.end();

	// Return created article data
	return new Response(JSON.stringify(data), {
		status: 201,
		headers: { 'content-type': 'application/json' }
	});
}
