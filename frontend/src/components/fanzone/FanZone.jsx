// src/components/fanzone/FanZone.jsx

import { Routes, Route } from "react-router-dom";

import Navbar   from "./components/Navbar";
import Sidebar  from "./components/Sidebar";
import Feed     from "./pages/Feed";
import PostView from "./pages/PostView";
import Upload   from "./pages/Upload";

import { FanZoneProvider } from "./context/FanZoneContext";

import "./styles.css";

export default function FanZone() {
  return (
    <FanZoneProvider>

      <div className="fanzone-app">

        <Navbar />

        <div className="fanzone-page">

          <main className="fanzone-feed">
            <Routes>
              <Route index         element={<Feed />} />
              <Route path="post/:id" element={<PostView />} />
              <Route path="upload"   element={<Upload />} />
            </Routes>
          </main>

          <Sidebar />

        </div>

      </div>

    </FanZoneProvider>
  );
}
