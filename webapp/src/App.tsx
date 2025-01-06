import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TrpcProvider } from './lib/trpc'; // Убедитесь, что путь правильный
import { AllIdeasPage } from './pages/AllIdeasPage';

// Создайте экземпляр QueryClient
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TrpcProvider>
        <AllIdeasPage />
      </TrpcProvider>
    </QueryClientProvider>
  );
};