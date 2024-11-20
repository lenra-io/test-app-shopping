import { useContext } from "react";
import { UserContext, UserListContext } from "../App.tsx";
import { displayUser, User } from "../data/User.ts";
import { Modal } from "./Modal.tsx";

export function UserSelectionModal({ open, onUserSelected, onClose }: { open: boolean, onUserSelected: (user: User) => void, onClose: () => void }) {
	const currentUser = useContext(UserContext);

	const userList = useContext(UserListContext);
	if (!userList) {
		if (!open) return null;
		throw new Error("No user list context");
	}
	return (
		<Modal open={open} onClose={onClose}>
			<h2>Select User</h2>
			<ul>
				{
					userList.map(user => (
						<li key={user.id}>
							{displayUser(user, currentUser!)}
							<button onClick={() => onUserSelected(user)}>Select</button>
						</li>
					))
				}
			</ul>
			<footer>
				<button onClick={onClose}>Close</button>
			</footer>
		</Modal>
	);
}