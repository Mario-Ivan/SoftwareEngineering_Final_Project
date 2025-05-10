import express from 'express';
import {

uploadVideo,
getAllVideos,
getVideoById,
updateVideo,
deleteVideo,
countVideos,
getPaginate,
getVideoUrl,
} from '../Controllers/videoController';

const router = express.Router();


router.post('/upload', uploadVideo);
router.get("/:id/url", getVideoUrl);
router.get('/videos', getAllVideos);
router.post('/videos/paginate', getPaginate);
router.get('/getVideo/:id', getVideoById);
router.put('/updateVideo/:id', updateVideo);
router.delete('/deleteVideo/:id', deleteVideo);
router.get('/countVideos', countVideos);

export default router;