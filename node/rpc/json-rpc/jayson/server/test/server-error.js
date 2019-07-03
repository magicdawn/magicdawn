module.exports = async params => {
  console.log('ready to boom')
  throw new Error('boom')
}
