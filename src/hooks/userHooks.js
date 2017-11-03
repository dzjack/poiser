module.exports = {
  before: {
    get(hook) {
      hook.params.query = {}
      hook.params.query.$eager = '[intolerances]'
    }
  }
}
