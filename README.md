# Environment requirements
## Localenv
1. Docker (docker-compose)
2. `.env` file (example below) (use `inject_env_vars.sh` script to inject all env vars)

```shell
# Local postgres for docker
POSTGRES_SERVER=###POSTGRES_SERVER###
POSTGRES_PORT=###POSTGRES_PORT###
POSTGRES_DB=###POSTGRES_DB###
POSTGRES_USER=###POSTGRES_USER###
POSTGRES_PASSWORD=###POSTGRES_PASSWORD###
NODE_ENV="development"

JWT_COOKIE_NAME="session-token"
JWT_ALGORITHM="HS256"
JWT_EXPIRE_DATE="7d"
JWT_SECRET=###JWT_SECRET###
DATABASE_URL=###DATABASE_URL###
PORT=3001
```

### Localenv setup
1. Use `nvm` to setup NodeJS version
```shell
nvm use
```

2. Install npm packages
```shell
npm install
```

3. Start docker from the root of the repo with the followind command
```shell
docker-compose up -d
```

4. Generate prisma types (Optional). Please note it will try to copy to the `./src/types/prismaTypes.d.ts` frontend project which should be located near this project at the same level.
! Keep in mind, without the command below you'll not be able to run seed script from the step #6.
```shell
npm run prisma:generate
```

5. Run DB migration
```shell
npx prisma migrate dev --name init
```
If you get `Drift detected: Your database schema is not in sync with your migration history.` message then `reset local DB` and repeat migration command above
```shell
npx prisma migrate reset
```

6. Seed DB with a test values. (Optional)
```shell
npm run seed
```

7. Start server
```shell
npm run dev
```

(Initial setup can be found [in this commit](https://github.com/DimonGo/vivid-expressjs/commit/8c303f88408067ea592d73f9d4bc7c3066a66dfc))