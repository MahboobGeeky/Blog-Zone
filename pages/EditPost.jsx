import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../src/components'
import appwriteService from '../src/appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-6 md:py-8'>
            <Container>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                    <PostForm post={post}/>
                </div>
            </Container>
        </div>
    ) : null
}

export default EditPost
