const contact = $('#contact');
const myName = contact.find('#myName');

myName.on('mouseover', function (){
  $(this).addClass('active');
})
myName.on('mouseleave', function (){
  $(this).removeClass('active');
})