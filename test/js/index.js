let backgroundColors = ['linear-gradient(0deg, #F0F5FF 95%, rgba(215, 219, 235, .5) 0)', 'linear-gradient(0deg, #F1FFF0 95%, rgba(220, 235, 215, .5) 0)', 'linear-gradient(0deg, #FEFFF0 95%, rgba(226, 227, 201, .5) 0)', 'linear-gradient(0deg, #FFF0F0 95%, rgba(235, 215, 215, .5) 0)'];
let borders = ['1px solid rgba(213, 214, 234, .9)', '1px solid rgba(219, 234, 213, .9)', '1px solid rgba(243, 244, 223, .9)', '1px solid rgba(234, 213, 213, .9)'];
const PAGE = {
  data: {
    backgroundColors: backgroundColors,
    borders: borders,
    scripWidth: 320,
    scripHeight: 160,
    wallPadding: 20,
    maxWidth: 0,
    maxHeight: 0,
    scripTop: 0,
    scripLeft: 0,
    zIndex: 0,
    scrip: null,
    pageX: 0,
    pageY: 0,
    lock: true
  },
  init: function() {
    this.bind();
  },
  bind: function() {
    $('#wishes-btn').on('click', this.addScrip);
    $('#wishes-wall').on('mousedown', '.whshes-scrip', this.selectScrip);
    $(window).on('mousemove', this.moveScrip);
    $(window).on('mouseup', this.releaseScrip);
    $('#wishes-wall').on('click', '.scrip-close', this.removeScrip);
  },
  addScrip: function() {
    let value = '小兔兔说：<br>' + $('#wishes-search').val().trim();
    let scripWidth = PAGE.data.scripWidth;
    let scripHeight = PAGE.data.scripHeight;
    let wallPadding = PAGE.data.wallPadding;
    let wallWidth = $('#wishes-wall').get(0).offsetWidth;
    let wallHeight = $('#wishes-wall').get(0).offsetHeight;
    let maxWidth = wallWidth - wallPadding - scripWidth;
    let maxHeight = wallHeight - wallPadding - scripHeight;
    PAGE.data.maxWidth = maxWidth;
    PAGE.data.maxHeight = maxHeight;
    let scripTop = PAGE.random(wallPadding, maxHeight);
    let scripLeft = PAGE.random(wallPadding, maxWidth);
    let zIndex = ++ PAGE.data.zIndex;
    let backgroundColors = PAGE.data.backgroundColors;
    let backgroundColor = backgroundColors[zIndex % backgroundColors.length];
    let borders = PAGE.data.borders;
    let border = borders[zIndex % borders.length]; 
    let html = `
      <div class="whshes-scrip" style="top:${scripTop}px; left:${scripLeft}px; z-index:${zIndex}; background:${backgroundColor}; background-size: 100% 21px; border:${border};">
        <div class="scrip-close"></div>${value}
      </div>`;
    $('#wishes-wall').append(html);
    $('#wishes-search').val('');
  },
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  selectScrip: function(e) {
    let scrip = e.target;
    scrip.style.zIndex = ++ PAGE.data.zIndex;
    PAGE.data.scrip = scrip;
    PAGE.data.scripTop = scrip.offsetTop;
    PAGE.data.scripLeft = scrip.offsetLeft;
    PAGE.data.pageX = e.pageX;
    PAGE.data.pageY = e.pageY;
    PAGE.data.lock = false;
  },
  moveScrip: function(e) {
    if(!PAGE.data.lock) {
      let wallPadding = PAGE.data.wallPadding;
      let maxWidth = PAGE.data.maxWidth;
      let maxHeight = PAGE.data.maxHeight;
      let scripLeft = e.pageX - PAGE.data.pageX + PAGE.data.scripLeft;
      let scripTop = e.pageY - PAGE.data.pageY + PAGE.data.scripTop;
      scripLeft = scripLeft > maxWidth ? maxWidth : scripLeft;
      scripLeft = scripLeft < wallPadding ? wallPadding : scripLeft;
      scripTop = scripTop > maxHeight ? maxHeight : scripTop;
      scripTop = scripTop < wallPadding ? wallPadding : scripTop;
      PAGE.data.scrip.style.left = scripLeft + 'px';
      PAGE.data.scrip.style.top = scripTop + 'px';
    }
  },
  releaseScrip: function() {
    PAGE.data.lock = true;
    $(PAGE.data.scrip).addClass('show').siblings().removeClass('show');
  },
  removeScrip: function() {
    $(this).parent().remove();
  }
}
PAGE.init();