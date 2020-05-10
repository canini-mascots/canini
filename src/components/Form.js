
export default {
  data () {
    return {
      errs: {}
    }
  },
  methods: {
    checkErrors (err, form) {
      const res = err.response
      const isInvalid = res &&
        res.status === 422 &&
        res.data.error.details

      if (isInvalid) {
        const errors = {}
        const messages = res.data.error.details.messages

        for (let field in messages) {
          const message = messages[field]
          errors[field] = message && message[message.length - 1]
        }

        this.errs = errors
        if (form) form.validate()
      }

      throw err
    }
  }
}
