interface PaginationControlsProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationControls({
  pageCount,
  currentPage,
  setCurrentPage,
}: PaginationControlsProps) {
  const pageControls = [];
  for (let i = currentPage - 2; i <= pageCount && i <= currentPage + 2; i++) {
    if (i < 1) continue;

    if (i === currentPage) {
      pageControls.push(
        <div
          style={{
            cursor: 'pointer',
            backgroundColor: '#003e6b',
            color: 'white',
            borderRadius: '0.15em',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: '0.25em 0.25em',
            padding: '0.5em 0.75em',
          }}
          onClick={() => setCurrentPage(i)}
          key={i}
        >
          {i}
        </div>,
      );
    } else {
      pageControls.push(
        <div
          style={{
            cursor: 'pointer',
            backgroundColor: 'white',
            borderRadius: '0.15em',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: '0.25em 0.25em',
            padding: '0.5em 0.75em',
          }}
          onClick={() => setCurrentPage(i)}
          key={i}
        >
          {i}
        </div>,
      );
    }
  }

  return (
    <div
      id="pagination-container"
      className="career-pagination-wrapper w-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
          backgroundColor: currentPage > 1 ? 'white' : 'lightgrey',
          color: currentPage > 1 ? '#003e6b' : 'grey',
          fontWeight: 'bold',
          borderRadius: '0.15em',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
          margin: '0.25em 0.25em',
          padding: '0.5em 0.75em',
        }}
        onClick={currentPage > 1 ? () => setCurrentPage(1) : () => {}}
      >
        {'<<'}
      </div>
      <div
        style={{
          cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
          backgroundColor: currentPage > 1 ? 'white' : 'lightgrey',
          color: currentPage > 1 ? '#003e6b' : 'grey',
          fontWeight: 'bold',
          borderRadius: '0.15em',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
          margin: '0.25em 0.25em',
          padding: '0.5em 0.75em',
        }}
        onClick={currentPage > 1 ? () => setCurrentPage(currentPage - 1) : () => {}}
      >
        {'<'}
      </div>

      {pageControls}

      <div
        style={{
          cursor: currentPage < pageCount ? 'pointer' : 'not-allowed',
          backgroundColor: currentPage < pageCount ? 'white' : 'lightgrey',
          color: currentPage < pageCount ? '#003e6b' : 'grey',
          fontWeight: 'bold',
          borderRadius: '0.15em',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
          margin: '0.25em 0.25em',
          padding: '0.5em 0.75em',
        }}
        onClick={currentPage < pageCount ? () => setCurrentPage(currentPage + 1) : () => {}}
      >
        {'>'}
      </div>
      <div
        style={{
          cursor: currentPage < pageCount ? 'pointer' : 'not-allowed',
          backgroundColor: currentPage < pageCount ? 'white' : 'lightgrey',
          color: currentPage < pageCount ? '#003e6b' : 'grey',
          fontWeight: 'bold',
          borderRadius: '0.15em',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
          margin: '0.25em 0.25em',
          padding: '0.5em 0.75em',
        }}
        onClick={currentPage < pageCount ? () => setCurrentPage(pageCount) : () => {}}
      >
        {'>>'}
      </div>
    </div>
  );
}
