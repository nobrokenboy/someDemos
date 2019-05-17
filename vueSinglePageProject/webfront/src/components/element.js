import Vue from 'vue';
import {
    Pagination,
    Switch,
    MessageBox,
    Breadcrumb,
    BreadcrumbItem,
    Tree,
    Loading,
    Table,
    TableColumn,
    Form,
    FormItem,
    Input,
    Select,
    Option,

} from 'element-ui';

//全部配置按钮等组件的大小
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.use(Pagination);
Vue.use(Switch);
// Vue.use(MessageBox);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tree);
Vue.use(Loading.directive);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;