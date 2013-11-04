(function() {
  exports.index = function(req, res) {
    return res.render('index', {
      title: 'heyhey'
    });
  };

}).call(this);
