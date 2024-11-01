import { swalPopUp } from "../../utils/swal";
import { useContext, useRef } from "react";
import { SpinnerContext } from "../../context/spinnerContext";
import { addReview, editReview } from "../../utils/apiDb/apiDbAcions";

export default function Review({userData, companyId, newReview, cb, closeFn, comment}) {
    const { showSpinner } = useContext(SpinnerContext);
    const reviewContRef = useRef();

    const sendFeedback = async () => {
        try {
            if (!userData.isLogged)
                throw new Error("Debes iniciar sesión para enviar una reseña");

            const hasStars = document
                .querySelector(".starsFeedback")
                .querySelector("input[type='radio']:checked");
            const numberOfStars = hasStars
                ? parseInt(
                    document
                        .querySelector(".starsFeedback")
                        .querySelector("input[type='radio']:checked")
                        .getAttribute("weight")
                )
                : undefined;

            const comment = reviewContRef.current.querySelector(".commentFeedback").value;
            showSpinner(true);

            const response = newReview ? await addReview(numberOfStars, companyId, comment) : await editReview(numberOfStars, companyId, comment);
                        
            if (response.success) {
                swalPopUp("Acción completada", response.message, "success");
                document.querySelector(".commentFeedback").value = "";
                document
                    .querySelector(".starsFeedback")
                    .querySelectorAll("input")
                    .forEach((input) => (input.checked = false));
            } else if (!response.success && !response.message.includes("Error")) {
                swalPopUp("Ops!", response.message, "warning");
                showSpinner(false);
                return;
            } else if (!response.success && response.message.includes("Error")) {
                swalPopUp("Ops!", response.message, "error");
                showSpinner(false);
                return;
            }
        } catch (err) {
            swalPopUp("Ops!", err.message, "error"); 
            showSpinner(false);
            return;
        }
        showSpinner(false);
        await cb();
        if (closeFn) closeFn();
    };

    return (
        <div className="max-w-lg shadow-md mt-4" ref={reviewContRef}>
            <form action="" className="w-full p-2 flex column">
                <div className="mb-2">
                    <label
                        htmlFor="comment"
                        className="text-gray-600 w-full text-center"
                    >
                        {newReview ? "Deja tu comentario sobre la empresa" : "Edita tu comentario sobre la empresa"}
                    </label>
                    <textarea
                        className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 commentFeedback"
                        name="comment"
                        placeholder=""
                        defaultValue={comment || ""}
                    ></textarea>
                </div>

                <div className="container r-star">
                    <div className="feedback">
                        <div className="rating starsFeedback">
                            <input
                                type="radio"
                                name="rating"
                                id="rating-5"
                                weight="5"
                                />
                            <label htmlFor="rating-5"></label>
                            <input
                                type="radio"
                                name="rating"
                                id="rating-4"
                                weight="4"
                            />
                            <label htmlFor="rating-4"></label>
                            <input
                                type="radio"
                                name="rating"
                                id="rating-3"
                                weight="3"
                            />
                            <label htmlFor="rating-3"></label>
                            <input
                                type="radio"
                                name="rating"
                                id="rating-2"
                                weight="2"
                            />
                            <label htmlFor="rating-2"></label>
                            <input
                                type="radio"
                                name="rating"
                                id="rating-1"
                                weight="1"
                            />
                            <label htmlFor="rating-1"></label>
                        </div>
                    </div>
                </div>

                {
                    newReview ?
                    <button
                        className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                        onClick={sendFeedback}
                        type="button"
                    >
                        Comentar
                    </button>
                    :
                    <div className="flex">
                        <button
                            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                            onClick={sendFeedback}
                            type="button"
                        >
                            Guardar
                        </button>
                        <button
                            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded ml-4"
                            onClick={closeFn}
                            type="button"
                        >
                            Cancelar
                        </button>
                    </div>
                }
            </form>
        </div>
    )
}

