'use strict';

var _create = require('./../common/create.js');

var _transition = require('./../mixins/transition.js');

(0, _create.create)({
  mixins: [(0, _transition.transition)(false)],

  props: {
    overlayStyle: String,
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center'
    }
  },

  methods: {
    onClickOverlay: function onClickOverlay() {
      this.$emit('click-overlay');

      if (this.data.closeOnClickOverlay) {
        this.$emit('close');
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsInByb3BzIiwib3ZlcmxheVN0eWxlIiwiU3RyaW5nIiwib3ZlcmxheSIsInR5cGUiLCJCb29sZWFuIiwidmFsdWUiLCJjbG9zZU9uQ2xpY2tPdmVybGF5IiwicG9zaXRpb24iLCJtZXRob2RzIiwib25DbGlja092ZXJsYXkiLCIkZW1pdCIsImRhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBRUEsb0JBQU87QUFDTEEsVUFBUSxDQUFDLDRCQUFXLEtBQVgsQ0FBRCxDQURIOztBQUdMQyxTQUFPO0FBQ0xDLGtCQUFjQyxNQURUO0FBRUxDLGFBQVM7QUFDUEMsWUFBTUMsT0FEQztBQUVQQyxhQUFPO0FBRkEsS0FGSjtBQU1MQyx5QkFBcUI7QUFDbkJILFlBQU1DLE9BRGE7QUFFbkJDLGFBQU87QUFGWSxLQU5oQjtBQVVMRSxjQUFVO0FBQ1JKLFlBQU1GLE1BREU7QUFFUkksYUFBTztBQUZDO0FBVkwsR0FIRjs7QUFtQkxHLFdBQVM7QUFDUEMsa0JBRE8sNEJBQ1U7QUFDZixXQUFLQyxLQUFMLENBQVcsZUFBWDs7QUFFQSxVQUFJLEtBQUtDLElBQUwsQ0FBVUwsbUJBQWQsRUFBbUM7QUFDakMsYUFBS0ksS0FBTCxDQUFXLE9BQVg7QUFDRDtBQUNGO0FBUE07QUFuQkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuaW1wb3J0IHsgdHJhbnNpdGlvbiB9IGZyb20gJy4uL21peGlucy90cmFuc2l0aW9uJztcblxuY3JlYXRlKHtcbiAgbWl4aW5zOiBbdHJhbnNpdGlvbihmYWxzZSldLFxuXG4gIHByb3BzOiB7XG4gICAgb3ZlcmxheVN0eWxlOiBTdHJpbmcsXG4gICAgb3ZlcmxheToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU9uQ2xpY2tPdmVybGF5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ2NlbnRlcidcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2xpY2tPdmVybGF5KCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xpY2stb3ZlcmxheScpO1xuXG4gICAgICBpZiAodGhpcy5kYXRhLmNsb3NlT25DbGlja092ZXJsYXkpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuIl19