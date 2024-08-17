import React from "react";

const PoliticaPrivacidad = () => {
  return (
    <div
      className="modal fade"
      id="ModalPrivacidad"
      tabIndex="-1"
      aria-labelledby="ModalPrivacidadLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="ModalPrivacidadLabel">
              POLITICA DE PRIVACIDAD
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Gracias por visitar Vefrek. Tu privacidad es importante para
              nosotros. Esta Política de Privacidad explica cómo recopilamos,
              usamos, divulgamos y protegemos la información personal que
              obtenemos a través de nuestro sitio web https://vefrek.com. Al
              usar el Sitio, aceptas los términos de esta Política de
              Privacidad.
            </p>
            <h5 className="modal-title2">1. Información que recopilamos:</h5>
            <p>
              a. Información que nos proporcionas: Podemos recopilar información
              personal que nos proporcionas voluntariamente al interactuar con
              el Sitio, como tu nombre, dirección de correo electrónico, número
              de teléfono y cualquier otra información que decidas proporcionar
              al utilizar nuestros servicios, como al dejar reseñas o
              calificaciones de las empresas listadas en nuestro sitio.
            </p>
            <p>
              b. Información recopilada automáticamente: Cuando visitas nuestro
              Sitio, podemos recopilar cierta información automáticamente, como
              tu dirección IP, tipo de navegador, proveedor de servicios de
              Internet, páginas de referencia/salida, sistema operativo, marca
              de tiempo y/o datos de navegación. También podemos recopilar
              información sobre cómo interactúas con nuestro Sitio, como las
              páginas que visitas y las acciones que realizas.
            </p>
            <h5 className="modal-title2">2. Uso de la información:</h5>
            <p>
              a. Utilizamos la información que recopilamos para proporcionar y
              mantener nuestro Sitio, mejorar y personalizar tu experiencia,
              comunicarnos contigo, responder a tus consultas y proporcionarte
              información relevante sobre las empresas y servicios relacionados
              con el sector automotor que ofrecemos en nuestro Sitio.
            </p>
            <p>
              b. Podemos utilizar información no identificable para fines
              analíticos, estadísticos o de investigación, con el fin de mejorar
              nuestros servicios y la experiencia de usuario en nuestro Sitio.
            </p>
            <h5 className="modal-title2">3. Divulgación de la información:</h5>
            <p>
              a. No vendemos, intercambiamos ni transferimos tu información
              personal a terceros sin tu consentimiento, excepto según lo
              permita esta Política de Privacidad.
            </p>
            <p>
              b. Podemos divulgar tu información personal a terceros que nos
              ayuden a operar nuestro Sitio o a llevar a cabo nuestro negocio,
              como proveedores de servicios de alojamiento web, procesadores de
              pagos y servicios de análisis, siempre y cuando esos terceros
              acepten mantener la confidencialidad de tu información.
            </p>
            <p>
              c. También podemos divulgar tu información cuando consideremos que
              la divulgación es apropiada para cumplir con la ley, hacer cumplir
              las políticas de nuestro Sitio o proteger nuestros derechos,
              propiedad o seguridad, o los de otros.
            </p>
            <h5 className="modal-title2">
              4. Cookies y tecnologías similares:
            </h5>
            <p>
              Utilizamos cookies y tecnologías similares para recopilar cierta
              información automáticamente y mejorar la funcionalidad de nuestro
              Sitio. Puedes configurar tu navegador para que te notifique cuando
              se utilicen cookies y para rechazarlas si lo deseas. Sin embargo,
              ten en cuenta que algunas partes de nuestro Sitio pueden no
              funcionar correctamente si desactivas las cookies.
            </p>
            <h5 className="modal-title2">5. Enlaces a otros sitios web:</h5>
            <p>
              Nuestro Sitio puede contener enlaces a sitios web de terceros. No
              somos responsables de las prácticas de privacidad o el contenido
              de dichos sitios web. Te recomendamos que leas las políticas de
              privacidad de cualquier sitio web al que accedas desde nuestro
              Sitio.
            </p>
            <h5 className="modal-title2">6. Seguridad:</h5>
            <p>
              Implementamos medidas de seguridad para proteger tu información
              personal. Sin embargo, debes tener en cuenta que ninguna medida de
              seguridad es completamente infalible y que no podemos garantizar
              la seguridad de tu información.
            </p>
            <h5 className="modal-title2">
              7. Cambios en esta Política de Privacidad:
            </h5>
            <p>
              Nos reservamos el derecho de actualizar esta Política de
              Privacidad en cualquier momento. Te notificaremos cualquier cambio
              publicando la nueva Política de Privacidad en esta página. Te
              recomendamos que revises periódicamente esta página para estar al
              tanto de cualquier cambio.
            </p>
            <h5 className="modal-title2">8. Contacto:</h5>
            <p>
              Si tienes alguna pregunta sobre esta Política de Privacidad,
              contáctanos a nuestro correo electrónico
              administracion@vefrek.com.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
