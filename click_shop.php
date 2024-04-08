<?php
$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

Class Click_shop
{
    public function __construct($term_id = 0){
        $this->term_id = $term_id;
        $this->table = 'oficzialnyj_magazin';
        $this->result =  $this->add_favorites_shop();
    }

    public function add_favorites_shop()
    {
//        global $wpdb;
        $total_click_shop = get_term_meta( $this->term_id , $this->table , true );
        $count = ($total_click_shop + 1);

        update_term_meta( $this->term_id, 'oficzialnyj_magazin', $count );
        return $count;
    }
}

$obj = new Click_shop($_POST['term_id']);
echo $obj->result;