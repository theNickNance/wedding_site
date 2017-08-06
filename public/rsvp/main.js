// STATE
const rsvpState = {
  guestList: [],
  currentGuest: null,
  rsvpCount: 0,
};

// INITIAL FETCH
$.get('/api/guests', function(data) {
  setGuestList(data.guests);
});

// HELPERS
function transitionStep(step) {
  $('.step').hide();
  $('.step[data-step=' + step + ']').show();
}

function buildListDom(list) {
  const searchVal = $('#name-field').val();
  const guestList = list.filter(function(guest) {
    return guest.guestName.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
  });
  if (guestList && guestList.length) {
    return guestList.map(function(guest) {
      return '<li data-id="' + guest._id + '"">' + guest.guestDisplayName + '</li>';
    });
  }
  return "<li class='disabled'>Sorry, we didn't find any reservations under that name. Please try again.</li>";
}

function buildCountDom(maxCount) {
  let countDom = '';
  let counter = 0;
  while(counter <= maxCount) {
    const labelContent = counter === 0 ? 'Sorry, we can\'t make it' : counter;
    const label = '<label for="radio-' + counter + '">' + labelContent + '</label>';
    countDom += '<li><input type="radio" name="guestCount" id="radio-' + counter + '" value="' + counter + '"/>' + label + '<div class="check"></div></li>';
    counter++;
  }
  return countDom;
}

function rsvpSuccess() {
  transitionStep(3);
  $('.guest-display-name').html(rsvpState.currentGuest.guestDisplayName);
}

function rsvpError() {
  alert('There was a problem sending your response. Please try again.');
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
    $('#guest-list-wrapper').show();
  });

  $('#rsvp-form').on('submit', function(e) {
    e.preventDefault();
    const formSerial = $(this).serialize();
    console.log("THIS", formSerial);
    const confirmPhrase = "Are you sure? Please make sure the following information is correct.";
    const groupPhrase = "Party:  " + rsvpState.currentGuest.guestDisplayName;
    const numberPhrase = "Number attending:  " + $('input[name=guestCount]:checked').val();
    if (window.confirm(confirmPhrase + "\n\n\n" + groupPhrase + "\n\n" + numberPhrase)) { 
      $.ajax('/api/guests/' + rsvpState.currentGuest._id, {
        method: 'PUT',
        data: $(this).serialize(),
        success: rsvpSuccess,
        error: rsvpError,
        timeout: rsvpError,
      });
    }
  });

  $('#guest-list').on('click', function(e) {
    const id = e.target.dataset.id;
    if (id) {
      setSelectedGuest(id);
      transitionStep(2);
      $('.guest-display-name').html(rsvpState.currentGuest.guestDisplayName);
      $('#rsvp-count-group').html(buildCountDom(rsvpState.currentGuest.guestCount));
    }
  });
});