export function showNotif (position, response, color, q) {
  const textColor = 'white', message = response
  q.notify({
    color,
    textColor,
    message,
    position,
    timeout: 5000
  })
}
export function showError (error, q) {
  if (error.details) {
    let messages = error.details.messages
    Object.keys(messages).map(function (objectKey, index) {
      var value = messages[objectKey]
      value.forEach(element => {
        showNotif('top', objectKey + ': ' + element, 'negative', q)
      })
    })
  } else {
    showNotif('top', error.message, 'negative', q)
  }
}
