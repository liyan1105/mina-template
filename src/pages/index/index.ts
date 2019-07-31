const bgImg = require('../../assets/bg.jpg');

Page<{}, IAnyObject>({
  data: {},
  onLoad() {
    console.log('进入首页...');
  },

  test: function() {
    this.setData({ bgImg });
  }
});
