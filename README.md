## CSE 341 - Week 01 Individual Activity - Contacts 

### API Endpoints
Base URL: https://cse-341-w01-contacts.onrender.com

| Method | Endpoint              | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /                     | Health check ("Server is up")   |
| GET    | /contacts             | Returns all contacts            |
| GET    | /contacts/:id         | Returns one contact by ID       |
| GET    | /professional         | Returns developer info (static) |

### Environment Variables
| Key           | Description           |
|----------------|-----------------------|
| `MONGODB_URI` | Connection string to MongoDB Atlas |
| `PORT`        | Optional (defaults to 8080) |

### Deployment Notes
- `.env` file is local only (excluded via `.gitignore`).
- Environment variables set on Render under **Settings → Environment**.
- Start Command: **node server.js** npm start didn't work
