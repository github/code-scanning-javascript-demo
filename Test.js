const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function getRandomNumber() {
  return Math.floor(Math.random() * 12);
}

async function addbook (parmas) {
    await query (`
        INSERT INTO books (title, author, genre, description, cover, created_at, updated_at)
}
