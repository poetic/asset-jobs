/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import _ from 'lodash';

interface ItemProps {
  data?: any[]; // Replace 'any' with the actual type of the 'data' property
  loadingResults: boolean;
  openModal: (html: string) => void; // Replace '(html: string) => void' with the actual type of the 'openModal' function
  closeModal: () => void; // Replace '() => void' with the actual type of the 'closeModal' function
}
class Item extends React.Component<ItemProps> {
  truncate = (input: string) => (input.length > 5 ? `${input.substring(0, 100)}...` : input);

  render() {
    const { data, loadingResults, openModal } = this.props;

    return (
      <React.Fragment>
        {data?.map(
          (item: {
            city: string;
            content: string | undefined;
            location: { name: string };
            title: string;
            absolute_url: string;
            Id: React.Key | null | undefined;
          }) => {
            const content = _.unescape(item.content);
            const index = content.indexOf('</strong>');
            const index2 = content.indexOf('</strong>', index + 1); // Find paragraph after second bolded heading
            const start = content.indexOf('<p>', index2 + 1);
            const end = content.indexOf('</p>', start);
            // Might be better to use regex
            const description = content
              .slice(start, end)
              .replace(/<[^>]+>/g, '')
              .replace(/; &nbsp;|&nbsp;/gi, '');
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

            return (
              <div className="job-card-wrapper" key={item.Id}>
                <div className="job-card elevated-0">
                  <div className="job-card-left-col">
                    <div className="job-card-position">{item.title}</div>
                    <div className="job-card-location">{item.city}</div>
                  </div>
                  <div className="job-card-right-col">
                    <div className="job-card-preview-snippet">{this.truncate(description)}</div>
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
          },
        )}
      </React.Fragment>
    );
  }
}

export default Item;
