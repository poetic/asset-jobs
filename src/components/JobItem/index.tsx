import _ from 'lodash';

import type { JobListing } from '../../types';

interface JobItemProps {
  item: JobListing;
  setModal: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function JobItem({ item, setModal }: JobItemProps) {
  const content = _.unescape(item.content);
  const JobModalHtml = document.createElement('div');
  JobModalHtml.innerHTML = item.content ?? '';
  const applySection = document.createElement('div');
  const JobModalHeader = document.createElement('div');
  JobModalHeader.innerHTML = `
        <h2>${item.title}</h2>
        <div class="location">Location: ${item.location.name}</div>
        <br>
        `;
  const applyUrl = item.absolute_url + '#app';
  const applyString = `
        <div class="apply-section-wrapper">
          <div class="apply-section-accepting">
              <div class="apply-section-accepting-title">Accepting applications until</div>
              <div>** Apply Until Time **--</div>
          </div>
          <a href=${applyUrl} target="_blank" class="apply-section-apply">Apply</a>
        </div>`;
  applySection.innerHTML = applyString;

  const wrapper = document.createElement('div');
  wrapper.appendChild(JobModalHeader);
  wrapper.appendChild(JobModalHtml);
  wrapper.appendChild(applySection);
  const JobModalHtmlComplete = wrapper.innerHTML;

  const openModal = (html: string) => {
    setModal(html);
  };

  // create start and end index of the entirety first <p> tag after the second <strong> tag
  const start = content.indexOf(
    '<p>',
    content.indexOf('</strong>', content.indexOf('</strong>') + 1),
  );
  const end = content.indexOf('</p>', start);

  return (
    <div className="job-card-wrapper" key={item.id}>
      <div className="job-card elevated-0">
        <div className="job-card-left-col">
          <div className="job-card-position">{item.title}</div>
          <div className="job-card-location">{item.location.name}</div>
        </div>
        <div className="job-card-right-col">
          <div className="job-card-preview-snippet">
            {formatForDescription(content, start, end)}
          </div>
          <div className="job-card-cta-wrapper">
            <a
              href="#"
              className="job-card-cta w-inline-block"
              onClick={() => openModal(JobModalHtmlComplete)}
            >
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
  );
}

function formatForDescription(input: string, start: number, end: number) {
  const formattedInput = _.unescape(input)
    .slice(start, end)
    .replace(/<[^>]*>/gm, '')
    .replace(/&nbsp;/g, ' ');

  const truncatedInput =
    formattedInput.length > 5 ? `${formattedInput.substring(0, 100)}...` : formattedInput;

  return truncatedInput;
}
