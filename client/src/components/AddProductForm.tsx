import { useState } from "react";

type OnSave = (product: string, quantity?: string) => Promise<void>;

export function AddProductForm({ onSave }: { onSave: OnSave }) {
	const [error, setError] = useState<string | null>(null)
	return (
		<>
			{error &&
				<p className="error">{error}</p>
			}
			<form onSubmit={e => {
				e.preventDefault();
				const form = e.target as HTMLFormElement;
				const productInput = form.elements.namedItem("product") as HTMLInputElement;
				const quantityInput = form.elements.namedItem("quantity") as HTMLInputElement;
				const product = productInput.value.trim();
				let quantity: string | undefined = quantityInput.value.trim();
				if (quantity === "") {
					quantity = undefined;
				}
				// TODO: check product not empty
				onSave(product, quantity)
					.then(() => {
						productInput.value = "";
						quantityInput.value = "";
						setError(null);
					})
					.catch(err => {
						setError(err.message);
					});
			}}>
				<label htmlFor="product">
					Product name
					<input id="product" name="product" type="text" placeholder="New product" required={true} />
				</label>
				<label htmlFor="quantity">
					Quantity
					<input id="quantity" name="quantity" type="text" placeholder="1" />
				</label>
				<button type="submit">Add</button>
			</form>
		</>
	);
}