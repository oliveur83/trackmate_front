<template>
    <div class='semi-circle'>
      <div class="content">
        100%
      </div>
    </div>
    <div class="star-container">
    <div v-for="index in 10" :key="index" class="star">⭐</div>
  </div>
    bravo <br>
    <button>Relire les questions</button>
    <div class="menu_bar">
      <button class="action-btn" >Connexion</button>
      <button class="action-btn" >Inscription</button>
    </div>
  </template>
  
  <style>
  .star {
  font-size: 2rem; /* Ajustez la taille de la police selon vos besoins */
  margin-right: 5px;
  display: flex; /* Ajustez la marge entre les étoiles selon vos besoins */
}
  .semi-circle {
    width: 20rem;
    height: 10rem;
    background-color: #ffffff;
    border-radius: 10rem 10rem 0 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .menu_bar {
    background-color: #133D56;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    bottom: 0;
  }
  .content {
    margin-bottom: 1rem; /* Ajustez la marge selon vos besoins */
  }
  .star-container {
  display: flex;
}
.action-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    width: 20%;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  </style>
  