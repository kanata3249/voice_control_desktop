
## build

### build

> $ yarn rebuild-modules
> $ yarn webpack
> $ yarn start

### package

> $ yarn package

## setup development env

### Windows(not WSL)

1. install chocolaty
1. install node.js
> PS> choco install nodejs-lts
1. install yarn
> PS> choco install yarn
1. install windows-build-tools
> PS> yarn add --global windows-build-tools



### MacOS

1. install asdf
> $ git clone https://github.com/asdf-vm/asdf.git ~/.asdf<br />
> $ echo '. $HOME/.asdf/asdf.sh' >> ~/.bashrc<br />
> $ echo '. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc<br />

2. install node.js

> $ asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs<br />
> $ asdf install nodejs 10.15.3

3. install yarn
> $ brew install yarn
