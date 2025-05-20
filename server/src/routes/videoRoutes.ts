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
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = express.Router();


router.post('/upload',authorizeAdmin, uploadVideo);
router.get("/:id/url",authorizeAdmin,  getVideoUrl);
router.get('/videos', authenticate, getAllVideos);
router.post('/videos/paginate',authorizeAdmin, getPaginate);
router.get('/getVideo/:id', getVideoById);
router.put('/updateVideo/:id',authorizeAdmin, updateVideo);
router.delete('/deleteVideo/:id', authorizeAdmin, deleteVideo);
router.get('/countVideos', authorizeAdmin,countVideos);

export default router;