import denglu from '../components/denglu/denglu.vue'
import chucuo from '../components/404/chucuo.vue'
import duankai from '../components/404/duankai.vue'
import shibai from '../components/404/shibai.vue'
import wushuju from '../components/404/wushuju.vue'

var routes = [
    {path: '/', redirect: '/login', name: '登录'},
	{path: '/login', component: denglu, name: '登录'},
	{path: '/chucuo', component: chucuo},
	{path: '/duankai', component: duankai},
	{path: '/shibai', component: shibai},	
	{path: '/wushuju', component: wushuju},
];

export default routes;
