(function ($) {
    $(window).load(function () {
        Drupal.cSasTooltip($(document.body));
    });
    Drupal.cSasTooltip = function (contextIn) {
        contextIn.on('mouseover', '.csas-tlt-link', function () {
            if (!$(this).hasClass('csas-tlt-link-hov')) {
                $(this).addClass('csas-tlt-link-hov');
                var scl = $(document).scrollLeft();
                var sct = $(document).scrollTop();
                var offs = $(this).offset();
                var wh = $(window).height();
                var ww = $(window).width();
                var visCenX = parseInt(scl, 10) + parseInt(ww / 2, 10);
                var visCenY = parseInt(sct, 10) + parseInt(wh / 2, 10);
                var eleVisX = parseInt(offs.left, 10) + parseInt($(this).width() / 2, 10);
                var eleVisY = parseInt(offs.top, 10) + parseInt($(this).height() / 2, 10);
                var relPosX = eleVisX < visCenX ? 'left' : 'right';
                var relPosY = eleVisY < visCenY ? 'top' : 'bottom';
                $(this).attr('data-posx', relPosX).attr('data-posy', relPosY);
                $(this).attr('data-elevisy', eleVisY).attr('data-elevisx', eleVisX).attr('data-vcy', visCenY).attr('data-vcx', visCenX).attr('data-scl', scl).attr('data-sct', sct).attr('data-ofl', offs.left).attr('data-oft', offs.top).attr('data-wh', wh).attr('data-ww', ww);
                var tltCon = $(this).next();
                if (tltCon.hasClass('csas-tlt-con')) {
                    var conW = tltCon.width();
                    var conH = tltCon.height();
                    var linkH = $(this).height();
                    if (relPosX == 'left') {
                        var visW = parseInt(ww - (offs.left - scl) - $(this).width(), 10);
                        var marX = parseInt(linkH, 10);
                        var marSign = '';
                        if (visW < conW) { // overflow, do center
                            var sdv = parseInt(((ww / 2) - (offs.left - scl)) - (conW / 2), 10);
                            marX = sdv;
                        }
                    }
                    if (relPosX == 'right') {
                        var visW = parseInt(offs.left - scl);
                        var marX = parseInt(conW, 10);
                        var marSign = '-';
                        if (visW < conW) { // overflow, do center
                            var sdv = parseInt((conW / 2) + (offs.left - visCenX), 10);
                            marX = sdv;
                        }
                    }
                    if (relPosY == 'top') {
                        var marY = 0;
                        var marYSign = '';
                    }
                    if (relPosY == 'bottom') {
                        var marY = parseInt(conH + linkH, 10);
                        var marYSign = '-';
                    }
                    tltCon.css({'margin-left': marSign + marX + 'px', 'margin-top': marYSign + marY + 'px'});
                }
            }
        });
        contextIn.on('mouseover', '.csas-tlt-con', function () {
            var tltLink = $(this).prev();
            if (tltLink.hasClass('csas-tlt-link') && !tltLink.hasClass('csas-tlt-link-hov')) {
                tltLink.addClass('csas-tlt-link-hov');
            }
        });
        contextIn.on('mouseout', '.csas-tlt-con', function () {
            var tltLink = $(this).prev();
            if (tltLink.hasClass('csas-tlt-link')) {
                tltLink.removeClass('csas-tlt-link-hov');
            }
        });
        contextIn.on('mouseout', '.csas-tlt-link', function () {
            var tltCon = $(this).next();
            if ($(this).hasClass('csas-tlt-link-hov') && tltCon.hasClass('csas-tlt-con')) {
                $(this).removeClass('csas-tlt-link-hov');
            }
        });
    };
})(jQuery);