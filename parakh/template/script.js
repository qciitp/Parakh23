/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)

//index wala saman


/* Table of content
--------------------------------------------

========

--------
LOADER
ANIMATION ON PAGE LOAD
ANIMATION ON PAGE SCROLL
SONGS PROGRESS ANIMATION
NAVIGATION CONTENT HOVER EFFECT
NAVIGATION CONENT
SONGS PLAYER
CUSTOM CURSOR
CIRLE EFFECT
SLIDER ON SONGS PAGE
-----------
==========

*/


// LOADER
paceOptions = {
  ajax: true,
  document: true,
  eventLag: false
  };

  Pace.on('done', function() {
      gsap.to('.p',1,{
        opacity:0,
        y:'-15%',
        stagger:-.1,
      })

  gsap.to('#preloader',1.5,{
      y:'-100%',
      ease:'Expo.easeInOut',
      delay:1,
      onComplete: function() {

          //ALL THE ANIMATIONS THAT WILL TAKE PLACE AFTER THE PAGE IS LOADED


          $('.text').each(function(){
              $(this).delay(1200).addClass('reveal')
          })
          $('.img').each(function(){
              $(this).delay(1200).addClass('reveal')
          })



          if(document.querySelector('#index-two') || document.querySelector('#index-one')){
              gsap.to('.new-release',0,{opacity:1})
              $('.new-release').delay(2000).addClass('opacity');
          }



          if(document.querySelector('.fade-in') ){
              gsap.to('.fade-in',1,{delay:1,opacity:1,stagger:.4})
          }


          if(document.querySelector('.opacity-contact')){

              gsap.to('.opacity-contact',1,{delay:1,opacity:1,stagger:.4})

          } 



              $('.menu-bar-line').delay(2000).addClass('opacity');


            



//ALL THE ANIMATIONS THAT WILL TAKE PLACE WHILE SCROLLING


  $(function () {
      var elements = $(".text-scroll, .img-scroll").toArray();
      $(window).scroll(function () {
          elements.forEach(function (item) {
              if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
                  $(item).addClass("reveal");
              }
          });
      });
      elements.forEach(function (item) {
          if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight ) {
              $(item).addClass("reveal");
          }
      });
  });
      //animation for songs page
      if(document.querySelector('.fade-up') ){
          gsap.to('.fade-up',1,{opacity:1,y:0,delay:1,stagger:.1})
      }

      if(document.querySelector('.music-indicator') ){
          gsap.to('.music-indicator',1,{opacity:1,delay:1})
      }
      if(document.querySelector('.scale')){
          gsap.to('.scale',1,{opacity:1,delay:1,scale:1,stagger:.2})
      }

        }
  })
 });






 // SCROLL PROGRESS ANIMATION

 $(window).scroll(function() {
  var scroll = $(window).scrollTop(),
    dh = $(document).height(),
    wh = $(window).height();
  scrollPercent = (scroll / (dh - wh)) * 100;
  $(".progressbar").css("height", scrollPercent + "%");
});



