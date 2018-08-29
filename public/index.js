function analyse_text(){
  let test_text = document.getElementById('test_text').value;
  console.log("innn", test_text);

$.post('api/analyse/',{
    test_text: test_text
  },function (data) {
    console.log(data);
    document.getElementById('response').innerHTML = `Magnitude: ${data.magnitude} <br> Score: ${data.score}`
})

}
