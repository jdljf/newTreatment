import shouye from '../components/xueyuan/shouye.vue'
import wenjuan from '../components/xueyuan/wenjuan.vue'
import sousuo from '../components/xueyuan/sousuo.vue'
import zixun from '../components/xueyuan/zixun.vue'
import denglu from '../components/denglu/denglu.vue'
import denglu_tuichu from '../components/denglu/denglu_tuichu.vue'
import wangji_mima from '../components/denglu/wangji_mima.vue'
import zhuce from '../components/denglu/zhuce.vue'
import chucuo from '../components/404/chucuo.vue'
import duankai from '../components/404/duankai.vue'
import shibai from '../components/404/shibai.vue'
import wushuju from '../components/404/wushuju.vue'
import qiandao from '../components/saoyisao/qiandao'
import qiandaoCG from '../components/saoyisao/qiandao_chenggong'
import kecheng from '../components/kecheng/kecheng'
import jiangyi from '../components/kecheng/jiangyi'
import kemu from '../components/kemu/kemu'
import kemu_liebiao from '../components/common/kemu_liebiao'
import kemu_xiangqing from '../components/kemu/kemu_xiangqing'
import ceyan_jieguo from '../components/kemu/ceyan_jieguo'
import toutiao from '../components/toutiao/toutiao'
import xiangguan from '../components/toutiao/xiangguan'
import shenling from '../components/wode/shenling'
import huodong from '../components/wode/huodong'
import xiaoxi from '../components/wode/xiaoxi'
import xiaoxi_xiangqing from '../components/wode/xiaoxi_xiangqing'
import guanyu from '../components/wode/guanyu'
import wode from '../components/wode/wode'
import geren_xinxi from '../components/wode/geren_xinxi'
import yanzheng_shenfen from '../components/wode/yanzheng_shenfen'
import genghuan_shouji from '../components/wode/genghuan_shouji'
import xitongshezhi from '../components/wode/xitongshezhi'
import xiugaimima from '../components/wode/xiugaimima'
import xindizhi from '../components/wode/xindizhi'
import xindizhi2 from '../components/wode/xindizhi2'
import dizhi_guanli from '../components/wode/dizhi_guanli'

var routes = [
	{ path: '/', redirect: '/main', name: '新E疗', meta: { title: '首页' } },
	{ path: '/main', component: shouye, name: '新E疗', meta: { title: '首页' } },
	{ path: '/questionNaire', component: wenjuan, name: '问卷', meta: { title: '问卷' } },
	{ path: '/login', component: denglu, name: '登录', meta: { title: '登录' } },
	{ path: '/loginOut', component: denglu_tuichu, name: '退出登录', meta: { title: '退出登录' } },
	{ path: '/forgetPassword', component: wangji_mima, name: '忘记密码', meta: { title: '忘记密码' } },
	{ path: '/register', component: zhuce, name: '注册', meta: { title: '注册' } },
	{ path: '/error', component: chucuo, meta: { title: '出错了' } },
	{ path: '/short', component: duankai, meta: { title: '连接断开' } },
	{ path: '/fail', component: shibai, meta: { title: '连接失败' } },
	{ path: '/noData', component: wushuju, meta: { title: '没有数据' } },
	{ path: '/search', component: sousuo, meta: { title: '搜索视频' } },
	{ path: '/consultation', component: zixun, meta: { title: '咨询' } },
	{ path: '/signIn', component: qiandao, meta: { title: '签到' } },
	{ path: '/signInSucc', component: qiandaoCG, meta: { title: '签到成功' } },
	{ path: '/curriculum', component: kecheng, meta: { title: '成功' } },
	{ path: '/handout', component: jiangyi, meta: { title: '讲义' } },
	{
		path: '/subject',
		component: kemu,
		meta: { title: '课程' }
		// children: [
		// 	{
		// 		// 当 /user/:id/profile 匹配成功，
		// 		// UserProfile 会被渲染在 User 的 <router-view> 中
		// 		path: '/subject/list',
		// 		component: kemu_liebiao
		// 	}
		// ]
	},
	{ path: '/subjectDetail', component: kemu_xiangqing, meta: { title: '科目详情' } },
	{ path: '/testResult', component: ceyan_jieguo, meta: { title: '测验结果' } },
	{ path: '/headline', component: toutiao, meta: { title: '头条视讯' } },
	{ path: '/relevant', component: xiangguan, meta: { title: '相关' } },
	{ path: '/apply', component: shenling, meta: { title: '申领' } },
	{ path: '/activity', component: huodong, meta: { title: '活动' } },
	{ path: '/message', component: xiaoxi, meta: { title: '我的消息' } },
	{
		path: '/messageDetail', component: xiaoxi_xiangqing, meta: {
			title: '消息详情',
			keepAlive: false // 不需要被缓存
		}
	},
	{ path: '/about', component: guanyu, meta: { title: '关于我们' } },
	{
		path: '/personalCenter', component: wode, meta: {
			title: '个人中心'
			// keepAlive: true
		}
	},
	{ path: '/personalMessage', component: geren_xinxi, meta: { title: '个人信息' } },
	{ path: '/verifyIdentity', component: yanzheng_shenfen, meta: { title: '验证身份' } },
	{ path: '/changePhone', component: genghuan_shouji, meta: { title: '更换手机' } },
	{ path: '/systemSetup', component: xitongshezhi, meta: { title: '系统设置' } },
	{ path: '/changePassword', component: xiugaimima, meta: { title: '修改密码' } },
	{ path: '/newReceiveAddress', component: xindizhi, meta: { title: '添加新地址' } },
	{ path: '/newReceiveAddress2', component: xindizhi2 },
	{ path: '/adminAddress', component: dizhi_guanli, meta: { title: '地址管理' } },
	{ path: "*", redirect: "/chucuo", meta: { title: '路径出错' } }
];

export default routes;
