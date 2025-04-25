import { createConnection } from '$lib/db/mysql';

// Load function to fetch top 25 articles ordered by votes
export async function load({ locals }) {
	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles ORDER BY Votes DESC LIMIT 25');
	
	return {
		articles: rows, // Pass articles to the page
		user: locals.user // Pass user data to the page
	};
}

export const actions = {
	// Action to handle "like" button
    like: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id'); // Get article ID from form

		const connection = await createConnection();
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		// Return success or error based on update result
		if (result.affectedRows) {
			return { success: true };
		} else {
			return { error: 'Failed' };
		}
	}
};
