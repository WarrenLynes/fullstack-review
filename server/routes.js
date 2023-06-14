const router = require('express').Router();
const {
  getReposByUsername,
  getUserByUsername
} = require('../helpers/github');



module.exports = function (db) {

  async function getTop25Repos() {
    return db.Repo
      .find()
      .sort(
        [
          ['rating', -1],
          ['watchers_count', -1],
          ['stargazers_count', -1],
        ]
      )
      .limit(25)
      .exec();
  };

  async function createUser(username) {
    // fetch user
    const userProfile = await getUserByUsername(username);

    if (!userProfile) {
      throw Error('NO USER FOUND');
    }
    // create user in mongo
    return new db.User({
      username: userProfile.login.toLowerCase(),
      avatar_url: userProfile.avatar_url,
      name: userProfile.name.toLowerCase()
    });
  }

  async function createRepo(repo, indx) {
    return db.Repo.create({
      name: repo.name,
      github_id: repo.id,
      url: repo.html_url,
      description: repo.description,
      stargazers_count: indx + 1,
      watchers_count: Math.floor(Math.random() * 100),
      forks_count: repo.forks_count,
      owner: user._id
    }).save()
  }

  router.post('/', async function (req, res) {
    let user = await db.User.findOne({ username: req.body.username })

    if (!user) {
      try {
        user = await createUser(req.body.username);
      } catch (err) {
        return res.status(500).send('unable to find user');
      }
    }

    //fetch user-repos
    const userRepos = await getReposByUsername(req.body.username)
      .then((data) =>
        Promise.all(
          data.map((repo, indx) =>
            db.Repo.create({
              name: repo.name,
              github_id: repo.id,
              url: repo.html_url,
              description: repo.description,
              stargazers_count: indx + 1,
              watchers_count: Math.floor(Math.random() * 100),
              forks_count: repo.forks_count,
              owner: user._id
            })
              .then((x) => user.repos.push(x))
              .catch(e => console.log(e.code))
          )
        )
      ).then((newRepos) =>
        user.save()
      ).then((newRepos) => {
        res.sendStatus(201);
      }).catch((err) => {
        res.sendStatus(500);
      });
  });

  router.get('/', async function (req, res) {
    // TODO - your code here!
    // This route should send back the top 25 repos
    const repos = await getTop25Repos();
    res.send(repos);
  });
  return router
}