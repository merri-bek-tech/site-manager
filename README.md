# Site Manager

Manage your [Site](https://jade.hopepunk.me/posts/sites-the-main-component-of-merri-bek-tech/) for resilient, local web hosting. Developed by [Merri-bek Tech](https://www.merri-bek.tech/), but useful for all similar organisations.

# Development

## Tech Stack

### Backend

The backend is a rust app, using the [Rocket framework](https://rocket.rs/). The rust package management tool "cargo" is used. To fetch what you need and start the server, run `cargo run`.

## Frontend

The frontend (web interface) is built using React, using the [Vite](https://vitejs.dev/) as the tooling to build and run. Packages are managed using npm. It's also heavily dependent on several other library choices:

- [Chakra UI](https://chakra-ui.com/) For the component library and styling

Running the frontend us done with `npm run dev`

## Generating a release

We use [Release it](https://github.com/release-it/release-it). To run it, use `npm run release`
