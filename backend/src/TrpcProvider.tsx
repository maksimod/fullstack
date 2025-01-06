import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { trpc } from './trpc';

const queryClient = new QueryClient();

export const TrpcProvider = ({ children }) => {
  const trpcClient = trpc.createClient({
    url: 'http://localhost:3000/trpc',
  });

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
};