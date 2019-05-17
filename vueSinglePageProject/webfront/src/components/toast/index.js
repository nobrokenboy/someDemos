import Toast from './src/toast.vue';
let toastObj={};
toastObj.install=function(Vue,options={}){
    //继承组件的
    const ToastController=Vue.extend(Toast);
    ToastController.prototype.close=function () {//定时消失
        this.isVisible=false;
        //移出dom
        const dom=this.$el;
        //获取浏览器支持的transitionendEvent
        let transitionendEvent=whichTransitionEvent(dom);
        dom.addEventListener(transitionendEvent,removeDom(dom));

    }
    function removeDom(dom){
        //移出dom
        document.body.removeChild(dom);
    }
    //添加vue的实例方法
    Vue.prototype.$toast = function (_options={}) {
        // let toastDiv=document.createElement('div');
        // addClass(toastDiv,'toast-one');
        // console.log(toastDiv);
        const instanceOfToast=new ToastController().$mount();
        //消失的时间
        let duration=_options.duration||options.duration||2000;
        instanceOfToast.message=typeof _options==='string'?_options:_options.message;
        instanceOfToast.zindex=_options.zindex||options.zindex||99;
        //将生成的toast挂载到body
        document.body.appendChild(instanceOfToast.$el);
        //处理定时
        setTimeout(()=>{
            instanceOfToast.close();
        },duration);
    }
};

function addClass(obj, cls){
    var obj_class = obj.className,//获取 class 内容.
        blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
}
function whichTransitionEvent(el){
    var t;
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
export default toastObj;
