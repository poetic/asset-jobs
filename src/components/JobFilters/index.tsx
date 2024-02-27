import { IoMdClose } from 'react-icons/io';

import { Dropdown } from '../';

import styles from './styles.module.css';

interface JobFiltersProps {
  cities: string[];
  types: string[];
  searchTerm: string;
  selectedCities: string[];
  selectedTypes: string[];
  handleSetSelectedCities: (value: unknown) => void;
  handlerCitiesClear: () => void;
  handleFilterReset: () => void;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchReset: () => void;
  handleSetSelectedTypes: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  handleTypesClear: () => void;
}

export default function JobFilters({
  cities,
  types,
  searchTerm,
  selectedCities,
  selectedTypes,
  handleSetSelectedCities,
  handlerCitiesClear,
  handleFilterReset,
  handleSearchTermChange,
  handleSearchReset,
  handleSetSelectedTypes,
  handleTypesClear,
}: JobFiltersProps) {
  const isFilterActive = Boolean(
    selectedCities.length || selectedTypes.length || searchTerm.length,
  );

  const selectOptions = cities.map((city) => ({ value: city, label: city }));

  return (
    <div className={styles.jobFilters}>
      <button
        className={[styles.clearFilter, isFilterActive ? styles.visible : null].join(' ')}
        onClick={handleFilterReset}
        disabled={!isFilterActive}
      >
        <IoMdClose />
        Active Filter
      </button>

      <div className={[styles.rowCenter, styles.row].join(' ')}>
        <div className={styles.typeFilter}>
          <button
            className={!selectedTypes.length ? styles.active : undefined}
            onClick={handleTypesClear}
          >
            View All
          </button>
          {types.map((type) => (
            <button
              className={selectedTypes.includes(type) ? styles.active : undefined}
              key={type}
              value={type}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleSetSelectedTypes(e as unknown as React.ChangeEvent<HTMLButtonElement>)
              }
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={[styles.mobileFlexColumn, styles.row].join(' ')}>
        <div className={styles.inputWrapper}>
          <div className={[styles.row, styles.column].join(' ')}>
            <div className={[styles.mobileHide, styles.row].join(' ')}>
              <label>Search Filter</label>
              <button onClick={handleSearchReset} value={''}>
                Clear
              </button>
            </div>
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <div className={[styles.row, styles.column].join(' ')}>
            <div className={[styles.mobileHide, styles.row].join(' ')}>
              <label>Location</label>
              <button onClick={handlerCitiesClear}>Clear</button>
            </div>
            <Dropdown
              options={selectOptions}
              selected={selectedCities}
              setSelected={handleSetSelectedCities}
              classNames={[styles.dropdown]}
              defaultText="Select a location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
