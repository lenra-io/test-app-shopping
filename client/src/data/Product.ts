import { User } from "./User.ts";

export class Product {
	id: string;
	creator: User;
	name: string;
	quantity?: string;
	ckecked: boolean;
	assignee: User|undefined;
	constructor(id: string, creator: User, name: string, quantity?: string, checked: boolean = false, assignee?: User) {
		this.id = id;
		this.creator = creator;
		this.name = name;
		this.quantity = quantity;
		this.ckecked = checked;
		this.assignee = assignee;
	}
}