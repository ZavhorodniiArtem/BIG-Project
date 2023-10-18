import { useContext } from 'react';
import { StoreContext } from '../main.tsx';

export default function useStore() {
  return useContext(StoreContext);
}
