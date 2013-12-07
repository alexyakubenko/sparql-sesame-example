$(document).ready(function() {
  $('button').click(run);

  $('textarea').keypress(function(e) {
    if(e.which == 13) {
      run();
    }
  });

  $('a.example').click(function() {
    $('textarea').val($(this).data('sparql'));
    run();
  });
});

function run() {
  $.post('/query', { q: $('textarea').val() }, function(response) {
    try {
      var responseJSON = JSON.parse(response),
          ths = ['#'],
          tds = [],
          table = $('<table><thead></thead><tbody></tbody></table>');

      $.each(responseJSON, function(th, columns) {
        ths.push(th);
        tds.push(columns);
      });

      for (var i = 0; i < ths.length; ++i) {
        table.find('thead').append('<th>' + ths[i] +'</th>');
      }

      for (var j = 0; j < tds[0].length; ++j) {
        table.find('tbody').append('<tr><td>' + (j + 1) + '</td></tr>');
        for (var k = 0; k < ths.length - 1; ++k) {
          table.find('tbody tr:last').append('<td>' + tds[k][j] +'</td>');
        }
      }

      $('.result').html(table);
    } catch (exception) {
      console.log(exception);
      $('.result').html(response);
    }
  });
}
