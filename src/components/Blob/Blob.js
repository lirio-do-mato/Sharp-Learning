import { Linear, TweenMax } from '../../gsap-public/src/gsap-core.js';

export default props => {
  var radius = 8;
  TweenMax.staggerFromTo('.blob', 4 ,{
    cycle: {
      attr:function(i) {
        var r = i*90;
        return {
          transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
        }
      }
    }
  },{
    cycle: {
      attr:function(i) {
        var r = i*90+360;
        return {
          transform:'rotate('+r+') translate('+radius+',0.1) rotate('+(-r)+')'
        }
      }
    },
    ease:Linear.easeNone,
    repeat:-1
  });
}