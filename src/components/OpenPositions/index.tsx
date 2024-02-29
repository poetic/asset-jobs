import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { JobDetails, JobFilters, JobList, PaginationControls } from '..';
import { JobsQuery } from '../../react-query';

import { JobListing } from '../../types';

import styles from './styles.module.css';

export default function OpenPositions() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: JobsQuery,
  });

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentJob, setCurrentJob] = useState<JobListing | undefined>(undefined);
  const [resultsPerPage, setResultsPerPage] = useState<number>(5);
  const [isMobileJobSelected, setIsMobileJobSelected] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.jobs.length) {
      setCurrentJob(data.jobs[0]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: {String(error)}</div>;
  }

  const {
    jobs,
    meta: { total },
  } = data;

  if (!isLoading && (!jobs.length || !total)) {
    return <div>No jobs found</div>;
  }

  // sort alphabetically by location name then by state
  const cities = Array.from(new Set(jobs.map((job) => job.location.name)))
    .sort((a, b) => a.localeCompare(b))
    .sort((a, b) => {
      const stateA = a.split(', ')[1];
      const stateB = b.split(', ')[1];
      return stateA.localeCompare(stateB);
    });

  const types = Array.from(
    new Set(
      jobs
        .map((job) => job.metadata.find((meta) => meta.name === 'Careers Page Job Type')?.value)
        .filter(Boolean) as string[],
    ),
  );

  const filteredJobs = filterJobs(jobs, selectedCities, selectedTypes, searchTerm);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage,
  );

  const pageCount = Math.ceil(filteredJobs.length / resultsPerPage);

  const resultsHeightMultiplier =
    paginatedJobs.length < resultsPerPage
      ? paginatedJobs.length < 5
        ? 5
        : paginatedJobs.length
      : resultsPerPage;

  // Event handlers
  // filter handlers
  const handleFilterReset = () => {
    setSearchTerm('');
    setSelectedCities([]);
    setSelectedTypes([]);
    setCurrentPage(1);
    setCurrentJob(jobs[0]);
  };
  const handleSetSelectedCities = (value: unknown) => {
    if (selectedCities.includes(String(value))) {
      const newCities = selectedCities.filter((city) => city !== value);
      const newFilteredJobs = filterJobs(jobs, newCities, selectedTypes, searchTerm);
      setSelectedCities(newCities);
      setCurrentPage(1);
      setCurrentJob(newFilteredJobs[0]);
      setIsMobileJobSelected(false);
    } else {
      const newCities = [String(value)];
      const newFilteredJobs = filterJobs(jobs, newCities, selectedTypes, searchTerm);
      setSelectedCities(newCities);
      setCurrentPage(1);
      setCurrentJob(newFilteredJobs[0]);
      setIsMobileJobSelected(false);
    }
  };
  const handlerCitiesClear = () => {
    const newFilteredJobs = filterJobs(jobs, [], selectedTypes, searchTerm);
    setSelectedCities([]);
    setCurrentPage(1);
    setCurrentJob(newFilteredJobs[0]);
    setIsMobileJobSelected(false);
  };
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    const newFilteredJobs = filterJobs(jobs, selectedCities, selectedTypes, newSearchTerm);
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
    setCurrentJob(newFilteredJobs[0]);
    setIsMobileJobSelected(false);
  };
  const handleSearchReset = () => {
    const newFilteredJobs = filterJobs(jobs, selectedCities, selectedTypes, '');
    setSearchTerm('');
    setCurrentPage(1);
    setCurrentJob(newFilteredJobs[0]);
    setIsMobileJobSelected(false);
  };
  const handleSetSelectedTypes = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const value = e.target.value;
    if (selectedTypes.includes(String(value))) {
      const newTypes = selectedTypes.filter((type) => type !== value);
      const newFilteredJobs = filterJobs(jobs, selectedCities, newTypes, searchTerm);
      setSelectedTypes(newTypes);
      setCurrentPage(1);
      setCurrentJob(newFilteredJobs[0]);
      setIsMobileJobSelected(false);
    } else {
      const newTypes = [String(value)];
      const newFilteredJobs = filterJobs(jobs, selectedCities, newTypes, searchTerm);
      setSelectedTypes(newTypes);
      setCurrentPage(1);
      setCurrentJob(newFilteredJobs[0]);
      setIsMobileJobSelected(false);
    }
  };
  const handleTypesClear = () => {
    const newFilteredJobs = filterJobs(jobs, selectedCities, [], searchTerm);
    setSelectedTypes([]);
    setCurrentPage(1);
    setCurrentJob(newFilteredJobs[0]);
    setIsMobileJobSelected(false);
  };
  // pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    setCurrentJob(filteredJobs[(currentPage - 2) * resultsPerPage]);
    setIsMobileJobSelected(false);
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
    setCurrentJob(filteredJobs[currentPage * resultsPerPage]);
    setIsMobileJobSelected(false);
  };
  const handleSetPerPage = (value: unknown) => {
    if (Number(value) === resultsPerPage) return;
    setResultsPerPage(Number(value));
    setCurrentPage(1);
    setCurrentJob(filteredJobs[0]);
    setIsMobileJobSelected(false);
  };

  return (
    <div className={styles.appWrapper}>
      <JobFilters
        {...{
          cities,
          types,
          selectedCities,
          selectedTypes,
          searchTerm,
          handleFilterReset,
          handleSetSelectedCities,
          handlerCitiesClear,
          handleSearchTermChange,
          handleSearchReset,
          handleSetSelectedTypes,
          handleTypesClear,
        }}
      />
      <PaginationControls
        {...{
          pageCount,
          currentPage,
          resultsPerPage,
          handlePreviousPage,
          handleNextPage,
          handleSetPerPage,
        }}
      />
      <div className={styles.overflowMask}>
        <div
          className={[isMobileJobSelected ? styles.mobileSelectedJob : '', styles.jobList].join(
            ' ',
          )}
          style={{
            height: `calc(${8.75 * resultsHeightMultiplier}em + ${2 * resultsHeightMultiplier - 2}px)`,
          }}
        >
          <JobList
            {...{ setCurrentJob, currentJob, jobs: paginatedJobs, setIsMobileJobSelected }}
          />
          <JobDetails {...{ job: currentJob, setIsMobileJobSelected }} />
        </div>
      </div>
    </div>
  );
}

// Helper functions
function filterJobs(
  jobs: JobListing[],
  selectedCities: string[],
  selectedTypes: string[],
  searchTerm: string,
) {
  return jobs.filter((job) => {
    const cityMatch = selectedCities.length ? selectedCities.includes(job.location.name) : true;
    const typeMatch = selectedTypes.length
      ? selectedTypes.includes(
          job.metadata.find((meta) => meta.name === 'Careers Page Job Type')?.value as string,
        )
      : true;
    const searchTermMatch = searchTerm
      ? job.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return cityMatch && typeMatch && searchTermMatch;
  });
}
