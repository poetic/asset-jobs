interface JobSearchProps {
  isLoading: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}

export default function JobSearch({ isLoading, setSearchTerm, searchTerm }: JobSearchProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchReset = () => {
    setSearchTerm('');
  };

  return (
    <div className="opportunities-hero-wrapper">
      <div className="div-block-186">
        <h3>{isLoading ? 'Loading Job Postings..' : 'Find your next career'}</h3>
        <div className="form-block w-form">
          <form
            id="wf-form-Career-Search-Form"
            name="wf-form-Career-Search-Form"
            className="form-2"
          >
            <div className="div-block-224 search-input-wrapper">
              <input
                type="search"
                className="text-field w-input search-input-field"
                maxLength={256}
                name="Career-Search"
                placeholder="Search"
                aria-label="Search"
                id="Career-Search"
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <button
                className={`reset-button ${searchTerm ? '' : 'reset-show'}`}
                onClick={handleSearchReset}
              >
                {isLoading && <i className="loader"></i>}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="opportunities-media-wrapper">
        <div className="opportunities-media-overlay" />
      </div>
    </div>
  );
}
