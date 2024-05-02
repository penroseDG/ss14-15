"use strict";
class User {
    constructor(id) {
        this.id = id;
        this.posts = [];
        this.followers = [];
    }
    createPost(content) {
        let post = new Post(this.id, content);
        this.posts.push(post);
    }
    comment(post, content, parentId) {
        post.addComment(new Comment(this.id, content), parentId);
    }
    follow(user) {
        this.followers.push(user);
    }
    likePost(post) {
        post.addLike(this.id);
    }
    viewFeed() {
        let feed = [];
        this.followers.forEach(follower => {
            follower.posts.forEach(post => {
                feed.push(post);
            });
        });
        return feed;
    }
}
class Post {
    constructor(userId, content) {
        this.id = Math.floor(Math.random() * 1000); // Generate a random id for the post
        this.userId = userId;
        this.content = content;
        this.likes = [];
        this.comments = [];
    }
    addLike(userId) {
        this.likes.push(userId);
    }
    addComment(comment, parentId) {
        if (parentId !== undefined) {
            let parentComment = this.comments.find(comment => comment.id === parentId);
            if (parentComment) {
                parentComment.replies.push(comment);
            }
        }
        else {
            this.comments.push(comment);
        }
    }
}
class Comment {
    constructor(userId, content) {
        this.id = Math.floor(Math.random() * 1000); // Generate a random id for the comment
        this.userId = userId;
        this.content = content;
        this.replies = [];
    }
}
let user1 = new User(1);
let user2 = new User(2);
user1.createPost("Hello, this is my first post!");
user2.createPost("Hey there, nice to meet you!");
user1.follow(user2);
user2.likePost(user1.posts[0]);
user1.comment(user2.posts[0], "Nice post!");
console.log(user1.viewFeed());
