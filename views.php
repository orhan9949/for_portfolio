<?php
$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

Class Views

{
    public function __construct($post = 0){
        $this->post = $post;
        $this->table = 'views_click';
        $this->result =  $this->add_favorites_post();
    }

    public function add_favorites_post()
    {
        $get = get_post($this->post, ARRAY_A);
        $total_views_click = $get[$this->table];
        $count = ($total_views_click + 1);

        global $wpdb;
        $wpdb->update(  'wp_posts',
            [ $this->table => $count],
            [ 'ID' => $this->post]
        );
        echo $count;
    }
}

$obj = new Views($_POST['post']);
echo $obj->result;