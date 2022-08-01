import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((el) => {
      return {
        author: el.email,
        content: el.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newData = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((cur) => {
      return [newData, ...cur];
    });
  };

  const onRemove = (target_id) => {
    const newData = data.filter((el) => el.id !== target_id);
    setData(newData);
  };

  const onUpdate = (target_id, newContent) => {
    setData(
      data.map((el) =>
        el.id === target_id ? { ...el, content: newContent } : el
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
}

export default App;
