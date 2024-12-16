import express, { json } from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js';
import { upload } from '../Middlewares/Multer.js';
import { UploadImage } from '../utils/ImageUpload.js';
import { CommunityPost } from '../models/CommunityPost.model.js';
import { Comment } from '../models/Comment.model.js';

const CommunityPostRout = express.Router();

// upload a community post
CommunityPostRout.post('/api/post/communitypost/create', AuthCheck, upload.single('imageSource'), async (req, res) => {
    try {
        const Description = req.body.Description;
        const imageSource = req.file;
        const user = req.user;
        console.log(imageSource)

        if (!Description || !imageSource) {
            return res.status(400).json({
                message: "Please Fill the form , Description or imageSource Are undifined"
            })
        }

        const image = await UploadImage(imageSource.path)

        const communitypost = await CommunityPost({
            Information: Description,
            Image: image.url,
            postBy: user._id,
        })

        await communitypost.save()
        user.communityPosts.push(communitypost._id)
        await user.save()

        res.status(201).json({
            message: "Posted Sucessfully"
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
})
// delete a community post
CommunityPostRout.delete('/api/communitypost/delete/:id',AuthCheck,async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await CommunityPost.findById(postId);
        const user = req.user;
        if (!post) {
            throw new Error("Post is not found");
            
        }

        if (user._id.toString() !== post.postBy.toString()) {
            throw new Error("Invalid Request to delete .");
        };

        await post.deleteOne();
        user.communityPosts.pull(post._id);
        await user.save()
        res.status(201).json({
            message:"Successfully Deleted"
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }    
})

// Todo Update the POST


// get speecific Community post
CommunityPostRout.get('/api/post/communitypost/:id', AuthCheck, async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user;

        const post = await CommunityPost.findById(id);


        res.status(201).json({
            message: "Post",
            post
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
})
// Get all commununity post form the channel
CommunityPostRout.get('/api/channel/communitypost/:channelid', AuthCheck, async (req, res) => {
    try {
        const channelId = req.params.channelid;
        const posts = await CommunityPost.find({
            postBy: channelId
        })
        let data;
        if (posts.length == 0) {
            data = "No Posts Found"
        } else {
            data = posts;
        }



        res.status(201).json({
            message: "Posts",
            data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
// like/unliked the post 
CommunityPostRout.post('/api/post/like/:postid', AuthCheck, async (req, res) => {
    try {
        const postID = req.params.postid;
        const post = await CommunityPost.findById(postID)
        const user = req.user;
        let info ;
        if (!post) {
          return res.status(404).json({
                message: 'Post Not Found'
            })
        }
        if (post.likes.includes(user._id)) {
            post.likes.pull(user._id)
            info="Unliked"
        } else {
            post.likes.push(user._id)
            info="Liked"
        }
        await post.save()
        res.status(200).json({
            message:info
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
})

// comment on the Community post
CommunityPostRout.post('/api/post/comment/:postId', AuthCheck, async (req, res) => {

  try {
    const user = req.user;
    const postId = req.params.postId;
    const text = req.body.text;
    if (!text) {
        return res.status(404).json({
            message:"Please enter text to comment !! ."
        })
    }

    const post = await CommunityPost.findById(postId);
    if (!post) {
        return res.status(404).json({
            message:"Post Not found ."
        })
    }

    const newComment = new Comment({
        Community:post._id,
        commentBy:user._id,
        TextContent:text,
        status:"comment",
        Video:null,
    })

    await newComment.save();
    post.comments.push(newComment._id);
    await post.save()

    res.status(201).json({
        message:"Comment Added "
    })


  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// reply on commnet 
CommunityPostRout.post('/api/post/reply/:postid/:parantCommentId', AuthCheck, async (req, res) => {
    try {
        const postid = req.params.postid;
        const text = req.body.text;
        const parantCommentId = req.params.parantCommentId;
        const user = req.user;


        if (!text) {
            return res.status(400).json({
                message: 'Please Enter text .'
            })
        }
        const post = await CommunityPost.findById(postid)
        if (!post) {
            res.status(404).json({
                message: "Not Found ."
            })
        };
        const comment = await Comment.findById(parantCommentId);

        if (!comment) {
            return res.status(404).json({
                message:"Comment Not found"
            })
        }

        if (!post.comments.includes(comment._id)) {
            return res.status(404).json({
                message:"This comment does not exists on this content!!"
            })
        }


        const Reply = new Comment({
        Community:post._id,
        parentComment: parantCommentId,
        TextContent: text,
        commentBy: user._id,
        status: "reply"
        })
        await Reply.save()

        comment.replies.push(Reply._id)
        await comment.save()

        res.status(201).json({
            message: 'Replied Successfully !!'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
// get all comment on specific post
CommunityPostRout.get('/api/post/comments/:postId', AuthCheck, async (req, res) => {

    try {
        const postId = req.params.postId;
        const post = await CommunityPost.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Cant find the video you are looking for .."
            })
        }

        const commentsIds = post.comments;
        const allcomments = await Comment.find({
            _id: { $in: commentsIds }
        })
        res.status(200).json({
            message: "All Comments on" + `'${post.Information}'`,
            data: allcomments
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
// delete the speccicf comment
CommunityPostRout.delete('/api/post/comment/delete/:commentId', AuthCheck, async (req, res) => {
    try {
        const user = req.user;
        const CommentId = req.params.commentId;

        const comment = await Comment.findById(CommentId)
        const post = await CommunityPost.findById(comment.Community)

        if (!comment) {
            return res.status(404).json({
                message: "Not found"
            })
        }

        if (comment.commentBy.toString() !== user._id.toString()) {
            return res.status(503).json({
                message: "Invalid Request"
            })
        }

        await comment.deleteOne()
        post.comments.pull(comment._id)
        await post.save()

        res.status(201).json({
            message: "Comment Deleted"
        })

    } catch (error) {
        res.status(error.statusCode).json({
            message: error.message
        })
    }
})
// Edit own comment
CommunityPostRout.patch('/api/post/comment/edit/:commentId', AuthCheck, async (req, res) => {
    try {
        const user = req.user;
        const comment = await Comment.findById(req.params.commentId);
        const TextContent = req.body.TextContent;

        if (user._id.toString() !== comment.commentBy.toString()) {
            return res.status(400).json({
                message: 'Invalid Request'
            })
        }

        comment.TextContent = TextContent;
        await comment.save()
        res.status(201).json({
            message: "Updated Sucessfully !!"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
export { CommunityPostRout }