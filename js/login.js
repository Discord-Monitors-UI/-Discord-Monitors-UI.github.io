if (localStorage.getItem('token'))
{
	window.location.href = "index.html";
}

$(".newBtn").click(function(){
  var token = $('.tokenInput').val();
  if (!token)
  {
  	alert('Enter your token!');
  	return;
  }
  $.ajax({
        url: "https://localhost:7268/api/Users/add?Token=" + token,
        type: "post",
        success: function (response) {
        	localStorage.setItem('token', token);
        	window.location.href = "index.html";
        },
        error: function(jqXHR, textStatus, errorThrown) {
           alert('Invalid token!');
        }
    });
});