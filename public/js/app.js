$(".article-save").on("click", "#save", function(){
	var id = $(this).attr("data-id");
	$(this).css("color","red");
	$.ajax ({
		method: "PUT",
		url: "/saved/" + id
	}).then(function(data) {
		console.log("updated")
	})
});

$(".article-delete").on("click", "#delete", function(){
	var id = $(this).attr("data-id");
	$.ajax ({
		method: "PUT",
		url: "/unsave/" + id
	}).then(function(data) {
		console.log("deleted")
		location.reload();
	})
});


$(document).ready(function(){
    $('.modal').modal();
  });


$("#add-note").on("click", function() {
  var id = $(this).attr("data-id");
  var note = $(`#note${id}`).val() 
  console.log(note);
  $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
      body: note }
  })
    .then(function(data) {
      console.log(data);
    });
  $(`#note${id}`).val("");
});