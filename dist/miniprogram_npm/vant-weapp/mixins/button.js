'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var button = exports.button = Behavior({
  properties: {
    loading: Boolean,
    openType: String,
    appParameter: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    }
  },

  methods: {
    bindgetuserinfo: function bindgetuserinfo() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.$emit('getuserinfo', event.detail);
    },
    bindcontact: function bindcontact() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.$emit('contact', event.detail);
    },
    bindgetphonenumber: function bindgetphonenumber() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.$emit('getphonenumber', event.detail);
    },
    bindopensetting: function bindopensetting() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.$emit('opensetting', event.detail);
    },
    binderror: function binderror() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.$emit('error', event.detail);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJidXR0b24iLCJCZWhhdmlvciIsInByb3BlcnRpZXMiLCJsb2FkaW5nIiwiQm9vbGVhbiIsIm9wZW5UeXBlIiwiU3RyaW5nIiwiYXBwUGFyYW1ldGVyIiwic2VuZE1lc3NhZ2VUaXRsZSIsInNlbmRNZXNzYWdlUGF0aCIsInNlbmRNZXNzYWdlSW1nIiwic2hvd01lc3NhZ2VDYXJkIiwiaG92ZXJTdG9wUHJvcGFnYXRpb24iLCJob3ZlclN0YXJ0VGltZSIsInR5cGUiLCJOdW1iZXIiLCJ2YWx1ZSIsImhvdmVyU3RheVRpbWUiLCJsYW5nIiwic2Vzc2lvbkZyb20iLCJtZXRob2RzIiwiYmluZGdldHVzZXJpbmZvIiwiZXZlbnQiLCIkZW1pdCIsImRldGFpbCIsImJpbmRjb250YWN0IiwiYmluZGdldHBob25lbnVtYmVyIiwiYmluZG9wZW5zZXR0aW5nIiwiYmluZGVycm9yIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLElBQU1BLDBCQUFTQyxTQUFTO0FBQzdCQyxjQUFZO0FBQ1ZDLGFBQVNDLE9BREM7QUFFVkMsY0FBVUMsTUFGQTtBQUdWQyxrQkFBY0QsTUFISjtBQUlWRSxzQkFBa0JGLE1BSlI7QUFLVkcscUJBQWlCSCxNQUxQO0FBTVZJLG9CQUFnQkosTUFOTjtBQU9WSyxxQkFBaUJMLE1BUFA7QUFRVk0sMEJBQXNCUixPQVJaO0FBU1ZTLG9CQUFnQjtBQUNkQyxZQUFNQyxNQURRO0FBRWRDLGFBQU87QUFGTyxLQVROO0FBYVZDLG1CQUFlO0FBQ2JILFlBQU1DLE1BRE87QUFFYkMsYUFBTztBQUZNLEtBYkw7QUFpQlZFLFVBQU07QUFDSkosWUFBTVIsTUFERjtBQUVKVSxhQUFPO0FBRkgsS0FqQkk7QUFxQlZHLGlCQUFhO0FBQ1hMLFlBQU1SLE1BREs7QUFFWFUsYUFBTztBQUZJO0FBckJILEdBRGlCOztBQTRCN0JJLFdBQVM7QUFDUEMsbUJBRE8sNkJBQ3FCO0FBQUEsVUFBWkMsS0FBWSx1RUFBSixFQUFJOztBQUMxQixXQUFLQyxLQUFMLENBQVcsYUFBWCxFQUEwQkQsTUFBTUUsTUFBaEM7QUFDRCxLQUhNO0FBS1BDLGVBTE8seUJBS2lCO0FBQUEsVUFBWkgsS0FBWSx1RUFBSixFQUFJOztBQUN0QixXQUFLQyxLQUFMLENBQVcsU0FBWCxFQUFzQkQsTUFBTUUsTUFBNUI7QUFDRCxLQVBNO0FBU1BFLHNCQVRPLGdDQVN3QjtBQUFBLFVBQVpKLEtBQVksdUVBQUosRUFBSTs7QUFDN0IsV0FBS0MsS0FBTCxDQUFXLGdCQUFYLEVBQTZCRCxNQUFNRSxNQUFuQztBQUNELEtBWE07QUFhUEcsbUJBYk8sNkJBYXFCO0FBQUEsVUFBWkwsS0FBWSx1RUFBSixFQUFJOztBQUMxQixXQUFLQyxLQUFMLENBQVcsYUFBWCxFQUEwQkQsTUFBTUUsTUFBaEM7QUFDRCxLQWZNO0FBaUJQSSxhQWpCTyx1QkFpQmU7QUFBQSxVQUFaTixLQUFZLHVFQUFKLEVBQUk7O0FBQ3BCLFdBQUtDLEtBQUwsQ0FBVyxPQUFYLEVBQW9CRCxNQUFNRSxNQUExQjtBQUNEO0FBbkJNO0FBNUJvQixDQUFULENBQWYiLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGJ1dHRvbiA9IEJlaGF2aW9yKHtcbiAgcHJvcGVydGllczoge1xuICAgIGxvYWRpbmc6IEJvb2xlYW4sXG4gICAgb3BlblR5cGU6IFN0cmluZyxcbiAgICBhcHBQYXJhbWV0ZXI6IFN0cmluZyxcbiAgICBzZW5kTWVzc2FnZVRpdGxlOiBTdHJpbmcsXG4gICAgc2VuZE1lc3NhZ2VQYXRoOiBTdHJpbmcsXG4gICAgc2VuZE1lc3NhZ2VJbWc6IFN0cmluZyxcbiAgICBzaG93TWVzc2FnZUNhcmQ6IFN0cmluZyxcbiAgICBob3ZlclN0b3BQcm9wYWdhdGlvbjogQm9vbGVhbixcbiAgICBob3ZlclN0YXJ0VGltZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDIwXG4gICAgfSxcbiAgICBob3ZlclN0YXlUaW1lOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogNzBcbiAgICB9LFxuICAgIGxhbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnZW4nXG4gICAgfSxcbiAgICBzZXNzaW9uRnJvbToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBiaW5kZ2V0dXNlcmluZm8oZXZlbnQgPSB7fSkge1xuICAgICAgdGhpcy4kZW1pdCgnZ2V0dXNlcmluZm8nLCBldmVudC5kZXRhaWwpO1xuICAgIH0sXG5cbiAgICBiaW5kY29udGFjdChldmVudCA9IHt9KSB7XG4gICAgICB0aGlzLiRlbWl0KCdjb250YWN0JywgZXZlbnQuZGV0YWlsKTtcbiAgICB9LFxuXG4gICAgYmluZGdldHBob25lbnVtYmVyKGV2ZW50ID0ge30pIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2dldHBob25lbnVtYmVyJywgZXZlbnQuZGV0YWlsKTtcbiAgICB9LFxuXG4gICAgYmluZG9wZW5zZXR0aW5nKGV2ZW50ID0ge30pIHtcbiAgICAgIHRoaXMuJGVtaXQoJ29wZW5zZXR0aW5nJywgZXZlbnQuZGV0YWlsKTtcbiAgICB9LFxuXG4gICAgYmluZGVycm9yKGV2ZW50ID0ge30pIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2Vycm9yJywgZXZlbnQuZGV0YWlsKTtcbiAgICB9XG4gIH1cbn0pO1xuIl19