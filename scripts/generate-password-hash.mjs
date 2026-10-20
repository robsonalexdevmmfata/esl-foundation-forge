import bcrypt from "bcrypt";

const password = "Serras123@";
const rounds = 10;

bcrypt.hash(password, rounds, (err, hash) => {
  if (err) {
    console.error("Error generating hash:", err);
    process.exit(1);
  }
  console.log('Password hash for "Serras123@":');
  console.log(hash);
  process.exit(0);
});
