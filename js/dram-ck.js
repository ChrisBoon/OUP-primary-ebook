$(document).ready(function(){localStorage.getItem("saved_page")===null&&localStorage.setItem("saved_page",0);var e=$("body").data("activityunit"),t=parseInt(localStorage.getItem("saved_page")),n=$(".page").length-1,r=function(){var e=$(".pages-wrapper").find("[data-pagenumber='"+t+"']"),n=e.data("hasactivity");n==="yes"?$(".activity-container").removeClass("no-activity"):$(".activity-container").addClass("no-activity")},i=function(){t===n&&$(".pt-button-next").removeClass("live-btn");t<n&&$(".pt-button-next").addClass("live-btn");t===0&&$(".pt-button-prev").removeClass("live-btn");t>0&&$(".pt-button-prev").addClass("live-btn")},s=function(e){$(".page").removeClass("active-page page-before page-after");var t=$(".pages-wrapper").find("[data-pagenumber='"+e+"']"),r=t.attr("data-pagenumber");t.addClass("active-page");r>0&&t.prev().addClass("page-before");r<n&&t.next().addClass("page-after")},o=function(e){localStorage.setItem("saved_page",e);t=e};s(t);i();r();$(".pt-button").on("click",function(){var e;$(this).hasClass("pt-button-prev")?e=t-1:e=t+1;s(e);o(e);i();r()});var u={el:{holder:$(".pages-wrapper"),pageActive:$(".active-page"),pageBefore:$(".page-before"),pageAfter:$(".page-after"),nextBtn:$(".pt-button-next"),prevBtn:$(".pt-button-prev")},slideWidth:$(".pages-wrapper").width(),touchstartx:undefined,touchmovex:undefined,movex:undefined,invertmovex:undefined,init:function(){this.bindUIEvents()},bindUIEvents:function(){this.el.holder.on("touchstart",function(e){u.start(e)});this.el.holder.on("touchmove",function(e){u.move(e)});this.el.holder.on("touchend",function(e){u.end(e)})},start:function(e){navigator.userAgent.match(/Android/i)&&e.preventDefault();this.touchstartx=e.originalEvent.touches[0].pageX;$(".page").removeClass("animate")},move:function(e){this.touchmovex=e.originalEvent.touches[0].pageX;this.movex=this.touchstartx-this.touchmovex;this.invertmovex=this.movex*=-1;this.beforemovex=this.invertmovex-this.slideWidth;this.aftermovex=this.invertmovex+this.slideWidth;if(this.movex>0)if(t===0){$(".active-page").css("transform","translate3d(0px,0,0)");$(".page-after").css("transform","translate3d(100%,0,0)")}else{$(".active-page").css("transform","translate3d("+this.invertmovex+"px,0,0)");$(".page-before").css("transform","translate3d("+this.beforemovex+"px,0,0)")}if(this.movex<0)if(t===n){$(".active-page").css("transform","translate3d(0px,0,0)");$(".page-before").css("transform","translate3d(-100%,0,0)")}else{$(".active-page").css("transform","translate3d("+this.invertmovex+"px,0,0)");$(".page-after").css("transform","translate3d("+this.aftermovex+"px,0,0)")}},end:function(e){$(".page").addClass("animate");this.movex<=-140&&t<n?this.el.nextBtn.click():this.movex>=140&&t>0&&this.el.prevBtn.click();$(".active-page").css("transform","translate3d(0px,0,0)");$(".page-before").css("transform","translate3d(-100%,0,0)");$(".page-after").css("transform","translate3d(100%,0,0)");this.movex=undefined;this.invertmovex=undefined}};u.init();$(".activity-tab").on("click",function(){$(this).next(".activity-holder").load("../html/u"+e+"a"+t+".html").parents(".activity-container").addClass("is-active").next(".activity-modal").addClass("is-active",function(){$(".activity-title").addClass("is-active")})});$(".activity-close").on("click",function(){$(this).siblings(".activity-holder").empty().siblings(".activity-title").removeClass("is-active").parents(".activity-container").removeClass("is-active").next(".activity-modal").removeClass("is-active").end().find(".activity-css").empty()})});