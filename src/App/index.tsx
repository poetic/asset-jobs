import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import JobWrapperWithModal from '../components/JobWrapperWithModal';

import './index.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JobWrapperWithModal />
    </QueryClientProvider>
  );
}

export default App;
