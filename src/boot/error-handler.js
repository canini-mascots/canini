
export default async ({ app, Vue }) => {
  /*
  window.onunhandledrejection = function (event) {
    if (event.reason.response.data.error) {
      errorHandler(event.reason)
      event.preventDefault()
    }
  }
  */
  Vue.config.errorHandler = (err, vm, info) => {
    errorHandler(err, vm)
  }

  function errorHandler (err, vm) {
    let message
    const res = err.response

    if (res) {
      const status = res.status

      if (status === 403) {
        vm.$router.push('/login')
      }

      if (status >= 400 && status < 500) {
        message = res.data.error.message
      } else if (status >= 500) {
        message = vm.$t('internalServerError')
      }
    } else {
      message = vm.$t('somethingWentWrong')
      console.error(err)
    }

    vm.$q.notify({
      message: message,
      type: 'negative'
    })
  }
}
