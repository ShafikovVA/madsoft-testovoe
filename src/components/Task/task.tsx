import { FormEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ITask } from '../../types/ITask';
import { AnswerType } from '../../types/AnswerType';
import { addAnswer } from '../../store/answers/answers.slice';
import './task.css';
import { TaskInput } from '../TaskInput/taskInput';

interface TaskProps extends Omit<ITask, 'id'> {
  active?: boolean;
  onSuccess?: () => void;
  showedAnswer?: AnswerType;
  isResult?: boolean;
}

export const Task = (props: TaskProps) => {
  const {
    description, type, variants, active, onSuccess, showedAnswer, isResult,
  } = props;
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState<AnswerType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (answer !== null) {
      dispatch(addAnswer(answer));
      if (onSuccess) { onSuccess(); }
      setError(null);
      setAnswer(null);
    } else {
      setError('Вы не дали ответ на вопрос');
    }
  };
  const answerCached = useMemo(() => answer, [answer]);
  return (
    active && (
      <div className="tab">
        <div className={`tab-content ${(showedAnswer || isResult) && 'result'}`}>
          <div className="description">{description}</div>
          <form onSubmit={onSubmit}>
            {error && <span className="error">{error}</span>}
            <div className="form-content">
              <TaskInput type={type} onChange={(value) => setAnswer(value)} variants={variants} answer={answerCached} value={showedAnswer} isResult={isResult} />
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
