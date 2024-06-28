import { useAnswers } from '../../hooks/useAnswers';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../Task/task';
import './results.css';

export const Result = () => {
  const { answers } = useAnswers();
  const { tasks } = useTasks();
  return (
    <section className="result-container">
      <div className="container">
        <span className="title">Вы отетили на {answers.length} вопросов из {tasks.length} </span>
        <div className="tasks">
          {
            tasks && tasks.map((task, index) => (
              <Task key={task.id} active index={index} showedAnswer={answers[index]} isResult />
            ))
          }
        </div>
      </div>
    </section>
  );
};
