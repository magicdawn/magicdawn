# Path to your oh-my-zsh installation.
export ZSH=/Users/magicdawn/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
# ZSH_THEME="ys"
# ZSH_THEME="spaceship"
# ZSH_THEME="spaceship"
# ZSH_THEME="spaceship"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git sudo osx node npm gulp brew fasd hub httpie)

# User configuration

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
# export MANPATH="/usr/local/man:$MANPATH"

#
# spaceship zsh-theme config
# https://github.com/denysdovhan/spaceship-zsh-theme
#
SPACESHIP_GOLANG_SHOW="false"

source $ZSH/oh-my-zsh.sh

#
# pure
#
PURE_PROMPT_SYMBOL='$'
fpath+=("/usr/local/share/zsh/site-functions")
autoload -U promptinit; promptinit
prompt pure

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

#
# try to be humble
#
alias pls=sudo
alias please=sudo

#
# PATH
#

## heroku
export PATH="/usr/local/heroku/bin:$PATH"
## 一些bin
export PATH=$PATH:~/bin
## 当前目录
export PATH=$PATH:.

# cario
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig

# DOT_FILES
# Example: wget -q $DOT_FILES/.eslintrc
export DOT_FILES='https://raw.githubusercontent.com/magicdawn/magicdawn/master/dot_files'

# node
## nvm
export NVM_DIR="/Users/magicdawn/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

## nvm proxy
export NODEJS_ORG_MIRROR="http://npm.taobao.org/mirrors/node/"
export IOJS_ORG_MIRROR='http://npm.taobao.org/mirrors/iojs'
export NVM_NODEJS_ORG_MIRROR="$NODEJS_ORG_MIRROR"
export NVM_IOJS_ORG_MIRROR="$IOJS_ORG_MIRROR"

## sass proxy
export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass/"

## npm version `patch` `minor` `major`
for x in patch minor major; do
  alias npm-$x="nrm use npm && npm version $x && npm publish && gp origin --all && gp origin --tags"
done

## install cnpm
npm-i-cnpm(){
  npm install -g cnpm --registry=https://registry.npm.taobao.org
}

## npm-check
export NPM_CHECK_INSTALLER=cnpm

## npm-taobao-regsitry
alias npm-taobao-registry="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

# golang
export GOPATH=/Users/magicdawn/gopath
export PATH=$PATH:$GOPATH/bin

# rbenv
eval "$(rbenv init -)"

# dotnet
export PATH="$PATH:/usr/local/share/dotnet"

#
# python
#

# pyenv
if which pyenv > /dev/null; then
  eval "$(pyenv init -)";
fi

# alias exec
alias py='python'

# JAVA
export JAVA_HOME="`/usr/libexec/java_home -v 1.8`"
export CATALINA_HOME="$HOME/Downloads/dev_soft/apache-tomcat-9.0.0.M21"
export CLASSPATH=".:$JAVA_HOME/lib:$CATALINA_HOME/lib/servlet-api.jar"

# groovy
export GROOVY_HOME=/usr/local/opt/groovy/libexec

# baiduyun
# 默认就是
# --conf-path=$HOME/.aria2/aria2.conf
alias aria2c-rpc='aria2c --enable-rpc --rpc-allow-origin-all'
. "/Users/magicdawn/.acme.sh/acme.sh.env"

# fengjr配置
# source ~/.fengjrrc

# dd
source ~/.didirc

# 本机 ip
function myip(){
  ifconfig | grep 10.254.111 | awk '{ print $2 }'
}
export MYIP=`ifconfig | grep 10.254.111 | awk '{ print $2 }'`

# npm proxy
# 1. npm -> 8000(http) -> 1080(shadowsocks) -> npm_registry
function npm-proxy(){
  HTTP_PORT=10086
  SOCKS_PORT=1080

  # start shadowsocks
  open -a ShadowsocksX

  # set npm proxy
  # 1. delete old
  for x in proxy http-proxy http_proxy proxy; do
    npm config delete $x
  done
  # 2. set
  npm config set proxy http://127.0.0.1:$HTTP_PORT

  # start kneesocks
  # blocked
  DEBUG=proxy kneesocks $HTTP_PORT $SOCKS_PORT

  # if exit
  echo '---------- process about 10086 --------------'
  ps -ax | grep $HTTP_PORT
}

# typora
alias typora='open -a Typora'
alias md='open -a Typora'

#
# md <some-file>
#
# function md() {
#   echo "$@"
#
#   if [ -z "$1" ]; then
#     echo "md <file>"
#     return
#   fi
#
#   # dir
#   local dir=$(dirname "$1")
#   if [ ! -d "$dir" ]; then
#     mkdir -p $(dirname "$1")
#   fi
#
#   # file
#   if [ ! -f "$1" ]; then
#     touch "$1"
#   fi
#
#   # open
#   typora "$1"
# }
export PATH="$HOME/.yarn/bin:$PATH"

# ipad
alias ipad="ssh root@192.168.31.101"
alias antonov="ipad"

# composer
export PATH="$PATH:$HOME/.composer/vendor/bin"

function http-proxy-ybb(){
  export http_proxy=http://127.0.0.1:9743
  export https_proxy=$http_proxy
}

function http-proxy-socks(){
  export http_proxy=http://127.0.0.1:10086
  export https_proxy=$http_proxy
}

alias cppcompile='c++ -std=c++11 -stdlib=libc++'

#
# proxychains
#
alias pc='proxychains4'
alias proxy='proxychains4'

#
# rabbitmq
#
export PATH="$PATH:/usr/local/sbin/"
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="/Users/magicdawn/.sdkman"
[[ -s "/Users/magicdawn/.sdkman/bin/sdkman-init.sh" ]] && source "/Users/magicdawn/.sdkman/bin/sdkman-init.sh"


#
# postgres
#
export PGDATA='/Users/magicdawn/data/pgdata'
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

#
# GPG
# brew install gpg
# https://stackoverflow.com/a/42265848
#
export GPG_TTY=$(tty)