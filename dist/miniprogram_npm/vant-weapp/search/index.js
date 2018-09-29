'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  field: true,

  classes: ['cancel-class'],

  props: {
    focus: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    showAction: Boolean,
    useActionSlot: Boolean,
    placeholder: String,
    background: {
      type: String,
      value: '#f2f2f2'
    },
    maxlength: {
      type: Number,
      value: -1
    }
  },

  methods: {
    onChange: function onChange(event) {
      this.$emit('change', event.detail);
    },
    onCancel: function onCancel() {
      this.setData({ value: '' });
      this.$emit('cancel');
      this.$emit('change', '');
    },
    onSearch: function onSearch() {
      this.$emit('search', this.data.value);
    },
    onFocus: function onFocus() {
      this.$emit('focus');
    },
    onBlur: function onBlur() {
      this.$emit('blur');
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwiY2xhc3NlcyIsInByb3BzIiwiZm9jdXMiLCJCb29sZWFuIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsInNob3dBY3Rpb24iLCJ1c2VBY3Rpb25TbG90IiwicGxhY2Vob2xkZXIiLCJTdHJpbmciLCJiYWNrZ3JvdW5kIiwidHlwZSIsInZhbHVlIiwibWF4bGVuZ3RoIiwiTnVtYmVyIiwibWV0aG9kcyIsIm9uQ2hhbmdlIiwiZXZlbnQiLCIkZW1pdCIsImRldGFpbCIsIm9uQ2FuY2VsIiwic2V0RGF0YSIsIm9uU2VhcmNoIiwiZGF0YSIsIm9uRm9jdXMiLCJvbkJsdXIiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsU0FBTyxJQURGOztBQUdMQyxXQUFTLENBQUMsY0FBRCxDQUhKOztBQUtMQyxTQUFPO0FBQ0xDLFdBQU9DLE9BREY7QUFFTEMsY0FBVUQsT0FGTDtBQUdMRSxjQUFVRixPQUhMO0FBSUxHLGdCQUFZSCxPQUpQO0FBS0xJLG1CQUFlSixPQUxWO0FBTUxLLGlCQUFhQyxNQU5SO0FBT0xDLGdCQUFZO0FBQ1ZDLFlBQU1GLE1BREk7QUFFVkcsYUFBTztBQUZHLEtBUFA7QUFXTEMsZUFBVztBQUNURixZQUFNRyxNQURHO0FBRVRGLGFBQU8sQ0FBQztBQUZDO0FBWE4sR0FMRjs7QUFzQkxHLFdBQVM7QUFDUEMsWUFETyxvQkFDRUMsS0FERixFQUNTO0FBQ2QsV0FBS0MsS0FBTCxDQUFXLFFBQVgsRUFBcUJELE1BQU1FLE1BQTNCO0FBQ0QsS0FITTtBQUtQQyxZQUxPLHNCQUtJO0FBQ1QsV0FBS0MsT0FBTCxDQUFhLEVBQUVULE9BQU8sRUFBVCxFQUFiO0FBQ0EsV0FBS00sS0FBTCxDQUFXLFFBQVg7QUFDQSxXQUFLQSxLQUFMLENBQVcsUUFBWCxFQUFxQixFQUFyQjtBQUNELEtBVE07QUFXUEksWUFYTyxzQkFXSTtBQUNULFdBQUtKLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLEtBQUtLLElBQUwsQ0FBVVgsS0FBL0I7QUFDRCxLQWJNO0FBZVBZLFdBZk8scUJBZUc7QUFDUixXQUFLTixLQUFMLENBQVcsT0FBWDtBQUNELEtBakJNO0FBbUJQTyxVQW5CTyxvQkFtQkU7QUFDUCxXQUFLUCxLQUFMLENBQVcsTUFBWDtBQUNEO0FBckJNO0FBdEJKLENBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9jb21tb24vY3JlYXRlJztcblxuY3JlYXRlKHtcbiAgZmllbGQ6IHRydWUsXG5cbiAgY2xhc3NlczogWydjYW5jZWwtY2xhc3MnXSxcblxuICBwcm9wczoge1xuICAgIGZvY3VzOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIHJlYWRvbmx5OiBCb29sZWFuLFxuICAgIHNob3dBY3Rpb246IEJvb2xlYW4sXG4gICAgdXNlQWN0aW9uU2xvdDogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIGJhY2tncm91bmQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnI2YyZjJmMidcbiAgICB9LFxuICAgIG1heGxlbmd0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IC0xXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNoYW5nZShldmVudCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZXZlbnQuZGV0YWlsKTtcbiAgICB9LFxuXG4gICAgb25DYW5jZWwoKSB7XG4gICAgICB0aGlzLnNldERhdGEoeyB2YWx1ZTogJycgfSk7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKTtcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsICcnKTtcbiAgICB9LFxuXG4gICAgb25TZWFyY2goKSB7XG4gICAgICB0aGlzLiRlbWl0KCdzZWFyY2gnLCB0aGlzLmRhdGEudmFsdWUpO1xuICAgIH0sXG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnKTtcbiAgICB9LFxuXG4gICAgb25CbHVyKCkge1xuICAgICAgdGhpcy4kZW1pdCgnYmx1cicpO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=