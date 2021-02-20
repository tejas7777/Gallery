jQuery(document).ready(function() {
    jQuery('#loader-wrapper').fadeOut(3000);
});


  var result;
  var count = 0;

  function getPics(word){
     $('h1').css("display","none");

    $(".loader-wrapper").css("display","");
    // $("#container").append('<div id="loader-wrapper"><div id="loader"></div><div class="loader-section section-left"></div><div class="loader-section section-right"></div></div>');


    var requestString = "https://api.unsplash.com/search/photos?w=200&h=200&per_page=30&client_id=oJMjjnailgsOq7xaSnS3A52AMfLrOSwaXHzD_R8g2KY&query="+word;

    const http = new XMLHttpRequest()
    http.overrideMimeType("text/html");
    http.open("GET", requestString)
    http.send()

  http.onload = () => {

    if(http.status==403){
      alert("API KEY EXPIRED :(")
    }

    count = 0;

    response = JSON.parse(http.responseText);
    result = response["results"];

    console.log(response);

    if(result.length==0){
      $('h1').css("display","");
    }

    $('#container').empty();

    
    for(var i=0; i<14;i++){
     var data = result[i];
     var urlobj = data["urls"];
     var img_url = urlobj["regular"];
     var htmlString = '<div class="col-lg-2 col-md-5 col-6 mx-0"><a href="#" class="d-block mb-4 h-100"><img class="imgclass img-thumbnail" src='+img_url+' alt="" onclick="openModal(this.src)"></a></div>'

     $('#container').append(htmlString).fadeIn();
     count = count + 1;

    }

    $(".loader-wrapper").css("display","none");
  }

  
}

getPics("dogs")

$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() >= $(document).height()){
     //Your code here
      console.log("Scrolled")
      console.log(result);
           for(var i=count; i<30;i++){
            var data = result[i];
            var urlobj = data["urls"];
            var img_url = urlobj["regular"];
            var htmlString = '<div class="col-lg-2 col-md-5 col-6 mx-0"><a href="#" class="d-block mb-4 h-100"><img class="imgclass img-thumbnail" src='+img_url+' alt="" onclick="openModal(this.src)"></a></div>'
            $('#container').append(htmlString).show('slow');;
            count=count+1;
  }
}
});

function getSearch(){

  var searchText = $('#search_bar').val();
  getPics(searchText);

}

function openModal(source){
  console.log(source);
  $("#exampleModal").modal("show");
  $(".modal-img").attr("src",source);
}