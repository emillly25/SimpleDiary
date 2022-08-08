import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = { ...action.data, created_date };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((el) => el.id !== action.target_id);
    }
    case "UPDATE": {
      return state.map((el) =>
        el.id === action.target_id ? { ...el, content: action.newContent } : el
      );
    }
    default:
      return state;
  }
};

//따로 contexct를 만들자!
// -> Provider도 결국 컴포넌트기 떄문에 data가 변경되면 재랜더링이 되서 우리가 최적화 했던게 다 풀림
//    그러므로 따로따로 감싸줘야함
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
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
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((target_id) => {
    dispatch({ type: "REMOVE", target_id });
  }, []);

  const onUpdate = useCallback((target_id, newContent) => {
    dispatch({ type: "UPDATE", target_id, newContent });
  }, []);

  //왜 useMemo를 사용하는가? -> 그냥 하면 App 컴포넌트 재랜더링시 계속 다시 생성되니까 낭비
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onUpdate };
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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <DiaryEditor />
        <div>전체일기: {data.length}</div>
        <div>좋아: {goodCount}</div>
        <div>싫어: {badCount}</div>
        <div>좋아 비율: {goodRatio}</div>
        <DiaryList />
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
