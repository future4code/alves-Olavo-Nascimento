import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailMovie from "../pages/detailMovie/DetailMovie";
import FeedPage from '../pages/feed/FeedPage'
import { createGlobalStyle } from 'styled-components';
 

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FeedPage />} />
                <Route path="detail/:id" element={<DetailMovie />} />
            </Routes>
        </BrowserRouter>
    )
}