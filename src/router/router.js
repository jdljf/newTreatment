import shouye from '../components/xueyuan/shouye.vue'
import wenjuan from '../components/xueyuan/wenjuan.vue'
import sousuo from '../components/xueyuan/sousuo.vue'
import denglu from '../components/denglu/denglu.vue'
import denglu_tuichu from '../components/denglu/denglu_tuichu.vue'
import zhuce from '../components/denglu/zhuce.vue'
import chucuo from '../components/404/chucuo.vue'
import duankai from '../components/404/duankai.vue'
import shibai from '../components/404/shibai.vue'
import wushuju from '../components/404/wushuju.vue'
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
import wode from '../components/wode/wode'
import xitongshezhi from '../components/wode/xitongshezhi'
import xiugaimima from '../components/wode/xiugaimima'
import xindizhi from '../components/wode/xindizhi'
import xindizhi2 from '../components/wode/xindizhi2'
import dizhi_guanli from '../components/wode/dizhi_guanli'

var routes = [
	{path: '/', redirect: '/main', name: '新E疗'},
	{path: '/main', component: shouye, name: '新E疗'},
	{path: '/questionNaire', component: wenjuan, name: '问卷'},
	{path: '/login', component: denglu, name: '登录'},
	{path: '/loginOut', component: denglu_tuichu, name: '退出登录'},
	{path: '/register', component: zhuce, name: '注册'},
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
	{path: '/personalCenter', component: wode},
	{path: '/systemSetup', component: xitongshezhi},
	{path: '/changePassword', component: xiugaimima},
	{path: '/newReceiveAddress', component: xindizhi},
	{path: '/newReceiveAddress2', component: xindizhi2},
	{path: '/adminAddress', component: dizhi_guanli},
	{path: "*", redirect: "/chucuo"}
];

export default routes;
