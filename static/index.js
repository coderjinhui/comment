const $ = window.jQuery
$(function () {
  const articleTitle = $('#article-title')
  const articleContent = $('#article-content')
  const articleComment = $('#article-comment')
  const errorMessageP = $('#error')
  const userSelect = $('#user-select')
  const userInfoDiv = $('#user-info')
  const upVoteArticle = $('#article-up-vote')
  const userHeader = $('.user-header')
  const commentContent = $('#comment-text')
  const submitComment = $('#submit-comment')
  const commentList = $('#comment-list')

  let selectedUserId = ''
  let userInfo = {}
  let users = []
  let article = {}
  let comments = []

  const handleArticleModel = (d) => {
    article = d
    articleTitle.html(d.title)
    articleContent.html(d.content.split('。').join('。<br>'))
    upVoteArticle.html('点赞(' + (article.upVoteCount) + ')')
  }

  const handleUserModel = d => {
    users = d
    selectedUserId = d[0].id
    userInfo = d[0]
    userHeader[0].html(userInfo.name[0])
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
  }

  const handleCommentsModel = d => {
    comments = d
    const ul = $('<ul/>')
    commentList.append(ul)
    d.map(comment => {
      ul.append($(`<li>
    <span class="user-header">${users.filter(user => user.id === comment.userId)[0].name[0]}</span>
    <p>${comment.content}</p>
</li>`))
    })
  }

  const handleError = error => {

  }

  const refreshPage = () => {
    Promise.all([$.get('/article/0001'), $.get('/user'), $.get('/comments/article/0001')]).then(([article, user, commentsOfArticle]) => {

      handleArticleModel(article)
      handleUserModel(user)
      handleCommentsModel(commentsOfArticle)

    }).catch(e => errorMessageP.html(e.statusText).show())
  }

  refreshPage()

  userSelect.on('change', function () {
    selectedUserId = this.value
    userInfo = users.filter(user => user.id === selectedUserId)[0]
    userHeader.html(userInfo.name[0])
    userInfoDiv.html(JSON.stringify(userInfo))
  })
  upVoteArticle.on('click', function () {
    if (userInfo.upVoteArticles.find(record => record.article === article.id)) {
      return
    }
    upVoteArticle.html('已点赞(' + (article.upVoteCount + 1) + ')')
    $.post('/upVoteArticle', {user: selectedUserId, article: article.id, timestamp: Date.now()})
      .then((d => {
        console.log(d)
      }))
  })
  submitComment.on('click', function () {
    const _commentContent = commentContent.html().trim()
    if (!_commentContent) return
    $.ajax({
      url: '/comments/add',
      method: 'PUT',
      data: {content: _commentContent, userId: userInfo.id, articleId: article.id}
    })
      .then(d => {})
      .catch(e => errorMessageP.html(e.statusText).show())
  })

  articleComment.on('click', function () {

  })

})