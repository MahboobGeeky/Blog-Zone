import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostCard({$id, title, featuredImage, authorName, username, userName, name, userId}) {
    const userData = useSelector((state) => state.auth.userData)

    // Prefer common author name fields from post data, fallback to userId.
    const byline =
        authorName ||
        username ||
        userName ||
        name ||
        (userData && userId === userData.$id ? userData.name : null) ||
        "Unknown"
    
    return (
        <Link to={`/post/${$id}`} className='block h-full'>
            <div className='h-full w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg'>
                <div className=' w-full justify-center mb-4'>
                    <img
                    src={appwriteService.getFileView(featuredImage)}
                    alt={title}
                    className='h-52 w-full rounded-xl object-cover'
                    />
                </div>
                <h2
                className='line-clamp-2 text-lg font-semibold text-slate-800'
                >{title}</h2>
                <p className='mt-2 text-sm font-medium text-slate-500'>
                    By: {byline}
                </p>
            </div>
        </Link>
    )
}

export default PostCard
