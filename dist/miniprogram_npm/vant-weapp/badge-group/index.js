'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  relations: {
    '../badge/index': {
      type: 'descendant',

      linked: function linked(target) {
        this.data.badges.push(target);
        this.setActive();
      },
      unlinked: function unlinked(target) {
        this.data.badges = this.data.badges.filter(function (item) {
          return item !== target;
        });
        this.setActive();
      }
    }
  },

  props: {
    active: {
      type: Number,
      value: 0,
      observer: 'setActive'
    }
  },

  data: {
    badges: []
  },

  attached: function attached() {
    this.currentActive = -1;
  },


  methods: {
    setActive: function setActive(badge) {
      var active = this.data.active;

      if (badge) {
        active = this.data.badges.indexOf(badge);
      }

      if (active === this.currentActive) {
        return;
      }

      if (this.currentActive !== -1) {
        this.$emit('change', active);
      }

      this.currentActive = active;
      this.data.badges.forEach(function (badge, index) {
        badge.setActive(index === active);
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9ucyIsInR5cGUiLCJsaW5rZWQiLCJ0YXJnZXQiLCJkYXRhIiwiYmFkZ2VzIiwicHVzaCIsInNldEFjdGl2ZSIsInVubGlua2VkIiwiZmlsdGVyIiwiaXRlbSIsInByb3BzIiwiYWN0aXZlIiwiTnVtYmVyIiwidmFsdWUiLCJvYnNlcnZlciIsImF0dGFjaGVkIiwiY3VycmVudEFjdGl2ZSIsIm1ldGhvZHMiLCJiYWRnZSIsImluZGV4T2YiLCIkZW1pdCIsImZvckVhY2giLCJpbmRleCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxvQkFBTztBQUNMQSxhQUFXO0FBQ1Qsc0JBQWtCO0FBQ2hCQyxZQUFNLFlBRFU7O0FBR2hCQyxZQUhnQixrQkFHVEMsTUFIUyxFQUdEO0FBQ2IsYUFBS0MsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxJQUFqQixDQUFzQkgsTUFBdEI7QUFDQSxhQUFLSSxTQUFMO0FBQ0QsT0FOZTtBQVFoQkMsY0FSZ0Isb0JBUVBMLE1BUk8sRUFRQztBQUNmLGFBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixLQUFLRCxJQUFMLENBQVVDLE1BQVYsQ0FBaUJJLE1BQWpCLENBQXdCO0FBQUEsaUJBQVFDLFNBQVNQLE1BQWpCO0FBQUEsU0FBeEIsQ0FBbkI7QUFDQSxhQUFLSSxTQUFMO0FBQ0Q7QUFYZTtBQURULEdBRE47O0FBaUJMSSxTQUFPO0FBQ0xDLFlBQVE7QUFDTlgsWUFBTVksTUFEQTtBQUVOQyxhQUFPLENBRkQ7QUFHTkMsZ0JBQVU7QUFISjtBQURILEdBakJGOztBQXlCTFgsUUFBTTtBQUNKQyxZQUFRO0FBREosR0F6QkQ7O0FBNkJMVyxVQTdCSyxzQkE2Qk07QUFDVCxTQUFLQyxhQUFMLEdBQXFCLENBQUMsQ0FBdEI7QUFDRCxHQS9CSTs7O0FBaUNMQyxXQUFTO0FBQ1BYLGFBRE8scUJBQ0dZLEtBREgsRUFDVTtBQUFBLFVBQ1RQLE1BRFMsR0FDRSxLQUFLUixJQURQLENBQ1RRLE1BRFM7O0FBRWYsVUFBSU8sS0FBSixFQUFXO0FBQ1RQLGlCQUFTLEtBQUtSLElBQUwsQ0FBVUMsTUFBVixDQUFpQmUsT0FBakIsQ0FBeUJELEtBQXpCLENBQVQ7QUFDRDs7QUFFRCxVQUFJUCxXQUFXLEtBQUtLLGFBQXBCLEVBQW1DO0FBQ2pDO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLQSxhQUFMLEtBQXVCLENBQUMsQ0FBNUIsRUFBK0I7QUFDN0IsYUFBS0ksS0FBTCxDQUFXLFFBQVgsRUFBcUJULE1BQXJCO0FBQ0Q7O0FBRUQsV0FBS0ssYUFBTCxHQUFxQkwsTUFBckI7QUFDQSxXQUFLUixJQUFMLENBQVVDLE1BQVYsQ0FBaUJpQixPQUFqQixDQUF5QixVQUFDSCxLQUFELEVBQVFJLEtBQVIsRUFBa0I7QUFDekNKLGNBQU1aLFNBQU4sQ0FBZ0JnQixVQUFVWCxNQUExQjtBQUNELE9BRkQ7QUFHRDtBQW5CTTtBQWpDSixDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnLi4vY29tbW9uL2NyZWF0ZSc7XG5cbmNyZWF0ZSh7XG4gIHJlbGF0aW9uczoge1xuICAgICcuLi9iYWRnZS9pbmRleCc6IHtcbiAgICAgIHR5cGU6ICdkZXNjZW5kYW50JyxcblxuICAgICAgbGlua2VkKHRhcmdldCkge1xuICAgICAgICB0aGlzLmRhdGEuYmFkZ2VzLnB1c2godGFyZ2V0KTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmUoKTtcbiAgICAgIH0sXG5cbiAgICAgIHVubGlua2VkKHRhcmdldCkge1xuICAgICAgICB0aGlzLmRhdGEuYmFkZ2VzID0gdGhpcy5kYXRhLmJhZGdlcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0YXJnZXQpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBwcm9wczoge1xuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDAsXG4gICAgICBvYnNlcnZlcjogJ3NldEFjdGl2ZSdcbiAgICB9XG4gIH0sXG5cbiAgZGF0YToge1xuICAgIGJhZGdlczogW11cbiAgfSxcblxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLmN1cnJlbnRBY3RpdmUgPSAtMTtcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgc2V0QWN0aXZlKGJhZGdlKSB7XG4gICAgICBsZXQgeyBhY3RpdmUgfSA9IHRoaXMuZGF0YTtcbiAgICAgIGlmIChiYWRnZSkge1xuICAgICAgICBhY3RpdmUgPSB0aGlzLmRhdGEuYmFkZ2VzLmluZGV4T2YoYmFkZ2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlID09PSB0aGlzLmN1cnJlbnRBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50QWN0aXZlICE9PSAtMSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBhY3RpdmUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRBY3RpdmUgPSBhY3RpdmU7XG4gICAgICB0aGlzLmRhdGEuYmFkZ2VzLmZvckVhY2goKGJhZGdlLCBpbmRleCkgPT4ge1xuICAgICAgICBiYWRnZS5zZXRBY3RpdmUoaW5kZXggPT09IGFjdGl2ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuIl19