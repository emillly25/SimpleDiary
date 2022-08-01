import DiaryItem from "./DiaryItem";
const DiaryList = ({ diaryList, onRemove, onUpdate }) => {
  return (
    <div className="DiaryList">
      <h2>Log List</h2>
      <div>
        {diaryList.map((el) => (
          <DiaryItem
            key={el.id}
            {...el}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
