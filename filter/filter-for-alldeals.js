/**
 *
 *
 *
 ****************** ПРЕЖДЕ ЧЕМ ПЕРЕДЕЛЫВАТЬ СКРИПТ ИЗУЧИТЕ ПОЛНОСТЬЮ ОПИСАНИЕ *************************************
 *************** И НЕ ЗАБУДЬТЕ ПРИ НАПИСАНИИ НОВОГО СКРИПТА ОСТАВИТЬ КОММЕНТАРИЙ **********************************
 *
 * Скрипт для страницы All Deals
 *
 *
 */



/**
 *
 * Прелоадер
 *
 */
function preloader(){
    $('.preloader').animate({
        opacity: 0
    }, 300 , function(){
        $('.preloader').remove();
    })
}



$(document).ready(function(){

    /**
     *
     * @param page           Передача числа страницы по которой будут загружаться купоны
     * @param sort           Название по которой будет проходить сортировка (data,vievs_click,name)
     * @param cat            Передача названия таксономии товара
     * @param tax_slug       Передача названия категории товара
     * @param cat_shop       Передача названия таксономии магазина товара
     * @param tax_slug_shop  Передача название магазина товара
     * @param searchName     Слово из страницы поиска по которому и будет проходить фильтр
     * @param sortBy         Передача с фильтра сортировки ASC или DESC
     * @param post_type      Передача типов постов
     * @param count          Передача количества постов
     * @param page_slug      Передаёт slug страницы
     */
    let args = {
        page: '' ,
        sort: '',
        cat: '' ,
        tax_slug: '',
        cat_shop: '',
        tax_slug_shop: '',
        searchName: '',
        sortBy:      '',
        post_type:  '',
        count:     '',
        page_slug: ''
    };

    /**
     *
     * Функция для ajax запроса (получение данных и вывод на сайт)
     *
     * @param args
     */
    function ajax_scroll( args ){
        console.log( args );
        /**
         *  Делаем не кликабельным фильтр при обработке запроса
         */
        $('.aside__block_item').append('<div class="aside__block_item_disabler"></div>');

        $.ajax('/wp-content/themes/theme/server/filter-views-discount.php', {
            method: 'POST',
            data: {
                'sort':          args.sort,
                'page':          args.page,
                'cat':           args.cat,
                'tax_slug':      args.tax_slug,
                'cat_shop':      args.cat_shop,
                'tax_slug_shop': args.tax_slug_shop,
                'searchName':    args.searchName,
                'sortBy':        args.sortBy,
                'post_type':     args.post_type,
                'count':         args.count,
                'page_slug':     args.page_slug
            },
            /**
             *
             * Получаем данные с сервера в формате JSON
             *
             */
            dataType: "json",
            success: function (data) {
                console.log(data);
                preloader();
                $('.aside__block_item .aside__block_item_disabler').remove();
                /**
                 *
                 * Поставил условие если длина JSON не равен нулю ( тоесть не пустой ) то выполни цикл
                 *
                 */
                if(data !== null) {
                    data.forEach(i => {
                        let item_list_name_coock = getCookie('item_list_name');
                        /**
                         *
                         * Это шаблон который создаётся в конце в div с классом (deals__content products__list) который находится в файле template-deals.php
                         * Заметьте что в шаблоне есть класс clone__pattern который будет удалятся когда шаблон полностью заполнится
                         *
                         *
                         * Это для товаров
                         */
                        if (i.post_type == 'products') {
                            $('.deals__content .products__list').append('<div class="product__card clone__pattern views-click '+i.post_type+'" product-id="" views-click=""> ' +
                                '<div class="product__medium" pos="' + i.post_type + '"> ' +
                                '<div class="beauty_border"> ' +
                                '<a href="#" class="action_fav action_fav-like" style="height: 20px; margin-top: 0; background:none" data-id=""> ' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">' +
                                '<path d="M10.1818 0C8.84545 0 7.68345 0.604389 7 1.61723C6.31655 0.604389 5.15455 0 3.81818 0C2.8059 0.00118236 1.83541 0.405003 1.11962 1.12288C0.403829 1.84075 0.00117893 2.81406 0 3.82928C0 5.69287 1.15818 7.6324 3.44273 9.59299C4.48958 10.4876 5.62037 11.2784 6.81927 11.9544C6.87483 11.9843 6.93693 12 7 12C7.06307 12 7.12517 11.9843 7.18073 11.9544C8.37963 11.2784 9.51042 10.4876 10.5573 9.59299C12.8418 7.6324 14 5.69287 14 3.82928C13.9988 2.81406 13.5962 1.84075 12.8804 1.12288C12.1646 0.405003 11.1941 0.00118236 10.1818 0ZM7 11.1758C5.95573 10.5714 0.763636 7.38541 0.763636 3.82928C0.764479 3.01707 1.08657 2.23837 1.65922 1.66405C2.23188 1.08973 3.00832 0.766702 3.81818 0.765857C5.10873 0.765857 6.19245 1.45704 6.64682 2.57009C6.67558 2.64032 6.72452 2.70039 6.78741 2.74267C6.85029 2.78494 6.92429 2.80752 7 2.80752C7.07571 2.80752 7.14971 2.78494 7.21259 2.74267C7.27548 2.70039 7.32442 2.64032 7.35318 2.57009C7.80755 1.45704 8.89127 0.765857 10.1818 0.765857C10.9917 0.766702 11.7681 1.08973 12.3408 1.66405C12.9134 2.23837 13.2355 3.01707 13.2364 3.82928C13.2364 7.38541 8.04427 10.5714 7 11.1758Z" fill="#A5ABB8"></path>' +
                                '<path d="M7 11.1758C5.95573 10.5714 0.763636 7.38541 0.763636 3.82928C0.764479 3.01707 1.08657 2.23837 1.65922 1.66405C2.23188 1.08973 3.00832 0.766702 3.81818 0.765857C5.10873 0.765857 6.19245 1.45704 6.64682 2.57009C6.67558 2.64032 6.72452 2.70039 6.78741 2.74267C6.85029 2.78494 6.92429 2.80752 7 2.80752C7.07571 2.80752 7.14971 2.78494 7.21259 2.74267C7.27548 2.70039 7.32442 2.64032 7.35318 2.57009C7.80755 1.45704 8.89127 0.765857 10.1818 0.765857C10.9917 0.766702 11.7681 1.08973 12.3408 1.66405C12.9134 2.23837 13.2355 3.01707 13.2364 3.82928C13.2364 7.38541 8.04427 10.5714 7 11.1758Z" fill="transparent"></path>' +
                                '</svg>' +
                                '</a>' +
                                '</div>' +
                                '<a href="" target="_blank" for-analitics="data_analitics" class="product__card-a view_click">' +
                                '<img src="" alt="" class="product__card-a__img"></a>' +
                                '<div class="hidden_mobile"></div>' +
                                '</div>' +
                                '<div class="product__desc">' +
                                '<div class="hidden_mobile">' +
                                '<div class="product__published"></div>' +
                                '<h2 class="product__title">' +
                                '<a href="" target="_blank" for-analitics="data_analitics" class="product__card-a view_click"></a>' +
                                '</h2>' +
                                '<div class="action_fav remove-from-wishlist" data-id=""></div>'+
                                '<div class="content_card"></div>' +
                                '<div class="shop_icon">' +
                                '<a href="">' +
                                '<img src="" alt="" class="product__card-shop_icon__img"><span></span>' +
                                '</a>' +
                                '</div>' +
                                '</div>' +
                                '<div class="hidden_pc">' +
                                '<div class="product__published"></div>' +
                                '<div class="action_fav remove-from-wishlist" data-id=""></div>'+
                                '<div class="product__title">' +
                                '<a href="" target="_blank" for-analitics="data_analitics" class="product__card-a view_click"></a>' +
                                '</div>' +
                                '<div class="shop_icon">' +
                                '<a href="">' +
                                '<img src="" alt="">' +
                                '<span></span>' +
                                '</a>' +
                                '</div>' +
                                '</div>' +
                                '<div class="product__buttons">' +
                                '<div class="" style="display: inline-flex; align-items: center">' +
                                '<div id="alert_promo__message"></div>' +
                                '</div>' +
                                '<div class="product__actions">' +
                                '<div style="display:none;" class="data_analitics_click" item_id="'+i.id+'" new-price="'+i.new_price+'" item_name="'+i.title+'" affiliation="'+i.term_name+'" item_brand="'+i.term_name+'" item_category="'+i.item_category+'" price="'+i.old_price+'" quantity="1" item_list_name="'+item_list_name_coock+'"></div>' +
                                '<a href="" target="_blank" for-analitics="data_analitics" class="btn view_click">See more</a>' +
                                '<div class="product__author"></div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>');

                            /**
                             * Здесь начинается заполнение шаблона
                             */
                            $('.product__card.clone__pattern').attr('product-id', i.id);
                            $('.product__card.clone__pattern .product__title .product__card-a').html(i.title);
                            // $('.product__card.clone__pattern .content_card').html(i.content);
                            $('.product__card.clone__pattern').attr('views-click', i.views_click);
                            $('.product__card.clone__pattern .action_fav').attr('data-id', i.id);
                            $('.product__card.clone__pattern .product__card-a ').attr('href', i.link);
                            if (i.img_url.length > 0) {
                                $('.product__card.clone__pattern .product__card-a img').attr('src', i.img_url);
                                $('.product__card.clone__pattern .product__card-a img').attr('alt', i.title);
                            }

                            $('.product__card.clone__pattern .shop_icon a').attr('href', 'https://discount.one/categories-shops/' + i.term_slug);
                            $('.product__card.clone__pattern .hidden_mobile .shop_icon a span').append(' | ' + i.term_name + '');
                            $('.product__card.clone__pattern .hidden_pc .shop_icon a span').append(' | ' + i.term_name + '');
                            $('.product__card.clone__pattern .shop_icon a img').attr('src', i.icon);
                            // if (i.promocode != undefined) {
                            $('.product__card.clone__pattern .product__actions .btn').attr('href', i.link);
                            // } else if (i.link_2 != undefined) {
                            //     $('.product__card.clone__pattern .product__actions .btn').attr('href', i.link_2);
                            // }
                            if (i.promocode != undefined) {
                                $('.product__card.clone__pattern .product__author ').html('<div class="product__promocode"><span style="display: none">' + i.promocode + '</span><div class="socials"><span data-val="' + i.promocode + '" class="action_copy"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"> <path d="M10 2H3.33333C2.59695 2 2 2.59695 2 3.33333V10C2 10.7364 2.59695 11.3333 3.33333 11.3333H10C10.7364 11.3333 11.3333 10.7364 11.3333 10V3.33333C11.3333 2.59695 10.7364 2 10 2Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M13.9993 4.66663V12C13.9993 13.1066 13.106 14 11.9993 14H4.66602" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div></div>');
                            }

                            if (i.save) {
                                $('.product__card.clone__pattern .action_fav').addClass('active');
                                $('.product__card.clone__pattern .remove-from-wishlist').addClass('active').html('Remove from wishlist').attr('data-id', i.id);
                            } else {
                                $('.product__card.clone__pattern .remove-from-wishlist').html('Add to wishlist').attr('data-id', i.id);
                            }

                            $('.product__card.clone__pattern .hidden_mobile .product__published ').html('Updated: ' + i.published_date);
                            $('.product__card.clone__pattern .hidden_pc .product__published ').html('Updated: ' + i.published_date);
                            $('.product__card.clone__pattern .product__desc > .hidden_mobile .remove-from-wishlist').before(i.price);
                            $('.product__card.clone__pattern .product__desc > .hidden_pc .remove-from-wishlist').before(i.price);
                        }
                        /**
                         * Конец для товаров
                         *
                         *
                         *
                         * Это для купонов
                         */
                        if (i.post_type == 'coupons') {
                            $('.deals__content .products__list').append(
                                '<div class="product__card clone__pattern views-click '+i.post_type+'" product-id="'+i.id+'" views-click="'+i.views_click+'">' +
                                    '<div class="product__medium">' +
                                        '<div class="beauty_border">' +
                                            '<a href="#" class="action_fav action_fav-like" style="height: 20px; margin-top: 0; background:none" data-id="'+i.id+'">' +
                                                '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">' +
                                                    '<path d="M10.1818 0C8.84545 0 7.68345 0.604389 7 1.61723C6.31655 0.604389 5.15455 0 3.81818 0C2.8059 0.00118236 1.83541 0.405003 1.11962 1.12288C0.403829 1.84075 0.00117893 2.81406 0 3.82928C0 5.69287 1.15818 7.6324 3.44273 9.59299C4.48958 10.4876 5.62037 11.2784 6.81927 11.9544C6.87483 11.9843 6.93693 12 7 12C7.06307 12 7.12517 11.9843 7.18073 11.9544C8.37963 11.2784 9.51042 10.4876 10.5573 9.59299C12.8418 7.6324 14 5.69287 14 3.82928C13.9988 2.81406 13.5962 1.84075 12.8804 1.12288C12.1646 0.405003 11.1941 0.00118236 10.1818 0ZM7 11.1758C5.95573 10.5714 0.763636 7.38541 0.763636 3.82928C0.764479 3.01707 1.08657 2.23837 1.65922 1.66405C2.23188 1.08973 3.00832 0.766702 3.81818 0.765857C5.10873 0.765857 6.19245 1.45704 6.64682 2.57009C6.67558 2.64032 6.72452 2.70039 6.78741 2.74267C6.85029 2.78494 6.92429 2.80752 7 2.80752C7.07571 2.80752 7.14971 2.78494 7.21259 2.74267C7.27548 2.70039 7.32442 2.64032 7.35318 2.57009C7.80755 1.45704 8.89127 0.765857 10.1818 0.765857C10.9917 0.766702 11.7681 1.08973 12.3408 1.66405C12.9134 2.23837 13.2355 3.01707 13.2364 3.82928C13.2364 7.38541 8.04427 10.5714 7 11.1758Z" fill="#A5ABB8"></path>' +
                                                    '<path d="M7 11.1758C5.95573 10.5714 0.763636 7.38541 0.763636 3.82928C0.764479 3.01707 1.08657 2.23837 1.65922 1.66405C2.23188 1.08973 3.00832 0.766702 3.81818 0.765857C5.10873 0.765857 6.19245 1.45704 6.64682 2.57009C6.67558 2.64032 6.72452 2.70039 6.78741 2.74267C6.85029 2.78494 6.92429 2.80752 7 2.80752C7.07571 2.80752 7.14971 2.78494 7.21259 2.74267C7.27548 2.70039 7.32442 2.64032 7.35318 2.57009C7.80755 1.45704 8.89127 0.765857 10.1818 0.765857C10.9917 0.766702 11.7681 1.08973 12.3408 1.66405C12.9134 2.23837 13.2355 3.01707 13.2364 3.82928C13.2364 7.38541 8.04427 10.5714 7 11.1758Z" fill="transparent"></path>' +
                                                '</svg>' +
                                            '</a>' +
                                        '</div>' +
                                        '<a href="'+i.link+'" target="_blank" class="product__card-a view_click" for-analitics="data_analitics" ids="click_products">' +
                                            '<img src="'+i.img_url+'" alt="'+i.title+'" class="product__card-a__img">' +
                                            // '<div class="product__card-a__block">' +
                                            //     '<div class="product__card-a__block-p"><p>'+i.categories+'</p></div>' +
                                            //     '<div class="product__card-a__block-img"><img src="'+i.icon+'" alt="'+i.title+'"></div>' +
                                            // '</div>' +
                                        '</a>' +
                                    '</div>' +
                                    '<div class="product__desc">' +
                                        '<div class="hidden_mobile">' +
                                            '<div class="expiration-date">' +
                                                '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                                                    '<mask id="mask0_1776_7735" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">' +
                                                        '<rect width="16" height="16" fill="url(#pattern0)"></rect>' +
                                                    '</mask>' +
                                                    '<g mask="url(#mask0_1776_7735)">' +
                                                        '<rect x="-2.30493" width="19.7949" height="18" fill="#7E7E7E"></rect>' +
                                                    '</g>' +
                                                    '<defs>' +
                                                        '<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">' +
                                                            '<use xlink:href="#image0_1776_7735" transform="scale(0.00195312)"></use>' +
                                                        '</pattern>' +
                                                        '<image id="image0_1776_7735" width="512" height="512" xlink:href="data:image/png;base64,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"></image>' +
                                                    '</defs>' +
                                                '</svg>' +
                                                '<span>' + i.expiration_date + '</span>' +
                                            '</div>' +
                                            '<h2 class="product__title">' +
                                                '<a href="'+i.link+'" target="_blank" class="view_click" for-analitics="data_analitics" ids="click_products">'+i.title+' </a>' +
                                            '</h2>' +
                                            '<div class="price_sale-size" style=""></div>'+
                                            '<div class="action_fav remove-from-wishlist" data-id="'+i.id+'"></div>'+
                                        '</div>' +
                                        '<div class="hidden_pc">' +
                                            '<div class="price_sale-size" style=""></div>'+
                                            '<div class="expiration-date">' +
                                                '<img src="/wp-content/themes/theme/images/clock.png" alt="">   ' +
                                                '<span>' + i.expiration_date + '</span>' +
                                            '</div>' +
                                            '<div class="action_fav remove-from-wishlist" data-id="'+i.id+'"></div>'+
                                            '<div class="product__title">' +
                                                '<a href="'+i.link+'" target="_blank" class="view_click" for-analitics="data_analitics" ids="click_products">'+i.title+'</a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="product__buttons">' +
                                            '<div class="" style="display: inline-flex; align-items: center">' +
                                                '<div id="alert_promo__message"></div>' +
                                            '</div>' +
                                            '<div class="product__actions">' +
                                                '<div style="display:none;" class="data_analitics_click" item_id="'+i.id+'" new-price="'+i.new_price+'" item_name="'+i.title+'" affiliation="'+i.term_name+'" item_brand="'+i.term_name+'" item_category="'+i.item_category+'" price="'+i.new_price+'" quantity="1" item_list_name="'+item_list_name_coock+'"></div>' +
                                                '<a href="'+i.link+'" target="_blank" for-analitics="data_analitics" class="btn btn_coupon view_click">See more</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>');

                            /**
                             * Здесь начинается заполнение шаблона
                             */

                            if (i.save) {
                                $('.product__card.clone__pattern .action_fav').addClass('active');
                                $('.product__card.clone__pattern .remove-from-wishlist').addClass('active').html('Remove from wishlist').attr('data-id', i.id);
                            } else {
                                $('.product__card.clone__pattern .remove-from-wishlist').html('Add to wishlist').attr('data-id', i.id);
                            }

                            let price = i.new_price;
                            let sale = i.sale_size;
                            let coupons_type_slug = i.coupons_type_slug;
                            let coupons_type_name = i.coupons_type_name;
                            if (price !== null && price != 0) {
                                $('.product__card.clone__pattern .price_sale-size').attr('style','background-color:#E46204;').text('Rs ' + price + ' OFF');
                                // $('.product__card.clone__pattern .product__card-a').attr('style','border: 3px solid #E46204;');
                            } else if (sale !== null && sale != 0) {
                                $('.product__card.clone__pattern .price_sale-size').attr('style','background-color:#E404B3;').text(sale + ' % OFF');
                                // $('.product__card.clone__pattern .product__card-a').attr('style','border: 3px solid #E404B3;');
                            } else if (coupons_type_slug !== null) {
                                if (coupons_type_slug == 'free-gift') {
                                    $('.product__card.clone__pattern .price_sale-size').attr('style','background-color:#04BFCE;').text(coupons_type_name);
                                    // $('.product__card.clone__pattern .product__card-a').attr('style','border: 3px solid #04BFCE;');
                                }
                                if (coupons_type_slug == 'free-trial') {
                                    $('.product__card.clone__pattern .price_sale-size').attr('style','background-color:#0428E4;').text(coupons_type_name);
                                    // $('.product__card.clone__pattern .product__card-a').attr('style','border: 3px solid #0428E4;');
                                }
                            }
                        }
                        /**
                         * Конец для купонов
                         */




                        /**
                         * Здесь заканчивается заполнение шаблона
                         */


                        /**
                         *
                         * Как я говорил в конце заполнения удаляется класс clone__pattern и в итоге получается чисто карточка как и другие
                         *
                         */
                        $('.product__card.clone__pattern').removeClass('clone__pattern');



                    });


                    /**
                     *
                     * включаем скролл
                     *
                     */
                    dealContentHeight = $('.deals__content .products__list').height();
                    startScroll = true;
                    scrollUp = $(window).scrollTop();
                    console.log(dealContentHeight);
                    console.log('включаем скролл');

                }
                else if(data == null && args.page == 1){
                    /**
                     *
                     * Показываю что товаров нет
                     * отключаем скролл так как ничего не пришло
                     *
                     */
                    startScroll = false;
                    console.log('не включаем скролл');
                    if($('main.search__page')){
                        $('.deals__content .products__list').append('<div class="product__card product__card-no views-click">Nothing found for your search</div>');

                    }else{
                        $('.deals__content .products__list').append('<div class="product__card product__card-no views-click">Deals not found. Try other filter settings.</div>');
                    }

                }
                else{
                    /**
                     *
                     * отключаем скролл так как ничего не пришло
                     *
                     */
                    startScroll = false;
                    console.log('не включаем скролл');
                }

            },
            error: function (jqXHR, exception) {
                $('.aside__block_item .aside__block_item_disabler').remove();
                preloader()
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                // console.log(msg);

            }
        });
    }

    /**
     * КОНЕЦ Функция для ajax запроса
     */


    /**
     *
     * Данные из вильтров которые будут стоять по умолчанию
     *
     */

    if($('main').attr('count') !== undefined) {
        args.count = $('main').attr('count');
    }
    args.sort          = "views-click";
    args.post_type     = $('main').attr('pt') ;
    args.page_slug     = $('main').attr('item_list_name') ;
    if($('.filter-blockDeals__header-and-body#sort .filter-blockDeals__header').attr('sort') !== undefined){
        args.sort = $('.filter-blockDeals__header-and-body#sort .filter-blockDeals__header').attr('sort');
        args.sortBy = $('.filter-blockDeals__header-and-body#sort .filter-blockDeals__header').attr('sortBy');
    }

    args.tax_slug      = $(this).find('.filter-blockDeals__header-and-body#cat .filter-blockDeals__header').attr('tax-cat');
    args.cat           = $(this).find('.filter-blockDeals__header-and-body#cat .filter-blockDeals__header').attr('data-filter-cat');
    args.cat_shop      = $(this).find('.filter-blockDeals__header-and-body#cat_shop .filter-blockDeals__header').attr('tax-cat');
    args.tax_slug_shop = $(this).find('.filter-blockDeals__header-and-body#cat_shop .filter-blockDeals__header').attr('data-filter-cat');
    args.searchName    = $(this).find('h1').attr('name');

    // let nameOrder = $('.filter-blockDeals__header-and-body#views-size .filter-blockDeals__header').attr('data-filter');
    // console.log(args.searchName);
    // if(!$('main').hasClass('search__page')){
    //     if($('.filter-blockDeals__header-and-body#cat .filter-blockDeals__header').attr('tax-cat') == false){
    //         args.page = 2;
            // ajax_scroll( args );
        // }else{
        //     args.page = 1;
        //     total_ajax_scroll(args);
        // }
    // }else{
        args.page = 1;
    // }
    if($('.filter-blockDeals__header-and-body#cat .filter-blockDeals__header').attr('tax-cat') != false){
        total_ajax_scroll(args);
    }


    /**
     *
     * startScroll создан для того чтобы включать и отключать скролл, к примеру по AJAX запросу ничего не пришло,
     * значит надо вырубить скролл чтобы не перегружать сервер, потому что идёт отправка данных на сервер
     *
     */
    let startScroll = true;


    /**
     *
     * Скрипт для работы скролла , чтоб выполнялась загрузка при скролле
     *
     */
    let dealContentHeightTop = $('.deals__content .products__list').offset().top;
    var dealContentHeight = $('.deals__content .products__list').height();
    let scrollUp = 100;
    // console.log(dealContentHeight);
    $(window).scroll(function(){
        let totalDealContentHeight = dealContentHeightTop + dealContentHeight;
        let scrollHeight = $(window).scrollTop() + $(window).height();
        if(scrollUp < $(window).scrollTop()){
            scrollUp = $(window).scrollTop();
        }
        // console.log(scrollUp +' - '+ $(window).scrollTop());
        // console.log("startScroll == " + startScroll);
        // console.log(scrollUp +' <= '+ $(window).scrollTop());
        // console.log(scrollHeight);
        // console.log(totalDealContentHeight - (totalDealContentHeight / 2));
        // console.log(totalDealContentHeight - dealContentHeight);
        if( scrollHeight > totalDealContentHeight - (totalDealContentHeight / 2) && startScroll == true && scrollUp <= $(window).scrollTop()) {
        // if( scrollHeight > totalDealContentHeight - (totalDealContentHeight / 2 + 3000) && startScroll == true) {
            console.log('Зашёл в скролл');
            startScroll = false;
            args.page++;
            var promise = new Promise((resolve) => resolve(1));
            promise.then( function f3() {
                dealContentHeight = dealContentHeight + ($('.product__card').height() * 100);
            })
            promise.then( function f1() {
                    ajax_scroll( args );
            },300)

            promise.then( function f2() {
                setTimeout(() => {
                    dealContentHeight = $('.deals__content .products__list').height();
                },500);
            })
        }
    })
    /**
     * КОНЕЦ Скрипт для работы скролла , чтоб выполнялась загрузка при скролле
     */



    /**
     *
     * Работа кнопок фильтра на странице All deals
     *
     */
    $('.filter-blockDeals__header-and-body .filter-blockDeals__header').click(function(){
        if(document.querySelectorAll('body.deals-page')){
            console.log('Это Top deals');
        }




        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__body').toggle();
        if($(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__body').css('display') == 'none'){
            $(this).parents('.filter-blockDeals__header-and-body').removeClass('active');
        }else{
            $(this).parents('.filter-blockDeals__header-and-body').addClass('active');
        }
    })



    /**
     *
     * При нажатии в фильтре по просмотрам и размеру скидок
     *
     */
    $('.filter-blockDeals__header-and-body#views-size .filter-blockDeals__item').click(function(){
        startScroll = false;
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').html($(this).html());
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('data-filter', $(this).attr('data-filter'));
        $(this).parents('.filter-blockDeals__header-and-body').removeClass('active');
        $('.filter-blockDeals__header-and-body .filter-blockDeals__body').hide();
        args.sort = $(this).attr('data-filter');
        total_ajax_scroll(args);
    })



    /**
     *
     * При выборе в фильтре категории
     *
     */
    $('.filter-blockDeals__header-and-body#sort .filter-blockDeals__item').click(function(){
        startScroll = false;
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').html($(this).html());
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('sortBy', $(this).attr('sortBy'));
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('sort', $(this).attr('sort'));
        $('.filter-blockDeals__header-and-body').removeClass('active');
        $('.filter-blockDeals__header-and-body .filter-blockDeals__body').hide();
        args.sortBy = $(this).attr('sortBy');
        args.sort = $(this).attr('sort');
        total_ajax_scroll(args);
    })



    /**
     *
     * При выборе в фильтре категории
     *
     */
    $('.filter-blockDeals__header-and-body#cat .filter-blockDeals__item, .filter-blockDeals__header-and-body#cat .filter-blockDeals__item-big').click(function(){
        startScroll = false;
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').html($(this).html());
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('data-filter-cat', $(this).attr('data-filter-cat'));
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('tax-cat', $(this).attr('tax-cat'));
        $('.filter-blockDeals__header-and-body').removeClass('active');
        $('.filter-blockDeals__header-and-body .filter-blockDeals__body').hide();
        args.cat = $(this).attr('data-filter-cat');
        args.tax_slug = $(this).attr('tax-cat');
        total_ajax_scroll(args);
    })



    /**
     *
     * При выборе в фильтре  магазина
     *
     */
    $('.filter-blockDeals__header-and-body#cat_shop .filter-blockDeals__item').click(function(){
        startScroll = false;
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').html($(this).html());
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('data-filter-cat', $(this).attr('data-filter-cat'));
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('tax-cat', $(this).attr('tax-cat'));
        $('.filter-blockDeals__header-and-body').removeClass('active');
        $('.filter-blockDeals__header-and-body .filter-blockDeals__body').hide();
        args.cat_shop = $(this).attr('data-filter-cat');
        args.tax_slug_shop = $(this).attr('tax-cat');
        total_ajax_scroll(args);
    })


    /**
     *
     * При выборе в фильтре тип постов
     *
     */
    $('.filter-blockDeals__header-and-body#deal_type .filter-blockDeals__item').click(function(){
        startScroll = false;
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').html($(this).html());
        $(this).parents('.filter-blockDeals__header-and-body').find('.filter-blockDeals__header').attr('deal', $(this).attr('deal'));
        $('.filter-blockDeals__header-and-body').removeClass('active');
        $('.filter-blockDeals__header-and-body .filter-blockDeals__body').hide();
        args.post_type = $(this).attr('deal');
        // if($(this).attr('deal') == 'coupons'){
        //     console.log('coupons');
        //     $('.filter-blockDeals__header-and-body#cat .filter-blockDeals__body div[data-filter-cat="categories"]').hide();
        //     $('.filter-blockDeals__header-and-body#cat .filter-blockDeals__body div[data-filter-cat="categories-coupons"]').show();
        // }else if($(this).attr('deal') == 'products'){
        //     console.log('products');
        //     $('.filter-blockDeals__header-and-body#cat .filter-blockDeals__body div[data-filter-cat="categories"]').show();
        //     $('.filter-blockDeals__header-and-body#cat .filter-blockDeals__body div[data-filter-cat="categories-coupons"]').hide();
        // }else{
        //     console.log('All');
        //     $('.filter-blockDeals__header-and-body#cat .filter-blockDeals__body div').show();
        // }
        total_ajax_scroll(args);
    })

    /**
     *
     * Все данные по всем фильтрам приходят сюда и отправлятся ajax запросом на сервер
     *
     */
    function total_ajax_scroll
    ( args ){
        args.page = 1;
        $('.poroduct__list_all_deals').html('<div class="preloader"><img src="/wp-content/themes/theme/images/preloader.gif" alt=""></div> ');
        ajax_scroll(args);
        dealContentHeight = $('.deals__content .products__list').height();

    }




    /**
     *
     * Когда вы нажимаете не по фильтру, срабатывает эта функция, которая закрывает фильтр
     *
     */
    $("body").mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".filter-blockDeals__header-and-body" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            $('.filter-blockDeals__body').hide();
            $('.filter-blockDeals__header-and-body').removeClass('active');
        }
    });
    $('.deals__aside .aside__items').each(function(index){
        // console.log(index);
        $(this).find('.filter-blockDeals__header-and-body').css('z-index', (1000 - index));
    })
    /**
     * конец Работа кнопок фильтра на странице All deals
     */

    // console.log($(window).width());
    if($(window).width() <= 567){
        $('.aside__block_item .aside__items_s').each(function(){
            // console.log(true);
            let text = $(this).find('.aside__head').html();
            $(this).find('.filter-blockDeals__header').text(text);
        })
    }

});