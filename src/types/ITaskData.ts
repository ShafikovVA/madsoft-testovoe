import { ITask } from './ITask';

export interface ITaskData {
  timer: {
    hours: number, minutes: number, seconds: number,
  },
  tasks: ITask[];
}
