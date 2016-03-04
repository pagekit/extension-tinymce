<template>

    <textarea class="uk-invisible" v-el:text-area></textarea>

</template>

<script>

    module.exports = {

        props: ['value', 'height'],

        ready: function () {

            var vm = this;

            this.tiny = tinyMCE.init({

                height: this.height,

                mode: "exact",

                elements: [this.$els.textArea],

                init_instance_callback: function (editor) {
                    window.tiny = vm.tiny = editor;

                    vm.$watch('value', function (value) {
                        this.tiny.setContent(value || '', {format: 'text'});
                    }, {immediate: true});

                    editor.on('change', function (e) {
                        vm.value = e.level.content;
                    });
                }

            });


        }


    };

</script>
