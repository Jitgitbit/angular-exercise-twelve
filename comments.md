.md stands for markdown btw

ng new angular-exercise-twelve

npm install --save bootstrap@3

____________________________________________________________________
NOTE:
for making sure all is well protecting the environments folder:
add a line in .gitignore saying: environments/
git rm -r --cached src/environments
git add .
git commit -m 'Removed the now ignored directory "environments"'
git push origin master
_____________________________________________________________________

ng serve

little bootstrap html shortcut trick:     .row>.col-xs-12     +tab

{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
    ".read": true,
    ".write": true
  }
}