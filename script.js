// API details (Updated with your API credentials)
const API_ID = 'd20ccf21';  // Your application ID
const API_KEY = 'ddaf13040618c84632b0ad1e42f08639';  // Your API key
const API_URL = `https://api.edamam.com/search`;

// Function to fetch recipes from the Edamam API based on the ingredients input
async function fetchRecipes(ingredients) {
  try {
    const response = await fetch(`${API_URL}?q=${ingredients}&app_id=${API_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    return data.hits.map(hit => hit.recipe);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

// Function to display the fetched recipes on the webpage
function displayRecipes(recipes) {
  const recipeList = document.getElementById('recipeList');
  recipeList.innerHTML = '';  // Clear any previous results
  
  if (recipes.length === 0) {
    recipeList.innerHTML = '<p>No recipes found. Please try different ingredients.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const listItem = document.createElement('li');
    listItem.style.marginBottom = '20px';

    listItem.innerHTML = `
      <div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
        <h3 style="color: #333;">${recipe.label}</h3>
        <img src="${recipe.image}" alt="${recipe.label}" style="width: 100%; max-width: 300px; height: auto;" />
        <p><strong>Source:</strong> ${recipe.source}</p>
        <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
        <a href="${recipe.url}" target="_blank" style="color: #28a745;">View Recipe</a>
      </div>
    `;

    recipeList.appendChild(listItem);
  });
}

// Handle form submission
document.getElementById('ingredientsForm').addEventListener('submit', async function (e) {
  e.preventDefault();  // Prevent the form from submitting normally

  const ingredients = document.getElementById('ingredients').value.trim();
  if (!ingredients) {
    alert('Please enter some ingredients.');
    return;
  }

  // Fetch and display recipes based on the entered ingredients
  const recipes = await fetchRecipes(ingredients);
  displayRecipes(recipes);
});
