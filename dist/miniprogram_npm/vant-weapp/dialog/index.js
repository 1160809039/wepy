'use strict';

var _create = require('./../common/create.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _create.create)({
  props: {
    title: String,
    message: String,
    useSlot: Boolean,
    asyncClose: Boolean,
    showCancelButton: Boolean,
    confirmButtonOpenType: String,
    show: {
      type: Boolean,
      observer: function observer(show) {
        if (!show) {
          this.setData({
            loading: {
              confirm: false,
              cancel: false
            }
          });
        }
      }
    },
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: false
    }
  },

  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },

  methods: {
    onConfirm: function onConfirm() {
      this.handleAction('confirm');
    },
    onCancel: function onCancel() {
      this.handleAction('cancel');
    },
    onClickOverlay: function onClickOverlay() {
      this.onClose('overlay');
    },
    handleAction: function handleAction(action) {
      if (this.data.asyncClose) {
        this.setData(_defineProperty({}, 'loading.' + action, true));
      }

      this.onClose(action);
    },
    onClose: function onClose(action) {
      if (!this.data.asyncClose) {
        this.setData({ show: false });
      }
      this.$emit('close', action);
      this.$emit(action);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwidGl0bGUiLCJTdHJpbmciLCJtZXNzYWdlIiwidXNlU2xvdCIsIkJvb2xlYW4iLCJhc3luY0Nsb3NlIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25PcGVuVHlwZSIsInNob3ciLCJ0eXBlIiwib2JzZXJ2ZXIiLCJzZXREYXRhIiwibG9hZGluZyIsImNvbmZpcm0iLCJjYW5jZWwiLCJjb25maXJtQnV0dG9uVGV4dCIsInZhbHVlIiwiY2FuY2VsQnV0dG9uVGV4dCIsInNob3dDb25maXJtQnV0dG9uIiwib3ZlcmxheSIsImNsb3NlT25DbGlja092ZXJsYXkiLCJkYXRhIiwibWV0aG9kcyIsIm9uQ29uZmlybSIsImhhbmRsZUFjdGlvbiIsIm9uQ2FuY2VsIiwib25DbGlja092ZXJsYXkiLCJvbkNsb3NlIiwiYWN0aW9uIiwiJGVtaXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFFQSxvQkFBTztBQUNMQSxTQUFPO0FBQ0xDLFdBQU9DLE1BREY7QUFFTEMsYUFBU0QsTUFGSjtBQUdMRSxhQUFTQyxPQUhKO0FBSUxDLGdCQUFZRCxPQUpQO0FBS0xFLHNCQUFrQkYsT0FMYjtBQU1MRywyQkFBdUJOLE1BTmxCO0FBT0xPLFVBQU07QUFDSkMsWUFBTUwsT0FERjtBQUVKTSxjQUZJLG9CQUVLRixJQUZMLEVBRVc7QUFDYixZQUFJLENBQUNBLElBQUwsRUFBVztBQUNULGVBQUtHLE9BQUwsQ0FBYTtBQUNYQyxxQkFBUztBQUNQQyx1QkFBUyxLQURGO0FBRVBDLHNCQUFRO0FBRkQ7QUFERSxXQUFiO0FBTUQ7QUFDRjtBQVhHLEtBUEQ7QUFvQkxDLHVCQUFtQjtBQUNqQk4sWUFBTVIsTUFEVztBQUVqQmUsYUFBTztBQUZVLEtBcEJkO0FBd0JMQyxzQkFBa0I7QUFDaEJSLFlBQU1SLE1BRFU7QUFFaEJlLGFBQU87QUFGUyxLQXhCYjtBQTRCTEUsdUJBQW1CO0FBQ2pCVCxZQUFNTCxPQURXO0FBRWpCWSxhQUFPO0FBRlUsS0E1QmQ7QUFnQ0xHLGFBQVM7QUFDUFYsWUFBTUwsT0FEQztBQUVQWSxhQUFPO0FBRkEsS0FoQ0o7QUFvQ0xJLHlCQUFxQjtBQUNuQlgsWUFBTUwsT0FEYTtBQUVuQlksYUFBTztBQUZZO0FBcENoQixHQURGOztBQTJDTEssUUFBTTtBQUNKVCxhQUFTO0FBQ1BDLGVBQVMsS0FERjtBQUVQQyxjQUFRO0FBRkQ7QUFETCxHQTNDRDs7QUFrRExRLFdBQVM7QUFDUEMsYUFETyx1QkFDSztBQUNWLFdBQUtDLFlBQUwsQ0FBa0IsU0FBbEI7QUFDRCxLQUhNO0FBS1BDLFlBTE8sc0JBS0k7QUFDVCxXQUFLRCxZQUFMLENBQWtCLFFBQWxCO0FBQ0QsS0FQTTtBQVNQRSxrQkFUTyw0QkFTVTtBQUNmLFdBQUtDLE9BQUwsQ0FBYSxTQUFiO0FBQ0QsS0FYTTtBQWFQSCxnQkFiTyx3QkFhTUksTUFiTixFQWFjO0FBQ25CLFVBQUksS0FBS1AsSUFBTCxDQUFVaEIsVUFBZCxFQUEwQjtBQUN4QixhQUFLTSxPQUFMLGtDQUNjaUIsTUFEZCxFQUN5QixJQUR6QjtBQUdEOztBQUVELFdBQUtELE9BQUwsQ0FBYUMsTUFBYjtBQUNELEtBckJNO0FBdUJQRCxXQXZCTyxtQkF1QkNDLE1BdkJELEVBdUJTO0FBQ2QsVUFBSSxDQUFDLEtBQUtQLElBQUwsQ0FBVWhCLFVBQWYsRUFBMkI7QUFDekIsYUFBS00sT0FBTCxDQUFhLEVBQUVILE1BQU0sS0FBUixFQUFiO0FBQ0Q7QUFDRCxXQUFLcUIsS0FBTCxDQUFXLE9BQVgsRUFBb0JELE1BQXBCO0FBQ0EsV0FBS0MsS0FBTCxDQUFXRCxNQUFYO0FBQ0Q7QUE3Qk07QUFsREosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBwcm9wczoge1xuICAgIHRpdGxlOiBTdHJpbmcsXG4gICAgbWVzc2FnZTogU3RyaW5nLFxuICAgIHVzZVNsb3Q6IEJvb2xlYW4sXG4gICAgYXN5bmNDbG9zZTogQm9vbGVhbixcbiAgICBzaG93Q2FuY2VsQnV0dG9uOiBCb29sZWFuLFxuICAgIGNvbmZpcm1CdXR0b25PcGVuVHlwZTogU3RyaW5nLFxuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBvYnNlcnZlcihzaG93KSB7XG4gICAgICAgIGlmICghc2hvdykge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgIGNvbmZpcm06IGZhbHNlLFxuICAgICAgICAgICAgICBjYW5jZWw6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbmZpcm1CdXR0b25UZXh0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ+ehruiupCdcbiAgICB9LFxuICAgIGNhbmNlbEJ1dHRvblRleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAn5Y+W5raIJ1xuICAgIH0sXG4gICAgc2hvd0NvbmZpcm1CdXR0b246IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogdHJ1ZVxuICAgIH0sXG4gICAgb3ZlcmxheToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiB0cnVlXG4gICAgfSxcbiAgICBjbG9zZU9uQ2xpY2tPdmVybGF5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6IHtcbiAgICBsb2FkaW5nOiB7XG4gICAgICBjb25maXJtOiBmYWxzZSxcbiAgICAgIGNhbmNlbDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ29uZmlybSgpIHtcbiAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCdjb25maXJtJyk7XG4gICAgfSxcblxuICAgIG9uQ2FuY2VsKCkge1xuICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oJ2NhbmNlbCcpO1xuICAgIH0sXG5cbiAgICBvbkNsaWNrT3ZlcmxheSgpIHtcbiAgICAgIHRoaXMub25DbG9zZSgnb3ZlcmxheScpO1xuICAgIH0sXG5cbiAgICBoYW5kbGVBY3Rpb24oYWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmFzeW5jQ2xvc2UpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBbYGxvYWRpbmcuJHthY3Rpb259YF06IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub25DbG9zZShhY3Rpb24pO1xuICAgIH0sXG5cbiAgICBvbkNsb3NlKGFjdGlvbikge1xuICAgICAgaWYgKCF0aGlzLmRhdGEuYXN5bmNDbG9zZSkge1xuICAgICAgICB0aGlzLnNldERhdGEoeyBzaG93OiBmYWxzZSB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJywgYWN0aW9uKTtcbiAgICAgIHRoaXMuJGVtaXQoYWN0aW9uKTtcbiAgICB9XG4gIH1cbn0pO1xuIl19