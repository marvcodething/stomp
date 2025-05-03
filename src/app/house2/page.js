'use client'

import React, { useRef } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { CompassPlugin } from '@photo-sphere-viewer/compass-plugin';
import Link from 'next/link';


import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/compass-plugin/index.css';

export default function House2() {
  const viewerRef = useRef(null);
  const markersPluginRef = useRef(null);

  const markerData = [
    // Example marker
    {
        id: "video",
        image: "video.png",
        anchor: "bottom center",
        position: { yaw: "320deg", pitch: "-5deg" },
        size: { width: 96, height: 96 },
        tooltip: "Click to watch video",
        content: `<div><header style="font-size: 24px; font-weight: bold;">stomping ground</header><br/><iframe width="560" height="315" src="https://www.youtube.com/embed/Ynn_dugzWIw?si=5_knUElPExfyD_4N" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
      },
  ];

  const plugins = [
    [MarkersPlugin, { markers: markerData }],
    [CompassPlugin, {
      hotspots: [
        { yaw: '0deg' }, { yaw: '90deg' }, { yaw: '180deg' }, { yaw: '270deg' },
      ],
      position: 'top right'
    }]
  ];

  const handleReady = (viewer) => {
    const plugin = viewer.getPlugin(MarkersPlugin);
    markersPluginRef.current = plugin;
  };

  const navbar = [
    'zoom',
    'caption',
    'fullscreen',
    {
      id: 'markers-toggle',
      content: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
      title: 'Toggle markers',
      className: 'custom-button',
      onClick: (viewer) => {
        const plugin = viewer.getPlugin(MarkersPlugin);
        if (!plugin) return;
        const markers = plugin.getMarkers();
        if (markers.length > 0) {
          plugin.clearMarkers();
        } else {
          markerData.forEach(marker => plugin.addMarker(marker));
        }
      },
    },
  ];

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <ReactPhotoSphereViewer
        ref={viewerRef}
        src={'images/green3rd2.jpg'} // Replace with your new image path
        height={"100vh"}
        width={"100%"}
        plugins={plugins}
        defaultZoomLvl={0.5}
        onReady={handleReady}
        navbar={navbar}
      />
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          color: 'white',
          textDecoration: 'none'
        }}
      >
        ← Back to town
      </Link>
    </div>
  );
}
