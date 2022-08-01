import { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  const authorInput = useRef();
  const contentInput = useRef();
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  function handleChangeState(e) {
    setState((cur) => {
      const newState = { ...cur };
      newState[e.target.name] = e.target.value;
      return newState;
    });
  }

  function handleSubmit() {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장성공");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  }

  return (
    <div className="DiaryEditor">
      <h2>Log toDay</h2>
      <div>
        <input
          ref={authorInput}
          type="text"
          name="author"
          value={state.author}
          onChange={handleChangeState}
        ></input>
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      <div>
        <span>오늘의 감정점수: </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
