import { useSelector } from 'react-redux';
import { RootState } from '../store/root';

export const useTasks = () => {
  const { tasks, timer, complete } = useSelector((state: RootState) => state.tasks);
  return { tasks, timer, complete };
};

export const useTaskByIndex = (index: number) => {
  const task = useSelector((state: RootState) => state.tasks.tasks[index]);
  return { task };
};
