/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import ReactModal from 'react-modal';
import _ from 'lodash';
import axios from 'axios';

import Item from './Item';
import Pagination from './Pagination';

type JobsState = {
  cities: string[];
  types: string[];
  loading: boolean;
  selectedCities: string[];
  selectedTypes: string[];
  searchTerm: string;
  loadingResults: boolean;
  jobListings: JobListing[];
  modal: string | undefined;
};

type JobListing = {
  location: { name: string };
  metadata: { name: string; value: string }[];
  id: string;
  title: string;
  absolute_url: string;
  content: string;
};

class Jobs extends React.Component<object, JobsState> {
  allJobListings = [] as JobListing[];
  state = {
    cities: [] as string[],
    types: [] as string[],
    loading: true as boolean,
    selectedCities: [] as string[],
    selectedTypes: [] as string[],
    searchTerm: '' as string,
    loadingResults: false as boolean,
    jobListings: [] as JobListing[],
    modal: undefined as string | undefined,
  };

  fetchListings = () => {
    const baseUrl = 'https://boards-api.greenhouse.io/v1/boards/assetliving/jobs?content=true';
    return axios.get(`${baseUrl}`);
  };

  async componentDidMount() {
    const data = await this.fetchListings();
    this.allJobListings = data.data.jobs as JobListing[];
    const cities = _.sortBy(
      _.uniq(this.allJobListings.map(({ location }) => location.name.trim())),
    );

    const types = _.sortBy(
      _.uniq(
        this.allJobListings.map(
          ({ metadata }) => metadata.find(({ name }) => name === 'Careers Page Job Type')?.value,
        ),
      ),
    ).filter((type) => type !== undefined) as string[];

    this.setState({
      loading: false,
      jobListings: this.allJobListings,
      // states,
      cities,
      types,
    });
  }

  async componentDidUpdate(prevProps: object, prevState: JobsState) {
    const { selectedCities, selectedTypes, searchTerm } = this.state;
    if (
      searchTerm !== prevState.searchTerm ||
      selectedTypes.length !== prevState.selectedTypes.length ||
      selectedCities.length !== prevState.selectedCities.length
    ) {
      const filteredByCities = this.allJobListings.filter(({ location }) => {
        const cityNormalized = location.name.trim();

        if (selectedCities.length) {
          return selectedCities.includes(cityNormalized);
        }

        return true;
      });

      const filteredbyType = filteredByCities.filter(({ metadata }) => {
        const typeNormalized = metadata.find(({ name }) => name === 'Careers Page Job Type')?.value;

        if (selectedTypes.length) {
          return selectedTypes.includes(typeNormalized as string);
        }

        return true;
      });

      const filteredBySearchterm = _.filter(filteredbyType, ({ location, title }) => {
        const lowerCase = (text: string) => text.toLowerCase();
        const regexFunc = (fieldValueSearch: string) =>
          new RegExp(searchTerm.trim().toLowerCase()).test(fieldValueSearch);

        return regexFunc(lowerCase(title)) || regexFunc(lowerCase(location.name));
      });

      this.setState({
        jobListings: filteredBySearchterm,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.setState({
        loadingResults: false,
      });
    }
  }

  setSelectedTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const { selectedTypes } = this.state;
    const newSelectedTypes = _.cloneDeep(selectedTypes);

    if (checked && !newSelectedTypes.includes(value)) {
      newSelectedTypes.push(value);
    }

    if (!checked && newSelectedTypes.includes(value)) {
      const indexOfItem = newSelectedTypes.indexOf(value);
      newSelectedTypes.splice(indexOfItem, 1);
    }

    this.setState({
      selectedTypes: newSelectedTypes,
    });
  };

  setSelectedCities = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  setSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
      loadingResults: true,
    });
  };

  openModal = (content: string) => {
    this.setState({
      modal: content,
    });
  };

  closeModal = () => {
    this.setState({
      modal: undefined,
    });
  };

  render() {
    const {
      loading,
      jobListings,
      cities,
      types,
      selectedCities,
      selectedTypes,
      searchTerm,
      loadingResults,
      modal,
    } = this.state;

    return (
      <React.Fragment>
        <ReactModal
          style={{
            overlay: {
              zIndex: 99999,
            },
          }}
          isOpen={Boolean(modal)}
          onRequestClose={this.closeModal}
          contentLabel="Job Modal"
        >
          <div className="modal-wrapper">
            <button className="modal-close-button" onClick={this.closeModal}>
              Close
            </button>
            <div
              className="modal-content"
              dangerouslySetInnerHTML={{ __html: _.unescape(modal) }}
            ></div>
          </div>
        </ReactModal>
        <Pagination
          data={jobListings}
          cities={cities}
          types={types}
          pageSize={20}
          startingPage={1}
          selectedCities={selectedCities}
          setSelectedCities={this.setSelectedCities}
          selectedTypes={selectedTypes}
          setSelectedTypes={this.setSelectedTypes}
          setSearchTerm={this.setSearchTerm}
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

export default Jobs;
