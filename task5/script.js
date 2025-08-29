'use strict';

// Modal functionality
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
const modalCloseFunc = () => modal.classList.add('closed');
if (modal) {
    modalCloseOverlay.addEventListener('click', modalCloseFunc);
    modalCloseBtn.addEventListener('click', modalCloseFunc);
    // Automatically open modal after a delay
    setTimeout(() => modal.classList.add('active'), 2000);
}

// Notification toast functionality
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');
if (toastCloseBtn) {
    toastCloseBtn.addEventListener('click', () => notificationToast.classList.remove('active'));
    // Automatically show toast after a delay
    setTimeout(() => notificationToast.classList.add('active'), 5000);
}

// Mobile menu functionality
const mobileMenuOpenBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenus = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtns = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtns.length; i++) {
  const mobileMenuCloseFunc = function () {
    mobileMenus[i].classList.remove('active');
    overlay.classList.remove('active');
  }
  mobileMenuOpenBtns[i].addEventListener('click', function () {
    mobileMenus[i].classList.add('active');
    overlay.classList.add('active');
  });
  mobileMenuCloseBtns[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);
}

// Accordion functionality for mobile menu
const accordionBtns = document.querySelectorAll('[data-accordion-btn]');
for (let i = 0; i < accordionBtns.length; i++) {
  accordionBtns[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const accordion = this.nextElementSibling;
    if (accordion) {
        accordion.style.maxHeight = accordion.style.maxHeight ? null : accordion.scrollHeight + "px";
    }
  });
}