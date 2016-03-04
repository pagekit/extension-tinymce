<?php

return [

    'name' => 'tinyMCE',

    'main' => function ($app) {


    },

    'events' => [

        'view.scripts' => function ($event, $scripts) {
            $scripts->register('tinyMCE', 'tinyMCE:app/assets/tinymce/tinymce.jquery.min.js', ['jquery']);
            $scripts->register('tinyMCE-script', 'tinyMCE:app/bundle/tinyMCE.js', ['~editor', 'tinyMCE']);
        },

    ],

    'resources' => [

        'tinyMCE:' => ''

    ],

    'config' => [

    ]

];
