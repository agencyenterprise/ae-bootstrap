BRANCH=$1

if [ -z $BRANCH ]; then
  BRANCH='development'
fi

if [ "$BRANCH" == "master" ]; then
  echo "Deploy master"

  git remote add heroku git@heroku.com:#############-production.git
else
  echo "Deploy development"

  git remote add heroku git@heroku.com:#############-acceptance.git
fi

git show --summary

git config --global user.email "ae-bootstrap@ae.studio"
git config --global user.name "AE Bootstrap"

git push -f heroku master
