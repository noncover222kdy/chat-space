$(function() {
  function buildHTML(message){
    var html = `<div class="message__upper-info">
                  <p class="message__upper-info__user">
                    ${ message.user_name }
                  </p>
                  <p class="message__upper-info__date">
                    ${ message.created_at }
                  </p>
                </div>

                <div class="message__lower">
                  ${if message.content.present?}
                  <p class="message__text">
                    ${message.content}
                  </p>
                  <div class="message__lower__image"><img src="${ message.image.url if message.image.present? }">
                  </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
      $('.input-box__text').val('');

    });
    .fail(function(){
      alert('error');
    });
  });
});
