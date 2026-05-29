// 导航按钮移入变色
const nav = document.querySelector('nav')
nav.addEventListener('mouseover', function (e) {
  if (e.target.tagName === 'A') {
    e.target.style.color = '#ffd500fe'
  }
})
nav.addEventListener('mouseout', function (e) {
  if (e.target.tagName === 'A') {
    e.target.style.color = ''
  }
})

//轮播
const data = [
  { url: `./img/0.jpg`, title: `凉拌牛肉` },
  { url: `./img/1.jpg`, title: `茄片` },
  { url: `./img/2.jpg`, title: `扇贝粉丝` },
  { url: `./img/3.jpg`, title: `糖醋鲤鱼` }
]
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')

const footer = document.querySelector('.slider-footer')
const p = document.querySelector('.txt')
const box = document.querySelector('.slider')

let i = 0
// 操作函数
function zuo(index) {
  box.style.backgroundImage = `url(./img/${index}.jpg)`
  p.innerHTML = data[index].title
  const active = document.querySelector('.slider-indicator .active')
  if (active) active.classList.remove('active')
  document.querySelector(`.slider-indicator li:nth-child(${index + 1})`).classList.add('active')
}

//左侧按钮
next.addEventListener('click', function () {
  i++
  if (i > data.length - 1) {
    i = 0
  }
  zuo(i)

})
//右侧按钮
prev.addEventListener('click', function () {
  i--
  if (i < 0) {
    i = data.length - 1
  }
  zuo(i)
})
//自动播放
let timer = setInterval(function () {
  next.click()
}, 1000)
//停止定时器
box.addEventListener('mouseenter', function () {
  clearInterval(timer)
})
box.addEventListener('mouseleave', function () {
  timer = setInterval(function () {
    next.click()
  }, 1500)
})
//菜单
const btns = document.querySelectorAll('.tab-nav button')
const panes = document.querySelectorAll('.tab-pane')

btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const i = this.dataset.index
    document.querySelector('.tab-nav .active').classList.remove('active')
    this.classList.add('active')
    document.querySelector('.tab-pane.active').classList.remove('active')
    panes[i].classList.add('active')
  })
})
//菜单页
const Data = [
  { url: `./img/1.jpg`, title: `茄片` },
  { url: `./img/2.jpg`, title: `扇贝粉丝` },
  { url: `./img/3.jpg`, title: `糖醋鲤鱼` },
  { url: `./img/4.jpg`, title: `辣条` },
  { url: `./img/5.jpg`, title: `红烧鹌鹑蛋` },
  { url: `./img/6.jpg`, title: `九转大肠` },
  { url: `./img/7.jpg`, title: `竹筒粉蒸肉` },
  { url: `./img/8.jpg`, title: `冒血旺` },
  { url: `./img/9.jpg`, title: `辣子鸡` },
  { url: `./img/12.jpg`, title: `青岛啤酒` },
  { url: `./img/13.jpg`, title: `橙汁` },
  { url: `./img/14.jpg`, title: `可乐` }
]
for (let j = 0; j < panes.length; j++) {
  const template = panes[j].querySelector('.box-big')
  for (let i = j * 3; i < j * 3 + 3; i++) {
    const clone = template.cloneNode(true)
    clone.querySelector('.box-img').style.backgroundImage = `url(${Data[i].url})`
    clone.querySelector('.box-txt').textContent = Data[i].title
    panes[j].appendChild(clone)
  }
  template.style.display = 'none'
}

// 滚动渐显
const revealEls = document.querySelectorAll('.head-title, .slider, .tab-container, .box-big, .comment-section, .page-footer')
revealEls.forEach(el => el.classList.add('reveal'))

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.15 })

revealEls.forEach(el => observer.observe(el))

//=================================================//
//电梯导航
const links = document.querySelectorAll('.elevator a')
const elevator = document.querySelector('.elevator')
const sections = ['home', 'featured', 'menu', 'comment', 'about']

// 点击电梯项 → 平滑滚动
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.getElementById(this.dataset.target)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

window.addEventListener('scroll', function () {
  const mid = window.scrollY + window.innerHeight / 2

  // 超过1/10屏后显示
  if (window.scrollY > window.innerHeight / 10) {
    elevator.classList.add('show')
  } else {
    elevator.classList.remove('show')
  }
  const floors = document.querySelectorAll('.floor')
  // 高亮当前楼层
  floors.forEach(function (floor, i) {
    const top = floor.offsetTop
    const bottom = top + floor.offsetHeight
    if (mid >= top && mid < bottom) {
      document.querySelector('.elevator .active')?.classList.remove('active')
      links[i].classList.add('active')
    }
  })
})


