const fs = require('fs')

const { dlibLocalLib } = require('./constants')
const { requireGit, requireCmake } = require('./lib/utils')
const setupDlib = require('./lib/setup-dlib')

function install() {
  if (process.env.DLIB_INCLUDE_DIR && process.env.DLIB_LIB_DIR) {
    console.log('found dlib')
    console.log('DLIB_INCLUDE_DIR:', process.env.DLIB_INCLUDE_DIR)
    console.log('DLIB_LIB_DIR:', process.env.DLIB_LIB_DIR)
    return
  }

  // prevent rebuild on every install
  if (fs.existsSync(dlibLocalLib)) {
    console.log('found dlib lib:', dlibLocalLib)
    return
  }

  return requireGit()
    .then(requireCmake)
    .then(setupDlib)
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

install()