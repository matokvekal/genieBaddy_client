import { useState, useCallback, useMemo } from 'react';
import { BaseModal } from 'components';

const useModal = (Modal, props) => {
	const [isOpen, setOpen] = useState(false);
	const [modalProps, setModalProps] = useState(null);

	const openModal = useCallback(
		(openModalProps) => {
			if (openModalProps) {
				setModalProps(openModalProps);
			}
			return setOpen(true);
		},
		[setOpen]
	);

	const closeModal = useCallback(() => setOpen(false), [setOpen]);

	const modal = useMemo(
		() => (
			<BaseModal isOpen={isOpen} onClose={closeModal}>
				<Modal {...modalProps} {...props} closeModal={closeModal} />
			</BaseModal>
		),
		[isOpen, closeModal, modalProps]
	);

	return {
		openModal,
		closeModal,
		modal,
		isOpen,
	};
};

export default useModal;
