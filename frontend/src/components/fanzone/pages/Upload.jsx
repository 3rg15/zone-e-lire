// src/components/fanzone/pages/Upload.jsx

// Upload delegates to Feed so users can create
// posts from either route without duplicating logic.
import Feed from "./Feed";

export default function Upload() {
  return (
    <div className="upload-page">
      <Feed />
    </div>
  );
}
