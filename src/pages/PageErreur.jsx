import React from 'react'
import { useRouteError } from 'react-router-dom'
export default function PageErreur() {
    const erreur = useRouteError();
    console.log(erreur);
  return (
    <div>
      <h1>Caramba, ça marche pas...</h1>
<p>
    <i>{erreur.statusText || erreur.message}</i>
</p>
    </div>
  )
}
