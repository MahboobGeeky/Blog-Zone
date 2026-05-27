import React, {useState, useEffect} from 'react'
import appwriteService from '../src/appwrite/config'
import { Container, PostCard } from '../src/components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.rows)
            }
        })

    }, [])
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

export default AllPosts
