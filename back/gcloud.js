
const env = process.env.NODE_ENV;
if (!env || env === 'development') {
  console.log('Running in development environment, leaving.');
  process.exit();
}

const fs = require('fs');
const confFiles = [
  'datasources.json',
  'datasources.local.json',
  'config.local.json',
];

const downloadFiles = [];
for (let file of confFiles) {
  if (!fs.existsSync(`server/${file}`)) {
    downloadFiles.push(file);
  }
}
if (!downloadFiles.length) {
  console.log('Config files already exist.');
  process.exit();
}

const gcs = require('@google-cloud/storage');
const bucketName = 'datasources.canini.es';
const storage = new gcs.Storage();

const confDir = '/tmp/canini';
fs.mkdirSync(confDir);

const tasks = [];
for (let file of confFiles) {
  console.log(`Downloading '${file}' from bucket '${bucketName}.'`);
  tasks.push(storage
    .bucket(bucketName)
    .file(file)
    .download({destination: `${confDir}/${file}`}));
}

Promise.all(tasks)
  .then(() => console.info('Config files downloaded successfully.'));
// .catch(err => console.error(`Error: ${err}.`))
