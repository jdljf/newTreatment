<template>
  <div class="shouye">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
    </div>

    <div class="gongneng">
      <div class="gongneng-xiang">课程</div>
      <div class="gongneng-xiang">我的课堂</div>
      <div class="gongneng-xiang">头条视讯</div>
      <div class="gongneng-xiang">调差问卷</div>
    </div>

    <div class="tonggao">
      <span class="tonggao-xiang">迅捷斥候5s前获得15医豆</span>
      <span class="tonggao-xiang">迅捷斥候5s前获得15医豆</span>
    </div>

    <div class="kemufenlei">
      <div class="biaoti">科目分类</div>
      <div class="fenlei">
        <div class="fenlei-xiang">医学人文</div>
        <div class="fenlei-xiang">医学计算机</div>
        <div class="fenlei-xiang">西医</div>
      </div>
      <div class="fenlei">
        <div class="fenlei-xiang">中医</div>
        <div class="fenlei-xiang">公共卫生</div>
        <div class="fenlei-xiang">临床实践</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  name: "shouye",
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      speed: 500,
      autoplay: 2000,
      autoplayDisableOnInteraction: false,
      loop: true,
      // 如果需要分页器
      pagination: ".swiper-pagination",
      preventClicks: false,
      paginationClickable: true, // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
      preventClicksPropagation: false // 阻止click冒泡
      // 如果需要前进后退按钮
      // nextButton: '.swiper-button-next',
      // prevButton: '.swiper-button-prev',
    });

    // swiper.params.pagination.clickable = true;
    console.log(swiper);
    //此外还需要重新初始化pagination
    // swiper.pagination.destroy();
    // swiper.pagination.init()
    // swiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shouye {
  .toubu {
    width: 100%;
    height: 0.7rem;
  }
  .swiper-container {
    width: 100%;
    height: 2.4rem;
  }
  .gongneng {
    padding: 1rem 0;
    display: flex;
    .gongneng-xiang {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.32rem;
      font-size: 0.1rem;
    }
  }
  .tonggao {
    overflow: hidden;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #e6fff4;
    .tonggao-xiang {
      margin: 0 1.4rem 0 0.4rem;
      color: #9cf9cf;
      font-size: 0.1rem;
    }
  }
  .kemufenlei {
    padding: 0.3rem 0 0 0;
    border-bottom: 3px solid #f1f1f1;
    .biaoti {
      margin: 0 0 0 0.2rem;
      font-size: 0.3rem;
      font-weight: 600;
      padding-left: 0.08rem;
      border-left: 3px solid #7ea090;
    }
    .fenlei{
      display: flex;
      .fenlei-xiang{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.2rem;
        height: 1.8rem;
      }
    }
  }
}
</style>
