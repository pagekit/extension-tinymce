<?php

return [

    'name' => 'tinyMCE',

    'main' => function ($app) {


    },

    'events' => [

        'view.scripts' => function ($event, $scripts) {
            $scripts->register('tinyMCE-script', 'tinyMCE:app/bundle/tinyMCE.js', ['~editor']);
        },

    ],

    'resources' => [

        'tinyMCE:' => ''

    ],

    'config' => [

    ]

];
