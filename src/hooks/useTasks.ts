import { useSelector } from 'react-redux';
import { RootState } from '../store/root';

export const useTask = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  return { tasks };
};
