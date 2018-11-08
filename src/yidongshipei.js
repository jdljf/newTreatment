function device(designWidth, maxWidth) {
    let originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    let doc = document;
    let win = window;
    let docEl = doc.documentElement;
    let tid;
    let rootItem, rootStyle;
    function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
      if (!maxWidth) {
        maxWidth = 540;
      }
      if (width > maxWidth) {
        width = maxWidth;
      }
      // 与淘宝做法不同，直接采用简单的rem换算方法1rem=100px
      var rem = width * 100 / designWidth;
      // 兼容UC开始
      rootStyle = "html{font-size:" + rem + "px !important}";
      rootItem =
        document.getElementById("rootsize") || document.createElement("style");
      if (!document.getElementById("rootsize")) {
        document.getElementsByTagName("head")[0].appendChild(rootItem);
        rootItem.id = "rootsize";
      }
      if (rootItem.styleSheet) {
        rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle);
      } else {
        try {
          rootItem.innerHTML = rootStyle;
        } catch (f) {
          rootItem.innerText = rootStyle;
        }
      }
      // 兼容UC结束
      docEl.style.fontSize = rem + "px";
    }
    refreshRem();
  
    win.addEventListener(
      "resize",
      function() {
        clearTimeout(tid); // 防止执行两次
        tid = setTimeout(refreshRem, 300);
        const resizeHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // console.log(resizeHeight, originalHeight);
        if (resizeHeight - 0 < originalHeight - 0) {
          //当软键盘弹起，在此处操作
          const tabBar = document.getElementById("tabBar");
          tabBar.style.display = "none";
        } else {
          //当软键盘收起，在此处操作
          const tabBar = document.getElementById("tabBar");
          tabBar.style.display = "block";
        }
      },
      false
    );
  
    win.addEventListener(
      "pageshow",
      function(e) {
        if (e.persisted) {
          // 浏览器后退的时候重新计算
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
        }
      },
      false
    );
  
    if (doc.readyState === "complete") {
      doc.body.style.fontSize = "16px";
    } else {
      doc.addEventListener(
        "DOMContentLoaded",
        function(e) {
          doc.body.style.fontSize = "16px";
        },
        false
      );
    }
    //解决键盘问题
    // const originalHeight =
    //   document.documentElement.clientHeight || document.body.clientHeight;
    // win.onresize = function() {
    //   //键盘弹起与隐藏都会引起窗口的高度发生变化
    //   const resizeHeight =
    //     document.documentElement.clientHeight || document.body.clientHeight;
    //   if (resizeHeight - 0 < originalHeight - 0) {
    //     //当软键盘弹起，在此处操作
    //     const tabBar = document.getElementById("#tarBar");
    //     tabBar.style.display = "none";
    //   } else {
    //     //当软键盘收起，在此处操作
    //     const tabBar = document.getElementById("#tarBar");
    //     tabBar.style.display = "block";
    //   }
    // };
  }
  
  export default device;