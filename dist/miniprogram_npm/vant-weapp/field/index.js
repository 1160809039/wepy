'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  field: true,

  classes: ['input-class'],

  props: {
    icon: String,
    label: String,
    error: Boolean,
    focus: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    disabled: Boolean,
    autosize: Boolean,
    readonly: Boolean,
    required: Boolean,
    iconClass: String,
    clearable: Boolean,
    labelAlign: String,
    inputAlign: String,
    customClass: String,
    confirmType: String,
    errorMessage: String,
    placeholder: String,
    customStyle: String,
    useIconSlot: Boolean,
    useButtonSlot: Boolean,
    placeholderClass: String,
    cursorSpacing: {
      type: Number,
      value: 50
    },
    maxlength: {
      type: Number,
      value: -1
    },
    value: {
      type: null,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    border: {
      type: Boolean,
      value: true
    },
    titleWidth: {
      type: String,
      value: '90px'
    }
  },

  data: {
    focused: false,
    showClear: false
  },

  methods: {
    onInput: function onInput(event) {
      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === undefined ? '' : _ref$value;

      this.$emit('input', value);
      this.$emit('change', value);
      this.setData({
        value: value,
        showClear: this.getShowClear({ value: value })
      });
    },
    onFocus: function onFocus(event) {
      this.$emit('focus', event);
      this.setData({
        focused: true,
        showClear: this.getShowClear({ focused: true })
      });
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      this.setData({
        focused: false,
        showClear: this.getShowClear({ focused: false })
      });
    },
    onClickIcon: function onClickIcon() {
      this.$emit('click-icon');
    },
    getShowClear: function getShowClear(options) {
      var _options$focused = options.focused,
          focused = _options$focused === undefined ? this.data.focused : _options$focused,
          _options$value = options.value,
          value = _options$value === undefined ? this.data.value : _options$value;


      return this.data.clearable && focused && value !== '' && !this.data.readonly;
    },
    onClear: function onClear() {
      this.setData({
        value: '',
        showClear: this.getShowClear({ value: '' })
      });
      this.$emit('input', '');
      this.$emit('change', '');
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.data.value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwiY2xhc3NlcyIsInByb3BzIiwiaWNvbiIsIlN0cmluZyIsImxhYmVsIiwiZXJyb3IiLCJCb29sZWFuIiwiZm9jdXMiLCJjZW50ZXIiLCJpc0xpbmsiLCJsZWZ0SWNvbiIsImRpc2FibGVkIiwiYXV0b3NpemUiLCJyZWFkb25seSIsInJlcXVpcmVkIiwiaWNvbkNsYXNzIiwiY2xlYXJhYmxlIiwibGFiZWxBbGlnbiIsImlucHV0QWxpZ24iLCJjdXN0b21DbGFzcyIsImNvbmZpcm1UeXBlIiwiZXJyb3JNZXNzYWdlIiwicGxhY2Vob2xkZXIiLCJjdXN0b21TdHlsZSIsInVzZUljb25TbG90IiwidXNlQnV0dG9uU2xvdCIsInBsYWNlaG9sZGVyQ2xhc3MiLCJjdXJzb3JTcGFjaW5nIiwidHlwZSIsIk51bWJlciIsInZhbHVlIiwibWF4bGVuZ3RoIiwiYm9yZGVyIiwidGl0bGVXaWR0aCIsImRhdGEiLCJmb2N1c2VkIiwic2hvd0NsZWFyIiwibWV0aG9kcyIsIm9uSW5wdXQiLCJldmVudCIsImRldGFpbCIsIiRlbWl0Iiwic2V0RGF0YSIsImdldFNob3dDbGVhciIsIm9uRm9jdXMiLCJvbkJsdXIiLCJvbkNsaWNrSWNvbiIsIm9wdGlvbnMiLCJvbkNsZWFyIiwib25Db25maXJtIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLG9CQUFPO0FBQ0xBLFNBQU8sSUFERjs7QUFHTEMsV0FBUyxDQUFDLGFBQUQsQ0FISjs7QUFLTEMsU0FBTztBQUNMQyxVQUFNQyxNQUREO0FBRUxDLFdBQU9ELE1BRkY7QUFHTEUsV0FBT0MsT0FIRjtBQUlMQyxXQUFPRCxPQUpGO0FBS0xFLFlBQVFGLE9BTEg7QUFNTEcsWUFBUUgsT0FOSDtBQU9MSSxjQUFVUCxNQVBMO0FBUUxRLGNBQVVMLE9BUkw7QUFTTE0sY0FBVU4sT0FUTDtBQVVMTyxjQUFVUCxPQVZMO0FBV0xRLGNBQVVSLE9BWEw7QUFZTFMsZUFBV1osTUFaTjtBQWFMYSxl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Q0EsV0FBS0EsS0FBTCxDQUFXLFFBQVgsRUFBcUIsRUFBckI7QUFDRCxLQS9DTTtBQWlEUFEsYUFqRE8sdUJBaURLO0FBQ1YsV0FBS1IsS0FBTCxDQUFXLFNBQVgsRUFBc0IsS0FBS1AsSUFBTCxDQUFVSixLQUFoQztBQUNEO0FBbkRNO0FBNURKLENBQVAiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGUgfSBmcm9tICcuLi9jb21tb24vY3JlYXRlJztcblxuY3JlYXRlKHtcbiAgZmllbGQ6IHRydWUsXG5cbiAgY2xhc3NlczogWydpbnB1dC1jbGFzcyddLFxuXG4gIHByb3BzOiB7XG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZXJyb3I6IEJvb2xlYW4sXG4gICAgZm9jdXM6IEJvb2xlYW4sXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGlzTGluazogQm9vbGVhbixcbiAgICBsZWZ0SWNvbjogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGF1dG9zaXplOiBCb29sZWFuLFxuICAgIHJlYWRvbmx5OiBCb29sZWFuLFxuICAgIHJlcXVpcmVkOiBCb29sZWFuLFxuICAgIGljb25DbGFzczogU3RyaW5nLFxuICAgIGNsZWFyYWJsZTogQm9vbGVhbixcbiAgICBsYWJlbEFsaWduOiBTdHJpbmcsXG4gICAgaW5wdXRBbGlnbjogU3RyaW5nLFxuICAgIGN1c3RvbUNsYXNzOiBTdHJpbmcsXG4gICAgY29uZmlybVR5cGU6IFN0cmluZyxcbiAgICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIGN1c3RvbVN0eWxlOiBTdHJpbmcsXG4gICAgdXNlSWNvblNsb3Q6IEJvb2xlYW4sXG4gICAgdXNlQnV0dG9uU2xvdDogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlckNsYXNzOiBTdHJpbmcsXG4gICAgY3Vyc29yU3BhY2luZzoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDUwXG4gICAgfSxcbiAgICBtYXhsZW5ndGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAtMVxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IG51bGwsXG4gICAgICB2YWx1ZTogJydcbiAgICB9LFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAndGV4dCdcbiAgICB9LFxuICAgIGJvcmRlcjoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiB0cnVlXG4gICAgfSxcbiAgICB0aXRsZVdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJzkwcHgnXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6IHtcbiAgICBmb2N1c2VkOiBmYWxzZSxcbiAgICBzaG93Q2xlYXI6IGZhbHNlXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIG9uSW5wdXQoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUgPSAnJyB9ID0gZXZlbnQuZGV0YWlsIHx8IHt9O1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB2YWx1ZSk7XG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB2YWx1ZSk7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgc2hvd0NsZWFyOiB0aGlzLmdldFNob3dDbGVhcih7IHZhbHVlIH0pXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgb25Gb2N1cyhldmVudCkge1xuICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnLCBldmVudCk7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBmb2N1c2VkOiB0cnVlLFxuICAgICAgICBzaG93Q2xlYXI6IHRoaXMuZ2V0U2hvd0NsZWFyKHsgZm9jdXNlZDogdHJ1ZSB9KVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uQmx1cihldmVudCkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLiRlbWl0KCdibHVyJywgZXZlbnQpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAgIHNob3dDbGVhcjogdGhpcy5nZXRTaG93Q2xlYXIoeyBmb2N1c2VkOiBmYWxzZSB9KVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIG9uQ2xpY2tJY29uKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xpY2staWNvbicpO1xuICAgIH0sXG5cbiAgICBnZXRTaG93Q2xlYXIob3B0aW9ucykge1xuICAgICAgY29uc3QgeyBmb2N1c2VkID0gdGhpcy5kYXRhLmZvY3VzZWQsIHZhbHVlID0gdGhpcy5kYXRhLnZhbHVlIH0gPSBvcHRpb25zO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICB0aGlzLmRhdGEuY2xlYXJhYmxlICYmIGZvY3VzZWQgJiYgdmFsdWUgIT09ICcnICYmICF0aGlzLmRhdGEucmVhZG9ubHlcbiAgICAgICk7XG4gICAgfSxcblxuICAgIG9uQ2xlYXIoKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIHNob3dDbGVhcjogdGhpcy5nZXRTaG93Q2xlYXIoeyB2YWx1ZTogJycgfSlcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCAnJyk7XG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCAnJyk7XG4gICAgfSxcblxuICAgIG9uQ29uZmlybSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nLCB0aGlzLmRhdGEudmFsdWUpO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=