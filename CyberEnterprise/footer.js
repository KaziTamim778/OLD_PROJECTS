
$(document).ready(function() {
  // Back to top button functionality
  $('#backToTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 800);
    return false;
  });
  
  // Show/hide back to top button based on scroll position
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('#backToTop').fadeIn(300);
    } else {
      $('#backToTop').fadeOut(300);
    }
  });
  
  // Newsletter subscription form animation
  $('.subscribe-btn').hover(
    function() {
      $(this).find('i').animate({marginLeft: '10px'}, 200);
    },
    function() {
      $(this).find('i').animate({marginLeft: '8px'}, 200);
    }
  );
  
  // Add hover glow effect to cybernetic borders
  $('.cybernetic-border').hover(
    function() {
      $(this).css('box-shadow', '0 0 15px rgba(0, 194, 255, 0.5)');
    },
    function() {
      $(this).css('box-shadow', '0 0 10px rgba(0, 194, 255, 0.2)');
    }
  );

  // Social media icons pulse effect
  $('.social-icon').hover(
    function() {
      $(this).addClass('scale-110');
    },
    function() {
      $(this).removeClass('scale-110');
    }
  );
  
  // Add typing animation to newsletter input
  let placeholderText = "Enter your email";
  let currentPlaceholder = "";
  let placeholderIndex = 0;
  
  function typeEffect() {
    if (placeholderIndex < placeholderText.length) {
      currentPlaceholder += placeholderText.charAt(placeholderIndex);
      $('.newsletter-input').attr('placeholder', currentPlaceholder);
      placeholderIndex++;
      setTimeout(typeEffect, 100);
    }
  }
  
  // Only run the typing animation if the element is in viewport
  const isInViewport = function(elem) {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  $(window).on('scroll', function() {
    const newsletterInput = document.querySelector('.newsletter-input');
    if (isInViewport(newsletterInput) && placeholderIndex === 0) {
      setTimeout(typeEffect, 500);
    }
  });
  
  // Initialize the typing effect if already in viewport
  if (isInViewport(document.querySelector('.newsletter-input'))) {
    setTimeout(typeEffect, 500);
  }
  
  // Form submission (for demo purposes)
  $('form').submit(function(e) {
    e.preventDefault();
    const email = $('.newsletter-input').val();
    if (email) {
      // Replace input with success message
      $(this).html('<div class="bg-opacity-20 bg-green-500 p-3 rounded"><i class="fas fa-check-circle text-neon-green mr-2"></i>Thank you! You\'ve been successfully subscribed.</div>');
    }
  });
});
