const DiaryItem = ({ id, author, content, emotion, created_at, onDelete }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <div className="date">{new Date(created_at).toLocaleString()}</div>
      </div>
      <div className="content">내용: {content}</div>
      <button
        onClick={() => {
          if (window.confirm(`${id}번쩨 일기를 삭제하시겠습니까?`)) {
            onDelete(id);
          }
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default DiaryItem;
