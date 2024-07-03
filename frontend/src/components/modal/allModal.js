import React, { useState } from 'react'

const ModalImageScan = ({ src, alt, onClose }) => {

     const [imageError, setImageError] = useState(false);

     const handleError = () => {
          setImageError(true);
     };

     return (

          <div class="modal is-active">
               <div class="modal-background" onClick={onClose}></div>
               <div class="modal-card is-flex is-justify-content-center">
                    <header class="modal-card-head has-text-centered">
                         <p class="modal-card-title is-centered">{alt}</p>
                         <button class="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section class="modal-card-body has-text-centered">
                         {imageError ? (
                              <div className="notification is-danger">
                                   Tidak ada gambar
                              </div>
                         ) : (
                              <img src={src} alt={alt} title={alt} onError={handleError} />
                         )}
                    </section>
               </div>
          </div>
     )
}

const ModalImageOnly = ({ src, alt, onClose }) => {
     return (
          <div class="modal is-active">
               <div class="modal-background" onClick={onClose}></div>
               <div class="modal-content">
                    <p class="image is-4by3">
                         <img src={src} alt={alt} />
                    </p>
               </div>
               <button class="modal-close is-large" aria-label="close" onClick={onClose}></button>
          </div>
     )
}

export { ModalImageOnly, ModalImageScan };