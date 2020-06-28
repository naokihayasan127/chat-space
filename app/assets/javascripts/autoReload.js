$(function(){
  function buildHTML(message){
    if(message.image){
    let img = ( message.image )? `<img class= "form_image" src=${message.image}> `: ''
    let html = 
              `<div class="messagebox" data-message-id=${message.id}>
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
  } else {
    let html = 
              `<div class="messagebox" data-message-id=${message.id}>
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

let reloadMessages = function() {
  let last_message_id = $('.messagebox:last').data("message-id");
  console.log(last_message_id)
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      let insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main__post-list').append(insertHTML);
      $('.chat-main__post-list').animate({ scrollTop: $('.chat-main__post-list')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert('error');
  });
 
};
setInterval(reloadMessages, 7000);
});


