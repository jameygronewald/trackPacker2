import express from 'express';
import checkToken from '../middleware/checkToken';
import { postItem, putItem, deleteItem } from '../controllers/itemController';

const router = express.Router();

// ADD NEW ITEM TO INVENTORY
router.post('/', checkToken, postItem);

// EDIT ITEM STATUS
router.put('/:id', checkToken, putItem);

// DELETE AN ITEM
router.delete('/:id', checkToken, deleteItem);

module.exports = router;
