import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import {Outlet, Link} from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <nav>
                <ul className='tabs'>
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                          <Button component={Link} to="/board/list" variant="contained">글 목록</Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                          <Button component={Link} to="/board/write" variant="contained">글 쓰기</Button>
                        </Box>
                </ul>
            </nav>
            <br />
            <Outlet />
        </>
    );
}

export default Layout;