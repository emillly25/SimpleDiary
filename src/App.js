import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const list =[
    {id: 1, author:'emily', content: 'hi', emotion: 5, created_at: new Date().getTime()
  },
  {id: 2, author:'mily', content: 'hiiii', emotion: 4, created_at: new Date().getTime()
}]
  return (
    <div className="App">
      <DiaryEditor/>
      <DiaryList diaryList={list}/>
    </div>
  );
}

export default App;
