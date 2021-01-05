import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Item name is required.',
  },
  status: {
    type: String,
    enum: ['Inventory', 'Wishlist'],
    default: 'Inventory',
  },
});

ItemSchema.pre('deleteOne', async function (this: mongoose.Document) {
  try {
    await this.model('Excursion').deleteOne({ item_ids: this._id });
  } catch (error) {
    console.log(error);
  }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
