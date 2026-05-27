import React, {useEffect, useState}from 'react'
import appwriteService from '../src/appwrite/config'
import { Container, PostCard } from '../src/components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if(posts) {
                setPosts(posts.rows)
            }
        })
    }, [])

    if(posts.length === 0){
        return (
            <div className="mt-4 w-full py-16 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
                            <h1 className="text-2xl font-bold text-slate-800 transition hover:text-slate-600">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-6 md:py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )
}

export default Home
