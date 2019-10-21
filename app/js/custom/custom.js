$(document).ready(function () {
    $('body').on('click', function (event) {
        $('.tooltip').removeClass('active');
        console.log('T')

        if ($(event.target).hasClass('tooltip-icon')) {
            console.log('TI')
            $(event.target).parent().find('.tooltip').toggleClass('active');
        }
    });

    $('.tarif .more').on('click', function(event){
        event.preventDefault();

        var tarif = $(this).data('tarif');

        $('#price-table .th, #price-table .td').removeClass('active');

        $('#price-table .th:first-child, #price-table .td:first-child').addClass('active');

        $('#price-table .' + tarif).addClass('active');

        $('html, body').scrollTo($('#price-table').offset().top, 1000);
    });
});