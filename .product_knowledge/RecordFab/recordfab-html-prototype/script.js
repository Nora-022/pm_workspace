const alphaItems = document.querySelectorAll(".alpha-item");
const openKickButton = document.getElementById("open-kick");
const homeScreen = document.getElementById("home-screen");
const filesScreen = document.getElementById("files-screen");
const siteScreen = document.getElementById("site-screen");
const siteTab = document.getElementById("site-tab");
const siteTabLabel = document.getElementById("site-tab-label");
const tabRecordDot = document.getElementById("tab-record-dot");
const navHome = document.getElementById("nav-home");
const navFiles = document.getElementById("nav-files");
const statusbar = document.getElementById("statusbar");
const supportBadge = document.getElementById("support-badge");
const addressInput = document.getElementById("address-input");
const goHomeTriggers = document.querySelectorAll("[data-go-home]");
const goFilesTriggers = document.querySelectorAll("[data-go-files]");
const tabStrip = document.getElementById("tab-strip");
const toolbar = document.getElementById("toolbar");
const browserPanel = document.querySelector(".browser-panel");
const browseView = document.getElementById("cef-browse-view");
const detectedView = document.getElementById("cef-detected-view");
const statusIndicator = document.getElementById("status-indicator");
const statusText = document.getElementById("status-text");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const recordModal = document.getElementById("record-modal");
const recordModalClose = document.getElementById("record-modal-close");
const recordCancel = document.getElementById("record-cancel");
const recordConfirm = document.getElementById("record-confirm");
const durationSwitch = document.getElementById("duration-switch");
const recordingOverlay = document.getElementById("recording-overlay");
const recordingTime = document.getElementById("recording-time");
const resolutionTrigger = document.getElementById("resolution-trigger");
const speedTrigger = document.getElementById("speed-trigger");
const resolutionValue = document.getElementById("resolution-value");
const speedValue = document.getElementById("speed-value");
const dropdowns = document.querySelectorAll("[data-dropdown]");
const dropdownOptions = document.querySelectorAll(".field-option");

let detectTimer = null;
let recordingTicker = null;
let recordingSeconds = 5;

function formatRecordingTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setActiveNav(target) {
  navHome.classList.toggle("is-active", target === "home");
  navFiles.classList.toggle("is-active", target === "files");
}

function closeDropdowns() {
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("is-open");

    const trigger = dropdown.querySelector(".field-select");
    const menu = dropdown.querySelector(".field-menu");

    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }

    if (menu) {
      menu.hidden = true;
    }
  });
}

function toggleDropdown(trigger) {
  const dropdown = trigger.closest("[data-dropdown]");
  if (!dropdown) {
    return;
  }

  const isOpen = dropdown.classList.contains("is-open");
  const menu = dropdown.querySelector(".field-menu");
  closeDropdowns();

  if (isOpen) {
    return;
  }

  dropdown.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  if (menu) {
    menu.hidden = false;
  }
}

function closeRecordModal() {
  closeDropdowns();
  recordModal.classList.remove("is-open");
}

function stopRecordingTicker() {
  window.clearInterval(recordingTicker);
  recordingTicker = null;
}

function resetRecordingState() {
  stopRecordingTicker();
  recordingOverlay.hidden = true;
  tabRecordDot.hidden = true;
  recordingSeconds = 5;
  recordingTime.textContent = formatRecordingTime(recordingSeconds);
}

function showHome() {
  window.clearTimeout(detectTimer);
  resetRecordingState();
  closeRecordModal();
  setActiveNav("home");
  browserPanel.classList.remove("files-mode");

  homeScreen.hidden = false;
  filesScreen.hidden = true;
  siteScreen.hidden = true;
  tabStrip.hidden = false;
  toolbar.hidden = false;
  siteTab.hidden = true;
  statusbar.hidden = true;
  supportBadge.hidden = true;
  browseView.hidden = false;
  detectedView.hidden = true;
  addressInput.value = "";
  siteTabLabel.textContent = "Kick";
  statusIndicator.className = "status-indicator is-spinning";
  statusText.textContent = "正在检测视频...";
  startBtn.disabled = true;
  stopBtn.disabled = true;
  startBtn.classList.remove("is-enabled");
  stopBtn.classList.remove("is-enabled");
}

