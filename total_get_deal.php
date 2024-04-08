<?php
$parse_uri = explode('wp-content', $_SERVER['SCRIPT_FILENAME']);
require_once($parse_uri[0] . 'wp-load.php');

class total_get_deal

{
    public function __construct($post = 0)
    {
        $this->post = $post;
        $this->col_total_get_deal = 'total_get_deal';
        $this->col_clicks_per_day = 'clicks_per_day';
        $this->result = $this->add_favorites_post();
    }
    public function add_favorites_post()
    {
        $get = get_post($this->post, ARRAY_A);
        $total_get_deal = $get[$this->col_total_get_deal];
        $count_total_get_deal = ($total_get_deal + 1);

        $clicks_per_day = $get[$this->col_clicks_per_day];
        $count_clicks_per_day = ($clicks_per_day + 1);

        global $wpdb;
        $wpdb->update('wp_posts',
            [
                $this->col_total_get_deal => $count_total_get_deal,
                $this->col_clicks_per_day => $count_clicks_per_day
            ],
            ['ID' => $this->post]
        );
        echo 'total_get_deal = '.$count_total_get_deal. ',' .' clicks_per_day = '.$count_clicks_per_day;
    }
}
$obj = new total_get_deal($_POST['post']);
echo $obj->result;