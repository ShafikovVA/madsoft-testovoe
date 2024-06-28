import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnswerType } from '../../types/AnswerType';
import { addAnswer } from '../../store/answers/answers.slice';
import './task.css';
import { TaskInput } from '../TaskInput/taskInput';
import { useTaskByIndex } from '../../hooks/useTasks';

interface TaskProps {
  active?: boolean;
  onSuccess?: () => void;
  showedAnswer?: AnswerType;
  isResult?: boolean;
  index: number;
}

export const Task = (props: TaskProps) => {
  const {
    active, onSuccess, showedAnswer, isResult, index,
  } = props;
  // const { answer } = useAnswer();
  const { task } = useTaskByIndex(index);
  const { description } = task;
  const valueRef = useRef<AnswerType | null>(null);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (valueRef.current !== null) {
      dispatch(addAnswer(valueRef.current));
      if (onSuccess) { onSuccess(); }
      setError(null);
      valueRef.current = null;
    } else {
      setError('Вы не дали ответ на вопрос');
    }
  };

  return (
    active && (
      <div className="tab">
        <div className={`tab-content ${(showedAnswer || isResult) && 'result'}`}>
          <div className="description">{description}</div>
          <form onSubmit={onSubmit}>
            {error && <span className="error">{error}</span>}
            <div className="form-content">
              <TaskInput index={index} value={showedAnswer} isResult={isResult} onChange={(value) => { valueRef.current = value; }} />
            </div>
            {
              (!showedAnswer && !isResult) && (
                <button type="submit">Ответить</button>
              )
            }
          </form>
        </div>
      </div>
    )
  );
};
