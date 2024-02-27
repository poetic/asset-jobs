import { IoArrowBackSharp } from 'react-icons/io5';

import { JobListing } from '../../types';
import { getJobDetails } from '../../utils';

import styles from './styles.module.css';

interface JobDetailsProps {
  job: JobListing | undefined;
  setIsMobileJobSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobDetails({ job, setIsMobileJobSelected }: JobDetailsProps) {
  if (!job) {
    return null;
  }

  const [title, location, positionType, applyUrl, postingContent] = getJobDetails(job);

  const contentBody = document.createElement('div');
  contentBody.innerHTML = postingContent as string;

  return (
    <div className={styles.jobDetails}>
      <div className={styles.jobDetailsHeader}>
        <IoArrowBackSharp
          className={[styles.showMobile, styles.backArrow].join(' ')}
          onClick={() => setIsMobileJobSelected(false)}
        />
        <h1 onClick={() => setIsMobileJobSelected(false)}>{title}</h1>
        <h2>{location}</h2>
        <h3>{positionType}</h3>
        <a href={applyUrl}>
          <button>Apply</button>
        </a>
      </div>
      <div
        className={styles.jobDetailsContent}
        dangerouslySetInnerHTML={{ __html: postingContent as string }}
      ></div>
    </div>
  );
}
