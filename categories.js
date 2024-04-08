// $(document).ready(function(){
    /**
     * 
     * @function json_obj отвечает за полчучение json объекта 
     * при успешном получении от получает данные и передаёт их в функции cat_filter() и cat()
     * также присутствуют функции для анимации при загрузке страницы before_h2(); before_p(); before_img(); before_block();
     * 
     * @function cat_filter()   - отвечает за вывод категорий картинки, slug и названия для фильтров
     * @function cat()          - отвечает за вывод картинки категории, названия категории, текста под назанивем категорий и за вывод подкатегорий
     * @function after_h2()     - анимация заголовка
     * @function after_p()      - анимация текста
     * @function after_img()    - анимация картинки
     * @function after_block()  - анимация подкатегорий
     * @function before_h2()    - анимация заголовка
     * @function before_p()     - анимация текста
     * @function before_img()   - анимация картинки
     * @function before_block() - анимация подкатегорий
     * 
     */
    function json_obj(cat_json,slug){
        fetch('/wp-content/themes/theme/array-page/categories/page-categories.json')
        .then((response) => {
            return response.json();
    
        })
        .then((data) => {
            let cat_json = data;
            cat_filter(cat_json);
            cat(cat_json);
            $('.cat-filter__item:first-child').addClass('active');
            before_h2();
            before_p();
            before_img();
            before_block();
        });
    }

    function cat_filter(cat_json) {  
        $('.cat-filter__items').html('');
        for(let i in cat_json){
            $('.cat-filter__items').append('<div class="cat-filter__item" slug="'+ cat_json[i]['slug'] +'"><img src="'+ cat_json[i]['image_url'] +'" alt=""><p>'+ cat_json[i]['name'] +'</p></div>');
            }
    }

    function cat(cat_json, slug = cat_json[0]['slug']) {  
        $('.cat-detail__body-items').html('');
        for(let i in cat_json){
            if(slug == cat_json[i]['slug']){
                if(cat_json[i]['image_url']){ $('.cat-detail__header-img img').attr('src', cat_json[i]['image_url']); }
                if(cat_json[i]['name']){ $('.cat-detail__header-info h2').text(cat_json[i]['name']); }
                if(cat_json[i]['description']){ $('.cat-detail__header-info p').text(cat_json[i]['description']); }
                for(let ii in cat_json[i]['child']){
                    let img = '';
                    let url = '';
                    let title = '';
                    if(cat_json[i]['child'][ii]['url']){ url = cat_json[i]['child'][ii]['url']; }
                    if(cat_json[i]['child'][ii]['image_url']){ img = cat_json[i]['child'][ii]['image_url']; }
                    if(cat_json[i]['child'][ii]['name']){ title = cat_json[i]['child'][ii]['name']; }
                    $('.cat-detail__body-items').append('<a href="'+ url +'" class="cat-detail__body-item"><img src="'+ img +'" alt=""><h4>'+  title  +'</h4></div>');
                     }
            }
            
            
        }
    }


    /**
     * 
     * @function json_obj() - срабатывает только для десктопа
     * 
     */
    // if($(window).width() >= 992){
        json_obj();
    // }
    // $(window).resize(function(){
    //     if($(window).width() >= 992){
    //         json_obj();
    //     }
    // })
    //
    
    /**
     * 
     * @function cat-filter__item   - предназначен для клика на категорию на десктопе
     * 
     */
    $(document).on('click','.cat-filter__item', function(){
        if(!$(this).hasClass('active')){
            $('.cat-filter__item').removeClass('active');
            $(this).addClass('active');
            fetch('/wp-content/themes/theme/array-page/categories/page-categories.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                after_h2();
                after_p();
                after_img();
                after_block();
                setTimeout(()=>{
                    let cat_json = data;
                    cat(cat_json, $(this).attr('slug'));
                },500)

            })
            .then(function () {
                setTimeout(()=>{
                    before_h2();
                    before_p();
                    before_img();
                    before_block();
                },500)
            });
        }
    })

    /**
     * @function before_h2()
     */
    function before_h2(){
        let h2 = gsap.timeline();
        h2.to(".cat-detail__header-info .cat-detail__header-info__h2-eff", 0.5,
            { 
                y: 0, 
                // opacity: 0
                ease: "power1.out"
            }
        );
    }

    /**
     * @function after_h2()
     */
    function after_h2(){
        let h2 = gsap.timeline();
        h2.to(".cat-detail__header-info .cat-detail__header-info__h2-eff", 0.5,
            { 
                y: "120%", 
                // opacity: 0
                ease: "power1.out"
            }
        );
    }

    /**
     * @function before_p()
     */
    function before_p(){
        let p = gsap.timeline();
        p.to(".cat-detail__header-info .cat-detail__header-info__p-eff", 0.5,
            { 
                y: 0, 
                ease: "power1.out",
            }
        );
    }

    /**
     * @function after_p()
     */
    function after_p(){
        let p = gsap.timeline();
        p.to(".cat-detail__header-info .cat-detail__header-info__p-eff", 0.5,
            { 
                y: "100%", 
                ease: "power1.out",
            }
        );
    }

    /**
     * @function before_img()
     */
    function before_img(){
        let p = gsap.timeline();
        p.to(".cat-detail__header-img img", 0.5,
            { 
                y: 0, 
                ease: "power1.out",
            }
        );
    }

    /**
     * @function after_img()
     */
    function after_img(){
        let p = gsap.timeline();
        p.to(".cat-detail__header-img img", 0.5,
            { 
                y: "100%", 
                ease: "power1.out",
            }
        );
    }

    /**
     * @function before_block()
     */
    function before_block(){
        let p = gsap.timeline();
        p.to(".cat-detail__body-item", 0.2,
            { 
                opacity: 1,
                ease: "power1.out",
            }
        );
    }

    /**
     * @function after_block()
     */
    function after_block(){
        let p = gsap.timeline();
        p.to(".cat-detail__body-item", 0.2,
            { 
                opacity: 0, 
                ease: "power1.out",
            }
        );
    }
    



    /**
     * 
     * 
     * Отсюда уже идёт скрипт для мобильной версии так как очень отличается от десктопа
     * 
     */

    function json_obj_mobile(){
        fetch('/wp-content/themes/theme/array-page/categories/page-categories.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            cat_filter_mobile(data);
        });
    }

    function cat_filter_mobile(cat_json) {  
        $('.cat-mobile').html('');
        $('.cat-mobile').append('<div class="cat-mobile__items part"></div>');
        for(let i in cat_json){
            if($(window).width() > 768 && $(window).width() < 992){
                if(i % 4 === 0){
                    $('.cat-mobile .cat-mobile__items').removeClass('part');
                    $('.cat-mobile').append('<div class="cat-mobile__items part"></div>');
                    $('.cat-mobile .cat-mobile__items.part').append('<div class="cat-mobile__item" slug="'+ cat_json[i]['slug'] +'"><img src="'+ cat_json[i]['image_url'] +'" alt=""><h4>'+ cat_json[i]['name'] +'</h4></div>');
                }else{
                    $('.cat-mobile .cat-mobile__items.part').append('<div class="cat-mobile__item" slug="'+ cat_json[i]['slug'] +'"><img src="'+ cat_json[i]['image_url'] +'" alt=""><h4>'+ cat_json[i]['name'] +'</h4></div>');
                }
            }else if($(window).width() > 567 && $(window).width() < 768){
                if(i % 3 === 0){
                    $('.cat-mobile .cat-mobile__items').removeClass('part');
                    $('.cat-mobile').append('<div class="cat-mobile__items part"></div>');
                    $('.cat-mobile .cat-mobile__items.part').append('<div class="cat-mobile__item" slug="'+ cat_json[i]['slug'] +'"><img src="'+ cat_json[i]['image_url'] +'" alt=""><h4>'+ cat_json[i]['name'] +'</h4></div>');
                }else{
                    $('.cat-mobile .cat-mobile__items.part').append('<div class="cat-mobile__item" slug="'+ cat_json[i]['slug'] +'"><img src="'+ cat_json[i]['image_url'] +'" alt=""><h4>'+ cat_json[i]['name'] +'</h4></div>');
                }
            }else if($(window).width() < 567){
                if(i % 2 === 0){
                    $('.cat-mobile .cat-mobile__items').removeClass('part');
                    $('.cat-mobile').append('<div class="cat-mobile__items part"></div>');
                    $('.cat-mobile .cat-mobile__items.part').append('<div class="cat-mobile__item" slug="'+ cat_json[i]['slug'] +'"><img src="'+ cat_json[i]['image_url'] +'" alt=""><h4>'+ cat_json[i]['name'] +'</h4></div>');
                }else{
                    $('.cat-mobile .cat-mobile__items.part').append('<div class="cat-mobile__item" slug="'+ cat_json[i]['slug'] +'"><img src="'+ cat_json[i]['image_url'] +'" alt=""><h4>'+ cat_json[i]['name'] +'</h4></div>');
                }
            }
            
        }
    }



    /**
     * 
     * @function json_obj_mobile() - срабатывает только для мобильной версии
     * 
     */
    // if($(window).width() < 992){
        json_obj_mobile();
    // }
    // $(window).resize(function(){
    //     if($(window).width() > 567 && $(window).width() < 992){
    //         json_obj_mobile();
    //     }
    // })



    /**
     * 
     * @function cat-mobile__item   - предназначен для клика на категорию на мобильной версии
     * 
     */

    $(document).on('click','.cat-mobile__item', function(){
        if($(this).hasClass('active') == false){
            $('.cat-mobile__item').removeClass('active');
            $(this).addClass('active');
            fetch('/wp-content/themes/theme/array-page/categories/page-categories.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                $('.cat-mobile__items-under').remove();
                $(this).parents('.cat-mobile__items').after( '<div class="cat-mobile__items-under"><div></div></div>' );
                let cat_json = data;
                let slug = $(this).attr('slug');
                for(let i in cat_json){
                    if(slug == cat_json[i]['slug']){
                        for(let ii in cat_json[i]['child']){
                            let img = '';
                            let url = '';
                            let title = '';
                            if(cat_json[i]['child'][ii]['url']){ url = cat_json[i]['child'][ii]['url']; }
                            if(cat_json[i]['child'][ii]['image_url']){ img = cat_json[i]['child'][ii]['image_url']; }
                            if(cat_json[i]['child'][ii]['name']){ title = cat_json[i]['child'][ii]['name']; }
                            $('.cat-mobile .cat-mobile__items-under > div').append('<a href="'+ url +'" class="cat-mobile__item-under"><img src="'+ img +'" alt=""><h4>'+  title  +'</h4></div>');
                        }
                    }
                }
                $('.cat-mobile .cat-mobile__items-under > div').append('<div class="cat-mobile__item-under_svg"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none"><path d="M16.2943 13.4167L11.5026 8.625L6.71094 13.4167" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>');
                setTimeout(() => {
                    console.log($('.cat-mobile .cat-mobile__items-under > div').css('height'));
                    let h_block = $('.cat-mobile .cat-mobile__items-under > div').css('height');
                    $('.cat-mobile .cat-mobile__items-under').animate({
                        height: h_block,
                    },300);
                },10)
                setTimeout(() => {
                    $('.cat-mobile .cat-mobile__items-under').addClass('open');
                },20)
                setTimeout(() => {
                    $('.cat-mobile .cat-mobile__items-under').animate({
                        opacity: 1
                    },300);
                },500)

                
            
            })
        }else{
            cat_mobile__item_under_svg();
        }
        
    })

    function cat_mobile__item_under_svg(){
        $('.cat-mobile .cat-mobile__items-under').animate({
            opacity: 0
        }, 200 , function(){
            setTimeout(()=>{
                $('.cat-mobile .cat-mobile__items-under').removeClass('open');
            },400)
            $('.cat-mobile .cat-mobile__items-under').animate({
                height: 0,
            },300);
        });
        setTimeout(()=>{
            $('.cat-mobile__items-under').remove();
        },1100);
        $('.cat-mobile__item').removeClass('active');
    }
    $(document).on('click','.cat-mobile__item-under_svg', function(){
        cat_mobile__item_under_svg()
    })
// })