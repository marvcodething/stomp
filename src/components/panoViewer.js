'use client';
import { useEffect, useRef } from 'react';
import PhotoSphereViewer from 'photo-sphere-viewer';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

export default function PanoViewer({ src }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const viewer = new PhotoSphereViewer.Viewer({
      container: containerRef.current,
      panorama: src,
      navbar: true,
      defaultLong: 130,
    });

    return () => viewer.destroy();
  }, [src]);

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
}
