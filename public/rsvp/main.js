// STATE
const rsvpState = {
  guestList: [],
};

// INITIAL FETCH
$.get('api/guests', function(data) {
  rsvpState.guestList = data;
})

$(document).ready(function() {
  $('#name-button').on('click', function() {
    const searchVal = $('#name-field').val();
    rsvpState.guestList.filter(function(guest) {
      return guest.guestName.indexOf(searchVal) !== -1;
    });
    const guestListDom = rsvpState.guestList.map(function(guest) {
      return '<li>' + guest.guestName + '</li>';
    })
    $('#guest-list').html(guestListDom.join());
  });
});