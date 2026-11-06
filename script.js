const form = document.getElementById('loginForm');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Cole aqui o endpoint exato fornecido no seu desafio
  const API_URL = 'https://reqres.in/api/login'; 

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // Aceita tanto 'access_token' quanto 'token' dependendo da API
    const token = data.access_token || data.token;

    if (response.ok && token) {
      // 1. Armazena o token no localStorage
      localStorage.setItem('access_token', token);

      // 2. Feedback visual
      feedback.className = 'success';
      feedback.style.display = 'block';
      feedback.innerHTML = `<strong>Sucesso!</strong> Token salvo no localStorage.`;
    } else {
      throw new Error(data.error || data.message || 'Credenciais inválidas.');
    }
  } catch (err) {
    feedback.className = 'error';
    feedback.style.display = 'block';
    feedback.textContent = err.message;
  }
});