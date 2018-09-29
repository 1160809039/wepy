'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  field: true,

  props: {
    title: String,
    border: Boolean,
    loading: Boolean,
    disabled: Boolean,
    checked: {
      type: Boolean,
      observer: function observer(value) {
        this.setData({ value: value });
      }
    },
    size: {
      type: String,
      value: '26px'
    }
  },

  attached: function attached() {
    this.setData({ value: this.data.checked });
  },


  methods: {
    onChange: function onChange(event) {
      this.$emit('change', event.detail);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwicHJvcHMiLCJ0aXRsZSIsIlN0cmluZyIsImJvcmRlciIsIkJvb2xlYW4iLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJjaGVja2VkIiwidHlwZSIsIm9ic2VydmVyIiwidmFsdWUiLCJzZXREYXRhIiwic2l6ZSIsImF0dGFjaGVkIiwiZGF0YSIsIm1ldGhvZHMiLCJvbkNoYW5nZSIsImV2ZW50IiwiJGVtaXQiLCJkZXRhaWwiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsU0FBTyxJQURGOztBQUdMQyxTQUFPO0FBQ0xDLFdBQU9DLE1BREY7QUFFTEMsWUFBUUMsT0FGSDtBQUdMQyxhQUFTRCxPQUhKO0FBSUxFLGNBQVVGLE9BSkw7QUFLTEcsYUFBUztBQUNQQyxZQUFNSixPQURDO0FBRVBLLGNBRk8sb0JBRUVDLEtBRkYsRUFFUztBQUNkLGFBQUtDLE9BQUwsQ0FBYSxFQUFFRCxZQUFGLEVBQWI7QUFDRDtBQUpNLEtBTEo7QUFXTEUsVUFBTTtBQUNKSixZQUFNTixNQURGO0FBRUpRLGFBQU87QUFGSDtBQVhELEdBSEY7O0FBb0JMRyxVQXBCSyxzQkFvQk07QUFDVCxTQUFLRixPQUFMLENBQWEsRUFBRUQsT0FBTyxLQUFLSSxJQUFMLENBQVVQLE9BQW5CLEVBQWI7QUFDRCxHQXRCSTs7O0FBd0JMUSxXQUFTO0FBQ1BDLFlBRE8sb0JBQ0VDLEtBREYsRUFDUztBQUNkLFdBQUtDLEtBQUwsQ0FBVyxRQUFYLEVBQXFCRCxNQUFNRSxNQUEzQjtBQUNEO0FBSE07QUF4QkosQ0FBUCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJy4uL2NvbW1vbi9jcmVhdGUnO1xuXG5jcmVhdGUoe1xuICBmaWVsZDogdHJ1ZSxcblxuICBwcm9wczoge1xuICAgIHRpdGxlOiBTdHJpbmcsXG4gICAgYm9yZGVyOiBCb29sZWFuLFxuICAgIGxvYWRpbmc6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY2hlY2tlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIG9ic2VydmVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IHZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcyNnB4J1xuICAgIH1cbiAgfSxcblxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnNldERhdGEoeyB2YWx1ZTogdGhpcy5kYXRhLmNoZWNrZWQgfSk7XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBldmVudC5kZXRhaWwpO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=