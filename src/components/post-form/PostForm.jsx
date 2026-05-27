import React, {useCallback, useState} from 'react'
import { useForm, useWatch } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function PostForm({post}) {
    const {register, handleSubmit, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',

        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const title = useWatch({control, name: "title"})
    const [error, setError] = useState("")
 
    const submit = async (data) => {
        setError("")

        try {
            if(post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

                if(file) {
                    await appwriteService.deleteFile(post.featuredImage)
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                })

                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }

            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if(!file) {
                    setError("Image upload failed. Check your Appwrite bucket permissions.")
                    return
                }

                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        } catch (error) {
            setError(error.message || "Something went wrong while submitting the post")
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
        }
        return ''

    },[])

    React.useEffect(() => {
        setValue('slug', slugTransform(title), {shouldValidate: true})
    }, [title, slugTransform,  setValue])

    return (
        <form onSubmit={handleSubmit(submit, () => setError("Please fill all required fields"))} className="flex flex-wrap gap-y-4">
            {error && <p className="mb-2 w-full rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-red-600">{error}</p>}
            <div className="w-full px-2 lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                
            </div>
            <div className="w-full px-2 lg:w-1/3">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="mb-4 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full rounded-lg object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
