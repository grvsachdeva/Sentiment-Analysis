function make_chart(component, val) {
  console.log('comp',component,' ','value',val);
  // progressbar.js@1.0.0 version is used
  // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
  var bar = new ProgressBar.Circle(component, {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#aaa', width: 1 },
    to: { color: '#333', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }

    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';

  bar.animate(val);  // Number from 0.0 to 1.0
}

function analyse_text(){
  let test_text = document.getElementById('test_text').value;

$.post('api/analyse/',{
    test_text: test_text
  },function (data) {
    console.log(data);
    $('.progressbar')[0].innerHTML = "";
    $('.progressbar')[1].innerHTML = "";
    $('.progressbar')[2].innerHTML = "";
    make_chart(chart1, data.SentimentScore.Positive);
    var html = `<span class='prop_name'>Positive</span>`
    $('#chart1').append(html);
    make_chart(chart3, data.SentimentScore.Negative);
    html = `<span class='prop_name'>Negative</span>`
    $('#chart3').append(html);
    make_chart(chart2, data.SentimentScore.Neutral);
    html = `<span class='prop_name'>Neutral</span>`
    $('#chart2').append(html);
})

}
