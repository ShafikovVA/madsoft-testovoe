import { useSelector } from 'react-redux';
import { RootState } from '../store/root';

export const useAnswers = () => {
  const answers = useSelector((state: RootState) => state.answers);

  return { answers };
};
