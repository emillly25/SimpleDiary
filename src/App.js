import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

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

  const onCreate = useCallback((author, content, emotion) => {
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
  }, []);

  const onRemove = useCallback((target_id) => {
    setData((cur) => cur.filter((el) => el.id !== target_id));
  }, []);

  const onUpdate = useCallback((target_id, newContent) => {
    setData((data) =>
      data.map((el) =>
        el.id === target_id ? { ...el, content: newContent } : el
      )
    );
  }, []);

  //memoization 체크
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((el) => el.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기: {data.length}</div>
      <div>좋아: {goodCount}</div>
      <div>싫어: {badCount}</div>
      <div>좋아 비율: {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
}

export default App;
