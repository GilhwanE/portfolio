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

//make contaact button when it is on the contact
// Handle scrolling when tapping on the nabar menu
const navbarmenu = document.querySelector('.navbar__menu');
navbarmenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarmenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
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
        if(filter === '*' || filter === project.dataset.type){
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

const sectionIds = [  //id값을 가지고 있는 배열 변수를 만든다. 
    '#home',
    '#about',
    '#skills',
    '#work',
    '#contact',
];
//map 하나하나 돌면서 
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`)); //모든 요소들 받아오기

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

// when elements clicked, the element view 
 function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior : "smooth" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
 }

const observerOptions = {
    root: null, //내가 어떤걸 기준으로 보여줄지 null이면 viewport
    rootMargin: '0px', //
    threshold: 0.3, //얼마만큼 보여줘야 콜벡함수를 호출할지
}

const observerCallback = (entries, observer) => {   //요소 활성화
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){  //isIntersecting : 들어오는 상태 , intersectionRatio : 얼마나 들어와있는지 (전부면1)
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
//observer 생성 후 요소 관찰
const observer = new IntersectionObserver(observerCallback,observerOptions);    //전달함 관찰자를 만들었으니까 이제 관찰해야함
sections.forEach(section => observer.observe(section)); //우리의 sections들을 관찰 / observer 특정요소가 들어오고 나갈때 콜백함수를 호출 

window.addEventListener('wheel', () =>  {
    if(window.scrollY === 0) { //페이지 가장 위에 있을때 
        selectedNavIndex = 0;
    } else if(
        Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){ 
            //가장 밑으로   
            selectedNavIndex = navItems.length -1;
        }
    selectNavItem(navItems[selectedNavIndex]);
});
