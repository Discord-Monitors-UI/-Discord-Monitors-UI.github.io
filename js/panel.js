var token = localStorage.getItem('token');
if (!token)
{
	window.location.href = "login.html";
}
updateTable();

$(".logoutBtn").click(function(){
	localStorage.removeItem('token');
	$.ajax({
        url: "http://194.87.95.166:8060/api/Users/delete?Token=" + token,
        type: "post",
	    success: function (response) {
	        	window.location.href = "login.html";
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	           alert(textStatus + ' ' + errorThrown);
	           window.location.href = "login.html";
	    }
    });
});

function deleteChannel(channelId)
{
	$.ajax({
        url: "http://194.87.95.166:8060/api/Monitors/delete?Token=" + token + '&ChannelId=' + channelId,
        type: "post",
	    success: function (data) { 
	        updateTable();
    	},
	    error: function(jqXHR, textStatus, errorThrown) {
	           alert(textStatus + ' ' + errorThrown);
	    }
    });
}

function updateTable()
{
	$('.tablePadding tbody').empty();
	$.ajax({
        url: "http://194.87.95.166:8060/api/Monitors?Token=" + token,
        type: "get",
        dataType: 'json',
	    success: function (data) { 
	        $.each(data, function(index, element) {
	        	row = '<tr>';
	        	row += '<td>' + element.ChannelId + '</td>';
	        	row += '<td>' + element.Webhook + '</td>';
	        	row += '<td><input class="delIcon" type="image" src="https://cdn.iconscout.com/icon/free/png-256/delete-720-453898.png" id="' + element.ChannelId + '"/></td>';
	        	row += '<tr>';
	            $('.tablePadding tbody').append(row);
	        });
	        $(".delIcon").click(function() {
	        	var channelID = $(this).attr('id');
	        	deleteChannel(channelID);
	        });
    	},
	    error: function(jqXHR, textStatus, errorThrown) {
	           alert(textStatus + ' ' + errorThrown);
	    }
    });
}

$(".customBtn").click(function(){
	var params = '';
	var channelId = $(".chId").val();
	var webhook = $(".webhook").val();
	var filters = $(".filters").val();
	if (!channelId || !webhook)
	{
		alert("Enter Channel Id and Webhook!");
		return;
	}
	$(".chId").val('');
	$(".webhook").val('');
	$(".filters").val('');
	params += "Token=";
	params += token;
	params += "&ChanelId=";
	params += channelId;
	params += "&Webhook="
	params += webhook;
	if (filters)
	{
		params += "&Filter=";
		params += filters;
	}
	$.ajax({
        url: "http://194.87.95.166:8060/api/Monitors/add?" + params,
        type: "post",
	    success: function (response) {
	    	updateTable();
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	    	alert(textStatus + ' ' + errorThrown);
	    }
    });
});