module.exports = {
  before: {
    get(hook) {
      hook.params.query.$eager = '[userIntolerances]'
    }
  }
}
