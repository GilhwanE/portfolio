'use strict';

// make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});

// make contact button when it is on the contact
// Handle scrolling when tapping on the navbar menu
const navbarmenu = document.querySelector('.navbar__menu');
navbarmenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link ==null){
        return;
    }
    scrollIntoView(link);
});

 // Handle click on "contact me" button on home
const contactbtn = document.querySelector('.home__contact');
 contactbtn.addEventListener('click', (event)=> {
     scrollIntoView('#contact');

 });

 // 스크롤 내릴때 home컨텐츠내용 점점 흐려지게 하는것
 const homecontainer = document.querySelector('.home__container');
 const homeheight = homecontainer.getBoundingClientRect().height;
 const home = document.querySelector("#home");
 document.addEventListener('scroll', () => {
    homecontainer.style.opacity = 1-window.scrollY / homeheight;
    contactbtn.style.opacity = 1-window.scrollY  / homeheight; 
});

contactbtn.addEventListener("mouseenter", ()=>{
    contactbtn.style.opacity = 0.9;
});

contactbtn.addEventListener("monuseleave",()=>{
    contactbtn.style.opacity = 1-window.scrollY  / homeheight; 
});

 function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior : "smooth" });
 }

