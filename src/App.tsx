import { useState } from 'react';
import './App.css';
import { Task } from './components/Task/task';
import { useTask } from './hooks/useTasks';
import { useAnswers } from './hooks/useAnswers';

const App = () => {
  const { tasks } = useTask();
  const { answers } = useAnswers();
  const [activeIndex, setActiveIndex] = useState<number>(answers.length);
  return (

    <section className="test">
      <div className="container">
        <h1>Тестирование</h1>
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

export default App;
