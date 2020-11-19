import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/trackPacker2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Successfully connected to database.');
  })
  .catch(err => {
    console.log('Unable to connect to database.');
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});
