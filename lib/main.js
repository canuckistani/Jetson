let tabs = require('sdk/tabs'),
    data = require('sdk/self').data,
    formatter = require('formatter');

let JSONFormatter = new formatter.JSONFormatter();

// console.log('alive');

let css = data.load('default.css');

tabs.on('ready', function(tab) {
  if (tab.contentType === 'application/json') {
    // console.log('fired ready');
    let worker = tab.attach({
      contentScriptFile: [
        data.url('zepto.min.js'),
        data.url('json2tree.js'),
        data.url('default.js')
      ]
      // contentStyleFile: data.url('default.css')
    });

    worker.port.on('attached', function(raw) {
      // console.log('got attached');
      var formatted = JSONFormatter.jsonToHTML(JSON.parse(raw));
      worker.port.emit('formatted', formatted);
    });
  }
});
