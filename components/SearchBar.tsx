'use client';
import React, { ReactNode, useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
};
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 9999,
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
  };

  const backdropStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 9998,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <>
      <div style={modalStyle}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
      <div style={backdropStyle} onClick={onClose} />
    </>
  );
};

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log('open');
    setIsModalOpen(true);
  };
  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log('close');
    setIsModalOpen(false);
  };

  return (
    <div className="absolute top-2.5 left-2.5 z-20 ">
      <button className="relative w-full h-full" onClick={openModal}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-30">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div className="relative w-96 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          Search Parking
        </div>
        <div className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </div>
      </button>
      <Modal isOpen={isModalOpen} onClose={(event) => closeModal(event)}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </div>
  );
};

export default SearchBar;
