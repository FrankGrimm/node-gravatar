var gravatar = require('./lib/gravatar');

var existingProfile = gravatar.createHash('frankgrimm@gmail.com');
var invalidProfile = gravatar.createHash('non@exist.ant');

console.log("Existing profile hash: " + existingProfile);
console.log("Invalid profile hash: " + invalidProfile);

console.log("Existing profile image:");
console.log(gravatar.imageUrlFor(existingProfile));

console.log("Existing profile image at 120px width and height:");
console.log(gravatar.imageUrlFor(existingProfile, { size: 120 })); // size may be anything between 1px and 512px

console.log("Existing profile image at 100px w/h and a default image URL:");
console.log(gravatar.imageUrlFor(existingProfile, { size: 100, defaultImage: 'http://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg' }));

console.log("Non-existant profile image with a default image URL:");
console.log(gravatar.imageUrlFor(invalidProfile, { defaultImage: 'http://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg'}));

console.log("Non-existant profile image without default image URL:");
console.log(gravatar.imageUrlFor(invalidProfile));

console.log("200px QR Code for existing profile:");
console.log(gravatar.imageUrlFor(existingProfile, { size: 200, format: 'qr' }));

console.log();

console.log("Profile URL:");
console.log(gravatar.profileUrlFor(existingProfile));
console.log("Profile data URL (JSON format):");
console.log(gravatar.profileUrlFor(existingProfile, 'json'));
console.log("Invalid profile data URL (JSON):");
console.log(gravatar.profileUrlFor(invalidProfile, 'json'));
console.log("Profile data URL (JSON format w/ callback name):");
console.log(gravatar.profileUrlFor(existingProfile, 'json', 'changeThisCallbackName'));

console.log();

gravatar.getProfileFor(existingProfile, function(err, data) {
  console.log("Profile data (existing profile):");
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});


gravatar.getProfileFor(invalidProfile, function(err, data) {
  console.log("Profile data (invalid profile):");
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});


