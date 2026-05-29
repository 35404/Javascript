function showToast(msg, type) {
  var toast = document.getElementById('toast')
  toast.textContent = msg
  toast.className = 'toast ' + type + ' show'
  clearTimeout(toast._timer)
  toast._timer = setTimeout(function () {
    toast.classList.remove('show')
  }, 2000)
}

var userlist = JSON.parse(localStorage.getItem('userlist') || '[]')
var registerBtn = document.getElementById('registerBtn')
registerBtn.addEventListener('click', function () {
  var username = document.getElementById('username').value.trim()
  var password = document.getElementById('password').value.trim()
  var confirm = document.getElementById('confirm').value.trim()
  //定义判断符
  let v1 = false
  let v2 = false
  let v3 = false

  if (!username) {
    showToast('请设置用户名', 'error')
    return
  }
  if (!/^[A-Za-z][A-Za-z0-9]{0,9}$/.test(username)) {
    showToast('用户名以字母开头至多10位', 'error')
    return
  }
  else {
     v1  = true
  }
  if (!password) {
    showToast('请设置密码', 'error')
    return
  }
  if (!/^.{6,}$/.test(password)) {
    showToast('密码至少6位', 'error')
    return
  }
  else {
     v2 = true
  }
  if (password !== confirm) {
    showToast('两次输入的密码不一致', 'error')
    return
  }
  else {
     v3  = true
  }

  if (v1 && v2 && v3) {
    if (userlist.some(function (u) { return u.username === username })) {
      showToast('用户名已存在，请更换', 'error')
      return
    }
    userlist.push({ username: username, password: password })
    localStorage.setItem('userlist',JSON.stringify(userlist))
  showToast('注册成功，正在跳转...', 'success')
  setTimeout(function () {
    window.location.href = 'login.html'
  }, 800)
  }
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    registerBtn.click()
  }
})
