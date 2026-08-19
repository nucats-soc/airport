# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.15.3 create --template minimal --types ts --add prettier tailwindcss="plugins:typography,forms" mdsvex --install npm ./
```

## Developing

Create a local environment file and add the token for your Notion integration:

```sh
cp .env.example .env
```

The integration must also be connected to every Notion page or data source that the app needs to access. The configured client is available to server-side SvelteKit code:

```ts
import { notion } from '$lib/server/notion/client';
```

Keep this import in server-only modules such as `+page.server.ts`, `+server.ts`, or other files under `$lib/server` so the token is never sent to the browser.

Current Notion data source variables used by the app are:

- `NOTION_EVENT_DATASOURCE`
- `NOTION_PLACE_DATASOURCE`
- `NOTION_COMMITTEE_DATASOURCE`

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
