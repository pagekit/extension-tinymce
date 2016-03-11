<?php

use Symfony\Component\HttpFoundation\Response;

return [

    'name' => 'tinymce',

    'main' => function ($app) {


    },

    'events' => [

        'view.scripts' => function ($event, $scripts) {
            $scripts->register('tinymce-script', 'tinymce:app/bundle/tinymce.js', ['~editor']);
        },

    ],

    'routes' => [

        'tinymce/{locale}.js' => [

            'name' => '@tinymce/intl.js',
            'controller' => function ($locale) use ($app) {

                $langFile = '';
                foreach (glob(__DIR__ . '/languages/*.js') as $file) {
                    $candidate = substr(basename($file), 0, -3);

                    if ($candidate === $locale) {
                        $langFile = $file;
                        break;
                    }

                    if (strpos($locale, $candidate) === 0 || strpos($candidate, $locale) === 0) {
                        $langFile = $file;
                    }

                }

                return new Response($langFile ? file_get_contents($langFile) : '', 200, ['Content-Type' => 'application/javascript']);

            }

        ]

    ]

];
