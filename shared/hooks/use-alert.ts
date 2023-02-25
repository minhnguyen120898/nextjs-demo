import { useContext } from 'react';
import { AlertContext } from 'shared/context';

export const useAlert = () => useContext(AlertContext);