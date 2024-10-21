// Function to fetch recipes from the Spoonacular API based on the ingredients input and additional filters
async function fetchRecipes(ingredients, diet, minCalories, maxCalories, minProtein, maxProtein) {
  // URL-encode the ingredients and other parameters to handle special characters like spaces or commas
  const query = encodeURIComponent(ingredients);
  let url = `${API_URL}?includeIngredients=${query}&number=10&ranking=1&apiKey=${API_KEY}`;
  
  // Add dietary restrictions if selected
  if (diet) {
    url += `&diet=${encodeURIComponent(diet)}`;
  }

  // Add calorie and protein range if specified
  if (minCalories) {
    url += `&minCalories=${minCalories}`;
  }
  if (maxCalories) {
    url += `&maxCalories=${maxCalories}`;
  }
  if (minProtein) {
    url += `&minProtein=${minProtein}`;
  }
  if (maxProtein) {
    url += `&maxProtein=${maxProtein}`;
  }

  try {
    // Call Spoonacular API with query parameters
    const response = await fetch(url);

    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Log the response for debugging purposes
    console.log(data);

    // Return the array of recipes from the API response
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

// Handle form submission
document.getElementById('ingredientsForm').addEventListener('submit', async function (e) {
  e.preventDefault();  // Prevent the form from submitting normally

  const ingredients = document.getElementById('ingredients').value.trim();
  const diet = document.getElementById('diet').value;
  const minCalories = document.getElementById('minCalories').value;
  const maxCalories = document.getElementById('maxCalories').value;
  const minProtein = document.getElementById('minProtein').value;
  const maxProtein = document.getElementById('maxProtein').value;

  if (!ingredients) {
    alert('Please enter some ingredients.');
    return;
  }

  // Fetch and display recipes based on the entered ingredients and filters
  const recipes = await fetchRecipes(ingredients, diet, minCalories, maxCalories, minProtein, maxProtein);
  displayRecipes(recipes);
});
