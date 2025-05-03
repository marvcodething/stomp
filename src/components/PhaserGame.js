'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import background from './background.png';
import mainSheet from './mainSpritemap.png';

const PhaserGame = () => {
  const gameRef = useRef(null);
  const currentRoute = useRef(null);
  const movement = useRef({ up: false, down: false, left: false, right: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    }
  }, []);

  const move = (dir) => {
    movement.current[dir] = true;
  };

  const enterHouse = () => {
    if (currentRoute.current) window.location.href = currentRoute.current;
  };

  useEffect(() => {
    if (gameRef.current) return;

    class MyGame extends Phaser.Scene {
      preload() {
        this.load.image('background', background.src);
        this.load.spritesheet("sheet", mainSheet.src, {
          frameWidth: 32,
          frameHeight: 32,
        });
      }

      create() {
        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('sheet', { frames: [0, 1, 2, 3, 4, 5] }),
          frameRate: 20,
          repeat: -1
        });

        this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('sheet', { frames: [0, 1, 2, 3, 4, 5] }),
          frameRate: 20,
          repeat: -1
        });

        this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('sheet', { frames: [6, 7, 8, 9] }),
          frameRate: 12,
          repeat: -1
        });

        this.anims.create({
          key: 'down',
          frames: this.anims.generateFrameNumbers('sheet', { frames: [10, 11, 12, 13] }),
          frameRate: 12,
          repeat: -1
        });

        this.add.image(0, 0, 'background').setOrigin(0).setScale(1);

        this.player = this.add.sprite(50, 270, 'sheet', 10);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        this.houseZone = this.add.zone(60, 185, 30, 30);
        this.houseZone2 = this.add.zone(216, 105, 30, 30);
        this.houseZone3 = this.add.zone(466.545, 110, 30, 20);

        this.water1 = this.add.zone(400, 350, 455, 80); // Adjust size as needed
        this.physics.add.existing(this.water1, true); // Make it a static body
        this.physics.add.collider(this.player, this.water1); // Prevent player from passing through
        
        this.water2 = this.add.zone(505,280,450,80,);
        this.physics.add.existing(this.water2, true); // Make it a static body
        this.physics.add.collider(this.player, this.water2); // Prevent player from passing through
        

        this.physics.world.enable([this.houseZone, this.houseZone2, this.houseZone3,]);
        [this.houseZone, this.houseZone2, this.houseZone3].forEach(zone => {
          zone.body.setAllowGravity(false);
          zone.body.moves = false;
        });

        const walls = [
          { x: 60, y: 152 },
          { x: 214, y: 75 },
          { x: 466.545, y: 76 }
        ];

        walls.forEach(({ x, y }) => {
          const wall = this.add.zone(x, y, 50, 50);
          this.physics.add.existing(wall, true);
          this.physics.add.collider(this.player, wall);
        });

        this.physics.add.overlap(this.player, this.houseZone, () => {
          currentRoute.current = '/house1';
        });

        this.physics.add.overlap(this.player, this.houseZone2, () => {
          currentRoute.current = '/house2';
        });

        this.physics.add.overlap(this.player, this.houseZone3, () => {
          currentRoute.current = '/house3';
        });

        this.wasd = {
          up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      }

      update() {
        const { left, right, up, down } = this.wasd;
        const touch = movement.current;
        const player = this.player;
        const speed = 100;

        player.body.setVelocity(0);
        player.setFlipX(false);

        if (left.isDown || touch.left) {
          player.body.setVelocityX(-speed);
          player.play('left', true);
        } else if (right.isDown || touch.right) {
          player.body.setVelocityX(speed);
          player.setFlipX(true);
          player.play('right', true);
        } else if (up.isDown || touch.up) {
          player.body.setVelocityY(-speed);
          player.play('up', true);
        } else if (down.isDown || touch.down) {
          player.body.setVelocityY(speed);
          player.play('down', true);
        } else {
          player.setFrame(10);
        }

        if (currentRoute.current && Phaser.Input.Keyboard.JustDown(this.eKey)) {
          window.location.href = currentRoute.current;
        }

        Object.keys(touch).forEach(key => touch[key] = false);
      }
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 512,
      height: 384,
      pixelArt: true,
      backgroundColor: '#000000',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scene: MyGame,
      parent: 'phaser-container',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  const btnStyle = {
    width: 60,
    height: 60,
    fontSize: 24,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#444',
    color: 'white',
    touchAction: 'none',
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: 'black',
    }}>
      <div id="phaser-container" style={{ width: '100%', height: '100%' }} />

      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontFamily: 'sans-serif',
          fontSize: '16px',
          zIndex: 10,
          pointerEvents: 'none',
        }}>
          Press <b>E</b> to enter a house
        </div>
      )}

      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
        }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button onTouchStart={() => move('up')} style={btnStyle}>↑</button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onTouchStart={() => move('left')} style={btnStyle}>←</button>
            <button onTouchStart={() => move('down')} style={btnStyle}>↓</button>
            <button onTouchStart={() => move('right')} style={btnStyle}>→</button>
          </div>
          <button onTouchStart={enterHouse} style={{ ...btnStyle, marginTop: '10px' }}>
            Enter
          </button>
        </div>
      )}
    </div>
  );
};

export default PhaserGame;
