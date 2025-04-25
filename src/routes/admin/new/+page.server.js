import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { put } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";

// Only allow admin access
export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}
}

export const actions = {
	createArticle: async ({ request }) => {
		const formData = await request.formData();
		const uploadedImage = formData.get("uploadedImage");

		// Upload image to Vercel Blob
		const { url } = await put(
			'SocialMedia/' + uploadedImage.name,
			uploadedImage,
			{ access: "public", token: BLOB_READ_WRITE_TOKEN }
		);

		const connection = await createConnection();

		// Insert new article into DB
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[
				url,
				formData.get('description'),
				formData.get('author'),
			]
		);

		// Redirect if successful
		if (result.affectedRows) {
			redirect(303, '/admin');
		}
	},
};
