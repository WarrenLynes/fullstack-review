const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost/fetcher',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
);



let repoSchema = mongoose.Schema({
  name: String,
  github_id: {
    type: Number,
    unique: true
  },
  url: {
    type: String,
    // index: true,
    unique: true
  },
  description: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  comb: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

repoSchema.pre('save', function (next) {
  this.rating = this.stargazers_count + this.watchers_count;
  next();
})

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  avatar_url: String,
  repos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repo' }]
});

let User = mongoose.model('User', userSchema);
let Repo = mongoose.model('Repo', repoSchema);

// let save = async (/* TODO */) => {
//   const newUser = new User(
//     {
//       username: 'warrenlynes'
//     }
//   );
//   const x = await newUser.save();
//   console.log(x);

//   let newRepo = new Repo({ name: 'test game', url: '/url', owner: newUser._id })
//   await newRepo.save();
//   newUser.repos.push(newRepo);
//   await newUser.save();
// }



module.exports = {
  User, Repo
};