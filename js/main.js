


var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";
//Pictures in the boxes//
// Chane to imgur   //
var ImgSource = [
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

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
  }

// This shuffles the images when game is restarted//

function ShuffleImages() {
  var ImgAll = $(Source).children();
  var ImgThis = $(Source + " div:first-child");
  var ImgArr = new Array();

// This is the  shows the current images matched.
  for (var i = 0; i < ImgAll.length; i++) {
    ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
    ImgThis = ImgThis.next();
  }

    ImgThis = $(Source + " div:first-child");

  for (var z = 0; z < ImgAll.length; z++) {
  var RandomNumber = RandomFunction(0, ImgArr.length - 1);

    $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
    ImgArr.splice(RandomNumber, 1);
    ImgThis = ImgThis.next();
  }
}

// When the cards  are matched the set is removed
function ResetGame() {
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    return false;
}
//This make all of the cards perform their actions //

function OpenCard() {
  var id = $(this).attr("id");

  if ($("#" + id + " img").is(":hidden")) {
    $(Source + " div").unbind("click", OpenCard);

    $("#" + id + " img").slideDown('fast');

    if (ImgOpened == "") {
      BoxOpened = id;
      ImgOpened = $("#" + id + " img").attr("src");
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard)
      }, 300);
    } else {
      CurrentOpened = $("#" + id + " img").attr("src");
      if (ImgOpened != CurrentOpened) {
        setTimeout(function() {
          $("#" + id + " img").slideUp('fast');
          $("#" + BoxOpened + " img").slideUp('fast');
          BoxOpened = "";
          ImgOpened = "";
        }, 400);
      } else {
        $("#" + id + " img").parent().css("visibility", "hidden");
        $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
        ImgFound++;
        BoxOpened = "";
        ImgOpened = "";
      }
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard)
      }, 400);
    }

    // This counts the number of clicks it takes you to finish the game//
    //  and lets you know via text the results.                        //
    Counter++;
    $("#counter").html("" + Counter);

    //This shows all matched images at the end of game//
    if (ImgFound == ImgSource.length) {
      $("#counter").prepend('<span id="success">你找的图片</span>');
    }
  }
}

$(function() {
  for (var y = 1; y < 3 ; y++) {
    $.each(ImgSource, function(i, val) {
      $(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
    });
  }
  $(Source + " div").click(OpenCard);
  ShuffleImages();


});






