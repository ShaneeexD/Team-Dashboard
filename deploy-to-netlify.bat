@echo off
echo Building the project for production...
npm run build

echo Deploying to Netlify...
echo You'll need to have the Netlify CLI installed and be logged in.
echo If not installed, run: npm install -g netlify-cli
echo Then login with: netlify login

netlify deploy --prod
