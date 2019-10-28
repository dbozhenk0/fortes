$(document).ready(function () {
    $('body').on('click', function (event) {
        $('.tooltip').removeClass('active');

        if ($(event.target).hasClass('tooltip-icon')) {
            $(event.target).parent().find('.tooltip').toggleClass('active');
        }
    });

    $('.tarif .more').on('click', function(event){
        event.preventDefault();

        var tarif = $(this).data('tarif');

        $('#price-table .th, #price-table .td').removeClass('active');

        $('#price-table .th:first-child, #price-table .td:first-child').addClass('active');

        $('#price-table .' + tarif).addClass('active');

        $('html, body').animate({
            scrollTop: $("#price-table").offset().top
        }, 2000);
    });

    $('.js-burger').click(function() {
        $(this).toggleClass('active');
        $('.header_nav').toggleClass('active');
    });
});