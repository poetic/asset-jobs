/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-deprecated */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import ReactModal from 'react-modal';

interface PaginationProps {
  startingPage: number;
  pageSize: number;
  data: any[];
  cities: string[];
  types: string[];
  setSelectedCities: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTypes: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  selectedCities: string[];
  selectedTypes: string[];
  loadingResults: boolean;
  loading: boolean;
  children: React.ReactElement | React.ReactElement[];
}

interface PaginationState {
  currentPage: number;
  pageCount: number;
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);

    this.state = {
      currentPage: 1,
      pageCount: 1,
    };
  }

  resetPage() {
    const { startingPage, pageSize, data } = this.props;
    let pageCount = parseInt((data.length / pageSize).toString());

    if (data.length % pageSize > 0) {
      pageCount++;
    }

    this.setState({
      currentPage: startingPage,
      pageCount: pageCount,
    });
  }

  componentWillMount() {
    ReactModal.setAppElement('#root');
    this.resetPage();
  }

  componentDidUpdate(prevProps: { data: any; loading: any }) {
    if (this.props.data !== prevProps.data) {
      this.resetPage();
    }

    if (this.props.loading !== prevProps.loading) {
      const jobResultsWrapper = document.getElementsByClassName(
        'job-results-wrapper',
      )[0] as HTMLElement;
      const paginationContainer = document.getElementById('pagination-container') as HTMLElement;
      const filterDropdowns = document.getElementById('wf-form-Career-Search-Form') as HTMLElement;

      jobResultsWrapper.style.opacity = '1';
      paginationContainer.style.opacity = '1';
      filterDropdowns.style.opacity = '1';
    }
  }

  setCurrentPage(num: number) {
    this.setState({ currentPage: num });
  }

  createControls() {
    const { pageCount, currentPage } = this.state;
    const controls = [];

    controls.push(
      <React.Fragment>
        <div
          style={{
            cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
            backgroundColor: currentPage > 1 ? 'white' : 'lightgrey',
            color: currentPage > 1 ? '#003e6b' : 'grey',
            fontWeight: 'bold',
            borderRadius: '0.15em',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: '0.25em 0.25em',
            padding: '0.5em 0.75em',
          }}
          onClick={currentPage > 1 ? () => this.setCurrentPage(1) : () => {}}
        >
          {'<<'}
        </div>

        <div
          style={{
            cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
            backgroundColor: currentPage > 1 ? 'white' : 'lightgrey',
            color: currentPage > 1 ? '#003e6b' : 'grey',
            fontWeight: 'bold',
            borderRadius: '0.15em',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: '0.25em 0.25em',
            padding: '0.5em 0.75em',
          }}
          onClick={currentPage > 1 ? () => this.setCurrentPage(currentPage - 1) : () => {}}
        >
          {'<'}
        </div>
      </React.Fragment>,
    );

    for (let i = currentPage - 2; i <= pageCount && i <= currentPage + 2; i++) {
      if (i < 1) continue;

      if (i === currentPage) {
        controls.push(
          <div
            style={{
              cursor: 'pointer',
              backgroundColor: '#003e6b',
              color: 'white',
              borderRadius: '0.15em',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              margin: '0.25em 0.25em',
              padding: '0.5em 0.75em',
            }}
            onClick={() => this.setCurrentPage(i)}
          >
            {i}
          </div>,
        );
      } else {
        controls.push(
          <div
            style={{
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '0.15em',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              margin: '0.25em 0.25em',
              padding: '0.5em 0.75em',
            }}
            onClick={() => this.setCurrentPage(i)}
          >
            {i}
          </div>,
        );
      }
    }

    controls.push(
      <React.Fragment>
        <div
          style={{
            cursor: currentPage < pageCount ? 'pointer' : 'not-allowed',
            backgroundColor: currentPage < pageCount ? 'white' : 'lightgrey',
            color: currentPage < pageCount ? '#003e6b' : 'grey',
            fontWeight: 'bold',
            borderRadius: '0.15em',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: '0.25em 0.25em',
            padding: '0.5em 0.75em',
          }}
          onClick={currentPage < pageCount ? () => this.setCurrentPage(currentPage + 1) : () => {}}
        >
          {'>'}
        </div>

        <div
          style={{
            cursor: currentPage < pageCount ? 'pointer' : 'not-allowed',
            backgroundColor: currentPage < pageCount ? 'white' : 'lightgrey',
            color: currentPage < pageCount ? '#003e6b' : 'grey',
            fontWeight: 'bold',
            borderRadius: '0.15em',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: '0.25em 0.25em',
            padding: '0.5em 0.75em',
          }}
          onClick={currentPage < pageCount ? () => this.setCurrentPage(pageCount) : () => {}}
        >
          {'>>'}
        </div>
      </React.Fragment>,
    );
    return controls;
  }

  createPaginatedData() {
    const { data, pageSize } = this.props;
    const { currentPage } = this.state;

    const upperLimit = currentPage * pageSize;
    const dataSlice = data.slice(upperLimit - pageSize, upperLimit);

    return dataSlice;
  }

  render() {
    const {
      cities,
      types,
      setSelectedCities,
      setSelectedTypes,
      setSearchTerm,
      searchTerm,
      selectedCities,
      selectedTypes,
      loadingResults,
      loading,
    } = this.props;

    return (
      <React.Fragment>
        <div className="opportunities-hero-wrapper">
          <div className="div-block-186">
            <h3>{loading ? 'Loading Job Postings..' : 'Find your next career'}</h3>
            <div className="form-block w-form">
              <form
                id="wf-form-Career-Search-Form"
                name="wf-form-Career-Search-Form"
                className="form-2"
              >
                <div className="div-block-224 search-input-wrapper">
                  <input
                    type="search"
                    className="text-field w-input search-input-field"
                    maxLength={256}
                    name="Career-Search"
                    placeholder="Search"
                    aria-label="Search"
                    id="Career-Search"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event)}
                    value={searchTerm}
                  />
                  <button
                    className={`reset-button ${loadingResults ? '' : 'reset-show'}`}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      setSearchTerm({
                        target: { value: '' },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                  >
                    {loadingResults && <i className="loader"></i>}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opportunities-media-wrapper">
            <div className="opportunities-media-overlay" />
          </div>
        </div>
        <div className="job-results-wrapper">
          <div className="job-filters-wrapper">
            <a
              href="#"
              className="div-block-217 w-inline-block"
              onClick={(e) => {
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
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setSelectedTypes(event)
                          }
                          value={type}
                          style={{
                            opacity: 0,
                            position: 'absolute',
                            zIndex: -1,
                          }}
                        />
                        <span className="filter-checkbox-label w-form-label">{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
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
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setSelectedCities(event)
                          }
                          value={city}
                          style={{
                            opacity: 0,
                            position: 'absolute',
                            zIndex: -1,
                          }}
                        />
                        <span className="filter-checkbox-label w-form-label">{city}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div id="job-search-results" className="job-search-results">
            {React.cloneElement(
              this.props.children as React.ReactElement<
                any,
                string | React.JSXElementConstructor<any>
              >,
              {
                data: this.createPaginatedData(),
              },
            )}
          </div>
        </div>
        <div
          id="pagination-container"
          className="career-pagination-wrapper w-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {this.createControls()}
        </div>
      </React.Fragment>
    );
  }
}

export default Pagination;
