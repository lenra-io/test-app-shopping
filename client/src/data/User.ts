export class User {
	id: string;
	name?: string;
	constructor(id: string, name?: string) {
		this.id = id;
		this.name = name;
	}

	displayName() {
		return this.name || `User ${this.id}`;
	}
}

export function displayUser(user: User, currentUser: User) {
	return user === currentUser ? "you" : user.displayName();
}