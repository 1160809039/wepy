'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  props: {
    disabled: Boolean,
    title: {
      type: String,
      observer: function observer() {
        var parent = this.getRelationNodes('../tabs/index')[0];
        if (parent) {
          parent.setLine();
        }
      }
    }
  },

  relations: {
    '../tabs/index': {
      type: 'ancestor'
    }
  },

  data: {
    inited: false,
    active: false
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiZGlzYWJsZWQiLCJCb29sZWFuIiwidGl0bGUiLCJ0eXBlIiwiU3RyaW5nIiwib2JzZXJ2ZXIiLCJwYXJlbnQiLCJnZXRSZWxhdGlvbk5vZGVzIiwic2V0TGluZSIsInJlbGF0aW9ucyIsImRhdGEiLCJpbml0ZWQiLCJhY3RpdmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsU0FBTztBQUNMQyxjQUFVQyxPQURMO0FBRUxDLFdBQU87QUFDTEMsWUFBTUMsTUFERDtBQUVMQyxjQUZLLHNCQUVNO0FBQ1QsWUFBTUMsU0FBUyxLQUFLQyxnQkFBTCxDQUFzQixlQUF0QixFQUF1QyxDQUF2QyxDQUFmO0FBQ0EsWUFBSUQsTUFBSixFQUFZO0FBQ1ZBLGlCQUFPRSxPQUFQO0FBQ0Q7QUFDRjtBQVBJO0FBRkYsR0FERjs7QUFjTEMsYUFBVztBQUNULHFCQUFpQjtBQUNmTixZQUFNO0FBRFM7QUFEUixHQWROOztBQW9CTE8sUUFBTTtBQUNKQyxZQUFRLEtBREo7QUFFSkMsWUFBUTtBQUZKO0FBcEJELENBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9jb21tb24vY3JlYXRlJztcblxuY3JlYXRlKHtcbiAgcHJvcHM6IHtcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgb2JzZXJ2ZXIoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UmVsYXRpb25Ob2RlcygnLi4vdGFicy9pbmRleCcpWzBdO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgcGFyZW50LnNldExpbmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZWxhdGlvbnM6IHtcbiAgICAnLi4vdGFicy9pbmRleCc6IHtcbiAgICAgIHR5cGU6ICdhbmNlc3RvcidcbiAgICB9XG4gIH0sXG5cbiAgZGF0YToge1xuICAgIGluaXRlZDogZmFsc2UsXG4gICAgYWN0aXZlOiBmYWxzZVxuICB9XG59KTtcbiJdfQ==