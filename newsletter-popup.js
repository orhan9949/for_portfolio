/**
 * Класс отвечает за функционал поп ап рассылки
 *
 * В основном 80% занимает анимации
 */
class NewsletterPopup {
    constructor(setTimeOut,max_age_coockie) {
        this.setTimeOut = setTimeOut;
        this.max_age_coockie = max_age_coockie;

    }
    /**
     * Открытие при загрузке страницы
     */

    open() {
        document.cookie = `NewsletterPop_Open_cookie2=true; Path=/; max-age=${this.max_age_coockie}`;
        document.cookie = "NewsletterPop_Open_cookie=true; max-age=0";
        setTimeout(() => {
            document.body.style.overflow = "hidden";
            document.querySelector('.newsletterPopup').style.display = "flex";
            setTimeout(() => {
                document.querySelector('.newsletterPopup').style.width = "100%";
                document.querySelector('.newsletterPopup').style.transition = ".8s ease-in-out";
            }, 200)
            setTimeout(() => {
                document.querySelector('.newsletterPopup').style.height = "100vh";
                document.querySelector('.newsletterPopup').style.transition = ".8s";
            }, 1150)
            setTimeout(() => {
                document.querySelector('.newsletterPopup .newsletterPopup__wrapp').style.opacity = "1";
                document.querySelector('.newsletterPopup .newsletterPopup__wrapp').style.transition = ".2s ease-in-out";
            }, 2000)
            setTimeout(() => {
                document.querySelector('.newsletterPopup .newsletterPopup__wrapp .newsletterPopup__item__h3 h3').style.transform = "translateY(0%)";
                document.querySelector('.newsletterPopup .newsletterPopup__wrapp .newsletterPopup__item__h3 h3').style.transition = ".5s ease-in-out";
            }, 2200)
            setTimeout(() => {
                document.querySelector('.newsletterPopup .newsletterPopup__wrapp .newsletterPopup__item__p p').style.transform = "translateY(0%)";
                document.querySelector('.newsletterPopup .newsletterPopup__wrapp .newsletterPopup__item__p p').style.transition = ".5s ease-in-out";
            }, 2400)
            setTimeout(() => {
                document.querySelector('.newsletterPopup .newsletterPopup__form .mailpoet_form').style.transform = "translateY(0%)";
                document.querySelector('.newsletterPopup .newsletterPopup__form .mailpoet_form').style.transition = ".5s ease-in-out";
            }, 2600)

        }, this.setTimeOut);
    }
    /**
     * Закрытие поп-ап при нажатии на кнопку
     */
    close() {
        document.querySelector('.newsletterPopup .newsletterPopup__wrapp').style.opacity = "0";
        document.querySelector('.newsletterPopup .newsletterPopup__wrapp').style.transition = ".2s ease-in-out";
        setTimeout(() => {
            document.querySelector('.newsletterPopup').style.height = "1vh";
            document.querySelector('.newsletterPopup').style.transition = ".8s";
        }, 250)
        setTimeout(() => {
            document.querySelector('.newsletterPopup').style.width = "0%";
            document.querySelector('.newsletterPopup').style.transition = ".8s ease-in-out";
        }, 1100)
        setTimeout(() => {
            document.querySelector('.newsletterPopup').style.display = "none";
            document.body.style.overflow = "auto";
        }, 2000)


        /**
         * Запись в куки, чтоб потом можно было вызывать через определённое время
         * @type {string}
         */
        document.cookie = `NewsletterPop_Open_cookie3=true; Path=/; max-age=${this.max_age_coockie}`;
        // if(document.querySelector('.newsletterPopup .mailpoet_validate_success').style.display !== 'none'){
            /**
             * Запись в куки,чтоб при перезагрузки страницы не вызывалась
             * @type {string}
             */
            // document.cookie = "NewsletterPop_cookie=true";
        // }else{
            /**
             * Запись в куки, чтоб потом можно было вызывать через определённое время
             * @type {string}
             */
            // document.cookie = `NewsletterPop_cookie=true; max-age=${this.max_age_coockie}`;
            // document.cookie = `NewsletterPop_Open_cookie=true; max-age=${this.max_age_coockie}`;
        // }


    }
    /**
     * Проверка при нажатии на кнопку отправить
     */
    check_email() {
        let check = setInterval(() => {
            if (document.querySelector('.newsletterPopup .mailpoet_validate_success').style.display !== 'none') {
                clearTimeout(check);
                setTimeout(() => {
                    document.querySelector('.newsletterPopup .newsletterPopup__items').style.width = "0";
                    document.querySelector('.newsletterPopup .newsletterPopup__items').style.transition = ".9s";
                    setTimeout(() => {
                        document.querySelector('.newsletterPopup .newsletterPopup__wrapp .newsletterPopup__item__h3 h3').innerHTML = "Thank you!";
                        document.querySelector('.newsletterPopup .newsletterPopup__wrapp .newsletterPopup__item__p p').innerHTML =
                            "<span>To complete your subscription, please check your email and click the \"Confirm\" button to receive the latest updates,\n" +
                            " promotions, and exclusive offers straight to your inbox\n</span>" +
                            " <br><br>\n" +
                            " Don't forget to check your spam folder if you don't see our confirmation email in your inbox</p>";
                    }, 1000)
                    setTimeout(() => {
                        document.querySelector('.newsletterPopup .newsletterPopup__items').style.width = "100%";
                        document.querySelector('.newsletterPopup .newsletterPopup__items').style.transition = "1s";
                        document.querySelector('.newsletterPopup .newsletterPopup__form').style.display = 'none';
                    }, 1100)
                }, 300)
                /**
                 * Запись в куки,чтоб при перезагрузки страницы не вызывалась
                 * @type {string}
                 */
                document.cookie = "NewsletterPop_cookie=true";
            }
            if (document.querySelector('.newsletterPopup .mailpoet_validate_error').style.display !== 'none') {
                clearTimeout(check);
            }
        }, 1)
    }
}

let NewsletterPop = new NewsletterPopup(180000,3600);


window.onload = function () {
    $(document).on('click', 'a', function(e){
        if(e.which === 1){
            setTimeout(() =>{
                document.cookie = "NewsletterPop_Open_cookie2=true; Path=/; max-age=0";
                // console.log('Кук удалён');
            },10)
        }
    })
    /**
     * Проверка на наличие кука
     * @type {string|undefined}
     */
    let NewsletterPop_Open_cookie3 = getCookie('NewsletterPop_Open_cookie3');
    let NewsletterPop_Open_cookie2 = getCookie('NewsletterPop_Open_cookie2');
    // console.log(NewsletterPop_cookie);


    /**
     * Если куки нет значит покажет попап рассылку
     */
    if(NewsletterPop_Open_cookie3 !== 'true' && // Нажал ли клиент на крестик
        NewsletterPop_Open_cookie2 !== 'true' && // При простом перемещении
        $('div').hasClass('newsletterPopup newsletterPopup__reg') //Проверка есть ли див с таким классом(когда клиент зареган то этот див пропадает)
    ){
        // console.log('есть');
        NewsletterPop.open();

        // document.querySelector('.newsletterPopup form input[type="submit"]').addEventListener('click', () => {
        //     NewsletterPop.check_email();
        // })
        // console.log('сработало');
    }else{
        // console.log('Нет');
    }



}

