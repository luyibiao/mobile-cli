import Vue from 'vue'
//所有弹窗
import dialogs from './popup';
//js组件
import jsComp from './js';

const list = [
  ...dialogs
]

const install = vm => {
  list.forEach(component => {
    vm.component(component.name, component)
  });
  for (const key in jsComp) {
    if (!vm.prototype.hasOwnProperty(key)) {
      Vue.prototype[key] = jsComp[key];
    }else{
      console.warn( key + '被占用')
    }
  }
}

export default {
  install
}