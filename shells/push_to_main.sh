DEV_BRANCH="dev"
MAIN_BRANCH="main"

git checkout $DEV_BRANCH

git pull $DEV_BRANCH

git checkout $MAIN_BRANCH

git pull $MAIN_BRANCH

git merge $DEV_BRANCH

git push $MAIN_BRANCH

git checkout $DEV_BRANCH
