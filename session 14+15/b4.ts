class User {
    id: number;
    posts: Post[];
    followers: User[];
    constructor(id: number) {
        this.id = id;
        this.posts = [];
        this.followers = [];
    }
    createPost(content: string): void {
        let post = new Post(this.id, content);
        this.posts.push(post);
    }
    comment(post: Post, content: string, parentId?: number): void {
        post.addComment(new Comment(this.id, content), parentId);
    }
    follow(user: User): void {
        this.followers.push(user);
    }
    likePost(post: Post): void {
        post.addLike(this.id);
    }
    viewFeed(): Post[] {
        let feed: Post[] = [];
        this.followers.forEach(follower => {
            follower.posts.forEach(post => {
                feed.push(post);
            });
        });
        return feed;
    }
}
class Post {
    id: number;
    userId: number;
    content: string;
    likes: number[];
    comments: Comment[];
    constructor(userId: number, content: string) {
        this.id = Math.floor(Math.random() * 1000); // Generate a random id for the post
        this.userId = userId;
        this.content = content;
        this.likes = [];
        this.comments = [];
    }
    addLike(userId: number): void {
        this.likes.push(userId);
    }
    addComment(comment: Comment, parentId?: number): void {
        if (parentId !== undefined) {
            let parentComment = this.comments.find(comment => comment.id === parentId);
            if (parentComment) {
                parentComment.replies.push(comment);
            }
        } else {
            this.comments.push(comment);
        }
    }
}
class Comment {
    id: number;
    userId: number;
    content: string;
    replies: Comment[];

    constructor(userId: number, content: string) {
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
