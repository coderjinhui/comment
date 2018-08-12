const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const request = async (url, options = {}) => {
  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'Content-Type: application/json; charset=utf-8'

  return fetch(url, options).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res)
    }
  })
}

const main = () => {

  const articleTitle = $('#article-title')
  const articleContent = $('#article-content')
  const articleComment = $('#article-comment')
  const errorMessageP = $('#error')
  const userSelect = $('#user-select')
  const userInfoDiv = $('#user-info')
  const upVoteArticle = $('#article-up-vote')
  const downVoteArticle = $('#article-down-vote')
  const userHeader = $$('.user-header')
  const commentHeader = $('#comment-header')
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
    articleTitle.innerText = d.title
    articleContent.innerHTML = d.content.split('。').join('。<br>')
    upVoteArticle.innerText = '点赞(' + (article.upVoteCount) + ')'
    downVoteArticle.innerText = '反对(' + (article.downVoteCount) + ')'
    articleComment.innerText = '评论(' + (article.commentCount) + ')'
  }

  const handleUserModel = d => {
    users = d
    selectedUserId = d[0].id
    userInfo = d[0]
    commentHeader.innerText = userInfo.name[0]
    if (userInfo.upVoteArticles.some(record => record.article === article.id)) {
      upVoteArticle.innerText = '已点赞(' + article.upVoteCount + ')'
    }
    userInfoDiv.innerText = JSON.stringify(userInfo)
    d.forEach(user => {
      userSelect.insertAdjacentHTML('beforeend', `<option value="${user.id}">${user.name}</option>`)
    })
  }

  const handleCommentsModel = d => {
    comments = d
    commentList.innerHTML = `<ul>
      ${d.map(comment => `<li>
          <span class="user-header">${users.filter(user => user.id === comment.userId)[0].name[0]}</span>
          <time>${new Date(comment.createTime).toLocaleString()}</time>
          <p>${comment.content}</p>
      </li>`)}
    </ul>`
  }

  const handleError = error => {
    if (error instanceof Response) {
      errorMessageP.innerText = ` url: ${error.url} ${error.status}`
    }
  }

  const refreshPage = () => {
    Promise.all([request('/article/0001'), request('/user'), request('/comments/article/0001')]).then(([article, user, commentsOfArticle]) => {

      handleArticleModel(article)
      handleUserModel(user)
      handleCommentsModel(commentsOfArticle)

    }).catch(e => handleError(e))
  }

  refreshPage()

  /**
   * 切换用户
   */
  userSelect.onchange = function () {

    selectedUserId = this.value
    userInfo = users.filter(user => user.id === selectedUserId)[0]
    commentHeader.innerText = userInfo.name[0]
    userInfoDiv.innerText = JSON.stringify(userInfo)

    if (userInfo.upVoteArticles.find(record => record.article === article.id) > -1) {
      upVoteArticle.innerText = '已点赞(' + (article.upVoteCount) + ')'
      upVoteArticle.disabled = true
    }
  }
  upVoteArticle.onclick = function () {
    if (userInfo.upVoteArticles.find(record => record.article === article.id)) {
      return
    }
    $.post('/user/upVoteArticle', {userId: selectedUserId, articleId: article.id})
      .then((d => {
        console.log(d)
      }))
  }
  submitComment.onclick = function () {
    const _commentContent = commentContent.innerText.trim()
    if (!_commentContent) return
    request('/comments/add',
      {
        method: 'PUT',
        data: {content: _commentContent, userId: userInfo.id, articleId: article.id}
      })
      .then(d => {
        if (d.content === _commentContent) {
          $.get('/comments/article/0001').then(d => {
            handleCommentsModel(d)
          })
        }
      })
      .catch(e => handleError(e))
  }

}

document.addEventListener('DOMContentLoaded', main)
// document.addEventListener('readystatechange', main)