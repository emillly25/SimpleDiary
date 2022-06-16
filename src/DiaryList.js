import DiaryItem from "./DiaryItem"
const DiaryList = ({ diaryList }) => {
    return (
        <div className="DiaryList">
            <h2>Log List</h2>
            <div>
                {diaryList.map(el => <DiaryItem key={el.id} {...el}/>)}
            </div>
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList