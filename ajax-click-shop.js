/**
 *
 * Код срабатывает при нажатии на кнопку магазина в детальной карточке товара
 *
 */

$('#data_analitics').click(function(e){
    // e.preventDefault();
    let term_id = $(this).attr('id_shop');
    $.ajax( '/wp-content/themes/theme/server/click_shop.php', {
        method: 'post',
        data: {
            "term_id": term_id
        },
        datatype: "html",
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
    console.log(term_id);
})
