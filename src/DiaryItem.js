import { useState, useRef } from "react";

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  created_at,
  onRemove,
  onUpdate,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInputRef = useRef();

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleRemove = () => {
    if (window.confirm(`${id}번쩨 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleUpdate = () => {
    if (localContent.length < 5) {
      localContentInputRef.current.focus();
      return;
    }
    if (window.confirm("수정하시겠습니까?")) {
      setIsEdit(false);
      onUpdate(id, localContent);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <div className="date">{new Date(created_at).toLocaleString()}</div>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            ref={localContentInputRef}
            value={localContent}
            onChange={(e) => {
              setLocalContent(e.target.value);
            }}
          />
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>돌아가기</button>
          <button onClick={handleUpdate}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제</button>
          <button onClick={toggleIsEdit}>수정</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
