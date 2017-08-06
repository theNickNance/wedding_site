// STATE
const rsvpState = {
  guestList: [],
};

// INITIAL FETCH
$.get('/api/guests', function(data) {
  const objData = JSON.parse(data);
  setGuestList(objData.guests);
});

// HELPERS
function buildListDom(list) {
  const searchVal = $('#name-field').val();
  const guestList = list.filter(function(guest) {
    return guest.guestName.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
  });
  return guestList.map(function(guest) {
    return '<li data-id="' + guest.id + '"">' + guest.guestDisplayName + '</li>';
  });
}

// ACTIONS *CHANG STATE*
function setGuestList(list) {
  rsvpState.guestList = list;
}

$(document).ready(function() {

  $('#name-form').on('submit', function(e) {
    e.preventDefault();
    $('#guest-list').html(buildListDom(rsvpState.guestList));
  });

  $('#guest-list').on('click', function(e) {
    console.log("TARGET", e);
  });
});