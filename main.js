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

 function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior : "smooth" });
 }
 