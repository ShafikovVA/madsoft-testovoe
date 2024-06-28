import './App.css';
import { Result } from './components/Result';
import { Test } from './components/Test';
import { useTasks } from './hooks/useTasks';

const App = () => {
  const { complete } = useTasks();
  return (
    complete ? <Result /> : <Test />
  );
};

export default App;
