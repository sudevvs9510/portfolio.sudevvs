var nameError = document.getElementById('name-error')
var phoneError = document.getElementById('phone-error')
var emailError = document.getElementById('email-error')
var messageError = document.getElementById('message-error')
var submitError = document.getElementById('submit-error')

function validateName() {
  var name = document.getElementById('contact-name').value;

  if (name.length == 0) {
    nameError.innerHTML = 'Name is required';
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = 'Write full name';
    return false;
  }
  nameError.innerHTML = '<i class="fa-solid fa-square-check fa-xl" style="color: #28b800;"></i>';
  return true;
}

function validatePhone() {
  var phone = document.getElementById('contact-phone').value;

  if (phone.length == 0) {
    phoneError.innerHTML = 'Number is required';
    return false;
  }
  if (phone.length !== 10) {
    phoneError.innerHTML = 'phone no should be 10 digits';
    return false;
  }
  if (!phone.match(/^[0-9]{10}$/)) {
    phoneError.innerHTML = 'Only digits please.';
    return false;
  }
  phoneError.innerHTML = '<i class="fa-solid fa-square-check fa-xl" style="color: #28b800;"></i>';
  return true;
}

function validateEmail() {
  var email = document.getElementById('contact-email').value;

  if (email.length == 0) {
    emailError.innerHTML = 'Email is required';
    return false;
  }

  // Standard email validation pattern
  if (!/^[\w.-]+@[A-Za-z]+\.[a-z]{2,3}$/.test(email)) {
    emailError.innerHTML = 'Email invalid';
    return false;
  }

  emailError.innerHTML = '<i class="fa-solid fa-square-check fa-xl" style="color: #28b800;"></i>';
  return true;
}

function validateMessage() {
  var message = document.getElementById('contact-message').value;
  var required = 30;
  var left = required - message.length;
  if (left > 0) {
    messageError.innerHTML = left + ' more characters required';
    return false;
  }
  messageError.innerHTML = '<i class="fa-solid fa-square-check fa-xl" style="color: #28b800;"></i>';
  return true;
}


function validateForm() {
    const nameValid = validateName();
    const phoneValid = validatePhone();
    const emailValid = validateEmail();
    const messageValid = validateMessage();

    if (!nameValid || !phoneValid || !emailValid || !messageValid) {
      const submitError = document.getElementById('submit-error');
      submitError.style.display = 'block';
      submitError.innerHTML = 'Please fix errors to submit.';
      setTimeout(function() {
        submitError.style.display = 'none';
      }, 3000);
      return false;
    }

    // If all validations pass, clear the error message and allow form submission
    var submitError = document.getElementById('submit-error');
    submitError.innerHTML = "";
    return true;

  }


const scriptURL = 'https://script.google.com/macros/s/AKfycbyC36HQE1NJq5X7RigeP08xiMwlO8ewd2Yb8QCrU8N8DHH2_EiJsmLE8B6MFTvV5Pck7w/exec'
const form = document.getElementById("form")
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault();
  const isValid = validateName();
  const phoneValid = validatePhone();
  const emailValid = validateEmail();
  const messageValid = validateMessage();
  if (isValid && phoneValid && emailValid && messageValid) {

    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => {
        msg.innerHTML = "Message Sent Successfully";
        alert("Message Sent Successfully");
        setTimeout(function () {
          msg.innerHTML = "";
        }, 3000);
        form.reset();
        nameError.innerHTML = ''
        phoneError.innerHTML = ''
        messageError.innerHTML = ''
        emailError.innerHTML = ''
      })
      .catch(error => console.error('Error!', error.message));
  }
});


