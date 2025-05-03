'use client'

import React, { useRef } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { CompassPlugin } from '@photo-sphere-viewer/compass-plugin';

import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/compass-plugin/index.css';

export default function House1() {
  const viewerRef = useRef(null);
  const markersPluginRef = useRef(null);
  const markerData = [
    {
      id: "video",
      image: "video.png",
      anchor: "bottom center",
      position: { yaw: "0.33deg", pitch: "-5deg" },
      size: { width: 96, height: 96 },
      tooltip: "Click to watch video",
      content: `<div><header style="font-size: 24px; font-weight: bold;">stomping ground</header><br/><iframe width="560" height="315" src="https://www.youtube.com/embed/Kni3g028Sg4?si=AznqxjcEc3x470MD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
    },
    {
      id: "couch",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "275deg", pitch: "330.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">The Holy Couch</header>Casey Scott got this couch from facebook marketplace for free. We think its a gift from god.</div>`,
    },
    {
      id: "pulp",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "275deg", pitch: "360.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Pulp Fiction Poster</header>Oh man, I shot Marvin in the face</div>`,
    },
    {
      id: "barcart",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "65deg", pitch: "335.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">The Barcart</header>Grady walked this back from smarget</div>`,
    },
    {
      id: "godzilla",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "154deg", pitch: "360.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Godzilla Poster</header>Godzilla vs Megalon on the twin towers looking very cool.</div>`,
    },
  ];

  const plugins = [
    [MarkersPlugin, {
      markers: markerData
    }],
    [CompassPlugin, {
      hotspots: [
        { yaw: '0deg' },
        { yaw: '90deg' },
        { yaw: '180deg' },
        { yaw: '270deg' },
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
      content: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      `,
      title: 'Toggle markers',
      className: 'custom-button',
      onClick: (viewer) => {
        const plugin = viewer.getPlugin(MarkersPlugin);
        if (!plugin) return;
        
        const markers = plugin.getMarkers();
        if (markers.length > 0) {
          // Remove all markers
          plugin.clearMarkers();
        } else {
          // Re-add all markers
          markerData.forEach(marker => {
            plugin.addMarker(marker);
          });
        }
      },
    },
  ];

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <ReactPhotoSphereViewer
        ref={viewerRef}
        src={'images/green3rd1.jpeg'}
        height={"100vh"}
        width={"100%"}
        plugins={plugins}
        defaultZoomLvl={0.5}
        onReady={handleReady}
        navbar={navbar}
      />
      <a href="/" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, color: 'white', textDecoration: 'none' }}>
        ← Back to town
      </a>
    </div>
  );
}