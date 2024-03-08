<template>
  <div class="course-container">

    <div class="content">
      <h1>{{ message }}</h1>
      <div class="section">
        <h2>Qu'est-ce que l'informatique ?</h2>
        <p>{{ cours }}</p>
      </div>

      <div class="section">
        <h2>Langages de programmation</h2>
        <p>{{ langages }}</p>
      </div>

      <div class="section">
        <h2>Les bases de la programmation</h2>
        <p>{{ bases }}</p>
      </div>

      <div class="section">
        <h2>Conclusion</h2>
        <p>{{ conclusion }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  const message = "Introduction aux Bases de l'Informatique";
  const cours = `Linformatique est un domaine qui concerne le traitement de l'information à l'aide de machines. Ces machines, appelées ordinateurs, sont capables de stocker, manipuler et transmettre des données sous différentes formes. ...`;
  const langages = `Les langages de programmation sont des outils utilisés pour écrire des instructions compréhensibles par l'ordinateur. Il en existe de nombreux, chacun ayant ses propres règles de syntaxe et de structure. Voici quelques exemples populaires : ...`;
  const bases = `La programmation consiste à écrire des instructions séquentielles, conditionnelles et répétitives pour résoudre un problème ou accomplir une tâche. Voici quelques concepts de base : ...`;
  const conclusion = `Ce cours introductif vous a donné un aperçu des bases de l'informatique, y compris les composants d'un ordinateur, les langages de programmation et les concepts de base de la programmation. Avec ces connaissances, vous êtes prêt à explorer davantage ce vaste domaine passionnant de la technologie.`;
</script>

<style scoped>
.course-container {
  background-color:  #c3d9fd;
  padding: 20px;
  border-radius: 8px;
}

.section {
  margin-bottom: 40px;
}

h2 {
  margin-top: 0;
}

p {
  line-height: 1.6;
}
</style>
