# Green API Test Interface

This project is a web application that provides a user-friendly interface for testing Green API methods. It allows users to interact with WhatsApp instances through the Green API platform with real-time response viewing.

## Project Structure

```
my-web-app/
├── src/
│   ├── index.html       # Main HTML interface with split-panel layout
│   ├── app.js           # JavaScript logic for API calls and form validation
│   └── styles/
│       └── main.css     # CSS styles with responsive design
├── package.json         # Configuration file for npm
├── Dockerfile          # Docker configuration (optional)
└── README.md           # Documentation for the project
```

## Features

- **Clean Split-Panel Interface**: Left panel for controls, right panel for API responses
- **Four Green API Methods**:
  - `getSettings` - Retrieve instance settings
  - `getStateInstance` - Check instance authorization status
  - `sendMessage` - Send text messages to WhatsApp contacts
  - `sendFileByUrl` - Send files via URL to WhatsApp contacts
- **Form Validation**: Auto-formatting and validation for phone numbers (format: `79001002030@c.us`)
- **Secure Token Input**: Password-style field with toggle visibility for API tokens
- **Real-time Response Display**: JSON-formatted API responses in read-only textarea
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-web-app
   ```

2. **Install dependencies (optional):**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```
   Opens at `http://localhost:8000`

### Alternative: Direct File Access
Simply open `src/index.html` in your web browser.

## Usage Guidelines

### 1. Setup Green API Instance
1. Visit [Green API Console](https://console.green-api.com/)
2. Create a new instance on the free developer account
3. Scan the QR code with your WhatsApp to authorize the instance
4. Copy your `idInstance` and `apiTokenInstance`

### 2. Using the Interface
1. **Enter Connection Parameters**:
   - ID Instance: Your instance identifier
   - API Token Instance: Your API token (hidden by default, click eye icon to show/hide)

2. **Test API Methods**:
   - Click `getSettings` to retrieve instance configuration
   - Click `getStateInstance` to check authorization status
   - Click `sendMessage` to open message form
   - Click `sendFileByUrl` to open file sending form

3. **Send Messages/Files**:
   - Enter Chat ID in format: `79001002030@c.us`
   - Fill in message text or file details
   - Click the corresponding send button

4. **View Responses**:
   - All API responses appear in the right panel
   - Responses are formatted as readable JSON

## Phone Number Format

The application expects phone numbers in Green API format:
- **Correct**: `79001002030@c.us`
- **Incorrect**: `+7 900 100 20 30` or `79001002030`

The interface includes auto-formatting and validation to help with correct formatting.

## Deployment Options

### Option 1: Static Hosting (Recommended)
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Dockploy (Static deployment)

### Option 2: Docker Deployment
```bash
# Build and run with Docker
docker build -t green-api-interface .
docker run -p 8000:8000 green-api-interface
```

### Option 3: Dockploy Deployment
1. Push repository to GitHub
2. Connect to Dockploy
3. Select "Static" deployment method
4. Set public directory to `src`
5. Deploy

## Green API Integration

This application integrates with the Green API platform to provide WhatsApp automation capabilities:

- **Base URL**: `https://api.green-api.com`
- **Authentication**: Instance ID + API Token
- **Request Format**: `https://api.green-api.com/waInstance{idInstance}/{method}/{apiTokenInstance}`

### Supported Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `getSettings` | Get instance settings | None |
| `getStateInstance` | Get authorization status | None |
| `sendMessage` | Send text message | `chatId`, `message` |
| `sendFileByUrl` | Send file by URL | `chatId`, `urlFile`, `fileName` |

## API Reference

For complete API documentation, visit: [Green API Documentation](https://greenapi.com/en/docs/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For Green API support, visit: [Green API Support](https://greenapi.com/en/support/)