let pp = function(o) { return JSON.stringify(o,null,'  '); };

self.port.on('formatted', function(formatted) {

  // let data = JSON.parse($('pre').text());
  // $(body)
  // console.dir(JSON.parse(txt, null, '  '));
  // console.log(html);
  // this isn't working, we need to replace the document with a new one?
  $('body').html(formatted);
});

var raw = $('pre').text();
$('body').html('<h3>Loading...</h3>');
self.port.emit('attached', raw);

