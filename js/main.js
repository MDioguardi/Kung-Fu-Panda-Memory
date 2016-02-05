var boxOpened = "";
var imgOpened = "";
var counter = 0;
var imgFound = 0;

var source = "#boxcard";

var imgSource = [
  "http://a1.mzstatic.com/us/r1000/022/Purple/76/e4/ed/mzl.upwpacxr.100x100-75.jpg",
  "http://www.playgamesarcade.com/games/images/kung-fu-panda-world-tigress-jump_2.jpg",
  "http://www.freeplaynow.com/uploads/kung-fu-panda-world-monkey-run.jpg",
  "http://images5.fanpop.com/image/photos/26500000/Kung-Fu-Panda-kung-fu-panda-26505677-100-100.png",
  "http://orig14.deviantart.net/12d7/f/2008/256/8/1/kung_fu_panda_icon_2_by_oneenekochan.jpg",
  "http://images5.fanpop.com/image/category/74/74816_1332631384_100_100.jpg",
  "http://cdn.inquisitr.com/wp-content/uploads/2016/01/kung-fu-panda-3-review-100x100.jpg",
  "http://images4.fanpop.com/image/polls/740000/740031_1307490049245_100.jpg?v=1307490274",
  "http://www.thenewpotato.com/wp-content/uploads/2015/10/the-bao-st-marks-100x100.jpg?d01037",
  "http://www.whats-your-sign.com/images/100xNxChineseSymbol4.jpg.pagespeed.ic.DU3DcnK35R.jpg"
  ]

function randomFunction(maxValue, minValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

//  shuffles the images when game is restarted//

function shuffleImages() {
  var imgAll = $(source).children();
  var imgThis = $(source + " div:first-child");
  var imgArr = new Array();

//  shows the current images matched.
  for (var i = 0; i < imgAll.length; i++) {
    imgArr[i] = $("#" + imgThis.attr("id") + " img").attr("src");
    imgThis = imgThis.next();
  }

    imgThis = $(source + " div:first-child");

  for (var z = 0; z < imgAll.length; z++) {
  var randomNumber = randomFunction(0, imgArr.length - 1);

    $("#" + imgThis.attr("id") + " img").attr("src", imgArr[randomNumber]);
    imgArr.splice(randomNumber, 1);
    imgThis = imgThis.next();
  }
}

// When the cards  are matched the set is removed
function resetGame() {
    shuffleImages();
    $(source + " div img").hide();
    $(source + " div").css("visibility", "visible");
    counter = 0;
    $("#success").remove();
    $("#counter").html("" + counter);
    boxOpened = "";
    imgOpened = "";
    imgFound = 0;
    return false;
}
//This make all of the cards perform their actions //

function openCard() {
  var id = $(this).attr("id");

  if ($("#" + id + " img").is(":hidden")) {
    $(source + " div").unbind("click", openCard);

    $("#" + id + " img").slideDown('fast');

    if (imgOpened == "") {
      boxOpened = id;
      imgOpened = $("#" + id + " img").attr("src");
      setTimeout(function() {
        $(source + " div").bind("click", openCard)
      }, 300);
    } else {
      currentOpened = $("#" + id + " img").attr("src");
      if (imgOpened != currentOpened) {
        setTimeout(function() {
          $("#" + id + " img").slideUp('fast');
          $("#" + boxOpened + " img").slideUp('fast');
          boxOpened = "";
          imgOpened = "";
        }, 400);
      } else {
        $("#" + id + " img").parent().css("visibility", "hidden");
        $("#" + boxOpened + " img").parent().css("visibility", "hidden");
        imgFound++;
        boxOpened = "";
        imgOpened = "";
      }
      setTimeout(function() {
        $(source + " div").bind("click", openCard)
      }, 400);
    }

    // This counts the number of clicks it takes you to finish the game//
    //  and lets you know via text the results.                        //
    counter++;
    $("#counter").html("" + counter);

    //This shows all matched images at the end of game//
    if (imgFound == imgSource.length) {
      $("#counter").prepend('<span id="success">你找的图片</span>');
    }
  }
}

$(function() {
  for (var y = 1; y < 3 ; y++) {
    $.each(imgSource, function(i, val) {
      $(source).append("<div id=card" + y + i + "><img src=" + val + " />");
    });
  }
  $(source + " div").click(openCard);
  shuffleImages();


});







