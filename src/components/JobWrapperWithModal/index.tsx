import ReactModal from 'react-modal';
import _ from 'lodash';
import { useState } from 'react';

import JobController from '../JobController';

export default function JobWrapperWithModal() {
  const [modal, setModal] = useState<string | undefined>(undefined);

  const closeModal = () => {
    setModal(undefined);
  };

  return (
    <>
      <ReactModal
        style={{
          overlay: {
            zIndex: 99999,
          },
        }}
        isOpen={Boolean(modal)}
        onRequestClose={closeModal}
        contentLabel="Job Modal"
      >
        <div className="modal-wrapper">
          <button className="modal-close-button" onClick={closeModal}>
            Close
          </button>
          <div
            className="modal-content"
            dangerouslySetInnerHTML={{ __html: _.unescape(modal) }}
          ></div>
        </div>
      </ReactModal>

      <JobController {...{ setModal }} />
    </>
  );
}
