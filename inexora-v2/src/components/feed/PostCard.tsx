import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../lib/api'; // Assume this function fetches posts
import Skeleton from 'react-loading-skeleton'; // Assume this is a skeleton loader component

const PostCard = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        // Logic to handle like action (e.g., update in database)
    };

    return (
        <motion.div
            className="post-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="post-content">
                {post.images.length > 1 ? (
                    <div className="carousel">
                        {/* Carousel implementation for multiple images */}
                    </div>
                ) : (
                    <img src={post.images[0]} alt={post.title} />
                )}
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </div>
            <button onClick={handleLike} className={`like-button ${isLiked ? 'liked' : ''}`}>
                {isLiked ? '❤️' : '🤍'} Like
            </button>
        </motion.div>
    );
};

const PostList = () => {
    const { data: posts, isLoading } = useQuery('posts', getPosts);

    if (isLoading) {
        return <Skeleton count={5} />;
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;