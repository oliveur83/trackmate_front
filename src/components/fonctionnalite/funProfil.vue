<!-- ProfileData.vue -->
<template>
  <div class="profile-data">
    <div class="section">
      <h2>Données Personnelles</h2>
      <div class="personal-info">
        <p><strong>Nom:</strong> {{ userData.nom }}</p>
        <p><strong>Âge:</strong> {{ userData.age }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
      </div>
    </div>
    
    <div class="section">
      <h2>Statistiques</h2>
      <div class="stats">
        <p><strong>Total des points:</strong> {{ stats.totalPoints }}</p>
        <p><strong>Nombre de quizz terminés:</strong> {{ stats.completedQuizzes }}</p>
      </div>
    </div>
    
    <div class="section">
      <h2>Créations</h2>
      <div v-for="(creation, index) in creations" :key="index" class="creation">
        <h3>{{ creation.title }}</h3>
        <p>{{ creation.description }}</p>
        <!-- Questions à choix multiples -->
        <ul>
          <li v-for="(question, qIndex) in creation.questions" :key="qIndex">
            <strong>{{ question.text }}</strong>
            <ul>
              <li v-for="(option, oIndex) in question.options" :key="oIndex">
                <input type="checkbox" :id="'q_'+index+'_opt_'+oIndex" :value="option.text">
                <label :for="'q_'+index+'_opt_'+oIndex">{{ option.text }}</label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        nom: "John Doe",
        age: 30,
        email: "john.doe@example.com"
      },
      stats: {
        totalPoints: 1000,
        completedQuizzes: 5
      },
      creations: [
        {
          title: "Quiz sur la géographie",
          description: "Testez vos connaissances en géographie avec ce quiz.",
          questions: [
            {
              text: "Quelle est la capitale de la France ?",
              options: [
                { text: "Paris", isCorrect: true },
                { text: "Londres", isCorrect: false },
                { text: "Berlin", isCorrect: false }
              ]
            },
            // Ajoute d'autres questions ici
          ]
        },
        // Ajoute d'autres créations de QCM ici
      ]
    };
  }
};
</script>

<style scoped>
.profile-data {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #333;
}

.personal-info p {
  margin: 5px 0;
  font-size: 1.2rem;
}

.stats p {
  margin: 5px 0;
  font-size: 1.2rem;
}

.creation {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.creation h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
}

.creation p {
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: #666;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

input[type="checkbox"] {
  margin-right: 10px;
}
</style>
