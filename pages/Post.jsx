import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../src/appwrite/config'
import { Button, Container } from "../src/components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const authorByline = post
        ? post.authorName ||
          post.username ||
          post.userName ||
          post.name ||
          (isAuthor ? userData?.name : null) ||
          "Unknown"
        : "Unknown";

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-6 md:py-8">
            <Container>
                <div className="relative mb-6 flex w-full justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="max-h-[500px] w-full rounded-xl object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2 rounded-full bg-white/90 p-1.5 shadow-md">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-600">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mb-6 w-full">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{post.title}</h1>
                    <p className="mt-2 text-sm font-medium text-slate-500">By: {authorByline}</p>
                </div>
                <div className="browser-css rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
