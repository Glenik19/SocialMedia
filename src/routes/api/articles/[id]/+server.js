import { createConnection } from '$lib/db/mysql';
import {BASIC_AUTH_USER, BASIC_AUTH_PASSWORD} from '$env/static/private';


export async function GET({ params }) {
    const connection = await createConnection();
    const { id } = params;

    const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [id]);
    await connection.end();

    if (rows.length === 0) {
        return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(rows[0]), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

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
        if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
            return new Response(JSON.stringify({ message:'Access denied'}), {
                status: 401,
                headers: { 'www-authenticate': 'Basic realm="Secure Area"' }
            });
        }
        return null;
    }


export async function PUT({ params, request }) {

    const authResponse = await auth(request);
	if (authResponse) return authResponse;


    const connection = await createConnection();
    const { id } = params;
    const data = await request.json();

    // Ensure at least one field is provided
    const allowedFields = ['image', 'description', 'author','votes'];
    const updates = [];
    const values = [];

    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            updates.push(`${field} = ?`);
            values.push(data[field]);
        }
    }

    if (updates.length === 0) {
        return new Response(JSON.stringify({ error: "No data to update" }), { status: 400 });
    }

    values.push(id); // Add UUID to the values array for WHERE condition

    const query = `UPDATE articles  SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await connection.execute(query, values);

    await connection.end();

    if (result.affectedRows === 0) {
        return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Article updated successfully" }), { status: 200 });
}

export async function DELETE({ params, request }) {

    const authResponse = await auth(request);
	if (authResponse) return authResponse;


    const connection = await createConnection();
    const { id } = params;

    await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
    await connection.end();

    return new Response(null, { status: 204 });
}