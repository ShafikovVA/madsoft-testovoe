import { useState } from 'react';
import { useAnswers } from '../../hooks/useAnswers';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../Task/task';
import { Timer } from '../Timer';
import './test.css';

export const Test = () => {
  const { tasks, timer } = useTasks();
  const { answers } = useAnswers();
  const [activeIndex, setActiveIndex] = useState<number>(answers.length);
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
              <Task active={index === activeIndex} onSuccess={() => setActiveIndex(activeIndex + 1)} key={task.id} {...task} />
            ))
          }
        </div>
      </div>
    </section>
  );
};
