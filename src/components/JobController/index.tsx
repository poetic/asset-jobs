import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import JobFilters from '../JobFilters';
import JobItem from '../JobItem';
import JobSearch from '../JobSearch';
import { JobsQuery } from '../../react-query';

import type { JobListing } from '../../types';
import PaginationControls from '../PaginationControls';

interface JobControllerProps {
  setModal: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function JobController({ setModal }: JobControllerProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: JobsQuery,
  });

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const cities = Array.from(new Set(jobs.map((job) => job.location.name)));

  const types = Array.from(
    new Set(
      jobs
        .map((job) => job.metadata.find((meta) => meta.name === 'Careers Page Job Type')?.value)
        .filter(Boolean) as string[],
    ),
  );

  const pageCount = Math.ceil(total / 20);

  const filteredJobs = jobs.filter((job) => {
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

  const paginatedJobs = filteredJobs.slice((currentPage - 1) * 20, currentPage * 20);

  return (
    <>
      <JobSearch {...{ setSearchTerm, searchTerm, isLoading }} />
      <JobFilters
        {...{ cities, types, selectedCities, selectedTypes, setSelectedCities, setSelectedTypes }}
      />
      <div className="job-results-wrapper">
        <div id="job-search-results" className="job-search-results">
          {paginatedJobs.map((item: JobListing) => (
            <JobItem key={item.id} {...{ item, setModal }} />
          ))}
        </div>
      </div>
      <PaginationControls {...{ currentPage, setCurrentPage, pageCount }} />
    </>
  );
}
