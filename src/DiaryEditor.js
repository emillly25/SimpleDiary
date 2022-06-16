import { useState } from 'react'

const DiaryEditor = () => {
    const [state, setState] = useState({
        author:'',
        content:'',
    })

    function handleChangeState(e){
        setState(cur=> {
            const newState = {...cur}
            newState[e.target.name] = e.target.value
            return newState
        })
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
        </div>

    )
}

export default DiaryEditor;