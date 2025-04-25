import { createConnection } from '$lib/db/mysql';
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from '$env/static/private';

// GET: Fetch a single article by ID
export async function GET({ params }) {
    const connection = await createConnection();
    const { id } = params;

    const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [id]);
    await connection.end();

    // Return 404 if not found
    if (rows.length === 0) {
        return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }

    // Return article
    return new Response(JSON.stringify(rows[0]), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

// Basic auth check
async function auth(request) {
    const auth = request.headers.get('authorization');

	if (!auth || auth !== `Basic ${btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`)}`) {
        return new Response(null, {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }
        });
    }

    const base64Credentials = auth.split(' ')[1];
    const credentials = atob(base64Credentials);    
    const [username, password] = credentials.split(':');

    // Invalid credentials
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }
        });
    }

    return null;
}

// PUT: Update article by ID
export async function PUT({ params, request }) {
    const authResponse = await auth(request);
	if (authResponse) return authResponse;

    const connection = await createConnection();
    const { id } = params;
    const data = await request.json();

    const allowedFields = ['image', 'description', 'author', 'votes'];
    const updates = [];
    const values = [];

    // Collect fields to update
    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            updates.push(`${field} = ?`);
            values.push(data[field]);
        }
    }

    // No data to update
    if (updates.length === 0) {
        return new Response(JSON.stringify({ error: "No data to update" }), { status: 400 });
    }

    values.push(id); // Add ID for WHERE clause
    const query = `UPDATE articles SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await connection.execute(query, values);

    await connection.end();

    // If article not found
    if (result.affectedRows === 0) {
        return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }

    // Update successful
    return new Response(JSON.stringify({ message: "Article updated successfully" }), { status: 200 });
}

// DELETE: Remove article by ID
export async function DELETE({ params, request }) {
    const authResponse = await auth(request);
	if (authResponse) return authResponse;

    const connection = await createConnection();
    const { id } = params;

    await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
    await connection.end();

    // No content response
    return new Response(null, { status: 204 });
}
