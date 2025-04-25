import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	// Handle login action
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email'); // Get email
		const password = formData.get('password'); // Get password

		const token = await login(email, password); // Try to login

		if (token) {
			// Set session cookie if login succeeds
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7,
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			});
			redirect(302, '/admin'); // Redirect to admin
		} else {
			// Return error if login fails
			return {
				success: false,
				message: 'Login failed'
			};
		}
	}
};
