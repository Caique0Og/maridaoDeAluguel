async function loginPrestador() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const responseDiv = document.getElementById('response');
  const errorDiv = document.getElementById('error');

  responseDiv.textContent = '';
  errorDiv.textContent = '';

  try {
    const response = await fetch('http://localhost:3000/login/prestador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      
      responseDiv.textContent = 'Prestador validado com sucesso! ' ;

      
      setTimeout(() => {
        window.location.href = 'http://127.0.0.1:5501/../../prestador/perfil.html'; //colocar aqui a URL do dasshborar do prestador 
      }, 1000);

    } else {
      errorDiv.textContent = data.error || 'Erro ao fazer login';
    }

  } catch (error) {
    errorDiv.textContent = 'Erro na requisição: ' + error.message;
  }
}
