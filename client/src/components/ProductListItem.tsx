import { useContext } from "react";
import { UserContext } from "../App.tsx";
import { Product } from "../data/Product.ts";
import { displayUser } from "../data/User.ts";

type OnCheckChange = (checked: boolean) => Promise<void>;

export function ProductListItem({ product, onCheckChange, onSelectAssignee }: { product: Product, onCheckChange: OnCheckChange, onSelectAssignee: (product: Product) => void }) {
	const currentUser = useContext(UserContext);
	if (!currentUser)
		throw new Error("No user context");
	return (
		<li>
			<input type="checkbox" checked={product.ckecked} onChange={e => {
				product.ckecked = e.target.checked;
				onCheckChange(product.ckecked);
			}} />
			{product.name}
			{product.quantity &&
				<span className="quantity">{product.quantity}</span>
			}
			<span className="creator">
				{displayUser(product.creator, currentUser)}
			</span>
			<button
				className="assign"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					onSelectAssignee(product);
				}}
			>
				{
					product.assignee ?
						displayUser(product.assignee, currentUser) :
						"Unassigned"
				}
			</button>
		</li>
	);
}