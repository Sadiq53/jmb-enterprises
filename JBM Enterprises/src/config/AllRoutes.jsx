import {useRoutes} from 'react-router-dom'
import AdminModule from '../modules/AdminModule';
import Error404 from '../components/admin/feature/404/Error404';
import rootRoutes from './Root/Root';


const AllRoutes = () =>{
    let userRoutes = useRoutes([
        {
            path : '/',
            element : <AdminModule />,
            children : rootRoutes
        },
        {
            path : '*',
            element : <Error404 />
        },
    ])

    return userRoutes;
}

export default AllRoutes