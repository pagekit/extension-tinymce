<?php


use Symfony\Component\HttpFoundation\Response;

return [

    'name' => 'tinyMCE',

    'main' => function ($app) {


    },

    'events' => [

        'view.scripts' => function ($event, $scripts) {
            $scripts->register('tinyMCE-script', 'tinyMCE:app/bundle/tinyMCE.js', ['~editor']);
        },

    ],

    'routes' => [

        'tinyMCE/lang.js' => [
            'name' => '@tinyMCE/lang.js',
            'controller' => function () use ($app) {

                $locales = '';
                foreach (glob(__DIR__ . '/languages/*.js') as $file) {
                    $lang = rtrim(basename($file), '.js');

                    if ($lang === $app->module('system/intl')->getLocale()) {
                        $locales = $file;
                        break;
                    }

                    if (strpos($app->module('system/intl')->getLocale(), $lang) === 0) {
                        $locales = $file;
                    }

                }

                return new Response($locales ? file_get_contents($locales) : '', 200, ['Content-Type' => 'application/javascript']);

            }

        ]

    ]

];
