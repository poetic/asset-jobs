import { formatForDescription } from '../../utils';

import { JobListing } from '../../types';

import styles from './styles.module.css';

interface JobListProps {
  jobs: JobListing[];
  currentJob: JobListing | undefined;
  setCurrentJob: React.Dispatch<React.SetStateAction<JobListing | undefined>>;
  setIsMobileJobSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobList({
  jobs,
  currentJob,
  setCurrentJob,
  setIsMobileJobSelected,
}: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className={styles.noResults}>
        <h2>No jobs found</h2>
        <p>Try to broaden your search or remove some filters</p>
      </div>
    );
  }

  return (
    <div className={styles.jobList}>
      {jobs.map((job) => (
        <div
          className={[styles.jobItem, currentJob?.id === job.id ? styles.selected : null].join(' ')}
          key={job.id}
          onClick={() => {
            setCurrentJob(job);
            setIsMobileJobSelected(true);
          }}
        >
          <h3>{job.title}</h3>
          <h4>{job.location.name}</h4>
          <p>{formatForDescription(job.content)}</p>
        </div>
      ))}
    </div>
  );
}
