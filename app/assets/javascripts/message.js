$(function(){
  function buildHTML(message){
    if(message.image){
    let img = '<img class = "form_image" src="${message.image}"'
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
          ${img}
      </div>           
    </div>`
    return html;
  }
   else {
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
    let chatmain = '.chat-main__post-list';
    let html = buildHTML(data);
    $(chatmain).append(html);
    $(chatmain).animate({ scrollTop: $(chatmain)[0].scrollHeight});
    $('form')[0].reset();
    $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
     })
     .always(function(){
      let chatmain ='.chat-main__post-list'
      $('form')[0].reset();
      $(chatmain).animate({ scrollTop: $(chatmain)[0].scrollHeight});
      $('.submit').prop('disabled', false);
    });
   });
});