// 评论区
let comments = JSON.parse(localStorage.getItem('comments') || '[]')
let commentUser = document.getElementById('commentUser')
let commentText = document.getElementById('commentText')
let commentSubmit = document.getElementById('commentSubmit')
let commentList = document.getElementById('commentList')

function renderComments() {
  if (comments.length === 0) {
    commentList.innerHTML = '<div class="comment-empty">暂无评论，快来抢沙发吧 ~</div>'
    return
  }
  let html = ''
  for (let i = comments.length - 1; i >= 0; i--) {
    let c = comments[i]
    html += '<div class="comment-item">' +
      '<span class="c-user">' + c.user + '</span>' +
      '<span class="c-time">' + c.time + '</span>' +
      '<div class="c-text">' + c.text + '</div>' +
      '</div>'
  }
  commentList.innerHTML = html
}

commentSubmit.addEventListener('click', function () {
  if (!checkLogin()) return

  let user = token
  let text = commentText.value.trim()

  commentUser.value = token
  if (!text) {
    alert('请输入评论内容')
    return
  }

  //评论时间
  let now = new Date()
  let time = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0')

  comments.push({ user: user, text: text, time: time })
  localStorage.setItem('comments', JSON.stringify(comments))
  commentText.value = ''
  renderComments()
})

renderComments()

// 模态框
let overlay = document.getElementById('overlay')
let closeBtn1 = document.getElementById('closeModal-1')
let closeBtn2 = document.getElementById('closeModal-2')
let modal1 = document.getElementById('modal-1')
let modal2 = document.getElementById('modal-2')
let reserve = document.querySelector('.head-top').children[2]
let form = document.querySelector('.head-top').children[3]

function openModal(modal) {
  overlay.classList.add('show')
  modal.classList.add('show')
}

function closeModal() {
  overlay.classList.remove('show')
  modal1.classList.remove('show')
  modal2.classList.remove('show')
}

// toast
const toast = document.getElementById('toast')
function showToast(msg, type) {
  toast.textContent = msg
  toast.className = 'toast ' + type + ' show'
  clearTimeout(toast._timer)
  toast._timer = setTimeout(function () {
    toast.classList.remove('show')
  }, 2000)
}

//获取预定信息
const sumResrve = document.querySelector('#sum')
const numResrve = document.querySelector('#num')
const sizeResrve = document.querySelector('#size')
const dateResrve = document.querySelector('#date')
//提交预定
const submit = document.querySelector('#submitForm')
submit.addEventListener('click', function () {
  if (!checkLogin()) return
  if (sumResrve.value === '' || numResrve.value === '' || sizeResrve.value === '' || dateResrve.value === '') {
    showToast('请完整填写预定信息', 'error')
    return
  }
  const order = {
    sum: Number(sumResrve.value),
    num: Number(numResrve.value),
    size: sizeResrve.value,
    date: dateResrve.value
  }
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.push(order)
  localStorage.setItem('orders', JSON.stringify(orders))

  setTimeout(function () {
    closeModal()
    showToast('预约成功！', 'success')
  }, 1000)
})

// 订单弹窗
form.addEventListener('click', function () {
  if (!checkLogin()) return
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  if (orders.length === 0) {
    modal2.innerHTML = '<h3>您的订单</h3><p>暂无订单</p><button class="btn-close" id="closeModal-2">关 闭</button>'
  } else {
    const last = orders[orders.length - 1]
    modal2.innerHTML =
      '<h3>您的订单</h3>' +
      '<p>人数：' + last.sum + '</p>' +
      '<p>桌数：' + last.num + '</p>' +
      '<p>桌型：' + last.size + '人桌</p>' +
      '<p>时间：' + last.date + '</p>' +
      '<button class="btn-close" id="closeModal-2">关 闭</button>'
  }
  openModal(modal2)
  document.getElementById('closeModal-2').addEventListener('click', closeModal)
})

reserve.addEventListener('click', function () {
  if (!checkLogin()) return
  openModal(modal1)
})
closeBtn1.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

//登录状态
const login = document.querySelector('#login')
login.addEventListener('click', function () {
  window.location.href = 'login.html'
})
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
if (token) {
    login.innerHTML = token
    commentUser.value = token
    commentUser.readOnly = true
}

function checkLogin() {
  if (!token) {
    showToast('请先登录', 'error')
    setTimeout(function () {
      window.location.href = 'login.html'
    }, 800)
    return false
  }
  return true
}

