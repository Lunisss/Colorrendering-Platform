// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-mean-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});