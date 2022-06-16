const DiaryItem = ({id, author, content, emotion, created_at}) =>{
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자: {author} | 감정점수: {emotion}</span>
                <div className="date">
                    {new Date(created_at).toLocaleString()}
                </div>
            </div>
            <div className="content">
            내용: {content}
            </div>
        </div>
    )
}

export default DiaryItem