//NAVIGATION CONTENT HOVER EFFECT 
$(function(){

TweenMax.set(".project-preview", { width: 0 });

$('.navigation-content ul li a').on('mouseover',function(){
    gsap.to('.project-preview',1,{width:'200px',ease: Expo.easeInOut})
})


$('.navigation-content ul li a').on('mouseout',function(){
  gsap.to('.project-preview',1,{width:'0px',ease: Expo.easeInOut})
})


$(".navigation-content ul li a").hover(function(e) {
  var img = e.currentTarget.dataset.img;

  $(".project-preview").css({ "background-image": `url(${img}) `});

});


  var $img = $('.project-preview');
    function cursormover(e){
     gsap.to( $img, {
       x : e.clientX,
       y : e.clientY,
      })
    }
    $('.navigation-content').on('mousemove',cursormover);
})

 




 //NAVIGATION CONTENT 
  $(function(){
      $('.menu-bar').on('click',function(){
          gsap.to('.navigation-content',1.5,{y:0, ease:'Expo.easeInOut'})
          gsap.to('.navigation-content ul li',1,{opacity:1,delay:1,stagger:.1})
          gsap.to('.navigation-content .opacity',.5,{opacity:1,stagger:.1,delay:1})

          if(document.querySelector('.fade-up')){

              gsap.to('.fade-up',1,{backdropFilter:'blur(0px)',delay:1});
          }  
      })




      $('.navigation-close').on('click',function(){
          gsap.to('.navigation-content ul li',.5,{opacity:0,stagger:-.1})
          gsap.to('.navigation-content .opacity',.5,{opacity:0,stagger:.1})
          gsap.to('.navigation-content',1.5,{y:'100%',ease:'Expo.easeInOut',delay:.2})

          if(document.querySelector('.fade-up')){

              gsap.to('.fade-up',1,{backdropFilter:'blur(20px)',delay:.5});

          }  
      })
  })



    

  //SONGS PLAYER 
  window.onload=function(){
      $('.play-song img').on('click',function(e){
          var song = e.currentTarget.dataset.song;
 
          var songtoplay = document.querySelector(`[data-audio="${song}"]`);
          

          //if song is playing pause it
          if (songtoplay.duration > 0 && !songtoplay.paused) {

              songtoplay.pause()

              songtoplay.classList.remove('playing')
          
              this.src="images/play.png";

              var sondindicator = document.querySelectorAll('.music-indicator-span');

              sondindicator.forEach(a=>a.classList.remove('animating'));

          
          } 

          //if song is not playing play it and if another song is playing mute the other song

          //also change the play button image to pause
          else {


              if($('.playing') && $('.playing-symbol')){
                  var playing = document.querySelectorAll('.playing')
                      playing.forEach(a=>a.pause());
                      playing.forEach(a=>a.classList.remove('playing'));
                     
  
                  var playingsymbol = document.querySelectorAll('.playing-symbol')
                      playingsymbol.forEach(a=>a.src="images/play.png");
                      playingsymbol.forEach(a=>a.classList.remove('playing-symbol'));
              }

              songtoplay.play()


              var sondindicator = document.querySelectorAll('.music-indicator-span');

              sondindicator.forEach(a=>a.classList.add('animating'));

  
              songtoplay.classList.add('playing')
              this.classList.add('playing-symbol')

              this.src="images/pause.png";
          
          }
      })
  }


        //CUSTOM CURSOR ANIMATION
        $(function(){
          var $cursor = $('.cursor');
          var $cursortwo = $('.cursor-two')
            function cursormover(e){
             
             gsap.to( $cursor , {
               x : e.clientX ,
               y : e.clientY,
              })
              gsap.to( $cursortwo , {
                x : e.clientX ,
                y : e.clientY,
               })
            }
            function cursorhover(e){
             gsap.to( $cursor,{
              scale:1.5,
              opacity:.4,
              background:'rgb(235,235,235)',
              border:'none',
              ease: Expo.easeOut,
             })
             gsap.to( $cursortwo,{
              scale:0,
              opacity:0
             })
           }
           function cursor(e){
             gsap.to( $cursor, {
              scale:1,
              opacity:1,
              background:'transparent',
              border:'1px solid rgb(235,235,235)',
              innerHTML:''
             }) 
             gsap.to( $cursortwo,{
              scale:1,
              opacity:1
             })
           }
           $(window).on('mousemove',cursormover);
           $('a').hover(cursorhover,cursor);
           $('.hover').hover(cursorhover,cursor);
           $('.mouse').hover(cursorhover,cursor);
           
        })
  
        


        //CIRCLE EFFECT ON CONTACT PAGE
        if(document.querySelector('#rotated')){
          $(function(){
              var circleType = new CircleType(document.getElementById('rotated')).radius(0);
          })
        }
  






//SWIPER ON SONGS PAGE

if(document.querySelector('.swiper-container')){
  new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      speed: 500,
      spaceBetween: 30,
      centeredSlides: true,
      loop: false,
      grabCursor: true,
      autoplay: {
          delay: 6500,
          disableOnInteraction: true,
        },
      navigation: {
        nextEl: '#next',
        prevEl: '#prev'
      },
      pagination: {
          el: '.progress-bar-container-swiper',
          type: 'progressbar',
        },
      mousewheel: true,
      observer: true,  
      observeParents: true,
    });
}











