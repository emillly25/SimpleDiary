import { useState } from 'react'

const DiaryEditor = () => {
    const [state, setState] = useState({
        author:'',
        content:'',
    })
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    return (
        <div className='DiaryEditor'>
            <h2>Log toDay</h2>
            <div>
                <input type="text" value={state.author} onChange={(e)=>{
                    setState(cur=>{
                        const newState = {...cur}
                        newState.author =e.target.value
                        return newState
                    })
                }}></input>
            </div>
            <div>
                <textarea value={state.content} onChange={(e)=>{
                    setState(cur=>{
                        const newState = {...cur}
                        newState.content = e.target.value
                        return newState
                    })
                }}></textarea>
            </div>
                {state.author}
                {state.content}
        </div>

    )
}

export default DiaryEditor;