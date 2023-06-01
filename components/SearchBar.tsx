'use client';
import { Autocomplete } from '@react-google-maps/api';
import React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CoordinatesType } from 'types/types';

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
    top: '40%',
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
    <div className="">
      <div style={modalStyle}>
        <button
          className="absolute top-0 right-0 p-2 hover:bg-gray-200 rounded-full focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>
      <div style={backdropStyle} onClick={onClose} />
    </div>
  );
};

interface SearchBarProps {
  setCoordinates: React.Dispatch<
    React.SetStateAction<CoordinatesType | undefined>
  >;
}

const SearchBar = ({ setCoordinates }: SearchBarProps) => {
  const { handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<CoordinatesType>();
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(
    null,
  );

  const onSubmit = () => {
    setCoordinates(selectedCoords);
    setIsModalOpen(false);
  };

  const openModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const { lat, lng } = place.geometry.location;
        console.log(lat(), lng());
        setSelectedCoords({ lat: lat(), lng: lng() });
      }
    }
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div className="relative w-96 p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          Search Parking
        </div>
        <div className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </div>
      </button>
      <Modal isOpen={isModalOpen} onClose={(event) => closeModal(event)}>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-64">
            <label htmlFor="address">Where are you going?</label>
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
                autocomplete.setFields(['geometry']);
              }}
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                type="text"
                className="w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Address, postal code..."
              />
            </Autocomplete>
            <button
              type="submit"
              className="text-white w-full mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Find Parking
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SearchBar;
