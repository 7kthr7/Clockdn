{/* <div className="user-posts">
                {commentsWithPosts && commentsWithPosts.map((commentWithPost) => (
                    <SinglePostDisplay 
                        key={commentWithPost.post_id.id} // Assuming post_id object has an id property
                        post={commentWithPost.post_id}
                        likesForPost={likes.filter(like => like.post_id === commentWithPost.post_id.id)}
                        commentsForPost={comments.filter(comment => comment.post_id === commentWithPost.post_id.id)}
                        user={user}
                    />
                ))}
            </div> */}
            {/* <div className="user-likes">
    {likesForPosts && likesForPosts.map((likeForPost) => (
        <SinglePostDisplay 
            key={likeForPost.post.id} // Assuming post_id object has an id property
            post={likeForPost.post_id}
            likesForPost={likes.filter(like => like.post_id === likeForPost.post_id.id)}
            commentsForPost={comments.filter(comment => comment.post_id === likeForPost.post_id.id)}
            user={user}
        />
    ))}
</div> */}