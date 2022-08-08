import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./App";
import { useContext } from "react";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);

  return (
    <div className="DiaryList">
      <h2>Log List</h2>
      <div>
        {diaryList.map((el) => (
          <DiaryItem key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
