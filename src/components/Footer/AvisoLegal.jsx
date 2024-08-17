import React from "react";

const AvisoLegal = () => {
  return (
    <div
      className="modal fade"
      id="avisoLegalModal"
      tabIndex="-1"
      aria-labelledby="avisoLegalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="avisoLegalLabel">
              AVISO LEGAL
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Contenido del Aviso Legal */}
            <h5 className="modal-title2">1. Titularidad del Sitio:</h5>
            <li>Titular: Biason Franco</li>
            <li>Domicilio: Cacique Yatel 1895</li>
            <li>Email: administracion@vefrek.com</li>
            <li>Teléfono: 2966 23-1074</li>
            <h5 className="modal-title2">2. Propiedad Intelectual:</h5>
            <p>
              Todo el contenido presente en este sitio web, incluyendo pero no
              limitado a textos, imágenes, logotipos, gráficos, videos y
              diseños, está protegido por derechos de autor y otras leyes de
              propiedad intelectual. Está prohibido el uso no autorizado de
              cualquier parte del contenido sin el consentimiento previo por
              escrito de Vefrek.
            </p>
            <h5 className="modal-title2">3. Limitación de Responsabilidad:</h5>
            <p>
              Nos esforzamos por proporcionar información precisa y actualizada
              en nuestro sitio web. Sin embargo, no garantizamos la precisión,
              integridad o actualidad de la información proporcionada. No
              seremos responsables de ningún daño directo, indirecto,
              incidental, especial o consecuente que surja del uso o la
              imposibilidad de utilizar nuestro sitio web.
            </p>
            <h5 className="modal-title2">4. Enlaces a Terceros:</h5>
            <p>
              Nuestro sitio web puede contener enlaces a sitios web de terceros.
              Estos enlaces son proporcionados únicamente para tu conveniencia.
              No tenemos control sobre el contenido de estos sitios web de
              terceros y no asumimos ninguna responsabilidad por su contenido o
              prácticas de privacidad.
            </p>
            <h5 className="modal-title2">5. Jurisdicción y Ley Aplicable:</h5>
            <p>
              Este Aviso Legal se regirá e interpretará de acuerdo con las leyes
              de la República Argentina. Cualquier disputa que surja en relación
              con este Aviso Legal estará sujeta a la jurisdicción exclusiva de
              los tribunales de la ciudad de Rio Gallegos, provincia Santa Cruz.
            </p>
            <h5 className="modal-title2">6. Modificaciones:</h5>
            <p>
              Nos reservamos el derecho de modificar este Aviso Legal en
              cualquier momento. Cualquier cambio entrará en vigencia
              inmediatamente después de su publicación en este sitio web. Al
              acceder y utilizar nuestro sitio web, aceptas los términos y
              condiciones establecidos en este Aviso Legal. Si no estás de
              acuerdo con estos términos, por favor, abstente de usar nuestro
              sitio web. Si tienes alguna pregunta sobre este Aviso Legal,
              contáctanos a nuestro correo oficial administracion@vefrek.com.
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

export default AvisoLegal;
