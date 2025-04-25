import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load articles only if user is admin
export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login'); // Redirect non-admin users
	}

	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles');

	return {
		articles: rows
	};
}

// Delete article by ID
export const actions = {
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		const [result] = await connection.execute('DELETE FROM articles WHERE id = ?', [id]);
	}
};
