import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ITask } from '../../types/ITask';
import { AnswerType } from '../../types/AnswerType';
import { addAnswer } from '../../store/answers/answers.slice';

interface TaskProps extends Omit<ITask, 'id'> {
  active?: boolean;
  onSuccess: () => void;
}

export const Task = (props: TaskProps) => {
  const {
    description, type, variants, active, onSuccess,
  } = props;
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState<AnswerType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (answer !== null) {
      dispatch(addAnswer(answer));
      onSuccess();
      setError(null);
      setAnswer(null);
    } else {
      setError('Вы не дали ответ на вопрос');
    }
  };

  return (
    active && (
      <div className="tab">
        <div className="tab-content">
          <div className="description">{description}</div>
          <form onSubmit={onSubmit}>
            {error && <span className="error">{error}</span>}
            <div className="form-content">
              {
              type === 'short' && (
                <input placeholder="ваш ответ" onChange={(event) => setAnswer(event.target.value)} type="text" />
              )
            }
              {
              type === 'detailed' && (
                <textarea onChange={(event) => setAnswer(event.target.value)} placeholder="ваш ответ" />
              )
            }
              {
              type === 'single' && (
                <>
                  {variants.map((variant, index) => (
                    <label key={variant}>
                      <input placeholder="ваш ответ" name="answer" type="radio" onClick={() => setAnswer(index)} />
                      {variant}
                    </label>
                  ))}
                </>
              )
            }
              {
              type === 'multiple' && (
                <>
                  {variants.map((variant, index) => (
                    <label key={variant}>
                      <input
                        placeholder="ваш ответ"
                        name="answer"
                        type="checkbox"
                        onChange={
                        (event) => {
                          if (event.target.checked && !Array.isArray(answer)) {
                            setAnswer([index]);
                          } else if (event.target.checked && Array.isArray(answer)) {
                            setAnswer([...answer, index]);
                          } else if (!event.target.checked && Array.isArray(answer) && (answer.length === 1)) {
                            setAnswer(null);
                          } else if (!event.target.checked && Array.isArray(answer)) {
                            setAnswer([...answer.filter((item) => item !== index)]);
                          // eslint-disable-next-line no-dupe-else-if
                          }
                        }
                      }
                      />
                      {variant}
                    </label>
                  ))}
                </>
              )
            }
            </div>
            <button type="submit">Ответить</button>
          </form>
        </div>
      </div>
    )

  );
};
