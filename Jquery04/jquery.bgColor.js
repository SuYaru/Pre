/**
 * Created by HUCC on 2017/4/12.
 */
$.fn.bgColor = function (color) {
  //this是一个jq对象
  this.css("backgroundColor", color);

  return this;
};