function showFiles() {
  window.clearTimeout(detectTimer);
  resetRecordingState();
  closeRecordModal();
  setActiveNav("files");
  browserPanel.classList.add("files-mode");

  homeScreen.hidden = true;
  filesScreen.hidden = false;
  siteScreen.hidden = true;
  tabStrip.hidden = true;
  toolbar.hidden = true;
  siteTab.hidden = true;
  statusbar.hidden = true;
  supportBadge.hidden = true;
}

function showDetectedVideo() {
  resetRecordingState();
  browseView.hidden = true;
  detectedView.hidden = false;
  addressInput.value = "https://kick.com/vinceaesthetic";
  siteTabLabel.textContent = "VinceAesthetic S...";
  statusIndicator.className = "status-indicator is-detected";
  statusText.textContent = "已经检测到视频";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  startBtn.classList.add("is-enabled");
  stopBtn.classList.remove("is-enabled");
}

function showKick() {
  window.clearTimeout(detectTimer);
  resetRecordingState();
  closeRecordModal();
  setActiveNav("home");
  browserPanel.classList.remove("files-mode");

  homeScreen.hidden = true;
  filesScreen.hidden = true;
  siteScreen.hidden = false;
  tabStrip.hidden = false;
  toolbar.hidden = false;
  siteTab.hidden = false;
  statusbar.hidden = false;
  supportBadge.hidden = false;
  browseView.hidden = false;
  detectedView.hidden = true;
  addressInput.value = "https://kick.com/";
  siteTabLabel.textContent = "Kick";
  statusIndicator.className = "status-indicator is-spinning";
  statusText.textContent = "正在检测视频...";
  startBtn.disabled = true;
  stopBtn.disabled = true;
  startBtn.classList.remove("is-enabled");
  stopBtn.classList.remove("is-enabled");

  detectTimer = window.setTimeout(showDetectedVideo, 1800);
}

function openRecordModal() {
  if (startBtn.disabled) {
    return;
  }

  closeDropdowns();
  recordModal.classList.add("is-open");
}

function showRecordingState() {
  closeRecordModal();
  tabRecordDot.hidden = false;
  recordingOverlay.hidden = false;
  statusIndicator.className = "status-indicator is-detected";
  statusText.textContent = "视频录制中";
  startBtn.disabled = true;
  stopBtn.disabled = false;
  startBtn.classList.remove("is-enabled");
  stopBtn.classList.add("is-enabled");

  recordingSeconds = 5;
  recordingTime.textContent = formatRecordingTime(recordingSeconds);
  stopRecordingTicker();
  recordingTicker = window.setInterval(() => {
    recordingSeconds += 1;
    recordingTime.textContent = formatRecordingTime(recordingSeconds);
  }, 1000);
}

function stopRecording() {
  resetRecordingState();
  statusIndicator.className = "status-indicator is-detected";
  statusText.textContent = "已经检测到视频";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  startBtn.classList.add("is-enabled");
  stopBtn.classList.remove("is-enabled");
}

alphaItems.forEach((item) => {
  item.addEventListener("click", () => {
    alphaItems.forEach((button) => button.classList.remove("is-active"));
    item.classList.add("is-active");
  });
});

openKickButton?.addEventListener("click", showKick);

goHomeTriggers.forEach((trigger) => {
  trigger.addEventListener("click", showHome);
});

goFilesTriggers.forEach((trigger) => {
  trigger.addEventListener("click", showFiles);
});

startBtn?.addEventListener("click", openRecordModal);
stopBtn?.addEventListener("click", stopRecording);
recordModalClose?.addEventListener("click", closeRecordModal);
recordCancel?.addEventListener("click", closeRecordModal);
recordConfirm?.addEventListener("click", showRecordingState);

resolutionTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleDropdown(resolutionTrigger);
});

speedTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleDropdown(speedTrigger);
});

dropdownOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const { target, value } = option.dataset;

    if (target === "resolution") {
      resolutionValue.textContent = value;
    }

    if (target === "speed") {
      speedValue.textContent = value;
    }

    dropdownOptions.forEach((item) => {
      if (item.dataset.target === target) {
        item.classList.toggle("is-selected", item === option);
      }
    });

    closeDropdowns();
  });
});

durationSwitch?.addEventListener("click", () => {
  durationSwitch.classList.toggle("is-on");
  const isOn = durationSwitch.classList.contains("is-on");
  durationSwitch.setAttribute("aria-pressed", isOn ? "true" : "false");
});

recordModal?.addEventListener("click", (event) => {
  if (event.target === recordModal) {
    closeRecordModal();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-dropdown]")) {
    closeDropdowns();
  }
});

showHome();
