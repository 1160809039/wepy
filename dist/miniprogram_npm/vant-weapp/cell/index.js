'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  classes: ['title-class', 'label-class', 'value-class', 'left-icon-class', 'right-icon-class'],

  props: {
    title: null,
    value: null,
    url: String,
    icon: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    border: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClick: function onClick() {
      var url = this.data.url;

      if (url) {
        wx[this.data.linkType]({ url: url });
      }
      this.$emit('click');
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJwcm9wcyIsInRpdGxlIiwidmFsdWUiLCJ1cmwiLCJTdHJpbmciLCJpY29uIiwibGFiZWwiLCJjZW50ZXIiLCJCb29sZWFuIiwiaXNMaW5rIiwicmVxdWlyZWQiLCJjbGlja2FibGUiLCJ0aXRsZVdpZHRoIiwiY3VzdG9tU3R5bGUiLCJhcnJvd0RpcmVjdGlvbiIsImxpbmtUeXBlIiwidHlwZSIsImJvcmRlciIsIm1ldGhvZHMiLCJvbkNsaWNrIiwiZGF0YSIsInd4IiwiJGVtaXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsb0JBQU87QUFDTEEsV0FBUyxDQUNQLGFBRE8sRUFFUCxhQUZPLEVBR1AsYUFITyxFQUlQLGlCQUpPLEVBS1Asa0JBTE8sQ0FESjs7QUFTTEMsU0FBTztBQUNMQyxXQUFPLElBREY7QUFFTEMsV0FBTyxJQUZGO0FBR0xDLFNBQUtDLE1BSEE7QUFJTEMsVUFBTUQsTUFKRDtBQUtMRSxXQUFPRixNQUxGO0FBTUxHLFlBQVFDLE9BTkg7QUFPTEMsWUFBUUQsT0FQSDtBQVFMRSxjQUFVRixPQVJMO0FBU0xHLGVBQVdILE9BVE47QUFVTEksZ0JBQVlSLE1BVlA7QUFXTFMsaUJBQWFULE1BWFI7QUFZTFUsb0JBQWdCVixNQVpYO0FBYUxXLGNBQVU7QUFDUkMsWUFBTVosTUFERTtBQUVSRixhQUFPO0FBRkMsS0FiTDtBQWlCTGUsWUFBUTtBQUNORCxZQUFNUixPQURBO0FBRU5OLGFBQU87QUFGRDtBQWpCSCxHQVRGOztBQWdDTGdCLFdBQVM7QUFDUEMsV0FETyxxQkFDRztBQUFBLFVBQ0FoQixHQURBLEdBQ1EsS0FBS2lCLElBRGIsQ0FDQWpCLEdBREE7O0FBRVIsVUFBSUEsR0FBSixFQUFTO0FBQ1BrQixXQUFHLEtBQUtELElBQUwsQ0FBVUwsUUFBYixFQUF1QixFQUFFWixRQUFGLEVBQXZCO0FBQ0Q7QUFDRCxXQUFLbUIsS0FBTCxDQUFXLE9BQVg7QUFDRDtBQVBNO0FBaENKLENBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9jb21tb24vY3JlYXRlJztcblxuY3JlYXRlKHtcbiAgY2xhc3NlczogW1xuICAgICd0aXRsZS1jbGFzcycsXG4gICAgJ2xhYmVsLWNsYXNzJyxcbiAgICAndmFsdWUtY2xhc3MnLFxuICAgICdsZWZ0LWljb24tY2xhc3MnLFxuICAgICdyaWdodC1pY29uLWNsYXNzJ1xuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgdGl0bGU6IG51bGwsXG4gICAgdmFsdWU6IG51bGwsXG4gICAgdXJsOiBTdHJpbmcsXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGlzTGluazogQm9vbGVhbixcbiAgICByZXF1aXJlZDogQm9vbGVhbixcbiAgICBjbGlja2FibGU6IEJvb2xlYW4sXG4gICAgdGl0bGVXaWR0aDogU3RyaW5nLFxuICAgIGN1c3RvbVN0eWxlOiBTdHJpbmcsXG4gICAgYXJyb3dEaXJlY3Rpb246IFN0cmluZyxcbiAgICBsaW5rVHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICduYXZpZ2F0ZVRvJ1xuICAgIH0sXG4gICAgYm9yZGVyOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uQ2xpY2soKSB7XG4gICAgICBjb25zdCB7IHVybCB9ID0gdGhpcy5kYXRhO1xuICAgICAgaWYgKHVybCkge1xuICAgICAgICB3eFt0aGlzLmRhdGEubGlua1R5cGVdKHsgdXJsIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKTtcbiAgICB9XG4gIH1cbn0pO1xuIl19