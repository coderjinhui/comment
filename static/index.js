const $ = window.jQuery
$(function () {
  const articleTitle = $('#article-title')
  const articleContent = $('#article-content')
  const errorMessageP = $('#error')
  const userSelect = $('#user-select')
  const userInfoDiv = $('#user-info')
  const upVoteArticle = $('#article-up-vote')

  let selectedUserId = ''
  let userInfo = {}
  let users = []
  let article = {}

  $.get('/article/0001')
    .then(d => {
      article = d
      articleTitle.html(d.title)
      articleContent.html(d.content.split('。').join('。<br>'))
      upVoteArticle.html('点赞(' + (article.upVoteCount) + ')')
    })
    .catch(e => errorMessageP.html(e).show())

  $.get('/user')
    .then(d => {
      users = d
      selectedUserId = d[0].id
      userInfo = d[0]
      if (userInfo.upVoteArticles.some(record => record.article === article.id)) {
        upVoteArticle.html('已点赞(' + article.upVoteCount + ')')
    }
      userInfoDiv.html(JSON.stringify(userInfo))
      $.each(d, (i, user) => {
        userSelect.append($('<option>', {
          text: user.name,
          value: user.id
        }))
      })
    })
    .catch(e => errorMessageP.html(e).show())

  userSelect.on('change', function () {
    selectedUserId = this.value
    userInfo = users.filter(user => user.id === selectedUserId)
    userInfoDiv.html(JSON.stringify(userInfo))
  })
  upVoteArticle.on('click', function () {
    // todo 这个判断标准不好
    const btnText = upVoteArticle.html()
    if (btnText.includes('已点赞')) return
    upVoteArticle.html('已点赞(' + (article.upVoteCount + 1) + ')')
    $.post('/upVoteArticle', {user: selectedUserId, article: article.id, timestamp: Date.now()})
      .then((d => {
        console.log(d)
      }))
  })
})