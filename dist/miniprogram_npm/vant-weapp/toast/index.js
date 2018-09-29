'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    show: Boolean,
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    type: {
      type: String,
      value: 'text'
    },
    loadingType: {
      type: String,
      value: 'circular'
    },
    position: {
      type: String,
      value: 'middle'
    }
  },

  methods: {
    clear: function clear() {
      this.setData({
        show: false
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwic2hvdyIsIkJvb2xlYW4iLCJtYXNrIiwibWVzc2FnZSIsIlN0cmluZyIsImZvcmJpZENsaWNrIiwidHlwZSIsInZhbHVlIiwibG9hZGluZ1R5cGUiLCJwb3NpdGlvbiIsIm1ldGhvZHMiLCJjbGVhciIsInNldERhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsU0FBTztBQUNMQyxVQUFNQyxPQUREO0FBRUxDLFVBQU1ELE9BRkQ7QUFHTEUsYUFBU0MsTUFISjtBQUlMQyxpQkFBYUosT0FKUjtBQUtMSyxVQUFNO0FBQ0pBLFlBQU1GLE1BREY7QUFFSkcsYUFBTztBQUZILEtBTEQ7QUFTTEMsaUJBQWE7QUFDWEYsWUFBTUYsTUFESztBQUVYRyxhQUFPO0FBRkksS0FUUjtBQWFMRSxjQUFVO0FBQ1JILFlBQU1GLE1BREU7QUFFUkcsYUFBTztBQUZDO0FBYkwsR0FERjs7QUFvQkxHLFdBQVM7QUFDUEMsU0FETyxtQkFDQztBQUNOLFdBQUtDLE9BQUwsQ0FBYTtBQUNYWixjQUFNO0FBREssT0FBYjtBQUdEO0FBTE07QUFwQkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBwcm9wczoge1xuICAgIHNob3c6IEJvb2xlYW4sXG4gICAgbWFzazogQm9vbGVhbixcbiAgICBtZXNzYWdlOiBTdHJpbmcsXG4gICAgZm9yYmlkQ2xpY2s6IEJvb2xlYW4sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICd0ZXh0J1xuICAgIH0sXG4gICAgbG9hZGluZ1R5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnY2lyY3VsYXInXG4gICAgfSxcbiAgICBwb3NpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICdtaWRkbGUnXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBjbGVhcigpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHNob3c6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuIl19