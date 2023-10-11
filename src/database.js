const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const url = 'mongodb+srv://opariche:Ki-8585-k@atlascluster.1tvp7on.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url ,{ 

 useNewUrlParser: true,
 useUnifiedTopology: true
})
const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});
module.exports =  mongoose;