import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import PageErreur from './pages/PageErreur.jsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MaMeteo from './pages/MaMeteo/MaMeteo.jsx'
import Plantes from './pages/plantes/Plantes.jsx'

const queryClient =  new QueryClient();

const router= createBrowserRouter([
  
  { path: "/meteo", element:  <MaMeteo/>,errorElement: <PageErreur/>},
  { path: "/", element:  <MaMeteo/>,errorElement: <PageErreur/>},


], 
{ basename: "/MeteoReact" }
); // pour le déploiement depuis le dépot git


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    <Toaster position="bottom-center"/>
    <RouterProvider router={router}/> 

    </QueryClientProvider>
  </StrictMode>,
)
