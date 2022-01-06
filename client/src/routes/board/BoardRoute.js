import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from "../../components/board/Layout";
import BoardList from "../../components/board/BoardList";
import BoardWrite from "../../components/board/BoardWrite"
export default function BoardRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/board" element={<Layout />}>
                    <Route path="list" element={<BoardList />} />
                    <Route path="write" element={<BoardWrite />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}