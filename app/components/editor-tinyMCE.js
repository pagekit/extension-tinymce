module.exports = {

    created: function () {

        var vm = this;

        tinyMCE.PluginManager.add('image', function (editor) {

            var showDialog = function () {

                var element = editor.selection.getNode();
                editor.selection.select(element);

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

        tinyMCE.PluginManager.add('link', function (editor) {

            var showDialog = function () {

                var element = editor.selection.getNode();
                editor.selection.select(element);

                if (element.nodeName === 'A') {
                    var link = {link: element.attributes.href.nodeValue, txt: element.innerHTML, cls: ''
                    };
                } else {
                    link = {}
                }

                new vm.$parent.$options.utils['link-picker']({
                    parent: vm,
                    data: {
                        link: link
                    }
                }).$mount()
                    .$appendTo('body')
                    .$on('select', function (link) {
                        editor.selection.setContent(
                            '<a href="' + link.link + '">' + link.txt + '</a>'
                        );

                        editor.fire('change');

                    });
            };

            editor.addButton('link', {
                tooltip: 'Insert/edit link',
                onclick: showDialog
            });

            editor.addMenuItem('link', {
                text: 'Insert/edit link',
                icon: 'link',
                context: 'insert',
                onclick: showDialog
            });
        });

        tinyMCE.PluginManager.add('video', function (editor) {

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

        this.$parent.editor = tinyMCE.init({

            height: this.height - 108,

            mode: "exact",

            plugins: [
                'image link video',
                'advlist autolink lists charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime nonbreaking save table contextmenu directionality',
                'template paste textcolor colorpicker textpattern imagetools'
            ],

            toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | fullscreen | forecolor backcolor',

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
