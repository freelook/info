'use strict';

module.exports = {
  onPhantomPageCreate: function (phantom, req, res, next) {
    req.prerender.page.evaluate(function () {

        window.readConvertLinksToFootnotes = false;
        window.readStyle = 'style-newspaper';
        window.readSize = 'size-medium';
        window.readMargin = 'margin-wide';
        window.prerenderReady = false;

        var _readability_script = document.createElement('script');
        _readability_script.onload = function() {
            window.prerenderReady = true;
        };
        _readability_script.src = 'http://arc90labs-readability.googlecode.com/svn/trunk/js/readability.js?x=' + (Math.random());
        document.documentElement.appendChild(_readability_script);


      return true;
    });

    next();
  }
};
