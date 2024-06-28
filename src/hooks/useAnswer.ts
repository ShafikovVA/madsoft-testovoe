import { useSelector } from 'react-redux';
import { RootState } from '../store/root';

export const useAnswer = () => {
  const answer = useSelector((state: RootState) => state.answer);

  return { answer };
};
