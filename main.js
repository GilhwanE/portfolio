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
    navbarmenu.classList.remove('open');

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

const togglemenu = document.querySelector('.navbar__toggle-btn');
togglemenu.addEventListener('click', ()=>{
    navbarmenu.classList.toggle('open');
})

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

contactbtn.addEventListener("mouseleave",()=>{
    contactbtn.style.opacity = 1-window.scrollY  / homeheight; 
});

// when elements clicked, the element view 
 function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior : "smooth" });
 }


// When the user scroll down, user get a scroll button
const arrowUp=document.querySelector(".arrow-up");
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeheight/2){
        arrowUp.classList.add('visible');
        }else{
            arrowUp.classList.remove('visible');
    }
});

 // When the user click on the button, scroll to the top of the document
 arrowUp.addEventListener("click", ()=>{
    scrollIntoView("#home");
});

// when the user click the desired category, the corresponding category elements are visble.

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    // Remove selection from the previous item and select the 
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = 
    e.target.nodeName === 'BUTTON' ? e.target :e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');

    setTimeout(()=>{
        projectContainer.classList.remove('anim-out');
    },300);
    
    projects.forEach((project) => {
        if(filter==='*' || filter===project.dataset.type){
            project.classList.remove('invisible');
        }else{
            project.classList.add('invisible');    
    }
    });
});


// Get the container element

// const categoryBtn = document.querySelectorAll('.work__categories');

// categoryBtn.forEach((category__btn)=> {
//     workBtnContainer.addEventListener('click', ()=>
//     {
//         categoryBtn.forEach(btn => btn.classList.remove('active'));
//         this.classList.add('active');
//     });
// }); 


// 1. 모든 세션들과 메뉴아이템을 가져온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킴

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root :null,
    rootMargin: '0px',
    threshold:0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry=>{
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            //스크룰링 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0){                
                selectedNavIndex = index + 1;
            } else{
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () =>  {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if(
        window.scrollY + window.innerHeight ===document.body.clientHeight){
            selectedNavIndex = navItems.length -1;
        }
    selectNavItem(navItems[selectedNavIndex]);
})
