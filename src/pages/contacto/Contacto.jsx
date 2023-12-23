import React from "react";
import "./contacto.css";

const Contacto = () => {
  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Comunícate con nosotros</h2>
          <p>CONTACTANOS</p>
        </div>

        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.5367865926187!2d-69.230385!3d-51.6133755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb6fea979bfadd3%3A0x40864ca79df574a8!2sAlberdi%201118%20Depto%204%2C%20R%C3%ADo%20Gallegos%2C%20Santa%20Cruz!5e0!3m2!1ses-419!2sar!4v1654740207616!5m2!1ses-419!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Dirección:</h4>
                <p>Alberdi 1144, Depto 4, Río Gallegos, Santa Cruz</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>administracion@vefrek.com</p>
              </div>

              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Teléfono:</h4>
                <p>+011 5320 0080</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">
            <form
              action="forms/contact.php"
              method="post"
              role="form"
              className="php-email-form"
            >
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Asunto"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Mensaje"
                  required
                ></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Espere...</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Tu mensaje ha sido enviado. ¡Muchas gracias!
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Enviar mensaje</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
