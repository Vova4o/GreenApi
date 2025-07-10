class GreenAPIClient {
  constructor() {
    this.baseUrl = "https://api.green-api.com";
    this.initializeEventListeners();
    this.setupPasswordToggle();
    this.setupPhoneValidation();
  }

  initializeEventListeners() {
    document
      .getElementById("getSettings")
      .addEventListener("click", () => this.getSettings());
    document
      .getElementById("getStateInstance")
      .addEventListener("click", () => this.getStateInstance());
    document
      .getElementById("sendMessage")
      .addEventListener("click", () => this.showMessageParams());
    document
      .getElementById("sendFileByUrl")
      .addEventListener("click", () => this.showFileParams());
  }

  setupPasswordToggle() {
    const toggleButton = document.getElementById("toggleApiToken");
    const passwordInput = document.getElementById("apiToken");

    toggleButton.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle eye icon
      const icon = toggleButton.querySelector("i");
      if (type === "password") {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      } else {
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
    });
  }

  setupPhoneValidation() {
    const phoneInputs = ["chatId", "fileChatId"];

    phoneInputs.forEach((inputId) => {
      const input = document.getElementById(inputId);
      if (input) {
        input.addEventListener("input", (e) => this.formatPhoneNumber(e));
        input.addEventListener("blur", (e) => this.validatePhoneNumber(e));
      }
    });
  }

  formatPhoneNumber(event) {
    let value = event.target.value;
    let cleaned = value.replace(/[^\d@c.us]/g, "");

    if (/^\d+$/.test(cleaned)) {
      if (!cleaned.includes("@c.us")) {
        event.target.value = cleaned;
      }
    } else if (cleaned.includes("@")) {
      event.target.value = value;
    }
  }

  validatePhoneNumber(event) {
    let value = event.target.value.trim();

    if (value && !value.includes("@c.us")) {
      event.target.value = value + "@c.us";
      event.target.classList.remove("error");
    } else if (value && !this.isValidPhoneFormat(value)) {
      event.target.classList.add("error");
      this.showValidationMessage(event.target, "Format: 79257403935@c.us");
    } else {
      event.target.classList.remove("error");
      this.hideValidationMessage(event.target);
    }
  }

  isValidPhoneFormat(phone) {
    const phoneRegex = /^\d{10,15}@c\.us$/;
    return phoneRegex.test(phone);
  }

  showValidationMessage(input, message) {
    this.hideValidationMessage(input);

    const errorDiv = document.createElement("div");
    errorDiv.className = "validation-error";
    errorDiv.textContent = message;

    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }

  hideValidationMessage(input) {
    const errorDiv = input.parentNode.querySelector(".validation-error");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  getConnectionParams() {
    const idInstance = document.getElementById("idInstance").value.trim();
    const apiToken = document.getElementById("apiToken").value.trim();

    if (!idInstance || !apiToken) {
      this.displayResponse({
        error: "Please enter both ID Instance and API Token",
      });
      return null;
    }

    return { idInstance, apiToken };
  }

  async makeAPICall(method, data = null) {
    const params = this.getConnectionParams();
    if (!params) return;

    const { idInstance, apiToken } = params;
    const url = `${this.baseUrl}/waInstance${idInstance}/${method}/${apiToken}`;

    try {
      const options = {
        method: data ? "POST" : "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      const result = await response.json();

      this.displayResponse(result);
    } catch (error) {
      this.displayResponse({ error: error.message });
    }
  }

  async getSettings() {
    await this.makeAPICall("getSettings");
  }

  async getStateInstance() {
    await this.makeAPICall("getStateInstance");
  }

  showMessageParams() {
    const messageSection = document.getElementById("messageParams");
    const fileSection = document.getElementById("fileParams");

    messageSection.style.display = "block";
    fileSection.style.display = "none";

    if (!document.getElementById("sendMessageBtn")) {
      const sendBtn = document.createElement("button");
      sendBtn.id = "sendMessageBtn";
      sendBtn.className = "api-button";
      sendBtn.textContent = "Send Message";
      sendBtn.style.marginTop = "10px";
      sendBtn.addEventListener("click", () => this.sendMessage());
      messageSection.appendChild(sendBtn);
    }
  }

  showFileParams() {
    const messageSection = document.getElementById("messageParams");
    const fileSection = document.getElementById("fileParams");

    messageSection.style.display = "none";
    fileSection.style.display = "block";

    if (!document.getElementById("sendFileBtn")) {
      const sendBtn = document.createElement("button");
      sendBtn.id = "sendFileBtn";
      sendBtn.className = "api-button";
      sendBtn.textContent = "Send File";
      sendBtn.style.marginTop = "10px";
      sendBtn.addEventListener("click", () => this.sendFileByUrl());
      fileSection.appendChild(sendBtn);
    }
  }

  async sendMessage() {
    const chatId = document.getElementById("chatId").value.trim();
    const message = document.getElementById("messageText").value.trim();

    if (!chatId || !this.isValidPhoneFormat(chatId)) {
      this.displayResponse({
        error: "Please enter a valid Chat ID in format: 79257403935@c.us",
      });
      return;
    }

    if (!message) {
      this.displayResponse({ error: "Please enter message text" });
      return;
    }

    const data = {
      chatId: chatId,
      message: message,
    };

    await this.makeAPICall("sendMessage", data);
  }

  async sendFileByUrl() {
    const chatId = document.getElementById("fileChatId").value.trim();
    const urlFile = document.getElementById("fileUrl").value.trim();
    const fileName = document.getElementById("fileName").value.trim();

    if (!chatId || !this.isValidPhoneFormat(chatId)) {
      this.displayResponse({
        error: "Please enter a valid Chat ID in format: 79257403935@c.us",
      });
      return;
    }

    if (!urlFile || !fileName) {
      this.displayResponse({ error: "Please fill all file parameters" });
      return;
    }

    const data = {
      chatId: chatId,
      urlFile: urlFile,
      fileName: fileName,
    };

    await this.makeAPICall("sendFileByUrl", data);
  }

  displayResponse(data) {
    const output = document.getElementById("responseOutput");
    output.value = JSON.stringify(data, null, 2);
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new GreenAPIClient();
});
