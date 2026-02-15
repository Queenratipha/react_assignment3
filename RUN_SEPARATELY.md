# Running Backend and Frontend Separately

## Backend Setup (Port 5000)

1. Navigate to server directory:
```bash
cd server
```

2. Create `.env` file from `.env.example`:
```bash
copy .env.example .env
```

3. Update `.env` with your database credentials

4. Install dependencies:
```bash
npm install
```

5. Run backend:
```bash
npm run dev
```

Backend will run on http://localhost:5000

## Frontend Setup (Port 3000)

1. Navigate to root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Run frontend:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## Important Notes

- Backend must be running on port 5000
- Frontend runs on port 3000 and proxies API calls to backend
- Start backend first, then frontend
- Both servers must run simultaneously
