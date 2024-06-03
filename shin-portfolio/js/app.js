$(function(){
  const sectionTopArr = [];

  nav();
  project();

  function nav(){
    const logo = $('.logo, #arrow');
    const menu = $('nav li');
    const section = $('main section');

    $(window).on('load resize', function(){
      console.log('load');
      for(let i = 0; i < section.length; i ++){
        sectionTopArr[i] = section.eq(i).offset().top;
      };
    });

    menu.each(function(i){
      $(this).attr('data-section', (i+1));
    });
    section.each(function(i){
      $(this).attr('data-section', i);
    });


    logo.on('click', function (e){
      e.preventDefault();

      $('html, body').stop().animate({
        scrollTop: $('section').eq(0).offset().top - 30
      });
    });
    
    menu.on('click', function (e){
      e.preventDefault();
      
      $('html, body').stop().animate({
        scrollTop: sectionTopArr[$(this).data('section')] - 30
      });
    });

    $(window).on('scroll', function(e){
      const scrollTop = $(this).scrollTop();

      for(let i = 0; i < sectionTopArr.length; i++){
        if(scrollTop >= sectionTopArr[i+1] - 60) {
          menu.eq(i).addClass('active').siblings().removeClass('active');
        } else {
          menu.eq(i).removeClass('active');
        }
      }
    })
    
  };


  function project (){
    const projectWrap = $('#project'),
          tabMenu = projectWrap.find('.tab-menu li'),
          allTabs = projectWrap.find('.project-wrap .grid-container');

    tabMenu.each(function(i){
      $(this).attr('data-tab', 'tab' + i);
    });
    allTabs.each(function(i){
      $(this).attr('data-tab', 'tab' + (i+1));
    });

    tabMenu.on('click', function (){
      const dataTab = $(this).data('tab'),
            getWrapper = $(this).closest(projectWrap);

      getWrapper.find(tabMenu).removeClass('active');
      $(this).addClass('active');

      getWrapper.find(allTabs).hide();

      if ($(this).data('tab') == 'tab0'){
        getWrapper.find(allTabs).show();
      } else {
        getWrapper.find(allTabs).filter('[data-tab='+dataTab+']').show();
      };

    });


  };

});