import DiaryItem from "./DiaryItem";
const DiaryList = ({ diaryList, onDelete }) => {
  return (
    <div className="DiaryList">
      <h2>Log List</h2>
      <div>
        {diaryList.map((el) => (
          <DiaryItem key={el.id} {...el} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
