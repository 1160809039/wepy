'use strict';

var _create = require('./../common/create.js');

(0, _create.create)({
  classes: ['thumb-class', 'title-class', 'price-class', 'desc-class', 'num-class'],

  props: {
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    currency: {
      type: String,
      value: '¥'
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJwcm9wcyIsIm51bSIsIlN0cmluZyIsImRlc2MiLCJ0aHVtYiIsInRpdGxlIiwicHJpY2UiLCJjZW50ZXJlZCIsIkJvb2xlYW4iLCJjdXJyZW5jeSIsInR5cGUiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxvQkFBTztBQUNMQSxXQUFTLENBQ1AsYUFETyxFQUVQLGFBRk8sRUFHUCxhQUhPLEVBSVAsWUFKTyxFQUtQLFdBTE8sQ0FESjs7QUFTTEMsU0FBTztBQUNMQyxTQUFLQyxNQURBO0FBRUxDLFVBQU1ELE1BRkQ7QUFHTEUsV0FBT0YsTUFIRjtBQUlMRyxXQUFPSCxNQUpGO0FBS0xJLFdBQU9KLE1BTEY7QUFNTEssY0FBVUMsT0FOTDtBQU9MQyxjQUFVO0FBQ1JDLFlBQU1SLE1BREU7QUFFUlMsYUFBTztBQUZDO0FBUEw7QUFURixDQUFQIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSAnLi4vY29tbW9uL2NyZWF0ZSc7XG5cbmNyZWF0ZSh7XG4gIGNsYXNzZXM6IFtcbiAgICAndGh1bWItY2xhc3MnLFxuICAgICd0aXRsZS1jbGFzcycsXG4gICAgJ3ByaWNlLWNsYXNzJyxcbiAgICAnZGVzYy1jbGFzcycsXG4gICAgJ251bS1jbGFzcydcbiAgXSxcblxuICBwcm9wczoge1xuICAgIG51bTogU3RyaW5nLFxuICAgIGRlc2M6IFN0cmluZyxcbiAgICB0aHVtYjogU3RyaW5nLFxuICAgIHRpdGxlOiBTdHJpbmcsXG4gICAgcHJpY2U6IFN0cmluZyxcbiAgICBjZW50ZXJlZDogQm9vbGVhbixcbiAgICBjdXJyZW5jeToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICfCpSdcbiAgICB9XG4gIH1cbn0pO1xuIl19