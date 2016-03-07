module.exports = {

    created: function () {

        var vm = this;

        tinyMCE.PluginManager.add('image', function (editor) {

            editor.addMenuItem('image', {
                text: 'Insert/edit image',
                icon: 'image',
                context: 'insert',
                onclick: function () {

                    var element = editor.selection.getNode();

                    if (element.nodeName === 'IMG') {
                        var image = {src: element.attributes.src.nodeValue, alt: element.attributes.alt.nodeValue, cls: ''
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
                                '<img src="' + vm.$url(image.src) + '" alt="' + image.alt + '">'
                            );
                        });
                }
            });
        });

        this.$parent.editor = tinyMCE.init({

            height: this.height,

            mode: "exact",

            plugins: ['-image'],

            document_base_url: $pagekit.url + '/',

            elements: [this.$parent.$els.editor],

            init_instance_callback: function (editor) {
                window.tiny = vm.tiny = editor;

                vm.$watch('$parent.value', function (value) {
                    this.tiny.setContent(value || '', {format: 'text'});
                }, {immediate: true});

                editor.on('change', function () {
                    vm.$parent.value = editor.getContent();
                });

            }
        });
    }

};
