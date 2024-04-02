import * as model from "./model.js";
import recipeView from "./views/recipe.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Loading
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // Rendering
    recipeView.render(recipe);
  } catch (err) {
    console.log(err);
  }
};

// prettier-ignore
["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipes));
