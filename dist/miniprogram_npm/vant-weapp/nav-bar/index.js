'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  classes: ['title-class'],

  props: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    fixed: Boolean,
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onClickLeft: function onClickLeft() {
      this.$emit('click-left');
    },
    onClickRight: function onClickRight() {
      this.$emit('click-right');
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJwcm9wcyIsInRpdGxlIiwiU3RyaW5nIiwibGVmdFRleHQiLCJyaWdodFRleHQiLCJsZWZ0QXJyb3ciLCJCb29sZWFuIiwiZml4ZWQiLCJ6SW5kZXgiLCJ0eXBlIiwiTnVtYmVyIiwidmFsdWUiLCJtZXRob2RzIiwib25DbGlja0xlZnQiLCIkZW1pdCIsIm9uQ2xpY2tSaWdodCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxvQkFBTztBQUNMQSxXQUFTLENBQUMsYUFBRCxDQURKOztBQUdMQyxTQUFPO0FBQ0xDLFdBQU9DLE1BREY7QUFFTEMsY0FBVUQsTUFGTDtBQUdMRSxlQUFXRixNQUhOO0FBSUxHLGVBQVdDLE9BSk47QUFLTEMsV0FBT0QsT0FMRjtBQU1MRSxZQUFRO0FBQ05DLFlBQU1DLE1BREE7QUFFTkMsYUFBTztBQUZEO0FBTkgsR0FIRjs7QUFlTEMsV0FBUztBQUNQQyxlQURPLHlCQUNPO0FBQ1osV0FBS0MsS0FBTCxDQUFXLFlBQVg7QUFDRCxLQUhNO0FBS1BDLGdCQUxPLDBCQUtRO0FBQ2IsV0FBS0QsS0FBTCxDQUFXLGFBQVg7QUFDRDtBQVBNO0FBZkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBjbGFzc2VzOiBbJ3RpdGxlLWNsYXNzJ10sXG5cbiAgcHJvcHM6IHtcbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIGxlZnRUZXh0OiBTdHJpbmcsXG4gICAgcmlnaHRUZXh0OiBTdHJpbmcsXG4gICAgbGVmdEFycm93OiBCb29sZWFuLFxuICAgIGZpeGVkOiBCb29sZWFuLFxuICAgIHpJbmRleDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDFcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2xpY2tMZWZ0KCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xpY2stbGVmdCcpO1xuICAgIH0sXG5cbiAgICBvbkNsaWNrUmlnaHQoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjbGljay1yaWdodCcpO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=