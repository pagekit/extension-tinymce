module.exports = {

    data: function () {
        return {
            plugins: []
        };
    },

    created: function () {
        var baseURL = $pagekit.url + '/packages/pagekit/tinymce/app/assets/tinymce',
            vm = this;

        this.$parent.editor = this;

        this.$asset({
            js: [baseURL + '/tinymce.jquery.min.js']
        }).then(function () {

            this.$emit('ready');

            tinyMCE.baseURL = baseURL;

            this.$parent.editor = tinyMCE.init({

                height: this.height - 108,

                mode: "exact",

                language_url: $pagekit.url + '/tinymce/' + document.documentElement.lang + '.js',

                plugins: [
                    'advlist autolink lists charmap print preview hr anchor media',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime nonbreaking save table contextmenu directionality',
                    'paste textcolor colorpicker textpattern imagetools',
                    vm.plugins
                ],

                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | fullscreen | forecolor backcolor',

                document_base_url: $pagekit.url + '/',

                elements: [this.$parent.$els.editor],

                init_instance_callback: function (editor) {
                    window.tiny = vm.tiny = editor;

                    var update = function (value) {
                        this.tiny.setContent(value || '', {format: 'text'});
                    };

                    var unbind = vm.$watch('$parent.value', update, {immediate: true});

                    editor.on('change', function () {

                        unbind();

                        vm.$parent.value = editor.getContent();

                        unbind = vm.$watch('$parent.value', update);

                    });

                    editor.on('undo', function () {
                        editor.fire('change');
                    });

                    editor.on('redo', function () {
                        editor.fire('change');
                    });

                },

                save_onsavecallback: function () {

                    if (vm.$parent.$els.editor.form) {
                        var event = document.createEvent('HTMLEvents');
                        event.initEvent('submit', true, false);
                        vm.$parent.$els.editor.form.dispatchEvent(event);
                    }

                }

            });

        });

    }

};
