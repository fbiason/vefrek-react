Vefrek 1.0.3

- Actualice estética del Home

Tareas a realizar:
BIASON (front)

- Perfil (dashboard)
- Formulario para carga de negocio --> Publicación --> Formulario para carga
- Visualización de página de categorías
- Página de negocio

ARIEL (back)

- Edición de Perfil
- Carga de negocios
- Filtro de negocios
- Mail para Admin

Otras tareas:

- Controlar Urls
- Política Privacidad
- Términos y Condiciones
- Responsive
- SEO

    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <p>
            Acceda a todos los beneficios de{" "}
            <img
              src="/images/logos/logo-vefrek.png"
              alt="Vefrek"
              className="vefrek-logo"
            />{" "}
            para incrementar sus ventas ¡TOTALMENTE GRATIS!
          </p>
        </div>
        <div className="login-card text-center contanier">
          <h2>Bienvenido</h2>
          <form>
            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" />

            <div className="terms">
              <input type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms">Acepto Términos y Condiciones</label>
            </div>

            <Link to="/perfil">
              <button className="button">Iniciar Sesión</button>
            </Link>
          </form>

          <div className="additional-options">
            <p>
              No tienes cuenta?{" "}
              <span className="register-link">Registrate</span>
            </p>
            <p>Recuperar contraseña</p>
          </div>

          <hr className="divider" />

          <div className="social-buttons">
            <Link to={`${process.env.REACT_APP_API_URL}api/auth/facebook`}>
              <button className="facebook-button">
                Iniciar sesión con Facebook
              </button>
            </Link>
            <Link to={`${process.env.REACT_APP_API_URL}api/auth/google`}>
              <button className="google-button">
                Iniciar sesión con Google
              </button>
            </Link>
          </div>
        </div>
      </div>
