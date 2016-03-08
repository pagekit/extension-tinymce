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

                        var attributes = Object.keys(element.attributes).reduce(function (previous, key) {
                            var name = element.attributes[key].name;

                            if (name === 'data-mce-src') {
                                return previous;
                            }

                            return previous + ' ' + name + '="' + (image[name] || element.attributes[key].nodeValue) + '"';
                        }, '');

                        editor.selection.setContent(
                            '<img' + attributes + '>'
                        );

                        editor.fire('change');

                    });
            };

            editor.addButton('image', {
                tooltip: 'Insert/edit image',
                onclick: showDialog,
                stateSelector: 'img:not([data-mce-object],[data-mce-placeholder]),figure.image'
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