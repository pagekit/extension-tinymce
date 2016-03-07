/**
 * Editor Image plugin.
 */

module.exports = {

    plugin: true,

    created: function () {

        if (!tinyMCE) {
            return;
        }

        var vm = this;

        this.$parent.editor.plugins.push('pagekitImage');
        tinyMCE.PluginManager.add('pagekitImage', function (editor) {

            var showDialog = function () {

                var element = editor.selection.getNode();
                editor.selection.select(element);

                if (element.nodeName === 'IMG') {
                    var image = {
                        src: element.attributes.src.nodeValue, alt: element.attributes.alt.nodeValue, cls: ''
                    };
                } else {
                    image = {}
                }

                new vm.$parent.$options.utils['image-picker']({
                    parent: vm,
                    data: {
                        image: image
                    }
                }).$mount()
                    .$appendTo('body')
                    .$on('select', function (image) {
                        editor.selection.setContent(
                            '<img src="' + image.src + '" alt="' + image.alt + '">'
                        );

                        editor.fire('change');

                    });
            };

            editor.addButton('image', {
                tooltip: 'Insert/edit image',
                onclick: showDialog
            });

            editor.addMenuItem('image', {
                text: 'Insert/edit image',
                icon: 'image',
                context: 'insert',
                onclick: showDialog
            });
        });
    }

};