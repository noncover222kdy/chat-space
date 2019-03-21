$(function() {
  function buildMESSAGE(message){
    var image = ""
    message.image !== null ? image = `<img src="${message.image}">` : image = "";
    var html = `<div class="message" data-message_id= "${ message.id }">
                  <div class="message__upper-info">
                    <p class="message__upper-info__user">
                      ${ message.user_name }
                    </p>
                    <p class="message__upper-info__date">
                      ${ message.created_at }
                    </p>
                  </div>
                  <div class="message__lower">
                    <p class="message__text">
                      ${ message.content }
                    </p>
                    <div class="message__lower__image">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  }

  function scroll_view(){
    $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 'fast');
  }

  var updateTime = 3000;
  setInterval(autoUpdate, updateTime);

  function autoUpdate() {
    var message_id = $('.message').last().data('message_id') || 0;
    var user_url = document.location.pathname;
    if (user_url.match(/messages/)){
      $.ajax({
        url: user_url,
        type: 'GET',
        data: {
          id: message_id
        },
        dataType: 'json'
      })

      .done(function(data){
        console.log(data);
        var insertMESSAGE = '';
        data.forEach(function(message) {
          if (message.id > message_id) {
          insertMESSAGE += buildMESSAGE(message);
          }
        });
        $('.messages').append(insertMESSAGE);
        scroll_view()
      })

      .fail(function(){
        alert('error');
      })

      .always(function(data){
        $('.submit-btn').prop('disabled', false);
      })
    }
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMESSAGE(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
      scroll_view()
    })
    .fail(function(){
      alert('error');
    })
  });
});
