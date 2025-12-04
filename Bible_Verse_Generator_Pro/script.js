
async function generateVerse() {
  const ref = document.getElementById('reference').value;
  const translation = document.getElementById('translation').value;
  const output = document.getElementById('output');

  if (!ref) {
    output.textContent = "Please enter a verse reference.";
    return;
  }

  try {
    const formatted = ref.replace(/\s+/g, '+');
    let url = `https://bible-api.com/${formatted}`;

    if (translation) {
      url += `?translation=${translation}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      output.textContent = "Verse not found. Try another reference.";
      return;
    }

    output.textContent = `${data.reference}\n\n${data.text}\n(${data.translation_name})`;
  } catch (err) {
    output.textContent = "Error fetching verse. Check your internet connection.";
  }
}

async function verseOfDay() {
  const output = document.getElementById('output');

  const verses = [
    "John 3:16", "Psalm 23:1", "Genesis 1:1",
    "Romans 8:28", "Isaiah 41:10", "Philippians 4:13",
    "Jeremiah 29:11", "Proverbs 3:5"
  ];

  const randomRef = verses[Math.floor(Math.random() * verses.length)];
  document.getElementById('reference').value = randomRef;

  generateVerse();
}
