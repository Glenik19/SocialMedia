import { createConnection } from '$lib/db/mysql';

// Load article and its comments by ID
export async function load({ params, locals }) {
    let connection = await createConnection();
    let [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [params.id]);
    let [comments] = await connection.execute('SELECT * FROM comments WHERE article_id = ?', [params.id]);

    return {
        articles: rows,      // Article data
        comments: comments,  // Related comments
        user: locals.user    // Logged-in user
    };
}

export const actions = {

    // Handle like action
    like: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id'); // Get article ID

		const connection = await createConnection();
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		// Return result
		if (result.affectedRows) {
			return { success: true };
		} else {
			return { error: 'Failed' };
		}
	},

    // Handle new comment submission
    comment: async ({ request }) => {
        const formData = await request.formData();
        const article_id = formData.get('article_id'); // Article ID
        const content = formData.get('content');       // Comment text
        const name = formData.get('name');             // User name

        const connection = await createConnection();
        const [result] = await connection.execute(
            'INSERT INTO comments (article_id, text, name) VALUES (?, ?, ?)',
            [article_id, content, name]
        );

        // Return result
        if (result.affectedRows) {
            return { success: true };
        } else {
            return { error: 'Failed' };
        }
    }
};
