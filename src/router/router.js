import denglu from '../components/denglu/denglu.vue'
import chucuo from '../components/404/chucuo.vue'
import duankai from '../components/404/duankai.vue'
import shibai from '../components/404/shibai.vue'
import wushuju from '../components/404/wushuju.vue'
import sousuo from '../components/sousuo.vue'
import qiandao from '../components/saoyisao/qiandao'
import qiandaoCG from '../components/saoyisao/qiandao_chenggong'
import kecheng from '../components/kecheng/kecheng'
import jiangyi from '../components/kecheng/jiangyi'
import toutiao from '../components/toutiao/toutiao'
import xiangguan from '../components/toutiao/xiangguan'
import shenling from '../components/wode/shenling'
import huodong from '../components/wode/huodong'
import xiaoxi from '../components/wode/xiaoxi'
import xiaoxi_xiangqing from '../components/wode/xiaoxi_xiangqing'
import guanyu from '../components/wode/guanyu'

var routes = [
    {path: '/', redirect: '/login', name: '登录'},
	{path: '/login', component: denglu, name: '登录'},
	{path: '/error', component: chucuo},
	{path: '/short', component: duankai},
	{path: '/fail', component: shibai},	
	{path: '/noData', component: wushuju},
	{path: '/search', component: sousuo},
	{path: '/signIn', component: qiandao},
	{path: '/signInSucc', component: qiandaoCG},
	{path: '/curriculum', component: kecheng},
	{path: '/handout', component: jiangyi},
	{path: '/headline', component: toutiao},
	{path: '/relevant', component: xiangguan},
	{path: '/apply', component: shenling},
	{path: '/activity', component: huodong},
	{path: '/message', component: xiaoxi},
	{path: '/messageDetail', component: xiaoxi_xiangqing},
	{path: '/about', component: guanyu},
	{path: "*", redirect: "/chucuo"}
];

export default routes;
