import { useContext } from 'react';
import { LoadingContext } from 'shared/context';

export const useLoading = () => useContext(LoadingContext);
