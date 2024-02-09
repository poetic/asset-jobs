interface JobFiltersProps {
  cities: string[];
  types: string[];
  selectedCities: string[];
  selectedTypes: string[];
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function JobFilters({
  cities,
  types,
  selectedCities,
  selectedTypes,
  setSelectedCities,
  setSelectedTypes,
}: JobFiltersProps) {
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const newSelectedCities = checked
      ? [...selectedCities, value]
      : selectedCities.filter((city) => city !== value);

    setSelectedCities(newSelectedCities);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const newSelectedTypes = checked
      ? [...selectedTypes, value]
      : selectedTypes.filter((type) => type !== value);

    setSelectedTypes(newSelectedTypes);
  };

  // const handleFilterReset = () => {
  //   setSelectedCities([]);
  //   setSelectedTypes([]);
  // };

  return (
    <div className="job-filters-wrapper">
      <a
        href="#"
        className="div-block-217 w-inline-block"
        onClick={() => {
          const dropdownEl = document.getElementsByClassName(
            'filter-dropdown-wrapper',
          )[0] as HTMLElement;
          const display = dropdownEl.style.display;
          if (!display || display === 'none') {
            dropdownEl.style.display = 'block';
          } else {
            dropdownEl.style.display = 'none';
          }
        }}
      >
        <div className="text-block-21">Filters</div>
        <div className="div-block-218">
          <div className="chevron">
            <div className="chevron-line top" />
            <div className="chevron-line bottom" />
          </div>
        </div>
      </a>

      <div className="filter-dropdown-wrapper">
        {types && types.length === 0 && (
          <div className="job-filter-section">
            <div className="heading-6">Refine by job type</div>
            <div className="filter-checkboxes w-form">
              {types.map((type) => {
                return (
                  <label key={type} className="w-checkbox filter-checkbox-wrapper">
                    <div
                      className={`w-checkbox-input w-checkbox-input--inputType-custom filter-checkbox ${
                        selectedTypes.includes(type) ? 'w--redirected-checked' : ''
                      }`}
                    />
                    <input
                      type="checkbox"
                      id={type}
                      name={type}
                      checked={selectedTypes.includes(type)}
                      onChange={handleTypeChange}
                      value={type}
                    />
                    <span className="filter-checkbox-label w-form-label">{type}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="job-filter-section last-child">
          <div className="heading-6">Refine by location</div>
          <div className="filter-checkboxes w-form">
            {cities.map((city) => {
              return (
                <label key={city} className="w-checkbox filter-checkbox-wrapper">
                  <div
                    className={`w-checkbox-input w-checkbox-input--inputType-custom filter-checkbox ${
                      selectedCities.includes(city) ? 'w--redirected-checked' : ''
                    }`}
                  />
                  <input
                    type="checkbox"
                    id={city}
                    name={city}
                    checked={selectedCities.includes(city)}
                    onChange={handleCityChange}
                    value={city}
                  />
                  <span className="filter-checkbox-label w-form-label">{city}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
