# github-pr-tool

A tool to list open pull requests for your Github team.

## Rationale
The Github UI does not provide great support for filtering out a list of currently open pull requests for repositories belonging to a specific Github team. You can easily list PRs for a single repository or for your entire organization, but often that is not what you want. One potential workaround is to always tag the team automatically, using a [PR template](https://docs.github.com/en/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository), in each of your repositories. But that approach is somewhat error-prone and does not work with for example [Dependabot](https://dependabot.com/), since it uses its own template. Hence the need for this tool, which uses [Github's GraphQL API](https://docs.github.com/en/graphql/overview/about-the-graphql-api) to filter out a complete and correct list of open pull requests.

## Installation

Grab the latest release bundle for your OS under [Releases](https://github.com/DeviesDevelopment/github-pr-tool/releases) and off you go!

Upon first launch, the tool will ask for some configuration. Follow the instructions in the UI to get started.

### Ubuntu

    sudo dpkg -i github-pr-tool-debian.deb

### MacOS
Unzip `github-pr-tool-macOS.zip` and drag `github-pr-tool.app` to your Applications folder.

The first time you launch the app, you must right click it and choose "open" two times. On the second time you will get the option to trust the application.

### Windows
Run the `github-pr-tool-windows.exe` file.
First time you run the app it might be blocked due to not being trusted. There should be some option to allow it to run anyway.

## Development

### Getting started
Install dependencies:
 - `npm ci`

Run locally:
 - `npm start`

Build (for current OS/architecture):
 - `npm run make`

### Toggle DevTools

* **OS X**: Cmd + Alt + I
* **On Windows/Linux**: Ctrl + Shift + I
