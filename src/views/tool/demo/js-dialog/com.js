const defaultOptions = {
  title: '标题',
  content: '内容内容内容内容内容内容内容内容内容内容内容',
  animation: 'com-zoom-in',
  animationOut: 'com-zoom-out'
}

const $com = {
  _init: function () {
    const csstyle = document.createElement('style')
    const str =
      "@keyframes zoomIn{from{transform:scale(0.5);opacity:0;}to{transform:scale(1);opacity:1;}}@keyframes zoomOut{from{transform:scale(1);opacity:1;}to{transform:scale(0.5);opacity:0;}}@keyframes fadeOut{from{opacity:1;}to{opacity:0;}}.com-zoom-in{animation:zoomIn;animation-duration:0.3s;}.com-zoom-out{animation-name:zoomOut;animation-duration:0.3s;}.com-dialog-wrapper{width:100%;height:100%;position:fixed;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,0.7);z-index:9999;display:flex;justify-content:center;align-items:center;font-size:3.4rem;}.com-dialog-wrapper.com-fade-out{animation-name:fadeOut;animation-duration:0.3s;}.com-dialog-wrapper .com-dialog{width:62.8rem;border-radius:1.4rem;background-color:#fff;}.com-dialog-wrapper .com-dialog .dialog-header{color:#121e33;line-height:5.4rem;padding:0 3.2rem;padding-top:5.6rem;text-align:center;}.com-dialog-wrapper .com-dialog .dialog-content{color:#676F7D;padding:3.2rem 3.2rem 5.6rem;font-size:3.2rem;line-height:4.6rem;}.com-dialog-wrapper .com-dialog .dialog-footer{height:10rem;display:flex;position:relative;}.com-dialog-wrapper .com-dialog .dialog-footer::before{content:'';width:100%;height:1px;transform:scaleY(0.5);background-color:#eceef2;position:absolute;left:0;top:0;}.com-dialog-wrapper .com-dialog .dialog-footer .button{height:100%;flex:1;display:flex;justify-content:center;align-items:center;position:relative;}.com-dialog-wrapper .com-dialog .dialog-footer .button:active{background-color:rgba(0,0,0,0.05);}.com-dialog-wrapper .com-dialog .dialog-footer .button.cancel{color:#121e33;}.com-dialog-wrapper .com-dialog .dialog-footer .button.confirm{color:#5c6198;}.com-dialog-wrapper .com-dialog .dialog-footer .button.confirm::before{content:'';width:1px;height:100%;transform:scaleX(0.5);background-color:#eceef2;position:absolute;left:0;top:0;}";
    if (csstyle.styleSheet) {
      csstyle.styleSheet.cssText = str
    } else {
      csstyle.innerHTML = str
    }
    document.getElementsByTagName('head')[0].appendChild(csstyle)
  },

  diaglog: function (options) {
    options = { ...defaultOptions, ...options }
    const _this = this
    const dialog = document.createElement('div')
    dialog.setAttribute('class', 'com-dialog-wrapper')
    let html = `<div class="com-dialog ${options.animation}">`

    // 标题
    if (options.title) {
      html += `<section class="dialog-header">${options.title}</section>`
    }

    // 内容
    if (options.content) {
      html += `<section class="dialog-content">${options.content}</section>`
    }

    // 底部
    html += `
    <section class="dialog-footer">
      <div class="button cancel">取消</div>
      <div class="button confirm">确认</div>
    </section>
    `

    html += `</div>`
    dialog.innerHTML = html
    document.body.appendChild(dialog)

    document.querySelector(".com-dialog").onclick = function (e) {
      e.stopPropagation();
    }

    return new Promise((resolve, reject) => {
      document.querySelector('.com-dialog-wrapper').onclick = function (e) {
        _this.closeDialog(options.animationOut)
        resolve('cancel')
      }

      document.querySelector('.dialog-footer').onclick = function (e) {
        if (e.target.className === 'button cancel') {
          resolve('cancel')
          _this.closeDialog(options.animationOut)
        }
        if (e.target.className === 'button confirm') {
          resolve('confirm')
          _this.closeDialog(options.animationOut)
        }
      }
    })
  },

  closeDialog: function (animationOut = 'none') {
    const dialogWrapper = document.getElementsByClassName('com-dialog-wrapper')
    if (dialogWrapper && dialogWrapper[0]) {
      dialogWrapper[0].setAttribute('class', `com-dialog-wrapper com-fade-out`)
    }
    const dialog = document.getElementsByClassName('com-dialog')
    if (dialog && dialog[0]) {
      dialog[0].setAttribute('class', `com-dialog ${animationOut}`)
    }
    if (!dialogWrapper.length) return
    setTimeout(() => {
      dialog[0] && document.body.removeChild(dialogWrapper[0])
    }, 250)
  }
}

$com._init()

export default $com
