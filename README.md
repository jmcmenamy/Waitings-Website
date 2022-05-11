The dist folder contains production ready code for this website

The source folder contains the human-readable javascript that powers the website

package.json lists the dependencies the project uses. In order to work with this git repo locally, you'll need to npm install each of the dependencies. Running npm run build will use the webpack.config.js file to produce the main.js file in dist, which is clearly not human readable. 

The .gitignore file ignores any changes to the node_modules folder, which doesn't exist here, but which will exist when you npm install the dependcies locally. Ignoring these changes was required for me in order to not freeze up my laptop as there were a lot of files in there.