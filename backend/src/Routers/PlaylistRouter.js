import express from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js';
import { Playlist } from '../models/PlaylistModel.js';
import { User } from '../models/User.model.js';
import { Video } from '../models/Video.model.js';

const PlaylistRouter = express.Router();

PlaylistRouter.post('/api/playlist/create', AuthCheck, async (req, res) => {
    try {
        const CurrentUser = req.user;
        const title = req.body.title;
        const description = req.body.description;

        if (!title || !description) {
            return res.status(408).json({
                message: `${!title ? 'title' : 'description' + 'fields are required'}`
            })
        }

        const newPlaylist = new Playlist({
            title,
            description,
            playlistby: CurrentUser._id,
        })

        await newPlaylist.save()
        CurrentUser.UsersPlaylist.push(newPlaylist._id)
        await CurrentUser.save()

        res.status(201).json({
            message: "Playlist Created Successfully "
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            message: error.message
        })
    }
})
// get user playlist 
PlaylistRouter.get('/api/playlist/user/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;
        const playlists = await Playlist.find({ playlistby: userId });
        if (!playlists) {
            return res.status(404).json({
                message: "Not found!!"
            })
        }

        res.status(201).json({
            message: playlists
        })



    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
// Get playlist by id 
PlaylistRouter.get('/api/playlist/watch/:playlistid', async (req, res) => {
    try {
        const playlistid = req.params.playlistid;
        const playlist = await Playlist.findById(playlistid);
        if (!playlist) {
            return res.status(404).json({
                message: "Could'nt Find the Playlist , Playlist Not found"
            })
        }

        res.status(201).json({
            message: 'Playlist Found ' + playlist.title,
            data: playlist
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
// Add videos into playlist
PlaylistRouter.post('/api/playlist/:action/:videoid/:playlistId', AuthCheck, async (req, res) => {
    try {
        const videoId = req.params.videoid;
        const playlistid = req.params.playlistId;
        const action = req.params.action;
        const user = req.user;
        let message;
        if (!videoId || !playlistid) {
            return res.status(506).json({
                message: 'Please Provide the videoid or playlistid'
            })
        };
        const video = await Video.findById(videoId);
        const playlist = await Playlist.findById(playlistid);

        if (!video) {
            return res.status(404).json({
                message: 'Can not find Video'
            })
        };
        // if user wants to add 
        if (!playlist) {
            console.log('Redirct user to make new one .')
            return res.status(404).json({
                message: "Could'nt find the playlist ."
            })
        }

        if (action == 'add') {
            if (playlist.videos.includes(video._id)) {
                throw new Error("Already exists in the playlist!!");
            }
            if (video.VideoOwner.toString() !== user._id.toString()) {
                throw new Error("Video can be only removed by the Owner");
            }
            playlist.videos.push(video._id);
            await playlist.save()
            message = 'Video Added into the Playlist'
        } else if (action == 'remove') {
            if (!playlist.videos.includes(video._id)) {
                throw new Error("Video Does not exists !!");
            };
            if (video.VideoOwner.toString() !== user._id.toString()) {
                throw new Error("Video can be only removed by the Owner");

            }
            playlist.videos.pull(video._id);
            await playlist.save()
            message = 'Video Removed from the Playlist'
        }
        res.status(201).json({
            message: message
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
PlaylistRouter.delete('/api/playlist/delete/:playlistid',AuthCheck,async (req,res) => {
    try {
        const user = req.user;
        const playlistId = req.params.playlistid;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({
                message:"Can't find the playlist to delete !!"
            })
        }

        if (playlist.playlistby.toString() !== user._id.toString()) {
            return res.status(500).json({
                message:"Invalid Request ! Only Playlist Owner Can delete this Playlist!"
            })
        }

        await playlist.deleteOne()
        user.UsersPlaylist.pull(playlist._id)
        await user.save()

        res.status(201).json({
            message:"Playlist Deleted Successfully"
        })


    } catch (error) {
        
    }
})
// Upadte the playlist 
PlaylistRouter.patch('/api/playlist/edit/:playlistId',AuthCheck,async (req,res) => {
    try {
        const playlistId = req.params.playlistId;
        const user = req.user;
        const {title,description} = req.body;
        if (!title || !description) {
            return res.status(509).json({
                message:"title or description is not difined"
            })
        }

        const playlist = await Playlist.findById(playlistId)
        if (!playlist) {
            return res.status(404).json({
                message:"Could'nt find the Playlist !!",  
            })
        }

        if (user._id.toString() !== playlist.playlistby.toString()) {
            return res.status(500).json({
                message:"Only Playlist Owner Can edit this Playlist .",  
            })
        }

        playlist.title= title;
        playlist.description=description;

        await playlist.save();

        res.status(201).json({
            message:"Playlist Updated Sucessfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
// save the playlist 
// we will think about it.

PlaylistRouter.post('/api/playlist/save/:playlistID',AuthCheck,async (req,res) => {
    try {
        const user = req.user;
        const playlistId = req.params.playlistID;

        if (!playlistId) {
            return res.status(400).json({
                message:"Playlist ID is not Defined "
            })
        }

        const playlist = await Playlist.findById(playlistId);


    } catch (error) {
        
    }
})


export { PlaylistRouter }