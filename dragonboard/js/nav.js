const PAGE ={
    data:{
        navArr:['section-1','section-2','section-3','section-4','section-5'],
        navActive:'',
        navOffset: 500,
        navHeight: 74,
        index:0,
        duration:500,
        islock:false,
        translateX:-240,
        bannerNum:5,
        imgWidth:240,
    },
    init:function(){
        
        PAGE.clone()
        PAGE.bind();
    },
    bind: function(){
        window.addEventListener('scroll',PAGE.refreshNav);
        let navitems = document.getElementById('navigator-bar');
        PAGE.onEventListener(navitems,'click','nav',PAGE.GoSection);
        let preclick = document.getElementById('swiper-prev');
        let nextclick = document.getElementById('swiper-next');
        preclick.addEventListener('click',PAGE.swpierPre);
        nextclick.addEventListener('click',PAGE.swpierNext);
        let buttons = document.getElementsByClassName("arrow-icon");
        for(i=0; i<3; i++){
            buttons[i].addEventListener('click',PAGE.changeSlide)
        }
    },
    changeSlide:function(e){
        let className = e.target.className;
        let index = Number(e.target.dataset.index);
        let lists = document.getElementsByClassName('list-part-content-container');
        let height = Number(lists[index].offsetHeight);
        let list = lists[index];
        if(className === "arrow-icon unshow"){
            let divlength = list.children.length;
            let totalHeight = 40 *  divlength;
            e.target.className = 'arrow-icon';
            PAGE.animate(0,totalHeight,40,function(value){
                list.style.height = `${value}px`
            },function(){
                list.style.height = `${totalHeight}px`
            })
            //lists[index].className = "list-part-content-container"
        }else if(className === "arrow-icon"){
            e.target.className = 'arrow-icon unshow';
            PAGE.animate(height,0,40,function(value){
                lists[index].style.height = `${value}px`
            },function(){
                lists[index].style.height = `0px`
            })
            //lists[index].className = "list-part-content-container close"
        };
        PAGE.bind();
    },
    swpierPre:function(){
        let index = PAGE.data.index - 1;
        PAGE.goIndex(index);
    },
    swpierNext:function(){
        
        let index = PAGE.data.index + 1;
        PAGE.goIndex(index)
    },
    clone:function(){
        let teachersBlock = document.getElementById("teachers-block");
        let teacherCards = document.getElementsByClassName("teacher-card");
        for( i=0; i<4 ; i++){
            let firstCard = teacherCards[i].cloneNode(true);
            teachersBlock.appendChild(firstCard);
        };
        let lastCard = teacherCards[i].cloneNode(true);
        teachersBlock.prepend(lastCard);
        teachersBlock.style.transform = `translateX(-240px)`;
        
    },
    goIndex:function(index){
        let duration = PAGE.data.duration;
        let width = PAGE.data.imgWidth;
        let beginTranslateX = PAGE.data.translateX;
        let endTranslateX = -(width+width*index);
        let swiperList = document.getElementById("teachers-block");
        let isLock = PAGE.data.islock;
        if (isLock){
            return
        };
        PAGE.data.islock = true;
        PAGE.animate(beginTranslateX,endTranslateX,duration,function(value){
            swiperList.style.transform = `translateX(${value}px)`;
        },function(value){
            let bannerNum = PAGE.data.bannerNum;
            if(index === -1){
                index = bannerNum - 1;
                value = - (width + width * index);
            };
            if(index === bannerNum){
                index = 0;
                value = - (width + width * index);
            }
            swiperList.style.transform = `translateX(${value}px)`;
            PAGE.data.index = index;
            PAGE.data.translateX = value;
            PAGE.data.islock = false;
            PAGE.hightlight(index)
        })
        
    },
    animate:function(begin,end,duration,callback,finish){
        let startTime = Date.now();
        requestAnimationFrame(function update(){
            let present = Date.now();
            let time = present-startTime;
            let value = PAGE.linear(time,begin,end,duration);
            callback(value);
            if (startTime+duration>present){
                requestAnimationFrame(update)
            }else{
                finish(end)
            }
        })
    },
    linear:function(time,begin,end,duration){
        return (end-begin)*time/duration + begin
    },
    onEventListener:function(parentNode,action,childname,callback){
        parentNode.addEventListener(action,function(e){
            if(e.target.className.indexOf(childname) >-1){
                callback(e)
            }
        })
    },
    GoSection:function(e){
        let id = e.target.dataset.nav;
        let beginY = document.documentElement.scrollTop;
        let endY = document.getElementById(id).offsetTop - PAGE.data.navHeight;
        //document.documentElement.scrollTop = offsetTop;
        PAGE.animate(beginY,endY,500,function(value){
            document.documentElement.scrollTop = value;
        },function(){
            document.documentElement.scrollTop = endY;
        }
        )
    },
    refreshNav: function(){
        PAGE.fixedNav();
        PAGE.lightNav();
    },
    fixedNav: function(){
        let scrollTop = document.documentElement.scrollTop;
        let navTop = PAGE.data.navOffset;
        let nav = document.getElementById('navigator-bar')
        if (scrollTop > navTop){
            nav.className = 'navigator-bar fixed-navs'
        }else{
            nav.className = 'navigator-bar'
        }
    },
    lightNav:function(){
        let scroll = document.documentElement.scrollTop;
        let navScrolled = PAGE.data.navArr.filter(data =>{
            let nav = document.getElementById(data).offsetTop;
            return scroll + PAGE.data.navHeight +60 >= nav;
        });
        let SectionActive = navScrolled.length ? navScrolled[navScrolled.length-1] : '' ;
        let navitems = document.getElementsByClassName("nav");
        for (let i = 0; i< navitems.length; i++){
            let navitem = navitems[i];
            let dataNav = navitem.dataset.nav;
            if (dataNav === SectionActive){
                navitem.className = 'nav active'
            }else{
                navitem.className = 'nav'
            }
        }
    }
};
PAGE.init()