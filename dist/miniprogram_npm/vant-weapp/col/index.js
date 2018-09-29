'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  relations: {
    '../row/index': {
      type: 'ancestor'
    }
  },

  props: {
    span: Number,
    offset: Number
  },

  methods: {
    setGutter: function setGutter(gutter) {
      var padding = gutter / 2 + 'px';
      var style = gutter ? 'padding-left: ' + padding + '; padding-right: ' + padding + ';' : '';
      this.setData({ style: style });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9ucyIsInR5cGUiLCJwcm9wcyIsInNwYW4iLCJOdW1iZXIiLCJvZmZzZXQiLCJtZXRob2RzIiwic2V0R3V0dGVyIiwiZ3V0dGVyIiwicGFkZGluZyIsInN0eWxlIiwic2V0RGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxvQkFBTztBQUNMQSxhQUFXO0FBQ1Qsb0JBQWdCO0FBQ2RDLFlBQU07QUFEUTtBQURQLEdBRE47O0FBT0xDLFNBQU87QUFDTEMsVUFBTUMsTUFERDtBQUVMQyxZQUFRRDtBQUZILEdBUEY7O0FBWUxFLFdBQVM7QUFDUEMsYUFETyxxQkFDR0MsTUFESCxFQUNXO0FBQ2hCLFVBQU1DLFVBQWFELFNBQVMsQ0FBdEIsT0FBTjtBQUNBLFVBQU1FLFFBQVFGLDRCQUEwQkMsT0FBMUIseUJBQXFEQSxPQUFyRCxTQUFrRSxFQUFoRjtBQUNBLFdBQUtFLE9BQUwsQ0FBYSxFQUFFRCxZQUFGLEVBQWI7QUFDRDtBQUxNO0FBWkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICByZWxhdGlvbnM6IHtcbiAgICAnLi4vcm93L2luZGV4Jzoge1xuICAgICAgdHlwZTogJ2FuY2VzdG9yJ1xuICAgIH1cbiAgfSxcblxuICBwcm9wczoge1xuICAgIHNwYW46IE51bWJlcixcbiAgICBvZmZzZXQ6IE51bWJlclxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBzZXRHdXR0ZXIoZ3V0dGVyKSB7XG4gICAgICBjb25zdCBwYWRkaW5nID0gYCR7Z3V0dGVyIC8gMn1weGA7XG4gICAgICBjb25zdCBzdHlsZSA9IGd1dHRlciA/IGBwYWRkaW5nLWxlZnQ6ICR7cGFkZGluZ307IHBhZGRpbmctcmlnaHQ6ICR7cGFkZGluZ307YCA6ICcnO1xuICAgICAgdGhpcy5zZXREYXRhKHsgc3R5bGUgfSk7XG4gICAgfVxuICB9XG59KTtcbiJdfQ==