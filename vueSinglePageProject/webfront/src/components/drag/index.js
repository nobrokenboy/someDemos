import drag from './src/drag';
drag.install=function(Vue){
    Vue.component(drag.name,drag);
}

export default drag;