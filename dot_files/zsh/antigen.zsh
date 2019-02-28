# zsh package management
source /usr/local/share/antigen/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle sudo
antigen bundle osx
antigen bundle fasd
antigen bundle command-not-found
antigen bundle node
antigen bundle npm
antigen bundle gulp
antigen bundle pip
antigen bundle hub
antigen bundle httpie

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions

# Load the theme.
# antigen theme ys
antigen theme steeef
# antigen theme https://github.com/denysdovhan/spaceship-prompt spaceship

# Tell Antigen that you're done.
antigen apply