import express from 'express';
import {

uploadVideo,
getAllVideos,
getVideoById,
updateVideo,
deleteVideo,
} from '../Controllers/videoController';

const router = express.Router();


router.post('/upload', uploadVideo);
router.get('/videos', getAllVideos);
router.get('/getVideo/:id', getVideoById);
router.put('/updateVideo/:id', updateVideo);
router.delete('/deleteVideo/:id', deleteVideo);

export default router;