$(function() {
var search_list = $("#user-search-result");
var search_user = $("#chat-group-form__members");
var search_user_ids = [];

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user_id=${ user.id } data-user_name=${ user.name }>追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUserToHTML(no_user) {
  var html = `<div class="chat-group-user clearfix">${no_user}
              </div>`
  search_list.append(html);
}

function appendAddUser(user_name, user_id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input class='chat-members' name='group[user_ids][]' type='hidden' value=${ user_id }>
                <p class='chat-group-user__name'>${ user_name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  search_user.append(html);
}

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var search_user_ids = [];
    $('.chat-members').each(function(){
      search_user_ids.push($(this).val());
    });
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input, ids: search_user_ids },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendNoUserToHTML("一致するユーザーは見つかりません");
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    })
  });
  search_list.on('click', '.user-search-add', function() {
    var user_id = $(this).data('user_id');
    var user_name = $(this).data('user_name');
    $(this).parent().remove();
    appendAddUser(user_name, user_id);
  });

  search_user.on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
});
