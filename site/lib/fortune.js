var fortunes = ['happy','nice','perfect'];

exports.getFortune = function() {
    var index = Math.floor(Math.random() * fortunes.length);
    return fortunes[index];
}