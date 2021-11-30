
class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: null,
      pageCount: null,
    }
  }

  resetPage() {
    const { startingPage, pageSize, data } = this.props;
    let pageCount = parseInt(data.length / pageSize);

    if (data.length % pageSize > 0) {
      pageCount++;
    }

    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    });
  }

  componentWillMount() {
    ReactModal.setAppElement('#career-opportunities')
    this.resetPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.resetPage();
    }

    if (this.props.loading !== prevProps.loading) {
      const jobResultsWrapper = document.getElementsByClassName('job-results-wrapper')[0];
      const paginationContainer = document.getElementById('pagination-container')
      const filterDropdowns = document.getElementById('wf-form-Career-Search-Form')

      jobResultsWrapper.style.opacity = 1;
      paginationContainer.style.opacity = 1;
      filterDropdowns.style.opacity = 1;
    }
  }

  setCurrentPage(num) {
    this.setState({ currentPage: num });
  }

  createControls() {
    const { pageCount, currentPage } = this.state;
    let controls = [];

    for (let i = 1; i <= pageCount; i++) {
      if (i === currentPage) {
        controls.push(
          <div
            style={{ cursor: 'pointer', backgroundColor: '#003e6b', color: 'white', borderRadius: '0.15em', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)', margin: '0.25em 0.25em', padding: '0.5em 0.75em' }}
            onClick={() => this.setCurrentPage(i)}
          >
            {i}
          </div>
        );
      } else {
        controls.push(
          <div
            style={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '0.15em', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)', margin: '0.25em 0.25em', padding: '0.5em 0.75em' }}
            onClick={() => this.setCurrentPage(i)}
          >
            {i}
          </div>
        );
      }
    }
    return controls;
  }

  createPaginatedData() {
    const { data, pageSize } = this.props;
    const { currentPage } = this.state;

    const upperLimit = currentPage * pageSize;
    const dataSlice = data.slice((upperLimit - pageSize), upperLimit);

    return dataSlice;
  }

  render() {
    const {
      cities,
      states,
      setSelectedState,
      setSelectedCities,
      setSelectedType,
      setSearchTerm,
      showCorporate,
      showProperty,
      searchTerm,
      selectedCities,
      loadingResults,
      loading,
    } = this.props;

    return (
      <React.Fragment>
        <div className="opportunities-hero-wrapper">
          <div className="div-block-186">
            <h3>{loading ? 'Loading Job Postings..' : 'Find your next career'}</h3>
            <div className="form-block w-form">
              <form id="wf-form-Career-Search-Form" name="wf-form-Career-Search-Form" className="form-2">
                <div className="div-block-224 search-input-wrapper">
                  <input
                    type="search"
                    className="text-field w-input search-input-field"
                    maxLength={256}
                    name="Career-Search"
                    placeholder="Search"
                    aria-label="Search"
                    id="Career-Search"
                    onChange={setSearchTerm}
                    value={searchTerm}
                  />
                  {
                    searchTerm && (
                      <button className={`reset-button ${loadingResults ? '' : 'reset-show'}`} onClick={setSearchTerm}>
                        {loadingResults && <i class="loader"></i>}
                      </button>
                    )
                  }
                </div>
                <select
                  id="state-select"
                  name="state-select"
                  className="select-field w-select"
                  onChange={setSelectedState}
                >
                  <option value="">All States</option>
                  {
                    states.map((state) => {
                      return <option value={state}>{state}</option>
                    })
                  }
                </select>
              </form>
            </div>
          </div>
          <div className="opportunities-media-wrapper">
            <div className="opportunities-media-overlay" />
          </div>
        </div>
        <div className="job-results-wrapper">
          <div className="job-filters-wrapper">
            <a href="#" className="div-block-217 w-inline-block" onClick={(e) => {
              var dropdownEl = document.getElementsByClassName("filter-dropdown-wrapper")[0];
              const display = dropdownEl.style.display;
              if (!display || display === 'none') {
                dropdownEl.style.display = 'block';
              } else {
                dropdownEl.style.display = 'none';
              }
            }}>
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
                    <label className="w-checkbox filter-checkbox-wrapper">
                    <div className={`w-checkbox-input w-checkbox-input--inputType-custom filter-checkbox ${showCorporate && showProperty ? 'w--redirected-checked' : ''}`} />
                      <input type="checkbox" id="checkbox" name="checkbox" checked={showCorporate && showProperty} onChange={setSelectedType} value="all" style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
                      <span className="filter-checkbox-label w-form-label">All</span>
                    </label>
                    <label className="w-checkbox filter-checkbox-wrapper">
                    <div className={`w-checkbox-input w-checkbox-input--inputType-custom filter-checkbox ${showCorporate && !showProperty ? 'w--redirected-checked' : ''}`} />
                      <input type="checkbox" id="corporate" checked={showCorporate && !showProperty} onChange={setSelectedType} value="corporate" name="corporate" style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
                      <span htmlFor="corporate" className="filter-checkbox-label w-form-label">Corporate</span>
                    </label>
                    <label className="w-checkbox filter-checkbox-wrapper">
                    <div className={`w-checkbox-input w-checkbox-input--inputType-custom filter-checkbox ${showProperty && !showCorporate ? 'w--redirected-checked' : ''}`} />
                      <input type="checkbox" id="property management" checked={showProperty && !showCorporate} onChange={setSelectedType} value="property" name="property-management" style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
                      <span htmlFor="property management" className="filter-checkbox-label w-form-label">Property</span>
                    </label>
                </div>
              </div>
              <div className="job-filter-section last-child">
                <div className="heading-6">Refine by location</div>
                <div className="filter-checkboxes w-form">
                  {
                    cities.map((city) => {
                      return (
                        <label key={city} className="w-checkbox filter-checkbox-wrapper">
                          <div className={`w-checkbox-input w-checkbox-input--inputType-custom filter-checkbox ${selectedCities.includes(city) ? 'w--redirected-checked' : ''}`} />
                          <input type="checkbox" id={city} name={city} checked={selectedCities.includes(city)} onChange={setSelectedCities} value={city} style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
                          <span htmlFor={city} className="filter-checkbox-label w-form-label">{city}</span>
                        </label>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div id="job-search-results" className="job-search-results">
            {React.cloneElement(this.props.children, { data: this.createPaginatedData() })}
          </div>
        </div>
        <div id="pagination-container" className="career-pagination-wrapper w-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {this.createControls()}
        </div>
      </React.Fragment>
    )
  }
}

class Item extends React.Component {
  truncate = (input) => input.length > 5 ? `${input.substring(0, 100)}...` : input;

  render() {
    const { data, loadingResults, openModal } = this.props;

    if (!data.length && !loadingResults) {
      return <div className="job-card-wrapper">No matching results..</div>;
    }

    return (
      <React.Fragment>
        {data.map((item) => {
          const description = item.Description.replace(/<[^>]+>/g, '').replace(/; &nbsp;|&nbsp;/gi, '');
          const city = item.City.toLowerCase().trim().replace(/\b\w/g, l => _.capitalize(l));
          const title = item.Title.toLowerCase().replace(/\b\w/g, l => _.capitalize(l));
          const applyUntilTime = moment(item.CloseDate).format("MMMM D, YYYY [at] H:mm [CST]"); 

          let communityText = '';
          const itemLocationPreComma = item.Location.split(', ')[0];
          const itemLocationPostComma = item.Location.split(', ')[1];
          
          if (itemLocationPreComma !== item.City && itemLocationPostComma !== item.State) {
            communityText = item.Location.trim().substring(7);
          }

          // Add apply section to LongDescription from asset API
          const JobModalHtml = document.createElement('div');
          JobModalHtml.innerHTML = item.LongDescription;

          const applySection = JobModalHtml.getElementsByClassName('apply')[0];
          const applyString = `
            <div class="apply-section-wrapper">
              <div class="apply-section-accepting">
                  <div class="apply-section-accepting-title">Accepting applications until</div>
                  <div>${applyUntilTime}</div>
              </div>
              <a href=${item.ApplyUrl} target="_blank" class="apply-section-apply">Apply</a>
            </div>`
          applySection.innerHTML = applyString;

          if (communityText) {
            const detailSection = JobModalHtml.getElementsByClassName('jobDetailPadding')[0];
            const detailItems = detailSection.getElementsByTagName("span")[0]
            const communityLeft = document.createElement("b");
            communityLeft.innerHTML = "Community:";
            detailItems.insertBefore(communityLeft, detailItems.firstChild);
            communityLeft.insertAdjacentText("afterend", ` ${communityText}`);
          }

          const wrapper = document.createElement("div");
          wrapper.appendChild(JobModalHtml);
          const JobModalHtmlComplete = wrapper.innerHTML;

          return (
            <div className="job-card-wrapper" key={item.Id}>
              <div className="job-card elevated-0">
                <div className="job-card-left-col">
                  <div className="job-card-position">{title}</div>
                  <div className="job-card-location">{communityText ? `${communityText}, ` : ''}{city}, {item.State}</div>
                </div>
                <div className="job-card-right-col">
                  <div className="job-card-preview-snippet">{this.truncate(description)}</div>
                  <div className="job-card-cta-wrapper">
                    <a href="#" className="job-card-cta w-inline-block" onClick={() => openModal(JobModalHtmlComplete)}>
                      <div className="job-card-cta-label">See Details</div>
                      <div className="icon-plus-wrapper">
                        <div className="plus-h-line" />
                        <div className="plus-v-line" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}

class App extends React.Component {
  allJobListings = [];
  state = {
    cities: [],
    states: [],
    loading: true,
    selectedState: null,
    selectedCities: [],
    showProperty: true,
    showCorporate: true,
    searchTerm: '',
    loadingResults: false,
    jobListings: [],
    modal: null,
  };

  fetchListings = () => {
    const baseUrl = 'https://setup.swbcpeosms.com/public/api/JobPosting/GetCareerPortalOpenRequisitions'

    return Promise.all([
      // Asset Residential
      axios.get(`${baseUrl}?id=ba2a034d-57c4-4b52-9ab0-c8247cd7e5ed`, {
      }).then(({ data }) => {
        const res = _.get(data, 'ResultList', []);
        return res.map((obj) => ({
          ...obj,
          Type: 'property',
        }
        ))
      }),
      // Asset Corporate
      axios.get(`${baseUrl}?id=6f8fcc16-7bdb-4a82-b28f-6fd8e3b0e2c7`, {
      }).then(({ data }) => {
        const res = _.get(data, 'ResultList', []);
        return res.map((obj) => ({
          ...obj,
          Type: 'corporate',
        }
        ))
      }),
      // ABRES Residential
      axios.get(`${baseUrl}?id=5f84122b-4544-412e-a81f-a4a2bd6da456`, {
      }).then(({ data }) => {
        const res = _.get(data, 'ResultList', []);
        return res.map((obj) => ({
          ...obj,
          Type: 'property',
        }
        ))
      }),
      // Shelton Residential
      axios.get(`${baseUrl}?id=dbd73b24-6a77-40d3-8660-18bc932a28c6`, {
      }).then(({ data }) => {
        const res = _.get(data, 'ResultList', []);
        return res.map((obj) => ({
          ...obj,
          Type: 'property',
        }
        ))
      }),
      // ABRES Corporate
      axios.get(`${baseUrl}?id=b361be71-34f2-478d-a14c-5df623c0086b`, {
      }).then(({ data }) => {
        const res = _.get(data, 'ResultList', []);
        return res.map((obj) => ({
          ...obj,
          Type: 'corporate',
        }
        ))
      }),
      // Shelton Corporate
      axios.get(`${baseUrl}?id=71085fbf-a0c2-42b0-9923-eff62b48d38e`, {
      }).then(({ data }) => {
        const res = _.get(data, 'ResultList', []);
        return res.map((obj) => ({
          ...obj,
          Type: 'corporate',
        }
        ))
      }),
      // Dallas West Residential
      axios.get(`${baseUrl}?id=febc91d1-934a-46fe-8395-2a4d3be6f086`, {
      }).then(({ data }) => {
        const res = _.get(data, 'ResultList', []);
        return res.map((obj) => ({
          ...obj,
          Type: 'property',
        }
        ))
      }),
    ])
  }

  async componentDidMount() {
    const data = await this.fetchListings();
    this.allJobListings = _.flatten(data);
    const states = _.sortBy(_.uniq(this.allJobListings.map(({ State }) => State)));
    const cities = _.sortBy(_.uniq(this.allJobListings.map(({ City }) => City.toLowerCase().trim().replace(/\b\w/g, l => _.capitalize(l)))));
    
    this.setState({
      loading: false,
      jobListings: this.allJobListings,
      states,
      cities,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { selectedState, selectedCities, showProperty, showCorporate, searchTerm } = this.state;
    if (selectedState !== prevState.selectedState || showProperty !== prevState.showProperty || showCorporate !== prevState.showCorporate || searchTerm !== prevState.searchTerm || selectedCities.length !== prevState.selectedCities.length) {
      const filteredByState = this.allJobListings.filter(({ State }) => {
        if (selectedState) {
          return State === selectedState
        }
        return true;
      });

      const filteredByCities = filteredByState.filter(({ City }) => {
        const cityNormalized = City.toLowerCase().trim().replace(/\b\w/g, l => _.capitalize(l));

        if (selectedCities.length) {
          return selectedCities.includes(cityNormalized)
        }

        return true;
      });

      const filteredbyType = filteredByCities.filter(({ Type }) => {
        if (showProperty && showCorporate) {
          return true;
        }
        if (!showProperty && showCorporate) {
          return Type === 'corporate';
        }
        if (showProperty && !showCorporate) {
          return Type === 'property';
        }

        return false;
      })

      const filteredBySearchterm = _.filter(filteredbyType, ({
        Title,
        City,
        State,
      }) => {
        const lowerCase = text => text.toLowerCase();
        const regexFunc = fieldValueSearch => new RegExp(searchTerm.trim().toLowerCase()).test(fieldValueSearch);

        return regexFunc(lowerCase(Title))
          || regexFunc(lowerCase(City))
          || regexFunc(lowerCase(State));
      });

      this.setState({
        jobListings: filteredBySearchterm
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({
        loadingResults: false,
      });
    }
  }

  setSelectedState = (event) => {
    const selectedState = event.target.value;

    if (selectedState) {
      const filteredCities = this.allJobListings.reduce((prevResult, jobListing) => {
        const { City, State } = jobListing;
        const cityNormalized = City.toLowerCase().trim().replace(/\b\w/g, l => _.capitalize(l));

        if (State === selectedState) {
          if (!prevResult.includes(cityNormalized)) {
            prevResult.push(cityNormalized);
          }
        }

        return prevResult;
      }, []);


      this.setState({
        selectedState,
        selectedCities: [],
        cities: _.sortBy(filteredCities),
      })
    } else {
      const cities = _.sortBy(_.uniq(this.allJobListings.map(({ City }) => City.toLowerCase().trim().replace(/\b\w/g, l => _.capitalize(l)))));
      this.setState({
        selectedState,
        selectedCities: [],
        cities,
      })
    }
  }

  setSelectedType = (event) => {
    const { value, checked } = event.target;

    if (value === 'all') {
      this.setState({
        showProperty: checked,
        showCorporate: checked,
      });
    }

    if (value === 'property') {
      this.setState({
        showProperty: true,
        showCorporate: !checked,
      });
    }

    if (value === 'corporate') {
      this.setState({
        showCorporate: true,
        showProperty: !checked,
      });
    }
  }

  setSelectedCities = (event) => {
    const { value, checked } = event.target;

    const { selectedCities } = this.state;
    const newSelectedCities = _.cloneDeep(selectedCities);

    if (checked && !newSelectedCities.includes(value)) {
      newSelectedCities.push(value);
    }

    if (!checked && newSelectedCities.includes(value)) {
      const indexOfItem = newSelectedCities.indexOf(value);
      newSelectedCities.splice(indexOfItem, 1);
    }

    this.setState({
      selectedCities: newSelectedCities,
    });
  }

  setSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value,
      loadingResults: true
    });
  }

  openModal = (content) => {
    this.setState({
      modal: content,
    })
  }

  closeModal = () => {
    this.setState({
      modal: null,
    })
  }

  render() {
    const {
      loading,
      jobListings,
      states,
      cities,
      selectedState,
      selectedCities,
      showCorporate,
      showProperty,
      searchTerm,
      loadingResults,
      modal,
    } = this.state;

    return (
      <React.Fragment>
        <ReactModal
          style={{
            overlay: {
              zIndex: 99999
            }
          }}
          isOpen={Boolean(modal)}
          onRequestClose={this.closeModal}
          contentLabel="Job Modal"
        >
          <div className="modal-wrapper">
            <button className="modal-close-button" onClick={this.closeModal}>Close</button>
            <div className="modal-content" dangerouslySetInnerHTML={{ __html: modal }}></div>
          </div>
        </ReactModal>
        <Pagination
          data={jobListings}
          states={states}
          cities={cities}
          pageSize={20}
          startingPage={1}
          selectedCities={selectedCities}
          setSelectedCities={this.setSelectedCities}
          selectedState={selectedState}
          setSelectedState={this.setSelectedState}
          setSelectedType={this.setSelectedType}
          setSearchTerm={this.setSearchTerm}
          showProperty={showProperty}
          showCorporate={showCorporate}
          searchTerm={searchTerm}
          loadingResults={loadingResults}
          loading={loading}
        >
          <Item
            loadingResults={loadingResults}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        </Pagination>
      </React.Fragment>
    );
  }
}
  ReactDOM.render(
    <App />,
    document.getElementById('career-opportunities')
  );