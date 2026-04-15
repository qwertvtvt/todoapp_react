import { useEffect, useState, useMemo } from 'react';
import './App.css';

import APIKeyInput from './components/APIKeyInput';
import NewTaskForm from './components/NewTaskForm';
import Task from './components/Task';

import Todo from './services/todoapp';

function App() {
  let [ apiKey, setAPIKey ] = useState(localStorage.getItem("apiKey") || "");
  let [ tasks, setTasks ] = useState([]);
  let [ loadState, setLoadState ] = useState("APIキーを入力");

  const todo = useMemo(() => new Todo(apiKey), [apiKey]);

  const getTasks = async () => {
    try {
      const data = await todo.getTasks();
      setTasks(Array.isArray(data) ? data : []);
      setLoadState(`${data?.length || 0}件`);
    } catch (e) {
      setTasks([]);
      setLoadState("エラー");
    }
  }

  useEffect(function() {
    if(!apiKey) {
      setLoadState("APIキーを入力");
      return;
    }
    localStorage.setItem("apiKey", apiKey);
    getTasks();
  }, [apiKey]);

  return (
    <div className="container-box">
      <h1 style={{ fontSize: 30 }}>ToDo List</h1>
      <hr />
      <APIKeyInput apiKey={apiKey} setAPIKey={setAPIKey} />
      <hr />
      <NewTaskForm service={todo} onTaskAdded={getTasks}/>
      <hr />
      <p>{loadState}</p>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} service={todo} onChanged={getTasks} />
        ))}
      </div>
    </div>
  )
}

export default App
