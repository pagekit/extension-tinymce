module.exports = {

    data: function () {
        return {
            plugins: []
        };
    },

    created: function () {
        this.$parent.editor = this;
        var vm = this;

        this.$asset({
            js: ['packages/pagekit/tinyMCE/app/assets/tinymce/tinymce.jquery.min.js']
        }).then(function () {

            this.$emit('ready');
            this.$parent.editor = tinyMCE.init({

                height: this.height - 108,

                mode: "exact",

                plugins: [
                    vm.plugins,
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

                    editor.on('undo', function () {
                        editor.fire('change');
                    });

                    editor.on('redo', function () {
                        editor.fire('change');
                    });

                }
            });

        });

    }

};
