export interface ITask {
  id: number;
  description: string;
  type: 'single' | 'multiple' | 'short' | 'detailed';
  variants: string[];
}
