<?php
$parse_uri = explode('wp-content', $_SERVER['SCRIPT_FILENAME']);
require_once($parse_uri[0] . 'wp-load.php');

/**
 * Это для фильтра на страницу All Deals
 * Фильтр принимает два аргумента
 * 1 Фильтр по просмотру
 * 2 По скидке
 */
class Filter_All_Deals
{
    public function __construct
    (
        $page,
        $cat,
        $tax_slug,
        $cat_shop,
        $tax_slug_shop,
        $sort,
        $sortBy,
        $post_type,
//        $taxonomy,
        $count,
//        $page_slug,
        $searchName

    )
    {
        $this->page = $page;
        $this->cat = $cat;
        $this->tax_slug = $tax_slug;
        $this->cat_shop = $cat_shop;
        $this->tax_slug_shop = $tax_slug_shop;
        $this->sort = $sort;
        $this->sortBy = $sortBy;
        $this->post_type = $post_type;
//        $this->taxonomy = $taxonomy;
        $this->posts_per_page = $count;
//        $this->page_slug = mb_strtolower($page_slug);
        $this->searchName = $searchName;
        $this->result = $this->filter_ajax();

    }

    public function filter_ajax()
    {
        if(!$this->post_type) $this->post_type = ['coupons','products'];
        if(!$this->posts_per_page) $this->posts_per_page = 100;
        $args = array(
            'post_type' => $this->post_type,
            'post_status' => 'publish',
            'posts_per_page' => $this->posts_per_page,
            'paged' => $this->page,
            'orderby' => array(
                'total_get_deal' => 'DESC', 'post_sale_size' => 'DESC', 'title' => 'ASC'
            ),
            'suppress_filters' => true, // подавление работы фильтров изменения SQL запроса
        );

        if ($this->searchName) {
            $args = array_merge($args, array(
                'orderby' => 'views_click',
                'order' => 'DESC',
                "s" => $this->searchName,

            ));
        }
        if ($this->sort == 'views_click') {
            $args = array_merge($args, array(
                'orderby' => array(
                    'total_get_deal' => 'DESC', 'post_sale_size' => 'DESC', 'title' => 'ASC'
                ),
            ));
        }
        if ($this->sort == 'post_price' || $this->sort == 'post_sale_size') {
            $args = array_merge($args, array(
                'orderby' => array(
                    $this->sort => $this->sortBy, 'post_sale_size' => 'DESC', 'title' => 'ASC'
                ),
            ));
        }


        if( $this->sort == 'date' ):

            $args = array_merge($args, array(
                'orderby' => array(
                    $this->sort => $this->sortBy
                ),
            ));

        endif;

//        if( $this->sort == 'date' ):
//
//            $args = array_merge($args, array(
//                'orderby' => array(
//                    $this->sort => $this->sortBy, 'post_sale_size' => 'DESC', 'title' => 'ASC'
//                ),
//            ));
//
//        endif;




        if ($this->cat_shop == "categories-shops" && $this->cat != '') {
            $args = array_merge($args, array(
                'tax_query' => array(
                    array(
                        'relation' => 'AND',
                        array(
                            'taxonomy' => $this->cat_shop,
                            'field' => 'slug',
                            'terms' => $this->tax_slug_shop,
                        ),
                        array(
                            'taxonomy' => $this->cat,
                            'field' => 'slug',
                            'terms' => $this->tax_slug,
                        ),

                    ),
                ),
            ));
        }
        if ($this->cat_shop == "categories-shops" && $this->cat == "") {
            $args = array_merge($args, array(
                'tax_query' => array(
                    array(
                        array(
                            'taxonomy' => $this->cat_shop,
                            'field' => 'slug',
                            'terms' => $this->tax_slug_shop,
                        )
                    ),
                ),
            ));
        }
        if ($this->cat_shop == "" && $this->cat != '') {
            $args = array_merge($args, array(
                'tax_query' => array(
                    array(
                        array(
                            'taxonomy' => $this->cat,
                            'field' => 'slug',
                            'terms' => $this->tax_slug,
                        ),
                    ),
                ),
            ));
        }

        $my_posts = new MY_WP_Query($args);
        $saved = get_user_meta( get_current_user_id(), 'saved', true );
        if( empty($saved) ) $saved = [];
        foreach ($my_posts->posts as $i => $pos) {

            $array[] = $pos->post_id;
            $posts_arr[$i]["save"] = '';
            if(!empty($saved[$pos->ID])) $posts_arr[$i]["save"] = $saved[$pos->ID];


            $posts_arr[$i]["id"] = $pos->ID;
            $posts_arr[$i]["title"] = $pos->post_title;
//            if (strlen($pos->post_title) > 30) {
//                $posts_arr[$i]["title"] = mb_substr($pos->post_title, 0, 30) . '...';
//            } else {
//                $posts_arr[$i]["title"] = mb_substr($pos->post_title, 0, 30);
//            }


            $posts_arr[$i]["content"] = $pos->post_content;
//            if (strlen($pos->post_content) > 100) {
//                $posts_arr[$i]["content"] = mb_substr($pos->post_content, 0, 100) . '...';
//            } else {
//                $posts_arr[$i]["content"] = mb_substr($pos->post_content, 0, 100);
//            }


            $posts_arr[$i]["post_date"] = $pos->post_date;
            $posts_arr[$i]["views_click"] = $pos->views_click;

            $dopolnitelnye_foto = get_field('dopolnitelnye_foto', $pos->ID);
            $image = get_field('image_url', $pos->ID);
            if($dopolnitelnye_foto):
                $posts_arr[$i]["img_url"] = $dopolnitelnye_foto[0]['foto'];
            elseif($image):
                $posts_arr[$i]["img_url"] = $image ;
            else:
                $posts_arr[$i]["img_url"] = get_the_post_thumbnail_url($pos->ID, 'meduim');
            endif;

            $posts_arr[$i]["expiration_date"] = 'Expires Soon';
            if (!empty(get_post_meta($pos->ID, 'expiration_date')[0])):
                $posts_arr[$i]["expiration_date"] = date("d/m/Y", strtotime(get_post_meta($pos->ID, 'expiration_date')[0]));
            endif;

            $posts_arr[$i]["categories"] = '';
            $cat_post = get_the_terms( $pos->ID, 'categories-coupons' );
            foreach($cat_post as $ct):
                if($ct->parent == false) $posts_arr[$i]["categories"] = str_replace('&amp;', '&', $ct->name);
            endforeach;

            $date = get_the_modified_date("d/m/Y", $pos->ID);
            $posts_arr[$i]["published_date"] = $date;
            $posts_arr[$i]["link"] = get_permalink($pos->ID);
            $posts_arr[$i]["old_price"] = round($pos->post_old_price);
            $posts_arr[$i]["new_price"] = round($pos->post_price);
            $posts_arr[$i]["sale_size"] = round($pos->post_sale_size);
            $posts_arr[$i]["price"] = dc_price($pos->ID);
            $term = get_term_by('slug', strtolower(get_post_meta($pos->ID, 'source')[0]), 'categories-shops');
            $image = get_field('icon', 'categories-shops_' . $term->term_id);
            $posts_arr[$i]["term_slug"] = $term->slug;
            $posts_arr[$i]["term_name"] = $term->name;
            $posts_arr[$i]["icon"] = $image["url"];
            $posts_arr[$i]["link_2"] = get_field('link', $pos->ID);
            $posts_arr[$i]["promocode"] = get_field('promocode', $pos->ID);
            $posts_arr[$i]["post_type"] = get_post_type( $pos->ID );
            $term_coupons = get_the_terms(  $pos->ID, 'coupons-type' )[0];
            $posts_arr[$i]["coupons_type_slug"] = $term_coupons->slug;
            $posts_arr[$i]["coupons_type_name"] = $term_coupons->name;
            $posts_arr[$i]["item_category"] = '';

            $cat_post = get_the_terms( $pos->ID, 'categories');
            if($posts_arr[$i]["post_type"] == 'coupons') $cat_post = get_the_terms( $pos->ID, 'categories-coupons');
            foreach($cat_post as $ct):
                if($ct->parent == false) $posts_arr[$i]["item_category"] = str_replace('&amp;', '&', $ct->name);
            endforeach;
        }


        if($this->sort == 'date' && $posts_arr === array()):
            shuffle($posts_arr);
        endif;

        return json_encode($posts_arr);
    }
}

$searchName = '';
if (!empty($_POST['searchName'])):
    $searchName = $_POST['searchName'];
endif;
$obj = new Filter_All_Deals
(
    $_POST['page'],
    $_POST['cat'],
    $_POST['tax_slug'],
    $_POST['cat_shop'],
    $_POST['tax_slug_shop'],
    $_POST['sort'],
    $_POST['sortBy'],
    $_POST['post_type'],
//    $_POST['taxonomy'],
    $_POST['count'],
//    $_POST['page_slug'],
    $searchName
);
echo $obj->result;

