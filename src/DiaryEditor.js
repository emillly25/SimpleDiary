import { useState } from 'react'

const DiaryEditor = () => {

    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    return (
        <div className='DiaryEditor'>
            <h2>Log toDay</h2>
            <div>
                <input type="text" value={author} onChange={(e)=>{
                    setAuthor(e.target.value)
                }}></input>
            </div>
            <div>
                <textarea value={content} onChange={(e)=>{
                    setContent(e.target.value)
                }}></textarea>
            </div>

        </div>

    )
}

export default DiaryEditor;