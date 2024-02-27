import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5';

import { Dropdown } from '../';

import styles from './styles.module.css';

interface PaginationControlsProps {
  pageCount: number;
  currentPage: number;
  resultsPerPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleSetPerPage: (value: unknown) => void;
}

export default function PaginationControls({
  pageCount,
  currentPage,
  resultsPerPage,
  handlePreviousPage,
  handleNextPage,
  handleSetPerPage,
}: PaginationControlsProps) {
  const resultsPerPageOptions = [5, 10, 20].map((value) => ({
    value,
    label: value.toString(),
  }));

  return (
    <div className={styles.paginationControls}>
      <div className={styles.controlWrapper}>
        Results per page{' '}
        <Dropdown
          options={resultsPerPageOptions}
          selected={resultsPerPage}
          setSelected={handleSetPerPage}
          classNames={[styles.resultsPerPage]}
          defaultText={resultsPerPage.toString()}
        />
      </div>
      <div className={styles.controlWrapper}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || pageCount === 0}
          style={{
            cursor: currentPage === 1 || pageCount === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <IoArrowBackSharp />
        </button>
        <span>{pageCount === 0 ? 'Page 0 of 0' : `Page ${currentPage} of ${pageCount}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageCount || pageCount === 0}
          style={{
            cursor: currentPage === pageCount || pageCount === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <IoArrowForwardSharp />
        </button>
      </div>
    </div>
  );
}
