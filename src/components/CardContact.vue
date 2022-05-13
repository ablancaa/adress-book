<template>
  <div class="recipe" :class="recipe.featured && 'featured'">
    <div class="estrella-recipe" v-show="recipe.featured"><img src="@/assets/estrella.png" /></div>
    <button class="delete-recipe" @click="deleteRecipe">
      <img src="../assets/delete-button.svg" alt="Delete recipe" />
    </button>
    <h2 class="recipe-title">{{ recipe.title }}</h2>
    <div class="recipe-image">
      <img :src="recipe.imageUrl" />
    </div>
    <div class="recipe-info">
      <div class="recipe-info-item">
        <span class="recipe-info-label">Servings:</span>
        <span class="recipe-info-value">{{ recipe.servings }}</span>
      </div>
      <div class="recipe-info-item">
        <span class="recipe-info-label">Time:</span>
        <span class="recipe-info-value">{{ recipe.time }}</span>
      </div>
      <div class="recipe-info-item">
        <span class="recipe-info-label">Difficulty:</span>
        <span class="recipe-info-value">{{ recipe.difficulty }}</span>
      </div>
    </div>
    <div class="recipe-ingredients">
      <h3 class="recipe-ingredients-title">Ingredients</h3>
      <ul class="recipe-ingredients-list">
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="recipe-directions">
      <h3 class="recipe-directions-title">Directions</h3>
      <ol class="recipe-directions-list">
        <li v-for="direction in recipe.directions" :key="direction">
          {{ direction }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>