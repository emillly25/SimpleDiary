import { useState } from 'react'

const DiaryEditor = () => {
    const [state, setState] = useState({
        author:'',
        content:'',
        emotion: 1,
    })

    function handleChangeState(e){
        setState(cur=> {
            const newState = {...cur}
            newState[e.target.name] = e.target.value
            return newState
        })
    }

    function handleSubmit(){
        console.log(state)
        alert('저장됨')
    }

    return (
        <div className='DiaryEditor'>
            <h2>Log toDay</h2>
            <div>
                <input type="text" name="author" value={state.author} onChange={handleChangeState}></input>
            </div>
            <div>
                <textarea name="content" value={state.content} onChange={handleChangeState}></textarea>
            </div>
            <div>
                <select name='emotion' value={state.emotion} onChange={handleChangeState}>
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

    )
}

export default DiaryEditor;