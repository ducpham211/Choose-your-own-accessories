# Sport-Ecommerce

Sport-Ecommerce is a full-stack sports e-commerce application (Node.js + Express backend, React + Vite frontend). This README provides setup, environment configuration, running, and contribution instructions.

## Key Features

- Product management, shopping cart, and orders
- Payment integration (Momo)
- User authentication and admin authorization
- Real-time chat (socket)
- Supabase integration for selected features

## Architecture & Tech Stack

- Backend: Node.js, Express
- Frontend: React, Vite
- BaaS/DB: Supabase (or other DB depending on configuration)
- Payment gateway: Momo
- WebSocket: socket.io (or equivalent configuration)

## Repository Structure (overview)

- [back-end](back-end) — Node/Express server: `server.js`, `routes/`, `controller/`, `model/`, `config/`
- [frond-end](frond-end) — React (Vite) app: `src/`, `context/`, `components/`
- Important config files:
  - [back-end/server.js](back-end/server.js)
  - [back-end/config/momo.js](back-end/config/momo.js)
  - [back-end/config/supabase.js](back-end/config/supabase.js)
  - [frond-end/supabaseClient.js](frond-end/supabaseClient.js)

## System Requirements

- Node.js >= 16
- npm or yarn
- Environment variables (see below)

## Environment Variables (example)

The backend expects several environment variables (names may vary in config files; check `back-end/config`):

- `PORT` — server port (e.g. 5000)
- `JWT_SECRET` — JWT secret for authentication
- `SUPABASE_URL`, `SUPABASE_KEY` — Supabase credentials
- `MOMO_PARTNER_CODE`, `MOMO_ACCESS_KEY`, `MOMO_SECRET_KEY`, `MOMO_CALLBACK` — Momo configuration
- `DATABASE_URL` or `MONGO_URI` — if using a separate database

Create a `.env` file inside `back-end/` with the required variables. Do not commit `.env` to version control.

## Development Setup & Run

1. Clone the repository

```bash
git clone <repo-url>
cd "Sport-Ecommerce"
```

2. Backend

```bash
cd back-end
npm install
# create .env according to the Environment Variables section
npm run dev    # or npm start depending on package.json
```

3. Frontend

```bash
cd frond-end
npm install
npm run dev
# open the URL reported by Vite (usually http://localhost:5173)
```

## Momo & Supabase Notes

- Momo: fill Momo credentials in `.env` following `back-end/config/momo.js`.
- Supabase: fill `SUPABASE_URL` and `SUPABASE_KEY` in `.env`. The frontend may use `frond-end/supabaseClient.js` for direct interactions.

## Debugging & Troubleshooting

- Check backend logs in the terminal where the server runs.
- Verify real-time/socket configuration if chat is not working (`back-end/config/socket.js` and client socket settings).

## Tests

There are currently no automated tests in the project. If tests are added, run them via `npm test` in the respective `back-end` or `frond-end` directories.

## Contributing

- Open an issue to report bugs or request features
- Create branches using `feature/<description>` or `fix/<description>`
- Submit a pull request with clear change descriptions

## License

Add a `LICENSE` file if necessary (e.g., MIT). I can create one for you if you prefer.

## Contact

Add project contact information or communication channels here.

---

