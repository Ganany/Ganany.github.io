const PAGE = {
    data:{
        index:0,
        duration:500,
        islock:false,
        translateX:0,
        bannerNum:null,
        imgWidth:240,
    },
    init:function(){
        PAGE.clone();
        PAGE.bind();
    },
    bind:function(){
        window.addEventListener('resize',PAGE.Reset);
        let preclick = document.getElementById('swiper-prev');
        let nextclick = document.getElementById('swiper-next');
        preclick.addEventListener('click',PAGE.swpierPre);
        nextclick.addEventListener('click',PAGE.swpierNext);
    },
    Reset:function(){
        let index = PAGE.data.index;
        let list = document.getElementById("swiper-list");
        let width = list.offsetWidth;
        let translateX = - (width + width * index);
        PAGE.data.imgWidth = width;
        PAGE.data.translateX = translateX;
        list.style.transform = `translateX(${translateX}px)`;
    },
    swpierPre:function(){
        let index = PAGE.data.index;
        PAGE.goIndex(index-1);
    },
    swpierNext:function(){
        let index = PAGE.data.index;
        PAGE.goIndex(index+1);
    },
    clone:function(){
        let swiperList = document.getElementById('swiper-list');
        let swiperItems = document.getElementsByClassName('teacher-card');
        let firstItems = swiperItems[0].cloneNode(true);
        let lastItems = swiperItems[swiperItems.length-1].cloneNode(true);
        let index = PAGE.data.index;
        PAGE.data.bannerNum = swiperItems.length;
        PAGE.data.translateX = -(width*index);
        swiperList.prepend(lastItems);
        swiperList.appendChild(firstItems);
        PAGE.goIndex(index);
    },
    goIndex:function(index){
        let duration = PAGE.data.duration;
        let width = PAGE.data.imgWidth;
        let beginTranslateX = PAGE.data.translateX;
        let endTranslateX = -(width*index);
        let swiperList = document.getElementById('swiper-list');
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
                value = - (width * index);
            };
            if(index === bannerNum){
                index = 0;
                value = - (width * index);
            }
            swiperList.style.transform = `translateX(${value}px)`;
            PAGE.data.index = index;
            PAGE.data.translateX = value;
            PAGE.data.islock = false;
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
    }
}
PAGE.init()