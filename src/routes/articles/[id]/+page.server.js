import { createConnection } from '$lib/db/mysql';

export async function load({params, locals }) {
    let connection = await createConnection();
    let [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [params.id]);
    let [comments] = await connection.execute('SELECT * FROM comments WHERE article_id = ?', [params.id]);

    

    return {
        articles: rows,
        comments: comments,
        user: locals.user
    };
}

export const actions = {

    like: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		if (result.affectedRows) {
			return { success: true };
		} else {
			return { error: 'Failed' };
		}
	},

    comment: async ({ request }) => {
        const formData = await request.formData();
        const article_id = formData.get('article_id');
        const content = formData.get('content');
        const name = formData.get('name');

        const connection = await createConnection();
        const [result] = await connection.execute(
            'INSERT INTO comments (article_id, text, name) VALUES (?, ?, ?)',
            [article_id, content, name]
        );

        if (result.affectedRows) {
            return { success: true };
        } else {
            return { error: 'Failed' };
        }
    }
};