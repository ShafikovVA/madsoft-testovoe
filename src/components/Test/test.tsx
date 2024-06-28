import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAnswers } from '../../hooks/useAnswers';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../Task/task';
import { Timer } from '../Timer';
import './test.css';
import { completeTest } from '../../store/tasks/tasks.slice';

export const Test = () => {
  const { tasks, timer } = useTasks();
  const { answers } = useAnswers();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState<number>(answers.length);
  const successHandler = (index: number) => {
    if (tasks.length - 1 === index) {
      dispatch(completeTest());
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <section className="test">
      <div className="container">
        <span className="title"><h1>Тестирование</h1> <Timer {...timer} /></span>
        <div className="indicators">
          {
            tasks.map((task, index) => (
              <div key={task.id} className={`indicator ${index === activeIndex && 'active'} ${index < activeIndex && 'disabled'}`} />
            ))
          }

        </div>
        <div className="tabs">
          {
            tasks.map((task, index) => (
              <Task active={index === activeIndex} onSuccess={() => successHandler(index)} key={task.id} index={index} />
            ))
          }
        </div>
      </div>
    </section>
  );
};
