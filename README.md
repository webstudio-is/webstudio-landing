# Webstudio landing site

This is the landing site at https://webstudio.is and, at the same time, a demonstration of a site built with Webstudio and deployed as a standalone [Remix](https://remix.run) app to [Vercel](https://vercel.com/). Data is synchronized using [CLI](https://github.com/webstudio-is/webstudio-cli) and rendered using [SDK](https://github.com/webstudio-is/webstudio-sdk).

## Development

To run this site we only need to install node and JS dependencies, no database or designer is required, since they are decoupled.

1. Install [Node.js](https://nodejs.dev/learn/how-to-install-nodejs)
2. Install [Yarn](https://yarnpkg.com/) `npm i -g yarn`
3. Install dependencies `yarn`
4. Run `yarn dev` and it will log the URL

## Syncing Webstudio data

**Important** - treat your project id like a private key, since there is no authentification for now.

Host needs to point at any Designer instance, it can be local or in the cloud.

```
wstd sync <project id> --host <instance url>
```

## Deployment

After pushing it to some remote git repository, [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).
