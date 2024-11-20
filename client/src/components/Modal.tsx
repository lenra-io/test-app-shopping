import { ReactNode, useEffect, useRef } from "react";

export function Modal({ children, open, onClose }: { children: ReactNode, open: boolean, onClose: () => void }) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (open) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [open]);
	return (
		<dialog
			ref={ref}
			onCancel={onClose}
			onClose={onClose}
		>
			{children}
		</dialog>
	);
}