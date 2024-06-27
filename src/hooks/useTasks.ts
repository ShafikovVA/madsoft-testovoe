import { useSelector } from 'react-redux';
import { RootState } from '../store/root';

export const useTasks = () => {
  const { tasks, timer } = useSelector((state: RootState) => state.tasks);

  return { tasks, timer };
};
