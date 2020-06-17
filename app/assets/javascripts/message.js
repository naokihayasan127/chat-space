$(function(){
  function buildHTML(message){
    if (message.image) {
    let html = 
    `<div class="messagebox">
      <div class="post-info">
        <div class="post-info__name">
          ${message.user_name}
        </div>
        <div class="post-info__date">
          ${message.created_at}
        </div>
      </div>
      <div class="post-message">
        <p class="Message__content">
          ${message.content}
        </p>
        <img class = "form_image" src="${message.image}"}
      </div>           
    </div>`
    return html;
  } else {
    let html = 
    `<div class="messagebox">
      <div class="post-info">
        <div class="post-info__name">
          ${message.user_name}
        </div>
        <div class="post-info__date">
          ${message.created_at}
        </div>
      </div>
      <div class="post-message">
        <p class="Message__content">
          ${message.content}
        </p>
      </div>
    </div>`
    return html;
  };
}
                
$('.form').on('submit', function(e){
  e.preventDefault();
  let formData = new FormData(this);
  let url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    let html = buildHTML(data);
    $('.chat-main__post-list').append(html);
    $('.chat-main__post-list').animate({ scrollTop: $('.chat-main__post-list')[0].scrollHeight});
    $('form')[0].reset();
    $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
   });
});