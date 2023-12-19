import './App.css'
import Auth from './components/Auth'
import Menu from './components/Menu'
import {
        RecoilRoot,
        atom,
        selector,
        useRecoilState,
        useRecoilValue,
} from 'recoil';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

        return (
                <>
                        <RecoilRoot>
                                <Router>
                                        <Routes>
                                                <Route path='/auth' element={<Auth isLoginRender={true} />} />
                                                <Route path='/menu' element={<Menu />} />
                                        </Routes>
                                </Router >
                        </RecoilRoot >
                </>
        )
}

export default App
