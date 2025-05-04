'use client'

import React, { useRef, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { CompassPlugin } from '@photo-sphere-viewer/compass-plugin';
import Link from 'next/link';

import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/compass-plugin/index.css';

export default function House2() {
  const viewerRef = useRef(null);
  const markersPluginRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  const markerData = [
    {
      id: "video",
      image: "video.png",
      anchor: "bottom center",
      position: { yaw: "215deg", pitch: "-5deg" },
      size: { width: 96, height: 96 },
      tooltip: "Click to watch video",
    },
    {
      id: "fridges",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "310deg", pitch: "345.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Fridges</header>These fridges were pulled out of everyone's room on day one. Space optimization and all.</div>`,
    },
    {
      id: "family",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "309deg", pitch: "357.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">The Family Poster</header>Some may say we got this on the street. Others will say Halle got it for $2 at Michael's.</div>`,
    },
    {
      id: "blankets",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "37deg", pitch: "330.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Blankets</header>A very talented member of the quad made one of these blankets (her name starts with an H).</div>`,
    },
    {
      id: "broke",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "350deg", pitch: "310.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Splits Spot</header>This is the spot where Peter became a fascist.</div>`,
    },
    {
      id: "maddie",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "112deg", pitch: "0.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Bathroom Room</header>This was an RA room that we got with a bathroom in it! </div>`,
    },
    {
      id: "clue",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "15deg", pitch: "326.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Clue</header>We played SOOO much clue during spring break.</div>`,
    },
    {
      id: "balcony",
      image: "heart.png",
      anchor: "bottom center",
      position: { yaw: "235deg", pitch: "-5.deg" },
      size: { width: 32, height: 32 },
      tooltip: `<div><header style="font-size: 24px; font-weight: bold;">Balcony</header>We spend a lot of time here doing completely legal things.</div>`,
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

    plugin.addEventListener('select-marker', (e) => {
      if (e.marker.id === 'video') {
        setShowVideo(true);
      }
    });
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
        src={'images/green3rd2.jpeg'}
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

      {showVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{ position: 'relative', width: '80%', height: '80%' }}>
          <iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/Ynn_dugzWIw?controls=0&modestbranding=1&rel=0&autoplay=1&loop=1&playlist=Ynn_dugzWIw"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

            <button
              onClick={() => setShowVideo(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '2rem',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
