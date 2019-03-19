$(function() {
  function buildHTML(message){
    var image = ""
    message.image !== null ? image = `<img src="${message.image}">` : image = "";

    var html = `<div class="message__upper-info">
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
                </div>`
    return html;
  }

function buildMESSAGE(message){
  var image = ""
  message.image !== null ? image = `<img src="${message.image}">` : image = "";
  console.log(message)

  var html = `<div class="message data-message_id">
                <div class="message__upper-info">
                  <p class="message__upper-info__user">
                    ${ message.user_name }
                  </p>
                  <p class="message__upper-info__date">
                    ${ message.created_at }
                  </p>
                </div>
                <div class="message__lower">
                  ${ message.content }
                    <p class="message__text">
                    </p>
                  <div class="message__lower__image">
                    ${ image }
                  </div>
                </div>
              </div>`
  return html;
  $(".messages").append(html);
}

  $(function(){
    setInterval(update, 5000);
    // $('.submit-btn').prop('disabled', false);
  });

  function update(){
    if($('.messages')[0]){
      var message_id = $('.message:last').data('message_id');
    } else {
      var message_id = 0;
    }

    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        id: message_id
      },
      dataType: 'json'
    })

    .done(function(data){
      $.each(data, function(i, data){
        var html = buildMESSAGE(data);
        $('.messages').append(html);
        $('.submit-btn').prop('disabled', false);
        $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 'fast');
      });
    })

    .fail(function(){
      alert('error');
    })

    .always(function(data){
      // console.log(data)
      $('.submit-btn').prop('disabled', false);
    })

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
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  });
});
