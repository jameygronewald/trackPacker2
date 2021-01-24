import express from 'express';
import checkToken from '../middleware/checkToken';
import { postExcursion, deleteExcursion, putExcursionAddItem, putExcursionDeleteItem } from '../controllers/excursionController';

const router = express.Router();

// ADD AN EXCURSION
router.post('/', checkToken, postExcursion);

// DELETE AN EXCURSION
router.delete('/:id', checkToken, deleteExcursion);

// ADD ITEM TO EXCURSION
router.put('/add/:id', checkToken, putExcursionAddItem);

// DELETE AN ITEM FROM AN EXCURSION
router.put('/delete/:id', checkToken, putExcursionDeleteItem);

module.exports = router;
