import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
	ignoreRefs?: React.RefObject<HTMLElement>[];
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
	ignoreRefs = [],
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && rootRef.current?.contains(target)) {
				return;
			}

			const clickedOnIgnoredElement = ignoreRefs.some((ref) =>
				ref.current?.contains(target as Node)
			);

			if (clickedOnIgnoredElement) {
				return;
			}

			if (isOpen) {
				onClose?.();
				onChange(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen, rootRef, ignoreRefs]);
};
