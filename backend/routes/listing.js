import express from 'express';
import { createListing } from '../contorllers/listing.js';
const router = express.Router();
router.post('/create', createListing);

export default router;
