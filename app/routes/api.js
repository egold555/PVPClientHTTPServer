var fs = require('fs');
var showdown = require('showdown');

module.exports = (app, passport, database) => {

    showdown.setFlavor('github');

    var converter = new showdown.Converter();
    converter.setFlavor('github');
    converter.setOption('tables', 'true');
    //    converter.setOption('omitExtraWLInCodeBlocks', 'true');
    //    converter.setOption('parseImgDimensions', 'true');
    //    converter.setOption('simplifiedAutoLink', 'true');
    //    converter.setOption('literalMidWordUnderscores', 'true');
    //
    //    converter.setOption('strikethrough', 'true');
    //    converter.setOption('ghCodeBlocks', 'true');
    //    converter.setOption('tasklists', 'true');
    //    converter.setOption('ghCompatibleHeaderId', 'true');


    app.get('/api', (req, res) => {
        fs.readFile(__dirname + '/api.md', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.send('<link rel="stylesheet" href="/static/internal/css/github-table.css">' + converter.makeHtml(data));
        });
    });

}
