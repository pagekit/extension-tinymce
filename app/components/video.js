/**
 * Editor Video plugin.
 */

module.exports = {

    plugin: true,

    created: function () {

        if (!tinyMCE) {
            return;
        }

        var vm = this;

        this.$parent.editor.plugins.push('pagekitVideo');
        tinyMCE.PluginManager.add('pagekitVideo', function (editor) {

            var showDialog = function () {

                new vm.$parent.$options.utils['video-picker']({
                    parent: vm
                }).$mount()
                    .$appendTo('body')
                    .$on('select', function (video) {
                        editor.selection.setContent(
                            '(video)' +  JSON.stringify(video.data)
                        );

                        editor.fire('change');

                    });
            };

            editor.addButton('media', {
                tooltip: 'Insert/edit video',
                onclick: showDialog
            });

            editor.addMenuItem('video', {
                text: 'Insert/edit video',
                icon: 'media',
                context: 'insert',
                onclick: showDialog
            });
        });

    }

};