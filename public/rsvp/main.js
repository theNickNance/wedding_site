// STATE
const rsvpState = {
  guestList: [],
  currentGuest: null,
};

// INITIAL FETCH
$.get('/api/guests', function(data) {
  setGuestList(data.guests);
});

// HELPERS
function buildListDom(list) {
  const searchVal = $('#name-field').val();
  const guestList = list.filter(function(guest) {
    return guest.guestName.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
  });
  return guestList.map(function(guest) {
    return '<li data-id="' + guest._id + '"">' + guest.guestDisplayName + '</li>';
  });
}

function buildCountDom(maxCount) {
  let countDom = '';
  let counter = 0;
  while(counter <= maxCount) {
    countDom += '<input type="radio" name="guestCount" value="' + counter + '"/> ' + counter;
    counter++;
  }
  return countDom;
}

// ACTIONS *CHANG STATE*
function setGuestList(list) {
  rsvpState.guestList = list;
}

function setSelectedGuest(id) {
  rsvpState.currentGuest = rsvpState.guestList.find(function(guest) {
    return guest._id == id;
  });
}

$(document).ready(function() {

  $('#name-form').on('submit', function(e) {
    e.preventDefault();
    $('#guest-list').html(buildListDom(rsvpState.guestList));
  });

  $('#rsvp-form').on('submit', function(e) {
    e.preventDefault();
    console.log("test", $(this).serialize());
  });

  $('#guest-list').on('click', function(e) {
    setSelectedGuest(e.target.dataset.id);
    $('.step').hide();
    $('.step[data-step=2]').show();
    $('#guest-display-name').html(rsvpState.currentGuest.guestDisplayName);
    $('#rsvp-count-group').html(buildCountDom(rsvpState.currentGuest.guestCount));
  });
});