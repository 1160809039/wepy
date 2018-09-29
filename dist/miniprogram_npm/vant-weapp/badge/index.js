'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  relations: {
    '../badge-group/index': {
      type: 'ancestor'
    }
  },

  props: {
    info: Number,
    title: String
  },

  methods: {
    onClick: function onClick() {
      var group = this.getRelationNodes('../badge-group/index')[0];
      if (group) {
        group.setActive(this);
      }
    },
    setActive: function setActive(active) {
      this.setData({ active: active });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9ucyIsInR5cGUiLCJwcm9wcyIsImluZm8iLCJOdW1iZXIiLCJ0aXRsZSIsIlN0cmluZyIsIm1ldGhvZHMiLCJvbkNsaWNrIiwiZ3JvdXAiLCJnZXRSZWxhdGlvbk5vZGVzIiwic2V0QWN0aXZlIiwiYWN0aXZlIiwic2V0RGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxvQkFBTztBQUNMQSxhQUFXO0FBQ1QsNEJBQXdCO0FBQ3RCQyxZQUFNO0FBRGdCO0FBRGYsR0FETjs7QUFPTEMsU0FBTztBQUNMQyxVQUFNQyxNQUREO0FBRUxDLFdBQU9DO0FBRkYsR0FQRjs7QUFZTEMsV0FBUztBQUNQQyxXQURPLHFCQUNHO0FBQ1IsVUFBTUMsUUFBUSxLQUFLQyxnQkFBTCxDQUFzQixzQkFBdEIsRUFBOEMsQ0FBOUMsQ0FBZDtBQUNBLFVBQUlELEtBQUosRUFBVztBQUNUQSxjQUFNRSxTQUFOLENBQWdCLElBQWhCO0FBQ0Q7QUFDRixLQU5NO0FBUVBBLGFBUk8scUJBUUdDLE1BUkgsRUFRVztBQUNoQixXQUFLQyxPQUFMLENBQWEsRUFBRUQsY0FBRixFQUFiO0FBQ0Q7QUFWTTtBQVpKLENBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9jb21tb24vY3JlYXRlJztcblxuY3JlYXRlKHtcbiAgcmVsYXRpb25zOiB7XG4gICAgJy4uL2JhZGdlLWdyb3VwL2luZGV4Jzoge1xuICAgICAgdHlwZTogJ2FuY2VzdG9yJ1xuICAgIH1cbiAgfSxcblxuICBwcm9wczoge1xuICAgIGluZm86IE51bWJlcixcbiAgICB0aXRsZTogU3RyaW5nXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0UmVsYXRpb25Ob2RlcygnLi4vYmFkZ2UtZ3JvdXAvaW5kZXgnKVswXTtcbiAgICAgIGlmIChncm91cCkge1xuICAgICAgICBncm91cC5zZXRBY3RpdmUodGhpcyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldEFjdGl2ZShhY3RpdmUpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7IGFjdGl2ZSB9KTtcbiAgICB9XG4gIH1cbn0pO1xuIl19