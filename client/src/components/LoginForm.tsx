import { useState } from "react";


export function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => Promise<void> }) {
	const [error, setError] = useState<string | null>(null)
	return (
		<>
			{error &&
				<p className="error">{error}</p>
			}
			<form onSubmit={e => {
				e.preventDefault();
				const form = e.target as HTMLFormElement;
				const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
				const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
				const username = usernameInput.value.trim();
				const password = passwordInput.value.trim();
				onLogin(username, password)
					.then(() => {
						usernameInput.value = "";
						passwordInput.value = "";
						setError(null);
					})
					.catch(err => {
						setError(err.message);
					});
			}}>
				<label htmlFor="username">
					Username
					<input id="username" name="username" type="text" placeholder="Username" required={true} />
				</label>
				<label htmlFor="password">
					Password
					<input id="password" name="password" type="password" placeholder="Password" required={true} />
				</label>
				<button type="submit">Login</button>
			</form>
		</>
	);
}