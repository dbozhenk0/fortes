(function($) {
    console.log('init')
    'use strict';

    var $filters = $('.js-p-filter [data-filter]'),
        $boxes = $('.js-p-items [data-category]');

    $filters.on('click', function(e) {
        console.log(e);
        e.preventDefault();
        var $this = $(this);

        $filters.removeClass('active');
        $this.addClass('active');

        var $filterColor = $this.attr('data-filter');

        if ($filterColor === 'all') {
            $boxes.removeClass('is-animated')
                .fadeOut().finish().promise().done(function() {
                $boxes.each(function(i) {
                    $(this).addClass('is-animated').delay((i++) * 200).fadeIn();
                });
            });
        } else {
            $boxes.removeClass('is-animated')
                .fadeOut().finish().promise().done(function() {
                $boxes.filter('[data-category = "' + $filterColor + '"]').each(function(i) {
                    $(this).addClass('is-animated').delay((i++) * 200).fadeIn();
                });
            });
        }
    });

})(jQuery);