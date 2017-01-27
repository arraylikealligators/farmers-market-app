module.exports = {

  replaceSpaceInAddress: (address) => {
    return address.split(' ').join('+');
  },

  convertMilesToKm: (miles) => {
    return miles * 1609.34;
  }
}
