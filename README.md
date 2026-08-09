# Shareable Profile Link

An Express API to create user profiles and share them via a unique link or ID. Built with Node.js and TypeScript.

## Tech Stack
* **Node.js** (v18+)
* **Express**
* **TypeScript**
* **Joi** (Data validation)

## Getting Started

**1. Install dependencies:**
```bash
npm install
```

**2. Run in development mode:**
```bash
npm run dev
```

**3. Build for production:**
```bash
npm run build
```

**4. Start the production server:**
```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/profiles` | Create a new profile. |
| **GET** | `/profiles/:id` | Retrieve a specific profile by its ID.<br><br>**Query Parameters:**<br>`?type=json` - Returns JSON response<br>`?type=html` - Returns HTML response |
