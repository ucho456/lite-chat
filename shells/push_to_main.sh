REMOTE_URL="https://github.com/ucho456/lite-chat"
DEV_BRANCH="dev"
MAIN_BRANCH="main"

git checkout $DEV_BRANCH

git pull $REMOTE_URL $DEV_BRANCH

git checkout $MAIN_BRANCH

git pull $REMOTE_URL $MAIN_BRANCH

git merge $DEV_BRANCH

git push $REMOTE_URL $MAIN_BRANCH

git checkout $DEV_BRANCH
