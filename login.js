function showToast(msg, type) {
  var toast = document.getElementById('toast')
  toast.textContent = msg
  toast.className = 'toast ' + type + ' show'
  clearTimeout(toast._timer)
  toast._timer = setTimeout(function () {
    toast.classList.remove('show')
  }, 2000)
}

var loginBtn = document.getElementById('loginBtn')
loginBtn.addEventListener('click', function () {
  var username = document.getElementById('username').value.trim()
  var password = document.getElementById('password').value.trim()

  if (!username) {
    showToast('请输入用户名', 'error')
    return
  }
  if (!password) {
    showToast('请输入密码', 'error')
    return
  }

  let userlist = JSON.parse(localStorage.getItem('userlist') || '[]')
  let user = userlist.find(function (u) { return u.username === username })

  if (!user) {
    showToast('用户名不存在或错误', 'error')
    return
  }
  if (user.password !== password) {
    showToast('密码错误', 'error')
    return
  }

  showToast('登录成功，正在跳转...', 'success')
  setTimeout(function () {
    const token = username
    window.location.href = `index.html?token=${encodeURIComponent(token)}`
  }, 800)
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    loginBtn.click()
  }
})
