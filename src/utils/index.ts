import _ from 'lodash';

import { JobListing } from '../types';

export function getJobDetails(job: JobListing) {
  const title = job.title;
  const location = job.location.name;
  const positionType = job.metadata.find((meta) => meta.name === 'Careers Page Job Type')?.value;
  const applyUrl = job.absolute_url + '#app';
  const postingContent = _.unescape(job.content);

  return [title, location, positionType, applyUrl, postingContent];
}

export function formatForDescription(input: string) {
  const unescapedInput = _.unescape(input);
  const start = unescapedInput.indexOf(
    '<p>',
    unescapedInput.indexOf('</strong>', unescapedInput.indexOf('</strong>') + 1),
  );
  const end = unescapedInput.indexOf('</p>', start);

  const formattedInput = unescapedInput
    .slice(start, end)
    .replace(/<[^>]*>/gm, '')
    .replace(/&nbsp;/g, ' ');

  return formattedInput;
}
