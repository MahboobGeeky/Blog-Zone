import React from 'react'
import {Container, PostForm} from '../src/components'

function AddPost() {
    return (
        <div className='py-6 md:py-8'>
            <Container>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                    <PostForm/>
                </div>
            </Container>
        </div>
    )
}

export default AddPost
