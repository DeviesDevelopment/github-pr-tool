# github-pr-tool

A tool to list open pull requests for your Github team.

## Getting started
Install dependencies
 - `npm ci`

Run locally
 - `npm start`

Build (for current os/architecture)
 - `npm run make`

## Setup
### Create personal access token
Follow this guide to create a personal access token for your script. 

https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line

These are the default permissions recommended by GitHub (https://developer.github.com/v4/guides/forming-calls/):

* repo
* read:org
* read:public_key
* read:repo_hook
* user
* read:gpg_key

### Enable SSO
You must enable SSO for your access token after you have created it.


### Create configuration file
You need to make your personal access token and some other environment variables accessible to the script.
Create the file `env.js` and place it in the root folder of the repo. Enter the following content:

    env = {
        PERSONAL_ACCESS_TOKEN: '<Token>',
        ORGANIZATION: '<Name of organization>',
        TEAM: '<Name of team>'
    };
